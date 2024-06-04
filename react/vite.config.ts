import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "CsMetaPlugin",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: (id: string) => !!id.indexOf(".") && !path.isAbsolute(id),
    },
  },
});
