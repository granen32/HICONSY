"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useState } from "react";
import { folderDialogOpenAtom } from "@/atoms/ui.atom";
import { useToast } from "@/components/common/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api/client";
import { logEvent } from "@/lib/logger";
import { queryKeys } from "@/lib/query/keys";

const coverOptions = ["coral", "secondary", "warning", "mint", "lilac"] as const;

export function FolderCreateDialog() {
  const [open, setOpen] = useAtom(folderDialogOpenAtom);
  const [name, setName] = useState("");
  const [coverToken, setCoverToken] = useState<(typeof coverOptions)[number]>("coral");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const { push } = useToast();
  const folders = queryClient.getQueryData<{ name: string }[]>(queryKeys.folders) ?? [];

  const mutation = useMutation({
    mutationFn: apiClient.createFolder,
    onSuccess: (folder) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders });
      logEvent("folder_created", { folderId: folder.id });
      push("폴더가 생성되었습니다.");
      setName("");
      setError("");
      setOpen(false);
    }
  });

  if (!open) {
    return null;
  }

  return (
    <div className="ds-surface-overlay fixed inset-0 z-[40] flex items-end">
      <div className="w-full rounded-t-[2rem] bg-card px-5 pb-8 pt-5 shadow-card">
        <div className="ds-border-subtle mx-auto mb-5 h-1.5 w-12 rounded-full border bg-transparent" />
        <div className="flex items-start justify-between">
          <div>
            <p className="text-lg font-bold">폴더 만들기</p>
            <p className="ds-text-muted mt-1 text-sm">
              문제를 분류할 새 컬렉션을 추가합니다.
            </p>
          </div>
          <button className="ds-text-muted text-sm" onClick={() => setOpen(false)}>
            닫기
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">폴더명</label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="예: 6월 모의 오답"
            />
            {error ? <p className="text-sm text-danger">{error}</p> : null}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">커버 스타일</p>
            <div className="flex gap-3">
              {coverOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-label={option}
                  onClick={() => setCoverToken(option)}
                  className={`h-10 w-10 rounded-2xl border-2 ${
                    coverToken === option ? "border-foreground" : "border-transparent"
                  } ${
                    option === "coral"
                      ? "bg-primary"
                      : option === "secondary"
                        ? "bg-secondary"
                        : option === "warning"
                          ? "ds-cover-option-warning"
                        : option === "mint"
                            ? "ds-cover-option-mint"
                            : "ds-cover-option-lilac"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button className="flex-1" variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              const trimmed = name.trim();

              if (!trimmed) {
                setError("폴더 이름을 입력해 주세요.");
                return;
              }

              if (folders.some((folder) => folder.name.trim().toLowerCase() === trimmed.toLowerCase())) {
                setError("같은 이름의 폴더가 이미 있습니다.");
                return;
              }

              mutation.mutate({ name: trimmed, coverToken });
            }}
          >
            생성하기
          </Button>
        </div>
      </div>
    </div>
  );
}
