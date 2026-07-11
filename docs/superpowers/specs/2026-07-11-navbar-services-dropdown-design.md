# Navbar Services Dropdown Design

## Scope

Redesign only the navbar Services trigger and dropdown. Preserve existing
routes, localization, contact strip, booking CTA, logo, and mobile menu.

## Interaction

- Present Services as a standard navigation label with a compact chevron.
- Toggle the menu by click or keyboard activation.
- Close the menu after selecting a service, pressing Escape, or clicking
  outside the dropdown.
- Expose expanded and menu relationships through ARIA attributes.
- Keep service links inline inside the mobile navigation.

## Visual Direction

- Match the existing dark teal clinic navigation.
- Use a compact panel with a subtle border and restrained depth.
- Avoid pill styling and oversized padding on the trigger.
- Give each service link a clear hover and keyboard focus state.
- Animate the chevron and panel with short, reduced-motion-safe transitions.

## Testing

- Add a source-level regression test for semantic dropdown attributes and
  the refined class hooks.
- Run the navbar test through a red-green TDD cycle.
- Verify the complete Node test set, ESLint, Stylelint, and production build.
