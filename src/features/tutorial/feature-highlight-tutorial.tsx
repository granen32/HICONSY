"use client";

import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { tutorialOpenAtom, tutorialStepAtom } from "@/atoms/ui.atom";
import { Button } from "@/components/ui/button";
import { logEvent } from "@/lib/logger";

const steps = [
  {
    target: "[data-tour='folders']",
    title: "폴더 모음",
    description: "기출, 질문답변, 모의고사처럼 컬렉션 단위로 문제를 정리합니다."
  },
  {
    target: "[data-tour='keywords']",
    title: "키워드 필터",
    description: "함수, 통계, 방정식 같은 키워드로 바로 좁혀서 탐색합니다."
  },
  {
    target: "[data-tour='view-controls']",
    title: "탐색 방식 전환",
    description: "그리드와 리스트를 바꿔 모바일에서 더 빨리 훑어볼 수 있습니다."
  },
  {
    target: "[data-tour='fab']",
    title: "문제 등록",
    description: "새 문제를 등록하고 폴더와 키워드까지 한 번에 정리할 수 있습니다."
  }
] as const;

type Rect = { top: number; left: number; width: number; height: number };

export function FeatureHighlightTutorial() {
  const [open, setOpen] = useAtom(tutorialOpenAtom);
  const [step, setStep] = useAtom(tutorialStepAtom);
  const [rect, setRect] = useState<Rect | null>(null);

  const currentStep = steps[step];

  useEffect(() => {
    if (!open) {
      return;
    }

    logEvent("tutorial_started");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const element = document.querySelector(currentStep.target);
    const frame = window.requestAnimationFrame(() => {
      if (!(element instanceof HTMLElement)) {
        setRect(null);
        return;
      }

      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const box = element.getBoundingClientRect();
      setRect({ top: box.top, left: box.left, width: box.width, height: box.height });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentStep.target, open]);

  const bubbleStyle = useMemo(() => {
    if (!rect) {
      return { bottom: 96, left: 20, right: 20 };
    }

    const maxWidth = Math.min(window.innerWidth - 40, 420);
    const centeredLeft = rect.left + rect.width / 2 - maxWidth / 2;

    return {
      top: Math.min(rect.top + rect.height + 18, window.innerHeight - 210),
      left: Math.max(20, Math.min(centeredLeft, window.innerWidth - maxWidth - 20)),
      width: maxWidth
    };
  }, [rect]);

  if (!open) {
    return null;
  }

  return (
    <div className="ds-surface-overlay-strong fixed inset-0 z-[40]">
      {rect ? (
        <div
          className="ds-radius-xl pointer-events-none absolute border-2 border-white/80 shadow-[0_0_0_9999px_rgba(15,18,25,0.58)] transition-all"
          style={{
            top: rect.top - 8,
            left: rect.left - 8,
            width: rect.width + 16,
            height: rect.height + 16
          }}
        />
      ) : null}

      <div
        className="ds-radius-xl absolute bg-card p-5 shadow-card"
        style={bubbleStyle}
      >
        <div className="flex items-center justify-between">
          <p className="ds-tutorial-kicker">
            Tutorial {step + 1}/{steps.length}
          </p>
          <button
            className="ds-text-muted text-sm"
            onClick={() => {
              window.localStorage.setItem("hiconsy-tutorial-seen", "true");
              setOpen(false);
            }}
          >
            Skip
          </button>
        </div>
        <p className="mt-3 text-lg font-bold">{currentStep.title}</p>
        <p className="ds-text-secondary mt-2 text-sm leading-6">
          {currentStep.description}
        </p>
        <div className="mt-5 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
          >
            이전
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              if (step === steps.length - 1) {
                window.localStorage.setItem("hiconsy-tutorial-seen", "true");
                logEvent("tutorial_completed");
                setOpen(false);
                setStep(0);
                return;
              }

              setStep((current) => current + 1);
            }}
          >
            {step === steps.length - 1 ? "완료" : "다음"}
          </Button>
        </div>
      </div>
    </div>
  );
}
