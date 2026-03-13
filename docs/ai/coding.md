# Coding Guidelines

## General

- `TypeScript` strict 전제를 유지한다.
- 비즈니스 로직을 page component에 몰아넣지 않는다.
- 현재 구조에서는 controller/query hook 분리를 기본으로 본다.
- 문서와 코드가 충돌하면 실제 코드 구조를 먼저 확인하고 문서를 같이 갱신한다.

## File Naming

- controller hook: `*.controller.ts`
- query hook: `*.queries.ts`
- component: `kebab-case.tsx`
- atom: `*.atom.ts`
- test: `*.test.ts`

예시:

- `main-listing.controller.ts`
- `listing.queries.ts`
- `problem-detail-page.tsx`

## React / Next.js

- App Router server page에서 가능한 한 prefetch를 먼저 한다.
- client component는 상호작용이 필요한 부분에만 둔다.
- heavy interactive overlay는 dynamic import로 분리한다.
- route context를 props로 명시적으로 전달한다.

## React Query

- 모든 query key는 `lib/query/keys.ts`를 사용한다.
- 서버 prefetch와 클라이언트 query key가 동일해야 한다.
- mutation 후 invalidate/remove 전략을 명시한다.

## Jotai

- UI state만 저장한다.
- query result를 atom에 복제하지 않는다.

## Styling

- 디자인 토큰 및 DS 클래스를 우선 사용한다.
- 새 스타일 추가 시 아래 순서를 따른다.
  1. `design-tokens`
  2. `globals.css` DS class
  3. 마지막 수단으로 Tailwind utility
- `text-[...]`, `rounded-[...]`, `bg-[#...]` 같은 임의값은 최소화한다.
- 이미 DS class가 있으면 새 utility를 만들지 않는다.

## Loading / Performance

- 라우트 전환 로딩은 `app/(mobile)/loading.tsx`를 유지한다.
- 첫 화면에 필요 없는 모달/튜토리얼은 dynamic import한다.
- list/grid/keyword feed는 skeleton과 empty state를 함께 제공한다.
- WebView 기준으로 불필요한 dependency를 늘리지 않는다.

## Forms

- `react-hook-form + zod`
- objectUrl 생성 시 revoke 처리
- preview count와 indicator count는 실제 이미지 수와 일치해야 한다.

## Testing

- repository filtering과 persistence
- registration schema
- tutorial persistence

새 기능이 아래를 바꾸면 테스트를 같이 건드린다.

- folder filtering
- keyword filtering
- route context behavior
- create/delete mutation

## Documentation Rule

- 구조를 바꾸면 `docs/ai/*.md`도 같은 턴에서 같이 수정한다.
- 특히 다음 변경은 문서 업데이트가 필수다.
  - route 추가/삭제
  - hook naming 변경
  - rendering strategy 변경
  - seed/product rule 변경
