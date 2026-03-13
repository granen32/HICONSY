import Link from "next/link";
import type { Route } from "next";
import { Grid2x2, Heart, List, MessageSquare, MoreHorizontal, Send } from "lucide-react";
import { LazyMediaImage } from "@/components/common/lazy-media-image";
import { Badge } from "@/components/ui/badge";
import type { Keyword, Problem } from "@/types/problem";

export function keywordTone(slug: string) {
  if (slug === "equations") return "ds-keyword-badge-equations";
  if (slug === "statistics") return "ds-keyword-badge-statistics";
  if (slug === "functions") return "ds-keyword-badge-functions";
  if (slug === "integration") return "ds-keyword-badge-integration";
  return "ds-keyword-badge-default";
}

export function folderTone(coverToken: string) {
  if (coverToken === "coral") return "ds-folder-cover-coral";
  if (coverToken === "secondary") return "ds-folder-cover-secondary";
  if (coverToken === "warning") return "ds-folder-cover-warning";
  if (coverToken === "mint") return "ds-folder-cover-mint";
  return "ds-folder-cover-lilac";
}

export function MainProblemGrid({
  problems,
  view,
  problemHrefBase = "/problems"
}: {
  problems: Problem[];
  view: "grid" | "list";
  problemHrefBase?: string;
}) {
  return (
    <div className={view === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
      {problems.map((problem) => {
        const href = `${problemHrefBase}/${problem.id}` as Route;

        return (
          <Link
            key={problem.id}
            href={href}
            className={`ds-surface-card block overflow-hidden ${
              view === "list" ? "p-3" : ""
            }`}
          >
            <LazyMediaImage
              src={problem.coverImage?.objectUrl ?? "/placeholder-problem.svg"}
              alt={`${problem.title} 문제 미리보기`}
              sizes={view === "grid" ? "(max-width: 768px) 50vw, 240px" : "(max-width: 768px) 100vw, 420px"}
              containerClassName={view === "grid" ? "aspect-[0.9/1] w-full" : "ds-thumbnail-frame h-44 w-full"}
            />
            {view === "list" ? (
              <>
                <p className="ds-feed-title mt-3">
                  {problem.title}
                </p>
                <p className="ds-text-secondary mt-2 line-clamp-3 text-sm leading-6">{problem.body}</p>
              </>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export function MusicProblemGrid({
  problems,
  problemHrefBase = "/music/problems"
}: {
  problems: Problem[];
  problemHrefBase?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {problems.map((problem) => {
        const href = `${problemHrefBase}/${problem.id}` as Route;

        return (
          <Link
            key={problem.id}
            href={href}
            className="ds-surface-card block overflow-hidden"
          >
            <LazyMediaImage
              src={problem.coverImage?.objectUrl ?? "/placeholder-problem.svg"}
              alt={`${problem.title} 문제 미리보기`}
              sizes="(max-width: 768px) 50vw, 240px"
              containerClassName="aspect-[0.9/1] w-full"
            />
          </Link>
        );
      })}
    </div>
  );
}

export function KeywordFeed({
  problems,
  keywords,
  problemHrefBuilder
}: {
  problems: Problem[];
  keywords: Keyword[];
  problemHrefBuilder?: (problemId: string) => string;
}) {
  return (
    <div className="mt-5 space-y-5">
      {problems.map((problem) => {
        const images = [problem.coverImage, ...problem.solutionImages].filter(Boolean) as NonNullable<
          typeof problem.coverImage
        >[];

        return (
          <article key={problem.id} className="space-y-3">
            <div className="flex items-start justify-between px-1">
              <div className="flex items-start gap-2">
                <div className="ds-avatar-warm h-9 w-9 rounded-full" />
                <div>
                  <Badge className="ds-badge-alert">AI답변</Badge>
                  <p className="ds-text-muted mt-1 text-sm">3일전</p>
                </div>
              </div>
              <MoreHorizontal className="ds-icon-muted mt-1 h-4 w-4" />
            </div>

            <div className="overflow-x-auto">
              <div className={`flex gap-3 ${images.length > 1 ? "snap-x snap-mandatory" : ""}`}>
                {images.map((image) => {
                  const href = (problemHrefBuilder ? problemHrefBuilder(problem.id) : `/problems/${problem.id}`) as Route;

                  return (
                    <Link
                      key={image.id}
                      href={href}
                      className={`ds-surface-card-strong block overflow-hidden ${
                        images.length > 1
                          ? "w-[calc(100%-0.75rem)] min-w-[calc(100%-0.75rem)] snap-center"
                          : "w-full"
                      }`}
                    >
                      <LazyMediaImage
                        src={image.objectUrl}
                        alt={image.name}
                        sizes="(max-width: 768px) 100vw, 420px"
                        containerClassName="aspect-[0.9/1] w-full"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {images.length > 1 ? (
              <div className="flex justify-center gap-1.5">
                {images.map((image, index) => (
                  <span
                    key={image.id}
                    className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "ds-dot-active" : "ds-dot-inactive"}`}
                  />
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              {problem.keywordIds.map((slug) => (
                <Badge key={slug} className={keywordTone(slug)}>
                  {keywords.find((keyword) => keyword.slug === slug)?.label.ko}
                </Badge>
              ))}
              <Badge className="ds-badge-subtle">부등식</Badge>
            </div>

            <div className="ds-text-secondary flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                21 좋아요
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" />
                댓글
              </span>
              <span className="flex items-center gap-1.5">
                <Send className="h-4 w-4" />
                공유
              </span>
            </div>

            <p className="ds-feed-copy">
              불타는 일개미 저도 이번 문제를 통해 그 방법을 알게되었어요. 이제 로그함수 미분이 좀 더
              친숙하게 느껴져요.
            </p>
          </article>
        );
      })}
    </div>
  );
}

export function ViewToggle({
  view,
  onChange
}: {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}) {
  return (
    <div className="ds-segmented" data-tour="view-controls">
      <button
        type="button"
        aria-label="리스트 보기"
        onClick={() => onChange("list")}
        className={`ds-segmented-item ${view === "list" ? "ds-segmented-item-active" : ""}`}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="그리드 보기"
        onClick={() => onChange("grid")}
        className={`ds-segmented-item ${view === "grid" ? "ds-segmented-item-active" : ""}`}
      >
        <Grid2x2 className="h-4 w-4" />
      </button>
    </div>
  );
}
