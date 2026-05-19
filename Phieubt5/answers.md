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

# Câu A2 — Breakpoints

| Breakpoint | Pixel | Thiết bị | Ví dụ lưới sản phẩm |
|---|---|---|---|
| Extra Small | `<576px` | Điện thoại nhỏ | 1 cột |
| Small | `≥576px` | Điện thoại lớn | 2 cột |
| Medium | `≥768px` | Tablet | 2-3 cột |
| Large | `≥992px` | Laptop | 3-4 cột |
| Extra Large | `≥1200px` | Desktop lớn | 4 cột |
| XXL | `≥1400px` | Màn hình rất lớn | 5-6 cột |

# Câu A3 — Media Queries

CSS:

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) {.container { width: 540px; }}
@media (min-width: 768px) {.container { width: 720px; }}
@media (min-width: 992px) {.container { width: 960px; }}
@media (min-width: 1200px) {.container { width: 1140px; }}
```
### Bảng kết quả
| Chiều rộng màn hình | `.container width` |
|---|---|
| 375px (iPhone SE) | 100% |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

# Câu A4 — SCSS Basics
### 1. Variables
#### Dùng để: lưu màu, font, spacing và giá trị dùng nhiều lần
#### Ví dụ
```scss
$primary-color: blue;
button {background:$primary-color; }
```
Đổi `$primary-color` -> đổi toàn bộ project
### 2. Nesting
Cho phép viết CSS lồng nhau.
#### Ví dụ
```scss
nav{
    ul{display:flex;}
    li{list-style:none;}
    a{color:white;}
}
```
#### CSS compile ra
```css
nav ul{}
nav li{}
nav a{}
```
#### Code: gọn hơn, dễ đọc hơn
### 3. Mixins
Giống function trong CSS.
#### Ví dụ
```scss
@mixin flexCenter{
    display:flex;
    justify-content:center;
    align-items:center;
}
.box{ @include flexCenter; }
```
#### Compile ra
```css
.box{
    display:flex;
    justify-content:center;
    align-items:center;
}
```

Tránh lặp code.
### 4. @extend / Inheritance
Cho class kế thừa style.
#### Ví dụ
```scss
.button{
    padding:10px;
    border-radius:5px;
}
.primary-btn{
    @extend .button;
    background:blue;
}
```
#### Kết quả
`.primary-btn` sẽ có: padding, border-radius từ `.button`

### Trình duyệt không đọc được `.scss`
Vì:
- SCSS không phải CSS chuẩn
- Browser chỉ hiểu: .css
#### Chuyển từ SCSS -> CSS

Sử dụng công cụ compile như :
- VS Code: Cài extension "Live Sass Compiler" -> Click "Watch Sass" -> Tự compile!
- Dự án thực tế: Webpack/Vite tự xử lý (React/Vue đã tích hợp sẵn)

Tài liệu tham chiếu: tuan_3_css_advanced/16_sass_scss.md