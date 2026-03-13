# API and Data Layer

## Current Strategy

현재 프로젝트는 "mock repository + route handler + react-query hydration" 조합을 사용한다.

- 서버 page prefetch: `lib/mocks/repository.ts`
- 클라이언트 query/mutation: `lib/api/client.ts`
- 공개 route handler: `app/api/*`

실제 백엔드가 없는 상태에서 SSR과 CSR을 둘 다 지원하기 위해 repository는 서버와 클라이언트에서 모두 호출 가능해야 한다.

## Resources

### Folders

- `GET /api/folders`
- `POST /api/folders`

필드:

- `id`
- `name`
- `coverToken`
- `problemCount`
- `createdAt`

### Keywords

- `GET /api/keywords`

필드:

- `id`
- `slug`
- `label`
- `colorToken`

### Problems

- `GET /api/problems`
- `POST /api/problems`

지원 필터:

- `keyword`
- `folderId`
- `query`

### Problem Detail

- repository level `getProblemById(id)`
- delete mutation `deleteProblem(id)`

## Query Key Rules

현재 key shape:

```ts
queryKeys.problems({
  keyword,
  folderId,
  query,
});
```

`folderId`가 key에 반드시 포함되어야 폴더 컨텍스트 간 캐시 오염이 없다.

## Persistence Rules

- problems, folders는 localStorage에 저장한다.
- keywords는 seed 고정 데이터다.
- 예전 `folder-2` 데이터는 `folder-music`으로 정규화한다.
- 폴더 `problemCount`는 실제 problem 수 기준으로 계산한다.

## Server / Client Contract

### Server

- route page에서 repository를 직접 호출해 prefetch
- `HydrationBoundary`에 dehydrated state 전달

### Client

- query hook은 `apiClient`를 사용
- mutation 성공 후 cache invalidate/remove
- toast와 logger 호출

## Error/Loading Contract

모든 주요 소비 지점은 아래 상태를 가진다.

- loading
- error
- success
- empty

## Current Data Notes

- 기본 seed 문제 수: 20
- 기본 폴더:
  - `folder-music`
  - `folder-1`
  - `folder-3`

## Migration Note

기존 로컬 데이터가 남아 있으면 seed 변경이 바로 보이지 않을 수 있다. 이 경우 repository 정규화가 일부 보정하지만, seed 전체를 다시 보고 싶으면 아래 key를 비워야 한다.

```js
localStorage.removeItem("hiconsy-problems");
localStorage.removeItem("hiconsy-folders");
```
