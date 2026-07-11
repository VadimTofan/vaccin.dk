# Site-Wide Editorial Redesign

## Goal

Bring every public route and shared system state into the same editorial-clinical
design language as the redesigned landing page while preserving application
content, localization, navigation, forms, and data behavior.

## Scope

The redesign covers:

- About Us
- Advice
- FAQ
- Destination and country map
- Vaccines
- Contact
- Company Agreements
- Narco Test
- Country detail routes
- Loading, error, and not-found states

The landing page, navbar, contact strip, and footer remain the visual reference.
They may receive only narrowly required consistency adjustments.

## Visual Direction

Use a dark editorial-clinical system with open composition rather than a grid of
rounded cards. Pages should feel precise, calm, and medically credible.

Core principles:

- Use `$text-ink` for primary text on dark surfaces.
- Use `$text-light` or `$text-muted` only for supporting copy that still meets
  readable contrast.
- Do not use `$secondary` or `$text-inverse` for text on dark surfaces.
- Replace repeated card containers with ruled sections, columns, dividers,
  background shifts, and whitespace.
- Reserve rounded corners for controls or elements whose interaction benefits
  from the shape.
- Use the landing page's large heading scale, compact uppercase labels, sharp
  borders, and asymmetric spacing rhythm.
- Keep content width and gutters aligned with `--clinic-page-max` and
  `--clinic-page-gutter`.

## Page Structure

Each route receives:

1. A strong introductory region with a compact label, clear heading, and concise
   supporting copy.
2. Open content sections separated by rules or controlled background changes.
3. A route-appropriate information structure instead of a universal card grid.
4. A clear final action or informational close when the existing content
   supports one.

Page-specific patterns:

- About, Advice, and FAQ use editorial text columns and ruled topic rows.
- Destination uses an open map workspace and a clearly separated selection
  area.
- Vaccines uses readable table/list structures with sharp grouping and clear
  row hierarchy.
- Contact uses a structured clinic-information region and a focused form area.
- Company Agreements and Narco Test use split informational sections and
  restrained callouts.
- Country details use a clear overview, vaccine guidance sections, and open
  status/action areas.
- Loading, error, and not-found states use simple centered compositions without
  oversized rounded panels.

## Responsive Behavior

- Preserve natural reading order across breakpoints.
- Collapse multi-column editorial layouts into ruled vertical sections.
- Avoid horizontal overflow in tables, forms, maps, and country content.
- Keep tap targets at least as large as the established navbar controls.
- Keep responsive rules adjacent to their component blocks and use shared
  breakpoint mixins.

## Accessibility

- Preserve semantic landmarks and heading order.
- Keep all interactive elements keyboard accessible.
- Maintain visible focus treatment.
- Ensure meaningful text has sufficient contrast against its actual surface.
- Keep decorative images and icons hidden from assistive technology.
- Preserve labels, error messages, and backend-provided form semantics.

## Technical Boundaries

- Preserve existing Next.js routes and component behavior.
- Do not reshape API responses or rewrite backend error messages in the
  frontend.
- Use existing SCSS tokens and shared breakpoint mixins.
- Keep styling class-based and use single-word BEM blocks.
- Do not introduce new image assets unless a page has a specific visual need
  that cannot be solved with layout, typography, or existing assets.
- Do not modify the intentionally retained mail modal behavior.

## Testing And Verification

Follow test-driven development for every behavioral or structural change:

1. Add failing source-level regression tests for the desired page-system rules.
2. Confirm each test fails for the expected missing behavior.
3. Apply the minimum page or style changes required.
4. Confirm focused and full test suites pass.

Final verification includes:

- Node test suite
- Stylelint across application and shared styles
- ESLint
- Next.js production build and TypeScript checks
- Git whitespace validation

## Out Of Scope

- New backend behavior or API contracts
- Content rewrites beyond small labels needed for clarity
- Route additions or removals
- Replacing the localization system
- Reintroducing raster brand logos
- Changing the mail modal behavior
