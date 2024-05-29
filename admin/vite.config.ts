import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const env = loadEnv(process.env.NODE_ENV as string, process.cwd());
// console.log('env: ', env.VITE_PROXY_BASE);
export default defineConfig({
  server: {
    host: '0.0.0.0',
    open: true, // 自动打开
    port: 8080, // 端口号
    proxy: {
      [env.VITE_PROXY_BASE]: {
        target: env.VITE_REQUEST_URL,
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      }
    }
  },
  plugins: [react()]
})
