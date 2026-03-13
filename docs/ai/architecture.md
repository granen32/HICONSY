# Architecture

## Current Structure

```txt
src/
  app/
    (mobile)/
      loading.tsx
      page.tsx
      music/
        page.tsx
        keywords/[slug]/page.tsx
        problems/[id]/page.tsx
      folders/
        [id]/
          page.tsx
          keywords/[slug]/page.tsx
          problems/[problemId]/page.tsx
      keywords/[slug]/page.tsx
      problems/
        [id]/page.tsx
        new/page.tsx
    api/
      folders/route.ts
      keywords/route.ts
      problems/route.ts
  atoms/
    ui.atom.ts
  components/
    common/
    ui/
  design-tokens/
    tokens.ts
    semantic.ts
  features/
    folder/
    listing/
    problem-detail/
    problem-registration/
    tutorial/
  hooks/
    listing.queries.ts
    *.controller.ts
  lib/
    api/
    constants/
    mocks/
    query/
    storage/
    logger/
  types/
```

## Layer Responsibilities

### `app`

- 라우트 엔트리
- 서버 prefetch
- `HydrationBoundary` 구성
- feature 페이지 조합

### `features`

- 화면 단위 UI
- 컨텍스트별 page component
- feature 내부 전용 렌더 조각

### `hooks`

- `*.controller.ts`
  - 화면 orchestration
  - router/navigation
  - mutation
  - 파생값
- `listing.queries.ts`
  - query hooks만 제공

### `lib/mocks`

- seed data
- localStorage persistence repository
- 클라이언트와 서버에서 모두 호출 가능한 mock data access

### `components`

- 공통 presentational UI
- provider, toast, typography, loading state, shadcn wrapper

## Rendering Strategy

현재 프로젝트는 `SSR prefetch + CSR hydration` 구조다.

1. App Router server page가 `getQueryClient()` 생성
2. 필요한 folders/keywords/problems/problem 쿼리를 서버에서 prefetch
3. `dehydrate(queryClient)` 결과를 `HydrationBoundary`로 전달
4. 클라이언트 query hook이 같은 key로 hydration 결과를 이어받음
5. 이후 mutation과 localStorage persistence는 CSR에서 처리

## Suspense / Loading Strategy

- 라우트 전환용 `src/app/(mobile)/loading.tsx` 제공
- 공통 skeleton은 `components/common/page-loading.tsx`
- 비핵심 인터랙션 UI는 dynamic import
  - `FeatureHighlightTutorial`
  - `FolderCreateDialog`

## State Separation

### Jotai

- 튜토리얼 open/step
- 메인 listing view mode
- 폴더 생성 다이얼로그 open

### TanStack Query

- folders
- keywords
- problems
- problem detail
- create/delete mutations

## Route Context Model

### Global context

- `/`
- `/keywords/[slug]`
- `/problems/[id]`

### Music folder context

- `/music`
- `/music/keywords/[slug]`
- `/music/problems/[id]`

### Generic folder context

- `/folders/[id]`
- `/folders/[id]/keywords/[slug]`
- `/folders/[id]/problems/[problemId]`

## Data Flow

### Read flow

1. page server component 진입
2. repository prefetch
3. hydration
4. client `useQuery`
5. feature render

### Write flow

1. controller hook에서 mutation 실행
2. repository가 localStorage 갱신
3. query invalidate 또는 remove
4. toast + logger
5. route transition

## Naming Rules In Codebase

- controller hook file: `main-listing.controller.ts`
- query hook file: `listing.queries.ts`
- component file: `problem-registration-form.tsx`
- atom file: `ui.atom.ts`

현재 문서는 이 naming을 기준으로 유지한다.
