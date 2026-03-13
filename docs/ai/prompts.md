# Cursor Prompts

## Base Prompt

```txt
Read docs/ai/task.md, prd.md, architecture.md, coding.md, api.md, and refactoring.md first.

Treat the current codebase as the source of truth.
Do not re-scaffold the app.
Extend or refactor the existing HICONSY implementation in place.

Important constraints:
- Preserve route context separation between global, music, and generic folder flows.
- Preserve SSR prefetch + CSR hydration with TanStack Query.
- Keep Jotai for UI state only.
- Keep objectUrl-only image preview for registration.
- Prefer DS classes and token-driven styling.
- Update docs/ai when architecture changes.
```

## Refactor Prompt

```txt
Refactor the existing implementation without changing product behavior.

Rules:
- Keep route contracts stable unless explicitly asked.
- Move orchestration into *.controller.ts hooks.
- Keep server data access and client query keys aligned.
- If a route or query key changes, update docs/ai in the same change.
- Preserve localStorage compatibility or add a migration path.
```

## Performance Prompt

```txt
Improve perceived performance in the current project.

Focus on:
- SSR prefetch via react-query hydration
- route loading states
- dynamic import for non-critical client UI
- avoiding unnecessary client boundaries
- keeping WebView bundle weight in check
```

## Folder Context Prompt

```txt
Implement features with folder context awareness.

Contexts:
- global
- music
- generic folder

For any new list, keyword feed, or problem detail flow, make sure the back navigation, query filters, and detail routes preserve the current context.
```
