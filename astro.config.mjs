import { defineConfig } from 'astro/config';

// Khi chạy thử trên máy: mở /admin/ sẽ vào thẳng trang quản trị (public/admin/index.html)
const adminIndex = {
  name: 'admin-index',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/admin' || req.url === '/admin/') req.url = '/admin/index.html';
      next();
    });
  },
};

export default defineConfig({
  site: 'https://ydaothoidai.com',
  trailingSlash: 'ignore',
  vite: { plugins: [adminIndex] },
});
