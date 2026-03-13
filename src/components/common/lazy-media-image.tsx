"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

type LazyMediaImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  containerClassName?: string;
  imageClassName?: string;
};

export function LazyMediaImage({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  unoptimized,
  containerClassName,
  imageClassName
}: LazyMediaImageProps) {
  const [visible, setVisible] = useState(priority);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isObjectUrl = src.startsWith("blob:");

  useEffect(() => {
    if (priority || visible) {
      return;
    }

    const node = containerRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "160px"
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [priority, visible]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", containerClassName)}>
      {visible ? (
        isObjectUrl ? (
          <img src={src} alt={alt} className={cn("h-full w-full object-cover", imageClassName)} loading="lazy" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized={unoptimized}
            className={cn("object-cover", imageClassName)}
          />
        )
      ) : (
        <div className="ds-surface-muted h-full w-full animate-pulse" aria-hidden="true" />
      )}
    </div>
  );
}
