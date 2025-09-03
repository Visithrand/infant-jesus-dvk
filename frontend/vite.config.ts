import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 3000,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
      },
    },
    define: {
      // Global constants for API configuration (no localhost fallback)
      __BACKEND_URL__: JSON.stringify(env.VITE_BACKEND_URL || ""),
      __NODE_SERVER_URL__: JSON.stringify(env.VITE_NODE_SERVER_URL || ""),

      // Additional global constants
      __APP_NAME__: JSON.stringify('Infant Jesus School'),
      __APP_VERSION__: JSON.stringify('1.0.0'),
      __ENVIRONMENT__: JSON.stringify(mode),

      // Environment variable declarations (no localhost fallback)
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_BACKEND_URL || ""),
      'process.env.VITE_SERVER_URL': JSON.stringify(env.VITE_NODE_SERVER_URL || ""),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    // Load environment variables
    envDir: '.',
  };
});
