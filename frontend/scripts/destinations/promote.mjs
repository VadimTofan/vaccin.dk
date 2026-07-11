import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateCountry } from './validate-country.mjs';

const frontendDirectory = fileURLToPath(new URL('../../', import.meta.url));
const manifestPath = path.join(
  frontendDirectory,
  'app',
  '(countries)',
  'destinations.manifest.json',
);
const draftDirectory = path.join(frontendDirectory, '.destination-drafts');
const localeDirectory = path.join(
  frontendDirectory,
  'app',
  '(countries)',
  'locale',
);

async function readJson(filePath) {
  return JSON.parse((await readFile(filePath, 'utf8')).replace(/^\uFEFF/, ''));
}

async function writeJsonAtomically(filePath, value) {
  const temporaryPath = `${filePath}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporaryPath, filePath);
}

export async function promoteDestinationDrafts() {
  const manifest = await readJson(manifestPath);
  let promotedCount = 0;

  await mkdir(localeDirectory, { recursive: true });

  for (const entry of manifest) {
    try {
      const draft = await readJson(path.join(draftDirectory, `${entry.slug}.json`));
      const errors = validateCountry(draft);

      if (errors.length > 0) {
        throw new Error(errors.join('; '));
      }

      await writeJsonAtomically(path.join(localeDirectory, `${entry.slug}.json`), draft);
      entry.status = 'complete';
      entry.acquiredAt = new Date().toISOString().slice(0, 10);
      delete entry.failure;
      promotedCount += 1;
    } catch (error) {
      entry.status = 'draft';
      entry.failure = error instanceof Error ? error.message : String(error);
    }
  }

  await writeJsonAtomically(manifestPath, manifest);
  return promotedCount;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = await promoteDestinationDrafts();
  console.log(`Promoted ${count} destination files.`);
}
