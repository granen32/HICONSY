import { atom } from "jotai";
import type { ProblemImage } from "@/types/problem";

export const selectedKeywordAtom = atom("all");
export const listingViewAtom = atom<"grid" | "list">("grid");
export const listingSearchAtom = atom("");
export const folderDialogOpenAtom = atom(false);
export const tutorialOpenAtom = atom(false);
export const tutorialStepAtom = atom(0);

export type RegistrationDraft = {
  title: string;
  body: string;
  coverImage?: ProblemImage;
  solutionImages: ProblemImage[];
};

export const registrationDraftAtom = atom<RegistrationDraft>({
  title: "",
  body: "",
  solutionImages: []
});
