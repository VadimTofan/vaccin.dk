import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('services navigation uses an accessible refined dropdown', async () => {
  // Given
  const componentSource = await readFile(
    new URL('./navigation.tsx', import.meta.url),
    'utf8',
  );
  const styleSource = await readFile(
    new URL('./page.module.scss', import.meta.url),
    'utf8',
  );

  // When
  const componentRequirements = [
    'aria-expanded={isDropdown}',
    'aria-controls="services-menu"',
    'id="services-menu"',
    'styles.navigation__trigger',
    'data-expanded={isDropdown}',
  ];
  const styleRequirements = [
    '&__trigger',
    "&[data-expanded='true']",
    '&__droplist',
    '&__link_drop',
  ];

  // Then
  for (const requirement of componentRequirements) {
    assert.equal(componentSource.includes(requirement), true, requirement);
  }

  for (const requirement of styleRequirements) {
    assert.equal(styleSource.includes(requirement), true, requirement);
  }
});
