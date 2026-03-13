"use client";

import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { EmptyState, ErrorState, LoadingCards } from "@/components/common/states";
import { SectionHeader } from "@/components/common/typography";
import { MusicProblemGrid } from "@/features/listing/listing-shared";
import { useMusicListingController } from "@/hooks/music-listing.controller";
import { MUSIC_FOLDER_ID } from "@/lib/constants/folders";

export function FolderListingPage({
  folderId = MUSIC_FOLDER_ID,
  basePath = "/music",
  backHref = "/"
}: {
  folderId?: string;
  basePath?: string;
  backHref?: string;
}) {
  const { folderName, keywordsQuery, problemsQuery } = useMusicListingController(folderId);

  return (
    <main className="ds-app-surface mx-auto min-h-screen max-w-md pb-24">
      <section className="px-4 pt-6">
        <header className="flex items-center justify-between">
          <Link href={backHref as Route} aria-label="뒤로가기" className="ds-icon-secondary p-2">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="w-9" aria-hidden="true" />
        </header>

        <section className="mt-8" data-tour="keywords">
          <SectionHeader
            className="mb-3"
            title={`${folderName} 키워드 분류`}
            description={`${folderName} 폴더에 저장된 키워드로 질문과 답변을 확인할 수 있습니다.`}
            action={
              <button type="button" className="ds-icon-muted p-2">
                <Settings className="h-5 w-5" />
              </button>
            }
          />

          <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-1">
            {keywordsQuery.data?.map((keyword) => (
              <Link
                key={keyword.id}
                href={(keyword.slug === "all" ? basePath : `${basePath}/keywords/${keyword.slug}`) as Route}
                className={`ds-chip ${keyword.slug === "all" ? "ds-chip-active" : "bg-transparent shadow-none"}`}
              >
                {keyword.label.ko}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-7" data-tour="view-controls">
          <div className="flex items-center justify-between px-1">
            <p className="ds-meta-title">전체</p>
            <button type="button" className="ds-filter-label">
              질문 ▼
            </button>
          </div>
        </section>

        <section className="mt-4">
          {problemsQuery.isLoading ? <LoadingCards /> : null}
          {problemsQuery.isError ? <ErrorState description="문제를 불러오지 못했습니다." /> : null}
          {!problemsQuery.isLoading && !problemsQuery.isError && !problemsQuery.data?.length ? (
            <EmptyState title="조건에 맞는 문제가 없습니다." description="다른 키워드를 선택하거나 새 문제를 등록해 보세요." />
          ) : null}
          {problemsQuery.data?.length ? (
            <MusicProblemGrid problems={problemsQuery.data} problemHrefBase={`${basePath}/problems`} />
          ) : null}
        </section>
      </section>
    </main>
  );
}
