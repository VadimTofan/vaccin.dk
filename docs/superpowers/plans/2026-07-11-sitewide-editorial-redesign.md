# Site-Wide Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> `superpowers:executing-plans` to implement this plan inline, task by task.
> Subagent-driven development is disabled by project guidance. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring every public route and shared system state into the landing
page's readable, open editorial-clinical design language.

**Architecture:** Preserve all route components, localization data, and runtime
behavior. Add one source-level regression suite that enforces bright text and
reduced card treatment, then restyle related route families through their
existing SCSS modules. Change markup only where a semantic wrapper or class is
required to express the approved layout.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, SCSS Modules,
Stylelint, ESLint, Node test runner

**Git note:** This plan does not authorize staging or commits. Commit steps are
intentionally replaced with review checkpoints; the human decides when to
stage, commit, or push.

---

### Task 1: Add Site-Wide Design Regression Tests

**Files:**
- Create: `frontend/app/sitewide-editorial-redesign.test.mjs`
- Reference: `frontend/app/page.module.scss`
- Reference: `frontend/styles/_colors.scss`

- [ ] **Step 1: Write the failing route-style audit**

Create a Node test that reads every route stylesheet and reports dark text
tokens or excessive card radii:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routeStyles = [
  './(pages)/about-us/page.module.scss',
  './(pages)/advice/page.module.scss',
  './(pages)/faq/page.module.scss',
  './(pages)/destination/page.module.scss',
  './(pages)/destination/components/country-map/country-map.module.scss',
  './(pages)/vaccines/page.module.scss',
  './(pages)/contact/page.module.scss',
  './(pages)/company-agreements/page.module.scss',
  './(pages)/narco-test/page.module.scss',
  './(countries)/[country]/country-renderer.module.scss',
  './shared/loading/page.module.scss',
  './shared/error/page.module.scss',
  './shared/404/page.module.scss',
];

test('public routes use readable text tokens on dark surfaces', async () => {
  // Given
  const sources = await Promise.all(
    routeStyles.map(async (filePath) => ({
      filePath,
      source: await readFile(new URL(filePath, import.meta.url), 'utf8'),
    })),
  );

  // When
  const unreadableFiles = sources
    .filter(({ source }) => source.includes('color: $secondary;'))
    .map(({ filePath }) => filePath);

  // Then
  assert.deepEqual(unreadableFiles, []);
});

test('public routes declare the editorial redesign marker', async () => {
  // Given
  const sources = await Promise.all(
    routeStyles.map(async (filePath) => ({
      filePath,
      source: await readFile(new URL(filePath, import.meta.url), 'utf8'),
    })),
  );

  // When
  const missingMarkers = sources
    .filter(({ source }) => !source.includes('sitewide-editorial-retouch'))
    .map(({ filePath }) => filePath);

  // Then
  assert.deepEqual(missingMarkers, []);
});
```

- [ ] **Step 2: Run the audit and verify RED**

Run:

```powershell
cd frontend
rtk node --test app/sitewide-editorial-redesign.test.mjs
```

Expected: FAIL listing About, Advice, FAQ, Destination, Country Map, and other
stylesheets that still use `$secondary` or lack the redesign marker.

- [ ] **Step 3: Record the route-family implementation order**

Use this order so each checkpoint leaves a coherent site subset:

```text
1. Editorial information pages
2. Destination and country pages
3. Vaccines
4. Contact and service pages
5. System states
```

- [ ] **Step 4: Review checkpoint**

Confirm only `frontend/app/sitewide-editorial-redesign.test.mjs` is new and the
test fails for the expected missing design rules.

---

### Task 2: Restyle About, Advice, And FAQ

**Files:**
- Modify: `frontend/app/(pages)/about-us/page.module.scss`
- Modify: `frontend/app/(pages)/advice/page.module.scss`
- Modify: `frontend/app/(pages)/faq/page.module.scss`
- Test: `frontend/app/sitewide-editorial-redesign.test.mjs`

- [ ] **Step 1: Add a failing family-specific assertion**

Add this test before editing production styles:

```js
test('editorial information pages use ruled open sections', async () => {
  // Given
  const files = [
    './(pages)/about-us/page.module.scss',
    './(pages)/advice/page.module.scss',
    './(pages)/faq/page.module.scss',
  ];
  const sources = await Promise.all(
    files.map((filePath) => readFile(new URL(filePath, import.meta.url), 'utf8')),
  );

  // When
  const followsPattern = sources.every(
    (source) =>
      source.includes('sitewide-editorial-retouch') &&
      source.includes('border-top: 0.1rem solid') &&
      !source.includes('color: $secondary;'),
  );

  // Then
  assert.equal(followsPattern, true);
});
```

- [ ] **Step 2: Run the family test and verify RED**

Run:

```powershell
rtk node --test app/sitewide-editorial-redesign.test.mjs
```

Expected: FAIL because the three pages still use card surfaces and dark
`$secondary` headings.

- [ ] **Step 3: Apply the shared editorial shell to each BEM block**

Use the page's existing block name (`about`, `advice`, or `faq`) and apply this
exact structural pattern without introducing a shared global selector:

```scss
// sitewide-editorial-retouch

.about {
  width: min(100% - 4rem, var(--clinic-page-max));
  margin: 0 auto;
  padding: 6rem 0 9rem;
  color: $text-ink;

  &__hero {
    display: grid;
    max-width: 92rem;
    padding: 2rem 0 6rem;
    gap: 1.6rem;
  }

  &__section {
    display: grid;
    grid-template-columns: 1fr;
    padding: 3.2rem 0;
    gap: 1.6rem;
    border-top: 0.1rem solid rgb(203 255 252 / 18%);
  }

  @include mixins.tablet {
    &__section {
      grid-template-columns: minmax(20rem, 0.55fr) minmax(0, 1fr);
      gap: 5rem;
    }
  }

  &__heading {
    color: $text-ink;
  }

  &__text {
    color: $text-light;
  }
}
```

Repeat with the actual block name and preserve every existing class referenced
by its TSX file. FAQ question rows use `border-top` and transparent backgrounds
rather than rounded item cards.

- [ ] **Step 4: Run focused tests and Stylelint**

Run:

```powershell
rtk node --test app/sitewide-editorial-redesign.test.mjs
rtk npm.cmd exec stylelint "app/(pages)/{about-us,advice,faq}/page.module.scss"
```

Expected: the information-page test passes; remaining site-wide tests still
identify unconverted route families.

- [ ] **Step 5: Review checkpoint**

Inspect About, Advice, and FAQ at mobile and desktop widths. Confirm heading
order, localized content, lists, and contact details remain unchanged.

---

### Task 3: Restyle Destination, Map, And Country Details

**Files:**
- Modify: `frontend/app/(pages)/destination/page.module.scss`
- Modify: `frontend/app/(pages)/destination/components/country-map/country-map.module.scss`
- Modify: `frontend/app/(countries)/[country]/country-renderer.module.scss`
- Test: `frontend/app/sitewide-editorial-redesign.test.mjs`

- [ ] **Step 1: Add the failing destination-family test**

```js
test('destination surfaces use open workspaces and readable labels', async () => {
  // Given
  const files = [
    './(pages)/destination/page.module.scss',
    './(pages)/destination/components/country-map/country-map.module.scss',
    './(countries)/[country]/country-renderer.module.scss',
  ];
  const sources = await Promise.all(
    files.map((filePath) => readFile(new URL(filePath, import.meta.url), 'utf8')),
  );

  // When
  const followsPattern = sources.every(
    (source) =>
      source.includes('sitewide-editorial-retouch') &&
      !source.includes('color: $secondary;'),
  );

  // Then
  assert.equal(followsPattern, true);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run `rtk node --test app/sitewide-editorial-redesign.test.mjs`.

Expected: FAIL for all three destination-family stylesheets.

- [ ] **Step 3: Convert the destination sections and map workspace**

Apply the editorial shell from Task 2. Replace map and selection card styling
with this class-based pattern:

```scss
.map {
  &__container {
    padding: 2.4rem 0;
    background: transparent;
    border-top: 0.1rem solid rgb(203 255 252 / 18%);
    border-bottom: 0.1rem solid rgb(203 255 252 / 18%);
    border-radius: 0;
  }

  &__title,
  &__link {
    color: $text-ink;
  }

  &__description {
    color: $text-light;
  }
}
```

Keep SVG map geometry and country data untouched.

- [ ] **Step 4: Convert country detail grouping**

Keep the country renderer's existing classes, but replace rounded surface
groups with ruled sections. Buttons retain control treatment; headings and data
labels use `$text-ink`, while descriptions use `$text-light`.

- [ ] **Step 5: Verify the destination family**

```powershell
rtk node --test app/sitewide-editorial-redesign.test.mjs
rtk npm.cmd exec stylelint "app/(pages)/destination/**/*.scss" "app/(countries)/[country]/country-renderer.module.scss"
```

Expected: destination-family assertions pass with no Stylelint errors.

- [ ] **Step 6: Review checkpoint**

Confirm country selection, map links, dynamic country routes, and responsive
overflow behave exactly as before.

---

### Task 4: Restyle The Vaccines Workspace

**Files:**
- Modify: `frontend/app/(pages)/vaccines/page.module.scss`
- Test: `frontend/app/sitewide-editorial-redesign.test.mjs`

- [ ] **Step 1: Add the failing vaccines test**

```js
test('vaccines uses a ruled selector and readable data table', async () => {
  // Given
  const source = await readFile(
    new URL('./(pages)/vaccines/page.module.scss', import.meta.url),
    'utf8',
  );

  // When
  const followsPattern =
    source.includes('sitewide-editorial-retouch') &&
    source.includes("&[data-active='true']") &&
    source.includes('border-bottom: 0.1rem solid') &&
    !source.includes('color: $secondary;');

  // Then
  assert.equal(followsPattern, true);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run `rtk node --test app/sitewide-editorial-redesign.test.mjs`.

Expected: FAIL because vaccine panels and table groups still use repeated card
surfaces.

- [ ] **Step 3: Restyle the selector and content**

Preserve `aria-pressed`, state, and table markup. Use sharp selected rows:

```scss
.vaccines {
  &__button {
    width: 100%;
    padding: 1.4rem 0;
    text-align: left;
    color: $text-light;
    background: transparent;
    border: 0;
    border-bottom: 0.1rem solid rgb(203 255 252 / 14%);
    border-radius: 0;

    &[data-active='true'] {
      padding-left: 1.2rem;
      color: $text-ink;
      border-left: 0.2rem solid $refero-phosphor;
    }
  }

  &__table {
    border-collapse: collapse;
    background: transparent;
    border-top: 0.1rem solid rgb(203 255 252 / 18%);
    border-bottom: 0.1rem solid rgb(203 255 252 / 18%);
    border-radius: 0;
  }
}
```

- [ ] **Step 4: Verify vaccines**

```powershell
rtk node --test app/sitewide-editorial-redesign.test.mjs
rtk npm.cmd exec stylelint "app/(pages)/vaccines/page.module.scss"
```

Expected: vaccines assertion and Stylelint pass.

- [ ] **Step 5: Review checkpoint**

Select multiple vaccines and confirm active state, localized content, table
headers, and responsive layout remain correct.

---

### Task 5: Restyle Contact, Company Agreements, And Narco Test

**Files:**
- Modify: `frontend/app/(pages)/contact/page.module.scss`
- Modify: `frontend/app/(pages)/company-agreements/page.module.scss`
- Modify: `frontend/app/(pages)/narco-test/page.module.scss`
- Test: `frontend/app/sitewide-editorial-redesign.test.mjs`

- [ ] **Step 1: Add the failing service-page test**

```js
test('service pages use split editorial sections with bright text', async () => {
  // Given
  const files = [
    './(pages)/contact/page.module.scss',
    './(pages)/company-agreements/page.module.scss',
    './(pages)/narco-test/page.module.scss',
  ];
  const sources = await Promise.all(
    files.map((filePath) => readFile(new URL(filePath, import.meta.url), 'utf8')),
  );

  // When
  const followsPattern = sources.every(
    (source) =>
      source.includes('sitewide-editorial-retouch') &&
      source.includes('border-top: 0.1rem solid') &&
      !source.includes('color: $secondary;'),
  );

  // Then
  assert.equal(followsPattern, true);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run `rtk node --test app/sitewide-editorial-redesign.test.mjs`.

Expected: FAIL for Contact, Company Agreements, and Narco Test.

- [ ] **Step 3: Apply split editorial sections**

Use transparent content backgrounds and ruled group boundaries. Preserve form
control classes and keep controls visually distinct:

```scss
.contact {
  &__section {
    display: grid;
    padding: 3.2rem 0;
    gap: 2rem;
    background: transparent;
    border-top: 0.1rem solid rgb(203 255 252 / 18%);
    border-radius: 0;
  }

  &__label,
  &__heading {
    color: $text-ink;
  }

  &__text {
    color: $text-light;
  }

  &__input,
  &__textarea {
    color: $text-ink;
    background: $surface-card;
    border: 0.1rem solid rgb(203 255 252 / 18%);
  }
}
```

Do not change form submission logic or frontend handling of backend messages.

- [ ] **Step 4: Verify service pages**

```powershell
rtk node --test app/sitewide-editorial-redesign.test.mjs
rtk npm.cmd exec stylelint "app/(pages)/{contact,company-agreements,narco-test}/page.module.scss"
```

Expected: service-page assertion and Stylelint pass.

- [ ] **Step 5: Review checkpoint**

Confirm every form control, link, callout, and localized content block still
works and maintains visible focus.

---

### Task 6: Restyle Loading, Error, And Not-Found States

**Files:**
- Modify: `frontend/app/shared/loading/page.module.scss`
- Modify: `frontend/app/shared/error/page.module.scss`
- Modify: `frontend/app/shared/404/page.module.scss`
- Test: `frontend/app/sitewide-editorial-redesign.test.mjs`

- [ ] **Step 1: Add the failing system-state test**

```js
test('system states use simple open compositions', async () => {
  // Given
  const files = [
    './shared/loading/page.module.scss',
    './shared/error/page.module.scss',
    './shared/404/page.module.scss',
  ];
  const sources = await Promise.all(
    files.map((filePath) => readFile(new URL(filePath, import.meta.url), 'utf8')),
  );

  // When
  const followsPattern = sources.every(
    (source) =>
      source.includes('sitewide-editorial-retouch') &&
      !source.includes('var(--refero-card-radius)'),
  );

  // Then
  assert.equal(followsPattern, true);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run `rtk node --test app/sitewide-editorial-redesign.test.mjs`.

Expected: FAIL because all three states still use rounded surface panels.

- [ ] **Step 3: Replace panels with open centered states**

Use the actual block name in each module:

```scss
.loading {
  display: grid;
  place-items: center;
  min-height: 42rem;
  padding: 6rem var(--clinic-page-gutter);
  color: $text-ink;
  background: transparent;
  border-radius: 0;

  &__text {
    color: $text-light;
  }
}
```

Keep retry/home buttons as controls with visible focus and adequate tap size.

- [ ] **Step 4: Verify system states**

```powershell
rtk node --test app/sitewide-editorial-redesign.test.mjs
rtk npm.cmd exec stylelint "app/shared/{loading,error,404}/page.module.scss"
```

Expected: system-state assertion and Stylelint pass.

- [ ] **Step 5: Review checkpoint**

Confirm the state components still render their existing messages and actions.

---

### Task 7: Run Full Verification And Audit The Diff

**Files:**
- Verify: all files changed in Tasks 1-6
- Preserve: `.gitignore` and `.agents/PROJECT_GUIDANCE.md` user-requested changes

- [ ] **Step 1: Run the complete test suite**

```powershell
cd frontend
rtk node --test app/*.test.mjs app/shared/footer/*.test.mjs app/shared/navbar/components/contacts/*.test.mjs app/shared/navbar/components/navigation/*.test.mjs
```

Expected: all tests pass with zero failures.

- [ ] **Step 2: Run Stylelint**

```powershell
rtk npm.cmd exec stylelint "app/**/*.scss" "styles/**/*.scss"
```

Expected: exit code 0 and no Stylelint findings.

- [ ] **Step 3: Run ESLint**

```powershell
rtk npm.cmd run lint
```

Expected: exit code 0. The repository's known `.eslintignore` migration warning
may still appear; do not expand scope to fix it.

- [ ] **Step 4: Run the production build**

```powershell
rtk npm.cmd run build
```

Expected: TypeScript passes, all static pages generate, and the build exits 0.

- [ ] **Step 5: Check whitespace and scope**

```powershell
cd ..
rtk git diff --check
rtk git status --short
rtk git diff --stat
```

Expected: no whitespace errors; only the approved redesign, specification,
plan, `.gitignore`, and `.agents/PROJECT_GUIDANCE.md` changes appear.

- [ ] **Step 6: Final review checkpoint**

Report the exact verification results and changed route families. Do not stage,
commit, or push unless the human explicitly requests those actions after
reviewing the implementation.
