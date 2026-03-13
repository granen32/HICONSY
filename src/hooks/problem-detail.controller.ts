"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useToast } from "@/components/common/toast";
import { useFoldersQuery, useKeywordsQuery, useProblemQuery } from "@/hooks/listing.queries";
import { apiClient } from "@/lib/api/client";
import { logEvent } from "@/lib/logger";
import { queryKeys } from "@/lib/query/keys";

export function useProblemDetailController(
  problemId: string,
  backHref: string = "/",
  deleteRedirectHref: string = "/"
) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { push } = useToast();

  const problemQuery = useProblemQuery(problemId);
  const keywordsQuery = useKeywordsQuery();
  const foldersQuery = useFoldersQuery();

  const deleteMutation = useMutation({
    mutationFn: apiClient.deleteProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      queryClient.removeQueries({ queryKey: queryKeys.problem(problemId) });
      push("문제가 삭제되었습니다.");
      router.push(deleteRedirectHref as Route);
    }
  });

  const keywordLabels = useMemo(() => {
    if (!problemQuery.data || !keywordsQuery.data) {
      return [];
    }

    return problemQuery.data.keywordIds
      .map((slug) => keywordsQuery.data.find((keyword) => keyword.slug === slug)?.label.ko)
      .filter(Boolean);
  }, [keywordsQuery.data, problemQuery.data]);

  const folderName = useMemo(() => {
    if (!problemQuery.data?.folderId || !foldersQuery.data) {
      return "미분류";
    }

    return foldersQuery.data.find((folder) => folder.id === problemQuery.data?.folderId)?.name ?? "미분류";
  }, [foldersQuery.data, problemQuery.data]);

  return {
    backHref,
    problemQuery,
    keywordLabels,
    folderName,
    onDelete: () => {
      if (!window.confirm("이 문제를 삭제할까요?")) {
        return;
      }

      logEvent("problem_deleted", { problemId });
      deleteMutation.mutate(problemId);
    }
  };
}
