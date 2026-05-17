# Câu A1 — Viewport & Mobile-First
### Thẻ `<meta viewport>` chuẩn
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
### Giải thích từng thuộc tính
- `width=device-width` là: Chiều rộng website = chiều rộng thật của thiết bị
- `initial-scale=1.0` là: Mức zoom ban đầu = 100%
### Nếu thiếu meta viewport?
- iPhone sẽ giả định: website desktop ~980px

Sau đó:
- tự zoom nhỏ toàn bộ trang
- chữ rất bé
- layout không responsive đúng

Dẫn đến:
- website bị thu nhỏ
- phải zoom tay
- có thể xuất hiện scroll ngang

### Mobile-First vs Desktop-First

1. Mobile-First
#### Ý tưởng: Viết CSS cho mobile trước, sau đó mở rộng dần.
Dùng:
```css
min-width
```
#### Ví dụ
```css
.card{width:100%;}
/* Tablet trở lên */
@media (min-width:768px){
    .card{width:50%;}
}
```
#### Hoạt động
```text
Mobile:100%
>=768px:50%
```
2. Desktop-First
#### Ý tưởng: Viết desktop trước, sau đó thu nhỏ xuống mobile.
Dùng:`max-width`
#### Ví dụ
```css
.card{width:50%;}
/* Mobile */
@media (max-width:768px){
    .card{width:100%;}
}
```
### Vì sao Mobile-First được khuyên dùng?

1. Người dùng hiện nay chủ yếu dùng: điện thoại, tablet
2. Mobile tải: ít CSS hơn, layout đơn giản hơn
3. Dễ mở rộng từ nhỏ → lớn hơn là thu nhỏ từ lớn → nhỏ
4. Google ưu tiên Mobile-First indexing -> SEO tốt hơn.

Tài liệu tham chiếu: tuan_3_css_advanced/13_creating_responsive_layouts.md