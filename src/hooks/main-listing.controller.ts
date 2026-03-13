"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { folderDialogOpenAtom, listingViewAtom, tutorialOpenAtom, tutorialStepAtom } from "@/atoms/ui.atom";
import { useFoldersQuery, useKeywordsQuery, useProblemsQuery } from "@/hooks/listing.queries";

export function useMainListingController() {
  const [view, setView] = useAtom(listingViewAtom);
  const [, setDialogOpen] = useAtom(folderDialogOpenAtom);
  const [, setTutorialOpen] = useAtom(tutorialOpenAtom);
  const [, setTutorialStep] = useAtom(tutorialStepAtom);

  const keywordsQuery = useKeywordsQuery();
  const foldersQuery = useFoldersQuery();
  const problemsQuery = useProblemsQuery({ keyword: "all" });

  useEffect(() => {
    const seen = window.localStorage.getItem("hiconsy-tutorial-seen");
    if (!seen) {
      window.localStorage.setItem("hiconsy-tutorial-seen", "true");
      setTutorialStep(0);
      setTutorialOpen(true);
    }
  }, [setTutorialOpen, setTutorialStep]);

  return {
    view,
    setView,
    openFolderDialog: () => setDialogOpen(true),
    openTutorial: () => {
      setTutorialStep(0);
      setTutorialOpen(true);
    },
    keywordsQuery,
    foldersQuery,
    problemsQuery
  };
}
