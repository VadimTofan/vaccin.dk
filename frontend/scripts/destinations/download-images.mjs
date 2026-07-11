import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceOrigin = 'https://vaccin.dk';
const frontendDirectory = fileURLToPath(new URL('../../', import.meta.url));
const manifestPath = path.join(
  frontendDirectory,
  'app',
  '(countries)',
  'destinations.manifest.json',
);

async function downloadImage(entry, fetchImpl) {
  const response = await fetchImpl(new URL(entry.photo, sourceOrigin));
  if (!response.ok) {
    throw new Error(`${entry.slug} image returned ${response.status}`);
  }

  const destinationPath = path.join(frontendDirectory, 'public', entry.photo);
  const temporaryPath = `${destinationPath}.tmp`;

  await mkdir(path.dirname(destinationPath), { recursive: true });
  await writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()));
  await rename(temporaryPath, destinationPath);
}

export async function downloadDestinationImages(fetchImpl = fetch) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const entries = manifest.filter(({ status }) => status === 'complete');
  const concurrency = 8;

  for (let index = 0; index < entries.length; index += concurrency) {
    await Promise.all(
      entries
        .slice(index, index + concurrency)
        .map((entry) => downloadImage(entry, fetchImpl)),
    );
  }

  return entries.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const count = await downloadDestinationImages();
  console.log(`Downloaded ${count} destination images.`);
}
