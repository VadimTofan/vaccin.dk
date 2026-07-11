# Navbar Services Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the bulky Services control with an accessible, compact,
visually refined dropdown that works on desktop and mobile.

**Architecture:** Keep dropdown state inside the existing `Navigation` client
component. Add semantic trigger attributes, Escape and outside-click handling,
and state-based class hooks; keep all visual changes in its SCSS module.

**Tech Stack:** Next.js App Router, React, TypeScript, SCSS modules, Node test
runner.

---

### Task 1: Dropdown regression test

**Files:**
- Create: `frontend/app/shared/navbar/components/navigation/navigation.test.mjs`
- Test: `frontend/app/shared/navbar/components/navigation/navigation.test.mjs`

- [ ] **Step 1: Write the failing source regression test**

Read `navigation.tsx` and `page.module.scss`, then assert that the trigger has
`aria-expanded`, `aria-controls`, and a dedicated trigger class; assert that
the dropdown has an ID and refined panel/link class hooks.

- [ ] **Step 2: Run the focused test and verify RED**

Run:
`node --test app/shared/navbar/components/navigation/navigation.test.mjs`

Expected: FAIL because the semantic attributes and refined class hooks do not
exist yet.

### Task 2: Accessible dropdown behavior

**Files:**
- Modify: `frontend/app/shared/navbar/components/navigation/navigation.tsx`
- Test: `frontend/app/shared/navbar/components/navigation/navigation.test.mjs`

- [ ] **Step 1: Implement the minimum behavior**

Add a dropdown container ref, semantic button attributes, an ID on the menu,
Escape handling, and outside-click closing. Preserve route data, localization,
resize handling, and link-close behavior.

- [ ] **Step 2: Run the focused test and verify GREEN**

Run:
`node --test app/shared/navbar/components/navigation/navigation.test.mjs`

Expected: PASS with one passing test and zero failures.

### Task 3: Refined dropdown styling

**Files:**
- Modify: `frontend/app/shared/navbar/components/navigation/page.module.scss`
- Test: `frontend/app/shared/navbar/components/navigation/navigation.test.mjs`

- [ ] **Step 1: Implement the approved visual direction**

Style the trigger like a standard nav label, rotate its chevron when expanded,
and render a compact dark-teal dropdown panel with subtle border, restrained
depth, clear focus states, directional link cues, and adjacent responsive
rules. Use project tokens, rem units, class selectors, and reduced-motion-safe
transitions.

- [ ] **Step 2: Run focused and project verification**

Run:

```powershell
node --test app/shared/navbar/components/navigation/navigation.test.mjs
node --test app/page.test.mjs app/home-redesign.test.mjs app/full-redesign.test.mjs app/refero-redesign.test.mjs
npm.cmd run lint
npx.cmd stylelint "**/*.scss"
npm.cmd run build
```

Expected: all tests pass, lint and Stylelint return zero errors, and the Next.js
production build exits successfully.
