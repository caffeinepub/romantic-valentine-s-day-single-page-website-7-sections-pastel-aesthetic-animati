# Specification

## Summary
**Goal:** Let users personalize the page’s text, gallery photos, and background music at runtime, with changes saved locally in the browser.

**Planned changes:**
- Add a “Customize” entry point that opens an in-page panel/modal/drawer for editing content across Hero, Our Story, Reasons, Love Letter, Surprise, and Footer.
- Implement apply/save and “Reset to defaults” (restore original values from `frontend/src/config/valentineContent.ts`).
- Persist customized copy, selected gallery images (as locally stored representations), and selected music in `localStorage`, with safe fallback to defaults if unavailable/cleared.
- Add gallery image replacement via local file pickers with previews, persistence, and graceful fallback to default placeholder on load failure.
- Add background music selection via either configured `valentineContent.surprise.musicPath` or a user-selected local audio file, ensuring playback is user-initiated and providing Play/Pause controls after reveal plus a clear placeholder message when no music is available.

**User-visible outcome:** Users can open a Customize panel to edit all major on-page text, swap gallery photos, and choose background music; their choices persist after refresh and can be reset to the original defaults.
