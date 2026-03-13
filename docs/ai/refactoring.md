# Refactoring List

## Current Status

아래 항목은 현재 코드베이스에서 다음 리팩토링 우선순위로 본다. 완료된 항목과 남은 항목을 같이 적는다.

## Completed

- page component에 몰려 있던 로직을 `*.controller.ts`와 `listing.queries.ts`로 분리
- route context를 메인, 뮤직, 일반 폴더로 분리
- 디자인 시스템 타이포/카드/칩 클래스 정리
- 문제등록 이미지 indicator가 실제 이미지 수를 따르도록 수정
- SSR prefetch + CSR hydration 도입
- 튜토리얼/폴더 다이얼로그 dynamic import 적용

## Next Priority

### 1. Repository split

- `lib/mocks/repository.ts`에 seed 정규화, migration, read/write, filtering이 함께 있다.
- 아래로 분리 여지가 있다.
  - seed normalizer
  - persistence adapter
  - read model / query filters

### 2. Context route typing

- 일부 `backHref`는 문자열로 처리 후 `Route` 캐스팅한다.
- context별 route builder 유틸을 만들면 타입 안정성이 올라간다.

### 3. Design token hardening

- 아직 일부 hardcoded visual value가 남아 있을 수 있다.
- spacing/sizing/motion까지 토큰 계층으로 더 밀어넣을 수 있다.

### 4. Problem detail image rendering

- 상세의 해설 이미지 lazy rendering은 들어갔지만 blur placeholder, aspect ratio reserve, error fallback은 더 넣을 수 있다.

### 5. API unification

- route handler와 repository가 둘 다 존재한다.
- 실제 소비 경로를 하나로 수렴하거나 역할을 더 명확히 문서화할 수 있다.

## Refactoring Rules

- 동작을 바꾸는 리팩토링과 구조 리팩토링을 한 PR/턴에서 섞지 않는다.
- query key shape를 건드리면 hydration page도 같이 수정한다.
- seed 구조를 바꾸면 repository test와 docs를 같이 수정한다.
