import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './debug.css'

console.log('🚀 Starting Infant Jesus School App...');
console.log('🔧 Environment:', import.meta.env.MODE);
console.log('🌐 Backend URL:', (globalThis as any).__BACKEND_URL__);
console.log('📧 Node Server URL:', (globalThis as any).__NODE_SERVER_URL__);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error('Root element not found');
}

console.log('✅ Root element found, rendering app...');
createRoot(rootElement).render(<App />);
console.log('🎉 App rendered successfully!');
