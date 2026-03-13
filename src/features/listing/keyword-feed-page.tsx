"use client";

import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { EmptyState, ErrorState, LoadingCards } from "@/components/common/states";
import { ScreenTitle } from "@/components/common/typography";
import { KeywordFeed } from "@/features/listing/listing-shared";
import { useKeywordFeedController } from "@/hooks/keyword-feed.controller";

export function KeywordFeedPage({
  slug,
  backHref,
  baseKeywordPath,
  problemHrefBase,
  folderId
}: {
  slug: string;
  backHref: string;
  baseKeywordPath?: string;
  problemHrefBase?: string;
  folderId?: string;
}) {
  const {
    keywordsQuery,
    problemsQuery,
    baseKeywordPath: defaultBaseKeywordPath,
    problemHrefBase: defaultProblemHrefBase
  } = useKeywordFeedController(
    slug,
    backHref,
    folderId
  );
  const resolvedKeywordBasePath = baseKeywordPath ?? defaultBaseKeywordPath;
  const resolvedProblemHrefBase = problemHrefBase ?? defaultProblemHrefBase;

  return (
    <main className="ds-app-surface mx-auto min-h-screen max-w-md pb-24">
      <section className="px-4 pt-5">
        <header className="flex items-center justify-between">
          <Link href={backHref as Route} className="ds-icon-secondary p-2">
            <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
          </Link>
          <ScreenTitle>키워드 분류</ScreenTitle>
          <button type="button" className="ds-icon-secondary p-2">
            <Settings className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </header>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1" data-tour="keywords">
          <Link href={backHref as Route} className="ds-chip bg-transparent shadow-none">
            전체
          </Link>
          {keywordsQuery.data
            ?.filter((keyword) => keyword.slug !== "all")
            .map((keyword) => (
              <Link
                key={keyword.id}
                href={`${resolvedKeywordBasePath}/${keyword.slug}` as Route}
                className={`ds-chip ${slug === keyword.slug ? "ds-chip-active" : "bg-transparent shadow-none"}`}
              >
                {keyword.label.ko}
              </Link>
            ))}
        </div>

        {problemsQuery.isLoading ? <LoadingCards /> : null}
        {problemsQuery.isError ? <ErrorState description="문제를 불러오지 못했습니다." /> : null}
        {!problemsQuery.isLoading && !problemsQuery.isError && !problemsQuery.data?.length ? (
          <EmptyState title="문제가 없습니다." description="다른 키워드를 선택하거나 새 문제를 등록해 보세요." />
        ) : null}
        {problemsQuery.data && keywordsQuery.data ? (
          <KeywordFeed
            problems={problemsQuery.data}
            keywords={keywordsQuery.data}
            problemHrefBuilder={(problemId) =>
              `${resolvedProblemHrefBase}/${problemId}?back=${encodeURIComponent(`${resolvedKeywordBasePath}/${slug}`)}`
            }
          />
        ) : null}
      </section>
    </main>
  );
}
