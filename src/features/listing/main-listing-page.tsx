"use client";

import dynamic from "next/dynamic";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { EmptyState, ErrorState, LoadingCards } from "@/components/common/states";
import { DisplayTitle, SectionHeader } from "@/components/common/typography";
import { folderTone, MainProblemGrid, ViewToggle } from "@/features/listing/listing-shared";
import { useMainListingController } from "@/hooks/main-listing.controller";
import { MUSIC_FOLDER_ID } from "@/lib/constants/folders";

const FolderCreateDialog = dynamic(
  () => import("@/features/folder/folder-create-dialog").then((module) => module.FolderCreateDialog),
  { ssr: false }
);

const FeatureHighlightTutorial = dynamic(
  () =>
    import("@/features/tutorial/feature-highlight-tutorial").then((module) => module.FeatureHighlightTutorial),
  { ssr: false }
);

export function MainListingPage() {
  const { view, setView, openFolderDialog, openTutorial, keywordsQuery, foldersQuery, problemsQuery } =
    useMainListingController();

  return (
    <main className="ds-app-surface mx-auto min-h-screen max-w-md pb-24">
      <section className="px-4 pt-6">
        <section className="flex items-center justify-between px-1">
          <DisplayTitle>클라우드</DisplayTitle>
          <button type="button" className="ds-icon-muted p-2">
            <Search className="h-5 w-5" />
          </button>
        </section>

        <section className="mt-8" data-tour="folders">
          <SectionHeader
            className="mb-3 items-center"
            title="폴더"
            description="질문과 답변을 폴더별로 관리합니다."
            action={
              <button type="button" className="ds-icon-secondary p-2" onClick={openFolderDialog}>
                <Plus className="h-6 w-6" />
              </button>
            }
          />

          <div className="flex gap-3 overflow-x-auto pb-2">
            {foldersQuery.data?.map((folder) => (
              <Link
                key={folder.id}
                href={folder.id === MUSIC_FOLDER_ID ? "/music" : `/folders/${folder.id}`}
                className="min-w-[10.1rem]"
              >
                <div className={`ds-radius-md h-[8.5rem] p-4 text-white ${folderTone(folder.coverToken)}`}>
                  <div className="ds-thumbnail-frame ds-folder-cover-overlay h-full" />
                </div>
                <p className="ds-folder-title mt-3">{folder.name}</p>
                <p className="ds-counter-copy mt-1">{folder.problemCount}개의 항목</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8" data-tour="keywords">
          <SectionHeader
            className="mb-3"
            title="키워드"
            description="저장된 키워드로 질문과 답변을 확인할 수 있습니다."
            action={
              <button
                type="button"
                className="ds-icon-button"
                onClick={openTutorial}
              >
                <Plus className="h-5 w-5" />
              </button>
            }
          />

          <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-1">
            {keywordsQuery.data?.map((keyword) => (
              <Link
                key={keyword.id}
                href={keyword.slug === "all" ? "/" : `/keywords/${keyword.slug}`}
                className={`ds-chip ${keyword.slug === "all" ? "ds-chip-active" : ""}`}
              >
                {keyword.label.ko}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <div className="flex items-center justify-between px-1">
            <p className="ds-meta-title">전체</p>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </section>

        <section className="mt-4">
          {problemsQuery.isLoading ? <LoadingCards /> : null}
          {problemsQuery.isError ? <ErrorState description="문제를 불러오지 못했습니다." /> : null}
          {!problemsQuery.isLoading && !problemsQuery.isError && !problemsQuery.data?.length ? (
            <EmptyState title="조건에 맞는 문제가 없습니다." description="다른 키워드를 선택하거나 새 문제를 등록해 보세요." />
          ) : null}
          {problemsQuery.data?.length ? <MainProblemGrid problems={problemsQuery.data} view={view} /> : null}
        </section>
      </section>

      <Link
        href="/problems/new"
        data-tour="fab"
        className="fixed bottom-24 right-1/2 z-30 flex h-16 w-16 translate-x-[10.75rem] items-center justify-center rounded-full bg-primary text-white shadow-floating"
        aria-label="문제 등록"
      >
        <Plus className="h-7 w-7" />
      </Link>

      <nav className="ds-main-nav fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around px-4 py-3">
        <button type="button" className="ds-nav-muted">✧</button>
        <button type="button" className="ds-nav-muted">⌂</button>
        <button type="button" className="text-primary">☁︎ 클라우드</button>
        <button type="button" className="ds-nav-muted">☰</button>
        <button type="button" className="ds-nav-muted">◌</button>
      </nav>

      <FolderCreateDialog />
      <FeatureHighlightTutorial />
    </main>
  );
}
