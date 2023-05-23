// PUBLIC MODULES
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./pale-pass/",
  server: {
    open: true,
    port: 3000,
  },
});
