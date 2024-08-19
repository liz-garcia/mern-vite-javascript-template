import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import strip from "@rollup/plugin-strip";

// * Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Since Vite uses Rollup under the hood, we can use @rollup/plugin-strip to remove console.log and other debugging statements.
    strip({
      include: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Fixed the include pattern
      functions: ["console.log", "console.error", "console.warn", "debugger"],
    }),
  ],
  // Use Vite's built-in esbuild bundler to ensure that no console.log statements are present in your production builds.
  esbuild: {
    drop: ["console", "debugger"],
  },
});
