import archiver from 'archiver';
import { createWriteStream, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(readFileSync(join(root, 'piko.manifest.json'), 'utf8'));
const version = manifest.version;
const outDir = join(root, 'releases');

mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, `${manifest.id}-v${version}.zip`);
const output = createWriteStream(outPath);
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);

// piko.manifest.json at zip root
archive.file(join(root, 'piko.manifest.json'), { name: 'piko.manifest.json' });

// built app files
archive.directory(join(root, 'dist'), 'dist');

await new Promise((resolve, reject) => {
  output.on('close', resolve);
  archive.on('error', reject);
  archive.finalize();
});

console.log(`\nRelease zip created: releases/${manifest.id}-v${version}.zip (${(archive.pointer() / 1024).toFixed(1)} KB)`);
