import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    // Global constants for API configuration
    __BACKEND_URL__: JSON.stringify(process.env.VITE_BACKEND_URL || 'http://localhost:8080'),
    __NODE_SERVER_URL__: JSON.stringify(process.env.VITE_NODE_SERVER_URL || 'http://localhost:3001'),
    
    // Additional global constants
    __APP_NAME__: JSON.stringify('Infant Jesus School'),
    __APP_VERSION__: JSON.stringify('1.0.0'),
    __ENVIRONMENT__: JSON.stringify(mode),
    
    // Environment variable declarations
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_BACKEND_URL || 'http://localhost:8080'),
    'process.env.VITE_SERVER_URL': JSON.stringify(process.env.VITE_NODE_SERVER_URL || 'http://localhost:3001'),
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  // Load environment variables
  envDir: '.',
}));
