# Website Y Đạo Thời Đại — Hướng dẫn sử dụng

## 1. Xem thử trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:4321 để xem web, và http://localhost:4321/admin/ để vào trang quản trị.

Khi chạy trên máy, trang quản trị có nút **Work with Local Repository**. Dùng Chrome hoặc Edge, bấm nút đó rồi chọn thư mục `ydaothoidai-web`. Sửa xong bấm **Save**: file trên máy đổi ngay, web đang chạy tự cập nhật.

## 2. Trang quản trị có gì

| Mục | Bạn chỉnh được |
|---|---|
| ⚙️ Cài đặt › 🏠 Trang chủ | Thêm, xóa, **kéo thả đổi thứ tự** các khối; bật/tắt từng khối; sửa chữ, ảnh, nút bấm |
| ⚙️ Cài đặt › 🎨 Giao diện | Màu (bảng chọn màu), font tiêu đề / nội dung / chữ viết tay, cỡ chữ, bo góc, logo, hotline, Zalo, menu |
| 🍵 Sản phẩm | Tên, giá, ảnh, tác dụng, đối tượng phù hợp, các vị thuốc |
| 📝 Bài viết | Soạn bài có định dạng, chèn ảnh |

- Ảnh tải lên tự chuyển sang WebP và thu nhỏ, nên web vẫn tải nhanh.
- Video: dán link YouTube thì video phát ngay trên web. Link TikTok/Facebook sẽ hiện thành thẻ có ảnh bìa, bấm vào mở tab mới.
- Link nút bấm hiểu được các dạng: `#dat-tra` (cuộn tới khối có mã neo đó), `zalo`, `tel`, hoặc link đầy đủ `https://…`.

## 3. Đưa lên GitHub và chạy GitHub Pages (miễn phí)

1. Kho GitHub: https://github.com/npqtvn/ydaothoidai (đã có sẵn code).
2. Tên kho đã được điền sẵn trong `public/admin/config.yml` (dòng `repo: npqtvn/ydaothoidai`).
3. Bật Pages (chỉ làm 1 lần): trong kho trên GitHub, vào **Settings › Pages › Build and deployment › Source** và chọn **GitHub Actions**. **Chưa** điền ô Custom domain.
4. Vào tab **Actions**, chọn lần chạy gần nhất và bấm **Re-run all jobs**. Khoảng 1–2 phút sau, web chạy tạm tại **https://npqtvn.github.io/ydaothoidai/**
5. Từ đó trở đi, mỗi lần push code hoặc bấm Save trong /admin, web tự cập nhật.

## 4. Khi đã sẵn sàng gán tên miền ydaothoidai.com

Làm theo thứ tự sau:

1. Trong `.github/workflows/deploy.yml`, xóa 2 dòng `BASE_PATH: /ydaothoidai` và `SITE_URL: https://npqtvn.github.io`.
2. Trong `public/admin/config.yml`, đổi `site_url` và `display_url` thành `https://ydaothoidai.com`.
3. Push lên GitHub.
4. Ở **Settings › Pages**, ô **Custom domain**: nhập `ydaothoidai.com` rồi bấm Save.
5. Trỏ DNS như hướng dẫn bên dưới. Khi tên miền đã nhận, tích **Enforce HTTPS**.

Vào WordPress.com › **Upgrades › Domains › ydaothoidai.com › DNS records**:

- Xóa các bản ghi **A** đang có cho tên miền gốc (nếu có).
- Thêm 4 bản ghi **A**, phần Name để trống (hoặc `@`):
  `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153`
- Thêm 1 bản ghi **CNAME**: Name `www`, giá trị `npqtvn.github.io`

Thường mất từ 15 phút đến vài giờ để tên miền nhận. Sau bước này, trang cũ trên WordPress.com sẽ không còn hiện ở ydaothoidai.com nữa.

> Muốn dùng Cloudflare Pages thay cho GitHub Pages: Cloudflare chỉ gắn được tên miền gốc `ydaothoidai.com` khi bạn chuyển nameserver sang Cloudflare. Nếu vẫn giữ DNS ở WordPress.com như hiện nay, GitHub Pages là lựa chọn gọn nhất.

## 5. Đăng nhập trang quản trị trên web thật

Vào https://npqtvn.github.io/ydaothoidai/admin/ (sau này là https://ydaothoidai.com/admin/) và chọn **Sign In Using Access Token**.

Cách lấy token: GitHub › Settings › Developer settings › **Fine-grained tokens** › Generate new token.
- Repository access: chỉ chọn kho `npqtvn/ydaothoidai`.
- Permissions › **Contents: Read and write**.

Token chỉ lưu trong trình duyệt của bạn. Mỗi lần bạn bấm **Save**, GitHub tự build lại web, khoảng 1–2 phút sau thay đổi sẽ lên.

## 6. Nhận đơn vào Google Sheet (không bắt buộc)

Khi ô **Link nhận đơn** để trống, nút "Gửi đơn" sẽ sao chép nội dung đơn rồi mở Zalo 0979 098 191 để khách dán và gửi.

Muốn đơn tự đổ về Google Sheet:

1. Tạo một Google Sheet mới › **Tiện ích mở rộng › Apps Script**, dán đoạn mã sau:
   ```js
   function doPost(e) {
     const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     const p = e.parameter;
     if (sh.getLastRow() === 0) sh.appendRow(['Thời gian','Họ tên','SĐT','Loại trà','Số lượng','Địa chỉ','Ghi chú','Trang']);
     sh.appendRow([p.thoi_gian, p.ho_ten, "'" + p.so_dien_thoai, p.loai_tra, p.so_luong, p.dia_chi, p.ghi_chu, p.trang]);
     return ContentService.createTextOutput('ok');
   }
   ```
2. Bấm **Triển khai › Tùy chọn triển khai mới › Ứng dụng web**. Mục "Ai có quyền truy cập" chọn **Bất kỳ ai**. Sao chép link kết thúc bằng `/exec`.
3. Dán link đó vào **Cài đặt › Giao diện › Link nhận đơn**.

## 7. Cấu trúc thư mục

```
src/data/settings.json     ← màu, font, liên hệ, menu
src/data/home.json         ← các khối trang chủ
src/content/products/*.md  ← 6 dòng trà
src/content/posts/*.md     ← bài viết
public/uploads/            ← ảnh
public/admin/config.yml    ← cấu hình trang quản trị
```
