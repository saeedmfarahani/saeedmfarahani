import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type ConfigEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((env) => {
  const alias =
    env.command === "build"
      ? {
          alias: {
            "react-dom/server": "react-dom/server.node",
          },
        }
      : undefined;
  return {
    build: {
      assetsDir: '', // Set to empty string to output assets in root
      outDir: 'dist', // Your output directory
    },
    base: './',
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    resolve: {
      ...alias,
    },
  };
});
