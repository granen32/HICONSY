"use client";

import {
  ArrowLeft,
  BookText,
  FolderOpen,
  ImagePlus,
  MoreHorizontal,
  PlusCircle,
  Search,
  Tag
} from "lucide-react";
import Link from "next/link";
import { LazyMediaImage } from "@/components/common/lazy-media-image";
import { ScreenTitle } from "@/components/common/typography";
import { Textarea } from "@/components/ui/textarea";
import { useProblemRegistrationController } from "@/hooks/problem-registration.controller";

const keywordColors: Record<string, string> = {
  equations: "ds-keyword-tone-equations",
  functions: "ds-keyword-tone-functions",
  statistics: "ds-keyword-tone-statistics",
  integration: "ds-keyword-tone-integration"
};

export function ProblemRegistrationForm() {
  const {
    form,
    foldersQuery,
    solutionImages,
    keywordPanelOpen,
    keywordSearch,
    coverInputRef,
    solutionInputRef,
    selectedKeywords,
    body,
    previewCards,
    selectedKeywordLabel,
    filteredKeywords,
    setKeywordPanelOpen,
    setKeywordSearch,
    openCoverPicker,
    openSolutionPicker,
    onCoverChange,
    onSolutionChange,
    onSubmit
  } = useProblemRegistrationController();

  return (
    <div className="ds-app-surface mx-auto min-h-screen max-w-md px-4 pb-12 pt-5">
      <header className="flex items-center justify-between px-1">
        <Link href="/" aria-label="뒤로가기" className="ds-icon-secondary p-2">
          <ArrowLeft className="h-5 w-5" strokeWidth={2.25} />
        </Link>
        <ScreenTitle>문제등록</ScreenTitle>
        <button
          type="button"
          onClick={onSubmit}
          className="ds-action-text p-2"
        >
          완료
        </button>
      </header>

      <form className="mt-4">
        {!previewCards.length ? (
          <button
            type="button"
            onClick={openCoverPicker}
            className="ds-radius-md ds-surface-placeholder mx-auto flex h-[14.7rem] w-[12.6rem] items-center justify-center"
          >
            <ImagePlus className="ds-icon-strong h-7 w-7" strokeWidth={2} />
          </button>
        ) : (
          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex gap-3">
              {previewCards.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => (image.kind === "cover" ? openCoverPicker() : openSolutionPicker())}
                  className={`ds-radius-md ds-surface-placeholder-strong relative shrink-0 overflow-hidden ${
                    index === 0 ? "h-[10.7rem] w-[12.5rem]" : "h-[10.7rem] w-[7rem]"
                  }`}
                >
                  <LazyMediaImage
                    src={image.objectUrl}
                    alt={image.name}
                    sizes={index === 0 ? "(max-width: 768px) 60vw, 240px" : "(max-width: 768px) 35vw, 140px"}
                    containerClassName="h-full w-full"
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 shadow-sm">
                    <ImagePlus className="ds-icon-accent h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
            {previewCards.length > 1 ? (
              <div className="mt-3 flex justify-center gap-1.5">
                {previewCards.map((image, index) => (
                  <span
                    key={image.id}
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === 0 ? "ds-dot-active" : "ds-dot-inactive"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onCoverChange(event.target.files?.[0])}
        />

        <div className="mt-5 px-2">
          <input
            {...form.register("title")}
            placeholder="제목없음"
            className="ds-form-title ds-placeholder-primary w-full border-0 bg-transparent p-0 outline-none"
          />
          {form.formState.errors.title ? (
            <p className="mt-2 text-sm text-danger">{form.formState.errors.title.message}</p>
          ) : null}

          <div className="mt-5 space-y-4">
              <button
                type="button"
                onClick={() => setKeywordPanelOpen(true)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="ds-field-label flex items-center gap-2">
                <Tag className="h-4 w-4" />
                키워드
              </span>
              <span className="ds-field-value max-w-[11.5rem] truncate">
                {selectedKeywordLabel || "비어있음"}
              </span>
            </button>

            <div className="flex w-full items-center justify-between text-left">
              <span className="ds-field-label flex items-center gap-2">
                <BookText className="h-4 w-4" />
                과목
              </span>
              <span className="ds-field-value">비어있음</span>
            </div>

            <label className="flex w-full items-center justify-between text-left">
              <span className="ds-field-label flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                폴더
              </span>
              <select
                className="ds-field-value max-w-[11.5rem] appearance-none border-0 bg-transparent p-0 text-right outline-none"
                {...form.register("folderId")}
              >
                <option value="">비어있음</option>
                {foldersQuery.data?.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={openSolutionPicker}
                className="ds-field-label flex items-center gap-2"
              >
                <ImagePlus className="h-4 w-4" />
                해설추가
              </button>
              <button
                type="button"
                onClick={openSolutionPicker}
                className="ds-action-inline flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4 fill-[#222] text-white" />
                추가
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={openSolutionPicker}
            className={`ds-radius-md ds-upload-dropzone relative mt-5 flex h-[6.8rem] w-full items-center justify-center border text-center ${
              solutionImages.length
                ? "ds-upload-dropzone-active"
                : "ds-upload-dropzone-idle"
            }`}
          >
            {solutionImages.length ? (
              <span className="absolute right-4 top-[-0.9rem] rounded-xl bg-white p-2 shadow-card">
                <ImagePlus className="ds-icon-accent h-5 w-5" />
              </span>
            ) : null}
            원하는 이미지를 업로드하거나
            <br />
            드래그 해주세요.
          </button>
          <input
            ref={solutionInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => onSolutionChange(Array.from(event.target.files ?? []))}
          />

          {body ? (
            <p className="ds-body-strong mt-5">{body}</p>
          ) : null}

          <div className="mt-4">
            <Textarea
              placeholder="내용을 입력해주세요."
              className="ds-body-copy ds-placeholder-subtle min-h-20 rounded-none border-0 bg-transparent px-0 py-0 shadow-none"
              {...form.register("body")}
            />
          </div>
          {form.formState.errors.body ? (
            <p className="mt-2 text-sm text-danger">{form.formState.errors.body.message}</p>
          ) : null}
        </div>
      </form>

      {keywordPanelOpen ? (
        <div className="ds-app-surface fixed inset-0 z-[40] px-4 pb-8 pt-5">
          <header className="flex items-center justify-between px-1">
            <button type="button" onClick={() => setKeywordPanelOpen(false)} className="ds-icon-secondary p-2">
              <ArrowLeft className="h-5 w-5" strokeWidth={2.25} />
            </button>
            <ScreenTitle>문제등록</ScreenTitle>
            <button type="button" onClick={() => setKeywordPanelOpen(false)} className="ds-action-text p-2">
              완료
            </button>
          </header>

          <div className="ds-radius-md ds-surface-soft mt-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                value={keywordSearch}
                onChange={(event) => setKeywordSearch(event.target.value)}
                placeholder="키워드 검색"
                className="ds-placeholder-muted w-full border-0 bg-transparent p-0 text-base outline-none"
              />
              <Search className="ds-icon-secondary h-6 w-6" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="ds-panel-title">키워드 선택</p>
            <button type="button" className="ds-action-inline flex items-center gap-1">
              <PlusCircle className="h-4 w-4 fill-[#222] text-white" />
              추가
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {filteredKeywords.map((keyword) => {
              const active = selectedKeywords.includes(keyword.slug);

              return (
                <button
                  key={keyword.id}
                  type="button"
                  onClick={() => {
                    const next = active
                      ? selectedKeywords.filter((current) => current !== keyword.slug)
                      : [...selectedKeywords, keyword.slug];
                    form.setValue("keywordIds", next, { shouldValidate: true });
                  }}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span
                    className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                      keywordColors[keyword.slug] ?? "ds-keyword-tone-default"
                    }`}
                  >
                    {keyword.label.ko}
                  </span>
                  <span className="flex items-center gap-2">
                    {active ? <span className="ds-action-text text-sm">선택됨</span> : null}
                    <MoreHorizontal className="ds-icon-secondary h-5 w-5" />
                  </span>
                </button>
              );
            })}
          </div>

          {form.formState.errors.keywordIds ? (
            <p className="mt-4 text-sm text-danger">{form.formState.errors.keywordIds.message}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
