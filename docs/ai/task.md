# Task Snapshot

## Goal

현재 HICONSY 프로젝트는 모바일 WebView 우선의 문제 탐색/등록 서비스를 `Next.js App Router` 기반으로 구현한 상태다. 이 문서는 "새로 구현할 것"이 아니라 "현재 코드베이스가 무엇을 포함하고 어떤 기준으로 유지보수해야 하는지"를 Cursor가 빠르게 파악하도록 정리한 운영 문서다.

## Current Scope

- 메인 리스팅: `/`
- 메인 키워드 피드: `/keywords/[slug]`
- 메인 문제 상세: `/problems/[id]`
- 기본 폴더 컨텍스트 `뮤직`: `/music`
- 뮤직 키워드 피드: `/music/keywords/[slug]`
- 뮤직 문제 상세: `/music/problems/[id]`
- 일반 폴더 컨텍스트: `/folders/[id]`
- 일반 폴더 키워드 피드: `/folders/[id]/keywords/[slug]`
- 일반 폴더 문제 상세: `/folders/[id]/problems/[problemId]`
- 문제 등록: `/problems/new`

## Current Product Rules

- 기본 홈은 전체 문제 데이터를 보여준다.
- 시드 문제는 총 20개다.
- 폴더는 `뮤직`, `기출`, `6월 모의`를 기본 제공한다.
- 폴더 진입 시 해당 `folderId`에 속한 문제만 조회한다.
- 키워드 피드는 컨텍스트별로 분리된다.
  - 메인: 전역 문제 대상
  - 뮤직: `folder-music` 대상
  - 일반 폴더: 해당 폴더 대상
- 등록 이미지는 실제 업로드가 아니라 `objectUrl` preview로만 관리한다.

## Runtime Strategy

- 첫 화면은 서버에서 `react-query` prefetch 후 `HydrationBoundary`로 내려준다.
- 클라이언트에서는 동일 query key로 hydration 이후 CSR 캐시를 이어받는다.
- mutation, localStorage persistence, tutorial state는 클라이언트에서 처리한다.
- 비핵심 인터랙션 UI는 dynamic import로 분리한다.
  - 폴더 생성 다이얼로그
  - feature highlight 튜토리얼

## Required Stack

- `Next.js` App Router
- `TypeScript`
- `Tailwind CSS`
- `shadcn/ui`
- `@tanstack/react-query`
- `jotai`
- `react-hook-form`
- `zod`
- `lucide-react`
- `Vitest`

## Current Quality Bar

- 서버 렌더와 클라이언트 캐시가 충돌하지 않아야 한다.
- 폴더/키워드/문제 탐색 흐름이 URL 기반으로 유지되어야 한다.
- 로딩, 에러, empty state가 각 주요 화면에 있어야 한다.
- 디자인 시스템 클래스와 토큰 계층을 우선 사용해야 한다.
- 비즈니스 로직은 페이지 컴포넌트보다 controller/query 훅에 둔다.

## Documentation Contract

- `docs/ai/task.md`
  - 현재 범위와 운영 기준
- `docs/ai/prd.md`
  - 현재 사용자 흐름과 제품 규칙
- `docs/ai/architecture.md`
  - 실제 폴더 구조, 데이터 흐름, 렌더링 전략
- `docs/ai/coding.md`
  - 현재 코드 스타일과 유지보수 규칙
- `docs/ai/api.md`
  - mock repository, route handler, query contract
- `docs/ai/refactoring.md`
  - 다음 리팩토링 우선순위

## When Editing

- 문서를 기준으로 현재 구조를 존중한다.
- 새 기능을 넣을 때는 메인 컨텍스트와 폴더 컨텍스트를 분리해서 생각한다.
- 라우트, query key, seed, docs 중 하나를 바꾸면 나머지도 같이 맞춘다.
