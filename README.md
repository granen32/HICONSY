# 과제

모바일 WebView 환경을 우선으로 설계한 문제 리스팅, 상세 조회, 검색, 등록, 삭제 서비스 과제 구현이다. 제공된 시안을 기반으로 `Next.js` App Router, `TanStack Query`, `Jotai`, `Tailwind CSS`, `shadcn/ui` 스타일 패턴을 사용해 구조 중심으로 작성했다.

## Submission Notes

- 제출 시 `node_modules`, `.next`는 제외한다.
- 실행에 필요한 파일은 소스, `package.json`, `package-lock.json`, 설정 파일, `README.md`, `docs/ai` 문서 세트다.
- 로컬에 이전 mock 데이터가 남아 있으면 최신 seed가 바로 보이지 않을 수 있다.

## Stack

- `Next.js` App Router + `TypeScript`
- `TanStack Query` for server-like state
- `Jotai` for global UI state
- `Tailwind CSS`
- `shadcn/ui` style primitives
- `react-hook-form` + `zod`
- `Vitest`

## Why This Structure

- `Next.js`: WebView 친화적인 라우팅과 서버/클라이언트 경계 제어가 쉽다.
- `TanStack Query`: mock API여도 실제 API처럼 query/mutation 흐름을 유지할 수 있다.
- `Jotai`: 튜토리얼, 뷰 모드, 다이얼로그 같은 UI 상태를 가볍게 분리할 수 있다.
- `Tailwind` + `shadcn/ui` 패턴: 속도와 일관성을 유지하면서 모바일 시안 밀도에 맞춘 커스텀 UI를 만들기 좋다.

## Key Decisions

- 백엔드는 만들지 않고 `src/lib/mocks/repository.ts`에서 async mock repository를 제공했다.
- 새로고침 후에도 폴더/문제 데이터가 유지되도록 `localStorage` persistence를 적용했다.
- 메인, 뮤직, 일반 폴더 컨텍스트를 분리해 라우트와 뒤로가기를 유지했다.
- 최초 방문자는 feature highlight tutorial을 본 뒤 localStorage로 완료 여부를 저장한다.
- 실제 이미지 업로드는 하지 않고 `objectUrl` preview만 관리한다.
- 문제 카드를 누르면 상세 페이지로 이동하고, 상세 페이지에서 삭제할 수 있다.
- App Router server page에서 prefetch 후 `HydrationBoundary`로 CSR query cache를 이어받도록 구성했다.
- 튜토리얼과 폴더 생성 다이얼로그는 dynamic import로 분리했다.
- 문제/해설/preview 이미지는 `next/image` + intersection 기반 lazy loading 계층으로 정리했다.

## Design Tokens

토큰은 `src/design-tokens`에 분리했다.

- raw tokens: 기본 색상, spacing, radius, shadow
- semantic tokens: `surface`, `text`, `accent`, `feedback`
- `globals.css`와 Tailwind theme extension으로 연결

컴포넌트는 hex 값 대신 token 기반 변수 또는 semantic class를 사용하도록 설계했다.

## State Separation

- `TanStack Query`
  - folders
  - keywords
  - problems
  - problem detail
  - create folder mutation
  - create problem mutation
  - delete problem mutation

- `Jotai`
  - tutorial open / current step
  - main listing view mode
  - folder create dialog state

## WebView Strategy

- 모바일 한 손 조작에 맞는 max-width shell 적용
- 과도한 모달 깊이 대신 sheet 중심 UX 사용
- 튜토리얼 overlay와 selector는 필요할 때만 mount
- objectUrl revoke 처리로 preview 메모리 누수 최소화
- route loading 화면과 skeleton을 함께 제공
- 첫 화면은 SSR prefetch, 이후 상호작용은 CSR query로 이어받는 구조 유지

## Assumptions

- 과목은 현재 `math` 고정으로 두고 UI만 노출했다.
- 키워드는 등록에서 다중 선택 가능 구조를 유지하고, 리스팅은 단일 필터 흐름으로 구현했다.
- mock API route는 seed 응답 예시를 제공하고, 실제 persistence는 client repository가 담당한다.
- 기본 seed 문제는 총 20개이며 폴더는 `뮤직`, `기출`, `6월 모의`를 제공한다.

## Route Structure

- `/`: 전체 문제 리스팅
- `/keywords/[slug]`: 메인 키워드 피드
- `/problems/[id]`: 메인 문제 상세
- `/music`: 뮤직 폴더 리스팅
- `/music/keywords/[slug]`: 뮤직 키워드 피드
- `/music/problems/[id]`: 뮤직 문제 상세
- `/folders/[id]`: 일반 폴더 리스팅
- `/folders/[id]/keywords/[slug]`: 일반 폴더 키워드 피드
- `/folders/[id]/problems/[problemId]`: 일반 폴더 문제 상세
- `/problems/new`: 문제 등록

## Run

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속한다.

## Verify

```bash
npm run lint
npm run test
npm run build
```

## Reset Mock Data

브라우저 개발자 도구 콘솔에서 아래를 실행하면 localStorage 기반 mock 데이터를 초기화할 수 있다.

```js
localStorage.removeItem("hiconsy-problems");
localStorage.removeItem("hiconsy-folders");
localStorage.removeItem("hiconsy-tutorial-seen");
```

## Known Limitations

- shadcn/ui full generator를 사용한 것은 아니고, 동일한 패턴의 lightweight primitives를 직접 구성했다.
- 검색은 제목/본문 substring 기준의 로컬 필터다.
- 실제 backend, auth, analytics SDK는 연결하지 않았다.
- folder repository 내부에 정규화, migration, filtering 책임이 함께 있다.

## Next Steps

- repository 계층 세분화
- route builder 유틸 도입
- 실제 API 연동
- WebView bridge 이벤트 연동
- 이미지 reorder 및 삭제 UX 보강

## Submission Checklist

- `npm install` 후 `npm run lint`, `npm run test`, `npm run build`가 통과하는지 확인한다.
- `node_modules`, `.next`가 제출물에 포함되지 않았는지 확인한다.
- `README.md`만 읽고 실행 가능한지 확인한다.
- `docs/ai` 문서가 현재 라우트/구조와 일치하는지 확인한다.
- 브라우저 localStorage를 초기화한 뒤 기본 seed 20개와 폴더 3개가 정상 노출되는지 확인한다.
