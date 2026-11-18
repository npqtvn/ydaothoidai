// Chuyển ảnh gốc trong "Source YDaothoidai" sang WebP gọn nhẹ cho web (chạy 1 lần).
const sharp = require('sharp'); const path = require('path');
const SRC = path.resolve(__dirname, '../../Source YDaothoidai');
const OUT = path.resolve(__dirname, '../public/uploads');
const map = {
  'logo.png': ['IMG_1790304826338_1791032458310.jpg', 400, 'png'],
  'hero-tui-tra-bo-khi-huyet.webp': ['1791738251990.png', 1200],
  'tui-tra-bo-khi-huyet-2.webp': ['1791738013481.png', 1200],
  'tra-dau-lung.webp': ['6 (1).jpg', 1100],
  'tra-giai-cam.webp': ['4 (1).jpg', 1100],
  'tra-tu-am-bo-than.webp': ['5 (1).jpg', 1100],
  'tra-giam-mo.webp': ['7.jpg', 1100],
  'tra-tieu-hoa-noi-tiet.webp': ['8.jpg', 1100],
  'tra-bo-khi-huyet-ly.webp': ['9.jpg', 1100],
  'tra-mau-khay.webp': ['3 (1).jpg', 1100],
  'chi-tiet-bo-khi-huyet.webp': ['1 (2).jpg', 1414],
  'chi-tiet-tieu-hoa-noi-tiet.webp': ['2 (2).jpg', 1414],
  'chi-tiet-dau-lung.webp': ['3 (2).jpg', 1414],
  'chi-tiet-giai-cam.webp': ['4 (2).jpg', 1414],
  'chi-tiet-tu-am-bo-than.webp': ['5 (2).jpg', 1414],
  'chi-tiet-giam-mo.webp': ['6 (2).jpg', 1414],
  'menu-6-loai-tra.webp': ['IMG_1790304854743_1791032455681.jpg', 853],
  'nguyen-lieu-bo-khi-huyet.webp': ['Designer (14).png', 1254],
  'hop-tra-giam-stress.webp': ['giảm stress.jpg', 1200],
  'hop-tra-thiet-ke.webp': ['Designer (11).png', 1024],
  'khac-biet.webp': ['Herbal Tea, Nature’s Wellness Tradition.png', 1024],
  'huong-dan-su-dung.webp': ['Chỉ với 1-2 muỗng trà (tùy nhu cầu cơ thể), bạn đã sẵn sàng bắt đầu hành trình thanh lọc mỗi ngày..png', 1414],
  'luong-y-tuan-nguyen.webp': ['IMG_1790304868313_1791032454461.jpg', 591],
  'bat-mach.webp': ['IMG_1790304854794_1791032454816.jpg', 1600],
  'tiem-y-dao.webp': ['IMG_1784387216969_1791032865742.jpg', 1190],
  'tiem-ke-tra.webp': ['IMG_1790304826313_1791032457546.jpg', 1200],
  'tiem-goc-tra.webp': ['IMG_1790304826084_1791032460409.jpg', 1100],
  'tiem-tu-sach.webp': ['IMG_1790304826145_1791032459409.jpg', 1100],
  'tiem-ke-hoa.webp': ['IMG_1790304826164_1791032458800.jpg', 1600],
  'tiem-ke-go.webp': ['IMG_1790304825961_1791032463059.jpg', 1100],
  'tiem-ban-tra.webp': ['IMG_1790304826142_1791032459935.jpg', 1100],
  'banner-mang-xa-hoi.webp': ['Banner Trà Thảo Mộc.jpg', 1600],
  'banner-ngang.webp': ['5d9660a8-10e4-4071-8043-4667e2e7a236.png', 2048],
};
(async () => {
  for (const [out, [src, w, fmt]] of Object.entries(map)) {
    let img = sharp(path.join(SRC, src)).rotate().resize({ width: w, withoutEnlargement: true });
    img = fmt === 'png' ? img.png() : img.webp({ quality: 80 });
    const info = await img.toFile(path.join(OUT, out));
    console.log(out, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
  }
})();
