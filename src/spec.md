# Specification

## Summary
**Goal:** Build a responsive, single-page Valentine’s Day website with a pastel romantic aesthetic, subtle animations, a gallery, and a surprise reveal (with optional music placeholder).

**Planned changes:**
- Implement one-page layout with 7 sections in order: Hero, Our Story, Why I Love You, Gallery, Love Letter, Special Surprise, Footer.
- Apply consistent pastel pink/red/white/lavender styling, smooth scrolling, gentle hover effects, and lightweight heart-themed animations.
- Hero: exact heading/subheading text, floating-hearts effect, and “Open My Heart 💌” button that scrolls to the next section.
- Our Story: title, provided story text with preserved line breaks, and a responsive timeline/cards for First Meeting, First Memory, and Today.
- Why I Love You: render sample reasons as heart-icon cards and allow adding new reasons via a client-side input + add action.
- Gallery: responsive grid of placeholder images with caption “[ADD OUR PHOTOS HERE]” and subtle hover zoom.
- Love Letter: handwritten-style Google Font for letter content, provided message text, and a floating heart background animation.
- Special Surprise: “Click for a Surprise 💖” button that reveals the hidden message (with editable name) and an optional local-audio placeholder that fails gracefully if missing.
- Footer: exact text “Forever Yours, Bubu 💞” with a small subtle heart animation.
- Centralize all editable content (names, text, timeline entries, reasons, gallery items, surprise message, and music path) into a single frontend constants/config structure.

**User-visible outcome:** Visitors can scroll through a romantic 7-section Valentine’s page with subtle animations, view a placeholder photo gallery, add reasons on the fly, reveal a surprise message, and optionally see a music placeholder ready for a local song file.
