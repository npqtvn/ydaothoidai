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

## 4. Gán tên miền trathaomoc.ydaothoidai.com

Trang chính ydaothoidai.com vẫn để ở WordPress.com, còn web trà chạy ở tên miền con **trathaomoc.ydaothoidai.com**. Không cần sửa code: mỗi lần build, GitHub tự đọc địa chỉ trong Settings › Pages.

1. Vào WordPress.com › **Upgrades › Domains › ydaothoidai.com › DNS records**, thêm 1 bản ghi:
   - Type **CNAME** · Name `trathaomoc` · Value `npqtvn.github.io`
   - Không xóa hay sửa bản ghi nào khác, để trang WordPress vẫn chạy bình thường.
2. Đợi 10–30 phút, rồi vào kho GitHub › **Settings › Pages › Custom domain**, nhập `trathaomoc.ydaothoidai.com` và bấm **Save**. Đợi đến khi hiện dấu ✓ “DNS check successful”.
3. Vào tab **Actions**, chọn “Đăng website lên GitHub Pages”, bấm **Run workflow** để build lại theo địa chỉ mới.
4. Khi ô **Enforce HTTPS** bấm được (có thể mất tới vài giờ), hãy tích vào ô đó.
5. Trên WordPress.com, thêm một mục menu “Trà Thảo Mộc” trỏ tới https://trathaomoc.ydaothoidai.com

Từ đó, địa chỉ cũ npqtvn.github.io/ydaothoidai sẽ tự chuyển sang tên miền mới. Trang quản trị cũng chuyển sang https://trathaomoc.ydaothoidai.com/admin/

> Không làm được dạng ydaothoidai.com/trathaomoc, vì DNS chỉ trỏ được cả tên miền về một nơi, không chia theo đường dẫn.

## 4b. YouTube Shorts tự cập nhật

Khối **YouTube Shorts (tự cập nhật)** trên trang chủ tự lấy các Short mới nhất của kênh. Web tự build lại mỗi 2 giờ, nên Short mới đăng sẽ hiện trên web trong vòng khoảng 2 giờ. Muốn hiện ngay thì vào **Actions › Run workflow**.

Lưu ý: GitHub sẽ tạm dừng lịch tự build nếu kho không có thay đổi nào trong 60 ngày. Khi đó GitHub gửi email báo; bạn bấm **Enable workflow** trong tab Actions là được. Chỉ cần thỉnh thoảng bấm Save trong /admin thì lịch sẽ không bị dừng.

## 4c. Khối Hình ảnh & YouTube Short, kiểu quẹt ngang

- Trong khối **Hình ảnh & YouTube Short**, mỗi mục có thể là một **ảnh**, hoặc một **link YouTube Short** (dán link dạng `https://youtube.com/shorts/...`). Mục có link YouTube sẽ hiện thẻ dọc có nút phát, khách bấm là xem ngay trên web; muốn ảnh bìa riêng thì chọn thêm ảnh ở mục đó.
- Trên **điện thoại**, các khối có nhiều thẻ (giới thiệu, sản phẩm, cách dùng, Shorts, hình ảnh, bài viết, video, cảm nhận, và các phần trong trang chi tiết trà) hiện thành **một hàng quẹt ngang**, có chấm báo vị trí bên dưới. Trên máy tính vẫn là dạng lưới như cũ.
- Phần Hỏi đáp giữ dạng bấm mở từng câu, vì vốn đã gọn.

## 5. Đăng nhập trang quản trị trên web thật

Vào https://npqtvn.github.io/ydaothoidai/admin/ (sau này là https://trathaomoc.ydaothoidai.com/admin/) và chọn **Sign In Using Access Token**.

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
