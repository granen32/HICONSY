"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useToast } from "@/components/common/toast";
import { useFoldersQuery, useKeywordsQuery } from "@/hooks/listing.queries";
import {
  problemRegistrationSchema,
  type ProblemRegistrationValues
} from "@/features/problem-registration/problem-registration.schema";
import { apiClient } from "@/lib/api/client";
import { logEvent } from "@/lib/logger";
import type { ProblemImage } from "@/types/problem";

function toPreview(file: File, kind: ProblemImage["kind"]): ProblemImage {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    objectUrl: URL.createObjectURL(file),
    kind
  };
}

export function useProblemRegistrationController() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { push } = useToast();
  const [coverImage, setCoverImage] = useState<ProblemImage | undefined>();
  const [solutionImages, setSolutionImages] = useState<ProblemImage[]>([]);
  const [keywordPanelOpen, setKeywordPanelOpen] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);
  const solutionInputRef = useRef<HTMLInputElement>(null);

  const keywordsQuery = useKeywordsQuery();
  const foldersQuery = useFoldersQuery();

  const form = useForm<ProblemRegistrationValues>({
    resolver: zodResolver(problemRegistrationSchema),
    defaultValues: {
      title: "",
      keywordIds: [],
      folderId: undefined,
      body: ""
    }
  });

  useEffect(() => {
    return () => {
      if (coverImage) {
        URL.revokeObjectURL(coverImage.objectUrl);
      }

      solutionImages.forEach((image) => {
        URL.revokeObjectURL(image.objectUrl);
      });
    };
  }, [coverImage, solutionImages]);

  const mutation = useMutation({
    mutationFn: apiClient.createProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      logEvent("problem_created");
      push("문제가 등록되었습니다.");
      router.push("/");
    }
  });

  const selectedKeywords = useWatch({ control: form.control, name: "keywordIds" }) ?? [];
  const body = useWatch({ control: form.control, name: "body" }) ?? "";

  const previewCards = useMemo(() => {
    if (!coverImage) {
      return [];
    }

    return [coverImage, ...solutionImages.slice(0, 3)];
  }, [coverImage, solutionImages]);

  const selectedKeywordLabel =
    keywordsQuery.data
      ?.filter((keyword) => selectedKeywords.includes(keyword.slug))
      .map((keyword) => keyword.label.ko)
      .join(", ") ?? "";

  const filteredKeywords =
    keywordsQuery.data?.filter((keyword) => {
      if (keyword.slug === "all") {
        return false;
      }

      if (!keywordSearch.trim()) {
        return true;
      }

      return keyword.label.ko.toLowerCase().includes(keywordSearch.trim().toLowerCase());
    }) ?? [];

  return {
    form,
    keywordsQuery,
    foldersQuery,
    coverImage,
    solutionImages,
    keywordPanelOpen,
    keywordSearch,
    coverInputRef,
    solutionInputRef,
    selectedKeywords,
    body,
    previewCards,
    selectedKeywordLabel,
    filteredKeywords,
    setKeywordPanelOpen,
    setKeywordSearch,
    openCoverPicker: () => coverInputRef.current?.click(),
    openSolutionPicker: () => solutionInputRef.current?.click(),
    onCoverChange: (file?: File) => {
      if (!file) return;
      if (coverImage) {
        URL.revokeObjectURL(coverImage.objectUrl);
      }
      setCoverImage(toPreview(file, "cover"));
    },
    onSolutionChange: (files: File[]) => {
      if (!files.length) return;
      setSolutionImages((current) => [...current, ...files.map((file) => toPreview(file, "solution"))]);
    },
    onSubmit: form.handleSubmit((values) => {
      mutation.mutate({
        title: values.title,
        body: values.body,
        subject: "math",
        keywordIds: values.keywordIds,
        folderId: values.folderId,
        coverImage,
        solutionImages
      });
    })
  };
}
