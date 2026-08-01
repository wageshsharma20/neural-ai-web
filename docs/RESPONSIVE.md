# RESPONSIVE.md

# Responsive Design Guidelines

**Project:** Neural AI Website & Operations Platform  
**Version:** 1.0  
**Status:** Design Specification

---

# 1. Overview

The Neural AI Website and Operations Platform must provide a seamless experience across Desktop, Laptop, Tablet, and Mobile devices.

Responsiveness is a core design requirement, not an afterthought. Every page, component, layout, and interaction should adapt naturally to different screen sizes while preserving usability, accessibility, and visual consistency.

The goal is to create a responsive experience comparable to modern platforms like GitHub, Linear, Notion, Vercel, and Stripe.

---

# 2. Supported Devices

The interface must be optimized for the following screen sizes.

## Mobile

375px – 767px

Examples

- iPhone
- Android Phones

---

## Tablet

768px – 1023px

Examples

- iPad Mini
- iPad Air
- Android Tablets

---

## Laptop

1024px – 1439px

Examples

- MacBook Air
- Windows Laptops

---

## Desktop

1440px+

Examples

- Desktop Monitors
- Large Screens

---

# 3. Grid System

Desktop

- 12 Columns

Laptop

- 12 Columns

Tablet

- 8 Columns

Mobile

- 4 Columns

Use flexible grids and avoid fixed widths wherever possible.

---

# 4. Layout Principles

Every layout should be fluid.

Content should resize rather than overflow.

Avoid horizontal scrolling.

Maintain consistent spacing throughout.

Prefer stacking layouts instead of shrinking content excessively.

---

# 5. Navigation

## Desktop

- Full Navigation Bar
- Full Sidebar (Member Portal)

---

## Tablet

Public Website

- Hamburger Navigation

Member Portal

- Collapsible Sidebar
- Overlay Drawer

---

## Mobile

Public Website

- Hamburger Menu

Member Portal

- Full-screen Navigation Drawer

Navigation should remain accessible with minimal taps.

---

# 6. Typography

Typography should scale proportionally.

## Desktop

Hero

56–72px

Section Heading

36–48px

Subheading

20–24px

Body

16–18px

---

## Tablet

Hero

48–56px

Heading

32–40px

Body

16px

---

## Mobile

Hero

36–42px

Heading

28–32px

Body

16px

Avoid text smaller than 14px.

---

# 7. Spacing System

Use an 8px spacing system.

Examples

8px

16px

24px

32px

48px

64px

96px

Reduce spacing gradually on smaller screens.

Maintain visual rhythm.

---

# 8. Components

All components must be responsive.

Examples

Buttons

Cards

Forms

Dialogs

Drawers

Tables

Charts

Timeline

Gallery

Calendar

Statistics

---

# 9. Cards

Desktop

4–5 cards per row

Laptop

3–4 cards

Tablet

2 cards

Mobile

1 card

Cards should maintain consistent padding and proportions.

---

# 10. Forms

Desktop

Two-column layout where appropriate.

Tablet

Mostly single column.

Mobile

Single-column only.

Inputs should occupy full width.

Buttons should span full width on mobile when appropriate.

---

# 11. Tables

Desktop

Traditional tables.

Tablet

Horizontal scrolling allowed if necessary.

Mobile

Prefer card-based layouts over wide tables.

If tables are required,

allow smooth horizontal scrolling.

---

# 12. Dashboard

## Desktop

Persistent Sidebar

Top Navigation

4–6 KPI Cards

Multiple Chart Columns

---

## Tablet

Collapsible Sidebar

2 KPI Cards per Row

Reduced Chart Width

---

## Mobile

Navigation Drawer

Single Column

Cards stacked vertically

Compact Charts

Simplified Tables

---

# 13. Images

Images should

- Scale responsively
- Maintain aspect ratio
- Avoid stretching
- Use lazy loading (future implementation)

Gallery should automatically adjust columns.

Desktop

4–5 columns

Tablet

2–3 columns

Mobile

1–2 columns

---

# 14. Charts

Charts should

- Resize automatically
- Maintain readability
- Preserve labels
- Avoid clipping

Use simplified charts on mobile if required.

---

# 15. Modals

Desktop

Centered Modal

Tablet

Medium Modal

Mobile

Bottom Sheet or Full-screen Modal

---

# 16. Sidebar

Desktop

Expanded

Tablet

Collapsed

Mobile

Drawer

---

# 17. Touch Targets

Interactive elements should be at least

44 × 44 px

Maintain sufficient spacing between clickable elements.

---

# 18. Animations

Animations should remain smooth across devices.

Avoid heavy effects on smaller devices.

Respect reduced-motion preferences where possible.

---

# 19. Performance

Optimize for

- Fast loading
- Responsive images
- Efficient layouts
- Minimal layout shifts

Avoid unnecessary animations.

---

# 20. Accessibility

Maintain

- Keyboard navigation
- Proper color contrast
- Focus indicators
- Semantic HTML
- Accessible labels
- Responsive zoom support

---

# 21. Responsive Behaviour

## Public Website

Desktop

- Multi-column layouts
- Large Hero
- Rich visuals

Tablet

- Reduced spacing
- Two-column layouts
- Smaller hero

Mobile

- Single-column layouts
- Compact hero
- Collapsible navigation
- Stacked content

---

## Member Portal

Desktop

- Full Sidebar
- Dashboard Grid
- Tables
- Analytics

Tablet

- Collapsible Sidebar
- Compact Dashboard
- Responsive Charts

Mobile

- Drawer Navigation
- Single-column Dashboard
- KPI Cards
- Card-based Tables
- Simplified Analytics

---

# 22. Responsive Checklist

Every page should be tested on

- Desktop
- Laptop
- Tablet
- Mobile

Verify

✓ Navigation

✓ Typography

✓ Images

✓ Forms

✓ Tables

✓ Charts

✓ Buttons

✓ Cards

✓ Sidebar

✓ Footer

✓ Animations

✓ Overflow

✓ Spacing

✓ Accessibility

---

# 23. AI Instructions

When generating layouts:

- Always design Desktop first.
- Create Tablet and Mobile adaptations for every page.
- Never simply scale down the desktop layout.
- Reorganize content based on available space.
- Preserve hierarchy and usability.
- Maintain consistency with the Design System.
- Ensure every component is responsive by default.
- Design with future React implementation in mind.

---

# End of Document