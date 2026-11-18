import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Web đang chạy tạm ở https://npqtvn.github.io/ydaothoidai/ → mọi đường dẫn cần thêm "/ydaothoidai" phía trước.
// Hai biến này được đặt trong .github/workflows/deploy.yml. Khi chuyển sang ydaothoidai.com thì xóa chúng đi.
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');
const SITE_URL = process.env.SITE_URL || 'https://ydaothoidai.com';

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

// Sau khi build: thêm BASE_PATH vào mọi link/ảnh bắt đầu bằng "/" trong các file HTML
// (gồm cả ảnh trong bài viết và nội dung nhập từ trang quản trị).
const basePathRewrite = {
  name: 'base-path-rewrite',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (!BASE_PATH) return;
      const root = fileURLToPath(dir);
      const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
      for (const file of walk(root)) {
        const html = fs.readFileSync(file, 'utf8')
          .replace(/(\s(?:src|href|action|poster|data-src)=["'])\/(?!\/)/g, `$1${BASE_PATH}/`)
          .replace(/url\((['"]?)\/(?!\/)/g, `url($1${BASE_PATH}/`);
        fs.writeFileSync(file, html);
      }
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  integrations: [basePathRewrite],
  vite: {
    plugins: [adminIndex],
    define: { __BASE_PATH__: JSON.stringify(BASE_PATH) },
  },
});
