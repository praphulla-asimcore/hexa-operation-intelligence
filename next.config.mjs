import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project — there are stray lockfiles in
  // parent directories that Next would otherwise infer as the root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
