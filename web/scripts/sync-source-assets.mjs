import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(currentDir, "..");
const repoRoot = path.resolve(webRoot, "..");
const publicRoot = path.join(webRoot, "public");

const removableTargets = [
  { path: path.join(publicRoot, "content"), options: { recursive: true, force: true } },
  { path: path.join(publicRoot, "media"), options: { recursive: true, force: true } },
  { path: path.join(publicRoot, "uploads"), options: { recursive: true, force: true } },
  { path: path.join(publicRoot, "CNAME"), options: { force: true } },
];

const copyTargets = [
  { source: path.join(repoRoot, "static"), destination: publicRoot },
  {
    source: path.join(repoRoot, "assets", "media"),
    destination: path.join(publicRoot, "media"),
  },
  {
    source: path.join(repoRoot, "content"),
    destination: path.join(publicRoot, "content"),
    filter: (entryPath) => !entryPath.endsWith(".md"),
  },
];

async function main() {
  await mkdir(publicRoot, { recursive: true });

  await Promise.all(
    removableTargets.map((target) => rm(target.path, target.options)),
  );

  for (const target of copyTargets) {
    await cp(target.source, target.destination, {
      recursive: true,
      filter: target.filter,
    });
  }
}

await main();
