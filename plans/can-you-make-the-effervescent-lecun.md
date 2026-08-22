# Plan: App Opening Splash Screen Animation

## Context
The user wants an animated splash/intro screen that plays when the app is first opened, giving it a polished "opening video" feel. Currently the app mounts directly to the main UI with no intro. This adds brand presence and a sense of quality on first launch.

## Approach
Create a `SplashScreen` component that renders over the app on mount, plays a short animated sequence (~2s), then fades out and unmounts — revealing the main app underneath.

Mount it in `src/main.tsx` (or `src/App.tsx`) by gating on a `showSplash` state.

## Animation Sequence (~2.2s total)

1. **0–0.3s** — Dark background fades in (already black, so instant)
2. **0.3–0.9s** — DeskKit logo icon scales up from 0.4 → 1 with a bounce (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
3. **0.9–1.4s** — "DeskKit" wordmark fades + slides up into place
4. **1.4–1.7s** — Tagline "Your PDF toolkit" fades in below
5. **1.7–2.1s** — Brief pause, then entire splash fades out to reveal app
6. **2.1s** — Splash unmounted from DOM

All animations via CSS `@keyframes` defined in `src/index.css`, applied with inline `animation` styles in the component.

## Files to modify

- `src/App.tsx` — add `showSplash` state (initialized `true`), render `<SplashScreen onDone={() => setShowSplash(false)} />` conditionally above the main `<div>`
- `src/index.css` — add `@keyframes` for `splashPop`, `splashFadeUp`, `splashFadeIn`, `splashFadeOut`

## SplashScreen Component (inline in App.tsx)

```tsx
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ /* fixed full-screen, z-50, bg #0f0f11, flex center */ animation: "splashFadeOut 0.4s ease 1.8s forwards" }}>
      {/* Logo icon — same SVG used in header */}
      {/* "DeskKit" text */}
      {/* Tagline */}
      {/* Bottom tagline: subtle "by Rohan" credit */}
    </div>
  );
}
```

## Keyframes (src/index.css)

```css
@keyframes splashPop {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes splashFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes splashFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes splashFadeOut {
  from { opacity: 1; }
  to   { opacity: 0; pointer-events: none; }
}
```

## Verification
- Open the app preview — splash screen should play automatically on every page load/refresh
- Verify the main app is visible after ~2.2s with no leftover overlay
- Check that `onDone` fires and `showSplash` flips to `false` so the splash DOM is removed
