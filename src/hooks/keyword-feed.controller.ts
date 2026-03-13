"use client";

import { useKeywordsQuery, useProblemsQuery } from "@/hooks/listing.queries";

export function useKeywordFeedController(slug: string, backHref: string, folderId?: string) {
  const keywordsQuery = useKeywordsQuery();
  const problemsQuery = useProblemsQuery({ keyword: slug, folderId });
  const isMusicContext = backHref === "/music";
  const isFolderContext = backHref.startsWith("/folders/");

  return {
    keywordsQuery,
    problemsQuery,
    baseKeywordPath: isMusicContext ? "/music/keywords" : isFolderContext ? `${backHref}/keywords` : "/keywords",
    problemHrefBase: isMusicContext ? "/music/problems" : isFolderContext ? `${backHref}/problems` : "/problems"
  };
}
