# Câu A1 — Grid System
Đoạn code đã cho:
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```
Ý nghĩa:
Bootstrap Grid gồm **12 cột**.

| Class | Ý nghĩa |
|---------|---------|
| col-12 | Chiếm toàn bộ 12 cột ở mọi kích thước mặc định |
| col-md-6 | Từ md (≥768px) chiếm 6/12 cột = 50% chiều rộng |
| col-lg-3 | Từ lg (≥992px) chiếm 3/12 cột = 25% chiều rộng |

### Layout ở từng kích thước

#### 1. Mobile (<768px)
- Áp dụng: `col-12`
- Mỗi box chiếm: 12/12 = 100%
##### Wireframe
```text
---------------
|   Box 1     |
---------------

---------------
|   Box 2     |
---------------

---------------
|   Box 3     |
---------------

---------------
|   Box 4     |
---------------
```
=> Mỗi hàng 1 box.
#### 2. Tablet (768px–991px)

- Áp dụng: `col-md-6`
- Mỗi box: 6/12 = 50%
##### Wireframe

```text
---------------------
| Box 1   | Box 2   |
---------------------

---------------------
| Box 3   | Box 4   |
---------------------
```
=> Mỗi hàng 2 box.
#### 3. Desktop (≥992px)
- Áp dụng: col-lg-3
- Mỗi box:3/12 = 25%
##### Wireframe

```text
-------------------------
|Box1 |Box2 |Box3 |Box4 |
-------------------------
```
=> Mỗi hàng 4 box.

#### Bảng đáp án

| Kích thước | <768px | 768px–991px | ≥992px |
|------------|--------|-------------|---------|
| Số cột mỗi box | 12 | 6 | 3 |
| Chiều rộng | 100% | 50% | 25% |
| Layout | 1 box/hàng | 2 box/hàng | 4 box/hàng |

### col-md-6 nghĩa là: Khi màn hình từ md trở lên (≥768px), phần tử sẽ chiếm 6 trên 12 cột của Grid

### Không cần viết col-sm-12 vì:
Bootstrap hoạt động theo nguyên tắc **Mobile First**: Nếu viết `col-12` thì Bootstrap hiểu là dùng cho tất cả kích thước, sau đó `col-md-6` sẽ ghi đè từ md trở lên

Vì vậy `col-12 col-md-6` đã tương đương `col-sm-12 col-md-6` nên không cần viết thêm

Tài liệu tham khảo: tuan_4_css_frameworks/bootraps/02_grid_system.md
---
# Câu A2 — Utilities & Components
## 1. d-none d-md-block là gì?
```html
<div class="d-none d-md-block">
```
### d-none: Ẩn phần tử
```css
display:none;
```
### d-md-block
Từ md trở lên: `display:block;` => Hiện lại phần tử
### Kết quả
| Kích thước | Trạng thái |
|------------|------------|
| <768px | Ẩn |
| ≥768px | Hiện |
Ví dụ:
```html
<div class="d-none d-md-block">
    Banner quảng cáo
</div>
```
Mobile: không hiển thị

Tablet/Desktop: Banner quảng cáo
## 2. 5 Spacing Utilities
Bootstrap dùng thang:
```text
0 1 2 3 4 5
```
Tương ứng:

```text
0 = 0
1 = .25rem
2 = .5rem
3 = 1rem
4 = 1.5rem
5 = 3rem
```
### mt-3
Tương ứng với 
```css
margin-top:1rem;
```
### mb-4
Tương ứng với 
```css
margin-bottom:1.5rem;
```
### ms-2
Tương ứng với 
```css
margin-left:.5rem;
```
### px-4
Tương ứng với 
```css
padding-left:1.5rem;
padding-right:1.5rem;
```
### py-2
Tương ứng với 
```css
padding-top:.5rem;
padding-bottom:.5rem;
```
### mb-auto
Tương ứng với 
```css
margin-bottom:auto;
```
=> Thường dùng trong Flexbox để đẩy phần tử xuống cuối.
---

## 3. container vs container-fluid vs container-md

### .container: Có max-width theo từng breakpoint
```html
<div class="container">
```
Ví dụ Desktop: 1140px – 1320px => Nội dung nằm giữa màn hình
### .container-fluid: width:100% => Chiếm toàn bộ chiều rộng màn hình

```html
<div class="container-fluid">
```
Phù hợp cho :Dashboard, data Table, biểu đồ lớn
### .container-md
```html
<div class="container-md">
```
- Mobile: full width
- Từ md trở lên: có max-width như `.container`

Tài liệu tham khảo: tuan_4_css_frameworks/bootraps/03_components.md + 04_utilities.md
---
# Câu C1 — Tùy biến Bootstrap
## 1. Muốn đổi màu `$primary` từ xanh mặc định sang `#E63946` thì làm như thế nào?
### Công cụ cần dùng
- Node.js
- npm
- Bootstrap source code (SCSS)
- Trình biên dịch Sass

Cài Sass:
```bash
npm install sass
```
Hoặc cài Bootstrap:

```bash
npm install bootstrap
```
## Bước 1: Tạo file custom.scss

```scss
// Ghi đè biến Bootstrap trước khi import
$primary: #E63946;
@import "../node_modules/bootstrap/scss/bootstrap";
```
Bootstrap sẽ lấy giá trị mới của `$primary` và tạo lại toàn bộ hệ thống màu.
## Bước 2: Compile SCSS
```bash
sass scss/custom.scss css/custom.css
```
hoặc:
```bash
sass --watch scss/custom.scss css/custom.css
```
Sau khi compile sẽ sinh:
```css
.btn-primary{
   background-color:#E63946;
}
.bg-primary{
   background-color:#E63946;
}
.text-primary{
   color:#E63946;
}
```
## Bước 3: Import file 
```html
<link rel="stylesheet" href="css/custom.css">
```
## Bootstrap xử lý thế nào?
Bootstrap định nghĩa: `$primary: #0d6efd;`
Sau đó rất nhiều component sử dụng:
```scss
.btn-primary
.alert-primary
.bg-primary
.text-primary
.border-primary
.link-primary
.dropdown-item
.pagination
.form-control
```
Khi đổi: `$primary: #E63946;` toàn bộ các component trên đều tự cập nhật đồng bộ
## 2. Tại sao không nên override trực tiếp?
Ví dụ:
```css
.btn-primary{
    background:red;
}
```
Nhìn có vẻ hoạt động nhưng có nhiều vấn đề.
### Vấn đề 1: Chỉ đổi được một component
Mới đổi:`.btn-primary`

Nhưng các class khác vẫn màu xanh:
```html
<div class="alert alert-primary"></div>
<div class="text-primary"></div>
<div class="bg-primary"></div>
<a class="link-primary"></a>
```
=> giao diện mất tính nhất quán.
### Vấn đề 2: Phải sửa nhiều nơi => Rất dễ sót
Bạn phải tự override:
```css
.btn-primary
.bg-primary
.text-primary
.border-primary
.alert-primary
.link-primary
.pagination
.nav-pills
.dropdown-item
```

### Vấn đề 3: Trục trặc khi cập nhật Bootstrap
Bootstrap update:
```css
.btn-primary:hover
.btn-primary:focus
.btn-primary:active
```
Các state mới có thể không được override, kết quả:
- màu bình thường đỏ
- hover lại xanh

=>UI bị lỗi.
### Vấn đề 4: Khó bảo trì
Sau 6 tháng thì không ai nhớ được vì sao phải sửa từng nơi
```css
.btn-primary { ... }
.alert-primary { ... }
.text-primary { ... }
```
## Lợi ích của SASS Variables
Chỉ sửa: `$primary: #E63946;`

Bootstrap tự tạo lại:
```scss
.btn-primary
.bg-primary
.text-primary
.alert-primary
.border-primary
.link-primary
.badge
.pagination
```
### Ưu điểm
1. Đồng bộ toàn hệ thống
2. Dễ bảo trì
3. Dễ nâng cấp Bootstrap
4. Theo đúng thiết kế Design System

# Câu C2 — So sánh CSS thuần và Bootstrap
## 1. CSS thuần tạo Navbar Responsive
### HTML
```html
<nav class="navbar">
    <div class="logo">Shop</div>
    <ul class="menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
    <button class="login-btn">Login</button>
</nav>
```
### CSS

```css
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}
.navbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:15px 30px;
    background:#fff;
    border-bottom:1px solid #ddd;
}
.menu{
    display:flex;
    list-style:none;
    gap:20px;
}
.menu a{
    text-decoration:none;
    color:#333;
}
.login-btn{
    padding:8px 15px;
    border:none;
    background:#0d6efd;
    color:white;
    border-radius:5px;
}
@media(max-width:768px){
    .navbar{
        flex-direction:column;
        gap:15px;
    }
    .menu{
        flex-direction:column;
        text-align:center;
    }
}
```
Khoảng:40–60 dòng CSS
## 2. CSS thuần tạo Product Card
### HTML
```html
<div class="card">
    <img src="product.jpg">
    <div class="card-body">
        <h3>Product Name</h3>
        <p>Description</p>
        <button>Mua ngay</button>
    </div>
</div>
```
### CSS
```css
.card{
    width:300px;
    border:1px solid #ddd;
    border-radius:10px;
    overflow:hidden;
    box-shadow:0 2px 10px rgba(0,0,0,.1);
}
.card img{
    width:100%;
}
.card-body{
    padding:15px;
}
.card button{
    width:100%;
    padding:10px;
    background:#0d6efd;
    color:white;
    border:none;
}
```
Khoảng: 20–30 dòng CSS
## Tổng CSS thuần
Navbar + Card gần 60–90 dòng CSS
## Bootstrap Version
Navbar:
```html
<nav class="navbar navbar-expand-lg bg-light">...</nav>
```
Card:
```html
<div class="card">
   <img class="card-img-top">
   <div class="card-body">...</div>
</div>
```
Gần như 0 dòng CSS

Bootstrap đã viết sẵn.
## So sánh

| Tiêu chí | CSS Thuần | Bootstrap |
|-----------|-----------|-----------|
| Số dòng CSS | 60–90+ dòng | 0–10 dòng |
| Thời gian phát triển | Chậm hơn | Nhanh hơn |
| Responsive | Tự viết media query | Có sẵn Grid System |
| Component | Tự xây dựng | Có sẵn |
| Bảo trì | Tùy dự án | Dễ nếu dùng đúng convention |
| Kích thước file | Nhẹ | Nặng hơn |
## Khi nào nên dùng Bootstrap?
### 1. Prototype nhanh
Ví dụ:
- Demo sản phẩm
- MVP
- Landing page
- Dashboard admin

-> Bootstrap giúp hoàn thành giao diện trong vài giờ thay vì vài ngày.
### 2. Dự án nội bộ
Ví dụ:
- CRM
- ERP
- Quản lý nhân sự
- Quản lý kho

-> Ưu tiên tốc độ phát triển hơn là thiết kế độc đáo.
### 3. Nhóm nhỏ hoặc ít Frontend
Bootstrap cung cấp sẵn:
- Grid
- Modal
- Navbar
- Accordion
- Dropdown
- Form

-> giúp giảm rất nhiều công việc.
### 4. Cần Responsive nhanh
Bootstrap đã tối ưu:
```html
col-12
col-md-6
col-lg-3
```
-> không cần viết media query thủ công.
## Khi nào không nên dùng Bootstrap?
### 1. Website có thiết kế độc quyền
Ví dụ:
- Portfolio cao cấp
- Website thương hiệu
- Landing page marketing đặc biệt

-> Bootstrap có thể làm giao diện trông giống nhiều website khác.
### 2. Dự án cần tối ưu hiệu năng cực cao
Ví dụ:
- Trang tải cực nhanh
- Embedded web
- Thiết bị cấu hình thấp

-> CSS thuần thường nhẹ hơn Bootstrap.

# Câu D - Video
https://drive.google.com/drive/u/0/folders/1BCKjT6CJm6Mm8TLHa_9kToKog42KpMU6