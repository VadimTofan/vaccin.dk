import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('contact strip groups every item in one centered bar', async () => {
  // Given
  const componentSource = await readFile(new URL('./contacts.tsx', import.meta.url), 'utf8');
  const styleSource = await readFile(new URL('./page.module.scss', import.meta.url), 'utf8');

  // When
  const hasUnifiedBar = componentSource.includes('styles.contacts__bar');
  const hasBarStyles = styleSource.includes('&__bar');
  const keepsSplitCommunicationContainer = componentSource.includes(
    'styles.contacts__communication'
  );

  // Then
  assert.equal(hasUnifiedBar, true);
  assert.equal(hasBarStyles, true);
  assert.equal(keepsSplitCommunicationContainer, false);
});

test('contact strip uses consistent item separators on larger screens', async () => {
  // Given
  const styleSource = await readFile(new URL('./page.module.scss', import.meta.url), 'utf8');

  // When
  const hasItemClass = styleSource.includes('&__item');
  const hasSeparator = styleSource.includes('border-left: 0.1rem solid');

  // Then
  assert.equal(hasItemClass, true);
  assert.equal(hasSeparator, true);
});
