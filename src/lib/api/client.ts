import {
  createFolder,
  createProblem,
  deleteProblem,
  getFolders,
  getKeywords,
  getProblemById,
  getProblems
} from "@/lib/mocks/repository";
import type { Folder, Problem, ProblemFilters } from "@/types/problem";

export const apiClient = {
  getFolders,
  getKeywords,
  getProblems,
  getProblemById,
  createFolder: (input: Pick<Folder, "name" | "coverToken">) => createFolder(input),
  createProblem: (input: Omit<Problem, "id" | "createdAt" | "updatedAt">) => createProblem(input),
  deleteProblem
};

export type { ProblemFilters };
