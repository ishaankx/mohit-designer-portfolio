import { existsSync } from "node:fs";
import path from "node:path";

const cache = new Map<string, boolean>();

export function hasAsset(publicPath: string) {
  const key = publicPath.replace(/^\//, "");
  let hit = cache.get(key);
  if (hit === undefined) {
    hit = existsSync(path.join(process.cwd(), "public", key));
    cache.set(key, hit);
  }
  return hit;
}
