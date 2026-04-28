# Câu A1 — Input Types
1. `type="email"` → Ô nhập text, trình duyệt kiểm tra có dấu @ và đúng định dạng email → Dùng cho form đăng ký tài khoản / nhận hóa đơn
2. `type="password"` → Ô nhập nhưng ký tự bị ẩn (hiện dấu ●●●) → Không có validation mặc định → Dùng khi đăng nhập / tạo mật khẩu
3. `type="text"` → Ô nhập văn bản bình thường → Không có validation mặc định → Dùng nhập tên khách hàng, địa chỉ
4. `type="number"` → Ô nhập số, có nút tăng/giảm → Chỉ cho nhập số → Dùng nhập số lượng sản phẩm
5. `type="tel"` → Ô nhập số điện thoại → Gợi ý bàn phím số trên mobile → Dùng nhập số điện thoại giao hàng
6. `type="url"` → Ô nhập link → Kiểm tra có dạng URL  → Dùng nhập website 
7. `type="date"` → Hiển thị bộ chọn ngày → Kiểm tra đúng định dạng ngày → Dùng chọn ngày giao hàng
8. `type="radio"` → Nút chọn tròn chọn 1 trong nhiều lựa chọn → Không validation riêng → Dùng chọn phương thức thanh toán (COD / Visa)
9. `type="checkbox"` → Ô vuông tích chọn (có thể chọn nhiều) → Không validation riêng → Dùng chọn nhiều sản phẩm / đồng ý điều khoản
10. `type="file"` → Nút upload file → Có thể giới hạn loại file (accept) → Dùng upload ảnh (ví dụ feedback sản phẩm)

* Tài liệu tham chiếu: tuan_1_html5/07_forms_interactive.md -> Các Input Types HTML5
---
# Câu A2 — Validation Attributes
Không chạy code, hãy dự đoán điều gì xảy ra khi user bấm Submit cho mỗi trường hợp sau. Giải thích TẠI SAO.
```html
<!-- Trường hợp 1 -->
<input type="text" required value="">   <!-- User để trống -->

<!-- Trường hợp 2 -->
<input type="email" value="abc">        <!-- User gõ "abc" -->

<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->

<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->

<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->
```
- TH1->Form không submit: Có sự mâu thuẫn giữa `required`(bắt buộc nhập) và `value=""`(dể trống)
- TH2->Form không submit: Ở đây `type="email"` chỉ nhập `abc` thiếu `@` nên sẽ bị lỗi cú pháp
- TH3->Form không submit: Thấy `min="1"` và `max="10"` nghĩa là giá trị sẽ nằm trong đoạn từ 1-10, user nhập 15 vượt quá giới hạn max nên sẽ bị lỗi
- TH4->Form không submit: `pattern="[0-9]{10}"` là chỉ chứa số, đúng 10 chữ số, user nhập `abc123` vi phạm lỗi có chữ và không đủ 10 số
- TH5->Form không submit: `minlength="8"` nghĩa là tối tiểu là 8 ký tự nhưng user chỉ để là `123` ch có 3 ký tự sẽ vi phạm lỗi không đủ độ dài tối thiểu

* Sau khi thực hành đây là kết quả thực tế:
- TH1: ![alt text](screenshots/th1.png)
- TH2: ![alt text](screenshots/th2.png)
- TH3: ![alt text](screenshots/th3.png)
- TH4: ![alt text](screenshots/th4.png)
- TH5: ![alt text](screenshots/th5.png)
* Tài liệu tham chiếu: tuan_1_html5/07_forms_interactive.md -> HTML5 Validation Attributes
---
# Câu A3 — Accessibility
1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
- `<label>` giúp biết được với ô input này sẽ được dùng cho cái gì. Khi có `<label>` screen reader sẽ đọc được là `"Email, edit text"`, người khiếm thị sẽ biết được ô này được dùng để nhập Email. Nếu không có `<label>` thì screen reader chỉ đọc `"edit text"`, người khiếm thị sẽ không ô này để làm gì?
2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
- `<fieldset>` + `<legend>` được dùng khi: Nhóm nhiều input liên quan lại với nhau
- VÍ dụ:
```html
<fieldset>
  <legend>Giới tính</legend>

  <label>
    <input type="radio" name="gender" value="male"> Nam
  </label>

  <label>
    <input type="radio" name="gender" value="female"> Nữ
  </label>
</fieldset>
```
3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có `<label>`?
- `aria-label` được dùng khi: Không có `<label>` hiển thị nhưng vẫn cần mô tả
- Không nên dùng `aria-label` khi đã có `<label>` vì `aria-label` sẽ ghi đè `<label>` thật
### Tài liệu tham chiếu: tuan_1_html5/07_forms_interactive.md -> Accessibility — Form cho mọi người
---
# Câu A4 — Media
1. `loading="lazy"` trong `<img>` là thuộc tính giúp trì hoãn việc tải ảnh cho đến khi ảnh đó sắp xuất hiện trong màn hình. Nó giúp Tăng tốc độ tải trang ban đầu, Cải thiện trải nghiệm người dùng, nhất là trên mobile mạng yếu. Không nên sủ dụng nó trong trường hợp: Ảnh quan trọng ở đầu trang, Ảnh cần hiển thị ngay lập tức để tránh layout bị “nhảy” (ảnh banner, ảnh sản phảm nổi bật, ảnh chính bài viết,...)
2. Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì Trình duyệt sẽ tự chọn format nó hỗ trợ, giúp tăng khả năng tương thích-> Video chạy được trên nhiều thiết bị hơn (Chrome, Safari, Firefox,...). 3 format video web phổ biến: MP4, WebM, Ogg
3. Thuộc tính `alt` trên `<img>` dùng để: cung cấp mô tả văn bản cho hình ảnh trong trường hợp hình ảnh không thể hiển thị hoặc cho các công cụ tìm kiếm và người dùng khiếm thị,
- Với Ảnh sản phẩm iPhone 16: `alt="iPhone 16 màu đen, màn hình 6.1 inch, thiết kế viền mỏng"`
- Với Ảnh trang trí: Không có nội dung gì -> `alt=""`
- Với Ảnh biểu đồ doanh thu: `alt="Biểu đồ doanh thu quý 1 năm 2026, tăng trưởng từ tháng 1 đến tháng 4"`