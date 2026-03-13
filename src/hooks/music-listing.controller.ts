"use client";

import { useMemo } from "react";
import { useKeywordsQuery, useProblemsQuery } from "@/hooks/listing.queries";
import { useFoldersQuery } from "@/hooks/listing.queries";
import { MUSIC_FOLDER_ID } from "@/lib/constants/folders";

export function useMusicListingController(folderId = MUSIC_FOLDER_ID) {
  const keywordsQuery = useKeywordsQuery();
  const foldersQuery = useFoldersQuery();
  const problemsQuery = useProblemsQuery({ keyword: "all", folderId });
  const folderName = useMemo(
    () => foldersQuery.data?.find((folder) => folder.id === folderId)?.name ?? "폴더",
    [folderId, foldersQuery.data]
  );

  return {
    folderName,
    foldersQuery,
    keywordsQuery,
    problemsQuery
  };
}
