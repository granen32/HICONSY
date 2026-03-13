"use client";

import { ArrowLeft, Folder, Share2, Tag, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { LazyMediaImage } from "@/components/common/lazy-media-image";
import { EmptyState, ErrorState } from "@/components/common/states";
import { SectionHeader, SectionTitle } from "@/components/common/typography";
import { Badge } from "@/components/ui/badge";
import { useProblemDetailController } from "@/hooks/problem-detail.controller";

export function ProblemDetailPage({
  problemId,
  backHref = "/",
  deleteRedirectHref = "/"
}: {
  problemId: string;
  backHref?: string;
  deleteRedirectHref?: string;
}) {
  const { problemQuery, keywordLabels, folderName, onDelete } = useProblemDetailController(
    problemId,
    backHref,
    deleteRedirectHref
  );

  if (problemQuery.isLoading) {
    return <div className="ds-app-surface mx-auto min-h-screen max-w-md px-5 py-6">불러오는 중...</div>;
  }

  if (problemQuery.isError) {
    return (
      <div className="ds-app-surface mx-auto min-h-screen max-w-md px-5 py-6">
        <ErrorState description="문제를 불러오지 못했습니다." />
      </div>
    );
  }

  if (!problemQuery.data) {
    return (
      <div className="ds-app-surface mx-auto min-h-screen max-w-md px-5 py-6">
        <EmptyState title="문제를 찾을 수 없습니다." description="이미 삭제되었거나 존재하지 않는 문제입니다." />
      </div>
    );
  }

  const problem = problemQuery.data;

  return (
    <div className="ds-app-surface mx-auto min-h-screen max-w-md px-4 pb-12 pt-6">
      <header className="flex items-center justify-between">
        <Link href={backHref as Route} aria-label="뒤로가기" className="ds-icon-secondary p-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="w-9" aria-hidden="true" />
      </header>

      <section className="mt-8">
        <SectionHeader
          className="items-start"
          title="문제 상세"
          description="문제 이미지와 메타 정보를 한 화면에서 확인합니다."
          action={
            <button type="button" onClick={onDelete} className="ds-icon-muted p-2" aria-label="문제 삭제">
              <Trash2 className="h-5 w-5" />
            </button>
          }
        />
      </section>

      <section className="ds-radius-2xl mt-6 bg-card p-4 shadow-card">
        <LazyMediaImage
          src={problem.coverImage?.objectUrl ?? "/placeholder-problem.svg"}
          alt={`${problem.title} 대표 이미지`}
          priority
          sizes="(max-width: 768px) 100vw, 420px"
          containerClassName="ds-radius-xl h-64"
        />
        <div className="mt-5">
          <SectionTitle className="text-3xl">{problem.title}</SectionTitle>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {keywordLabels.map((label) => (
              <Badge key={label}>{label}</Badge>
            ))}
            <Badge className="ds-badge-subtle">{folderName}</Badge>
          </div>
        </div>
        <p className="ds-text-secondary mt-4 text-sm leading-7">{problem.body}</p>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <div className="ds-surface-card-strong p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Folder className="h-4 w-4" />
            폴더
          </div>
          <p className="ds-text-secondary mt-3 text-sm">{folderName}</p>
        </div>
        <div className="ds-surface-card-strong p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Tag className="h-4 w-4" />
            과목
          </div>
          <p className="ds-text-secondary mt-3 text-sm">수학</p>
        </div>
      </section>

      <section className="ds-surface-card-strong mt-5 p-5">
        <SectionHeader
          className="items-center"
          title={<span className="text-base font-bold">해설 이미지</span>}
          description={`${problem.solutionImages.length}개`}
        />
        {problem.solutionImages.length ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {problem.solutionImages.map((image) => (
              <LazyMediaImage
                key={image.id}
                src={image.objectUrl}
                alt={image.name}
                sizes="(max-width: 768px) 50vw, 180px"
                containerClassName="ds-radius-lg h-32 w-full"
              />
            ))}
          </div>
        ) : (
          <p className="ds-text-muted mt-3 text-sm">등록된 해설 이미지가 없습니다.</p>
        )}
      </section>

      <section className="ds-surface-card-strong mt-5 p-5">
        <SectionHeader
          className="items-center"
          title={<span className="text-base font-bold">학습 활동</span>}
          action={<Share2 className="ds-icon-muted h-4 w-4" />}
        />
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
          <div className="ds-surface-muted rounded-2xl px-3 py-4">
            <p className="text-xl font-black">21</p>
            <p className="ds-text-muted mt-1">좋아요</p>
          </div>
          <div className="ds-surface-muted rounded-2xl px-3 py-4">
            <p className="text-xl font-black">3</p>
            <p className="ds-text-muted mt-1">댓글</p>
          </div>
          <div className="ds-surface-muted rounded-2xl px-3 py-4">
            <p className="text-xl font-black">1</p>
            <p className="ds-text-muted mt-1">저장</p>
          </div>
        </div>
      </section>
    </div>
  );
}
