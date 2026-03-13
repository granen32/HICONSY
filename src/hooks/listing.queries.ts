"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { queryKeys } from "@/lib/query/keys";

export function useKeywordsQuery() {
  return useQuery({
    queryKey: queryKeys.keywords,
    queryFn: apiClient.getKeywords
  });
}

export function useFoldersQuery() {
  return useQuery({
    queryKey: queryKeys.folders,
    queryFn: apiClient.getFolders
  });
}

export function useProblemsQuery(filters: { keyword?: string; folderId?: string; query?: string }) {
  return useQuery({
    queryKey: queryKeys.problems(filters),
    queryFn: () => apiClient.getProblems(filters)
  });
}

export function useProblemQuery(problemId: string) {
  return useQuery({
    queryKey: queryKeys.problem(problemId),
    queryFn: () => apiClient.getProblemById(problemId)
  });
}
