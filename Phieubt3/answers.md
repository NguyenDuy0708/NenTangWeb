# Câu A1 - 3 cách nhúng CSS
Liệt kê 3 cách nhúng CSS vào HTML
1. Inline CSS: viết CSS trực tiếp ngay trong thẻ HTML bằng thuộc tính `style`.
```html
<p style="color: red; font-size: 20px;">Xin chào</p>
```
- Ưu điểm: Nhanh, đơn giản. Sửa trực tiếp ngay trên element
- Nhược điểm: Code bị rối nếu dùng nhiều, khó tái sử dụng và bảo trì khi website lớn
- Inline dùng khi: Test nhanh giao diện, chỉnh riêng 1 phần tử đặc biệt và debug CSS

2. Internal CSS: viết CSS bên trong thẻ `<style> `trong file HTML
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <p>Xin chào</p>
</body>
</html>
```
- Ưu điểm: Dễ quản lý hơn inline, một CSS áp dụng cho nhiều phần tử và không cần file riêng
- Nhược điểm: File HTML sẽ dài nếu CSS nhiều và không tái sử dụng cho nhiều trang
- Internal dùng khi: Tạo website nhỏ, bài tập HTML/CSS

3. External CSS: viết CSS trong file riêng .css rồi liên kết bằng` <link>`
##### Ví dụ:
- File HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <p>Xin chào</p>
</body>
</html>
```
- File style.css
```css
p {
    color: green;
    font-size: 22px;
}
```
- Ưu điểm: Code sạch, dễ quản lý, tái sử dụng cho nhiều trang và dễ bảo trì
- Nhược điểm: Cần tạo thêm file CSS. Nếu link sai thì CSS không hoạt động
- External dùng khi: Làm Website thật và dự án lớn, làm việc nhóm, FE chuyên nghiệp
#### Tài liệu tham chiếu: tuan_2_css_core/08_introduction_css.md → 3 cách thêm CSS
---
# Câu A2 - CSS Selectors
HTML đã cho:
```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```
1. Selector `h1`: chọn tất cả các thẻ `<h1>` → Chọn: `<h1>ShopTLU</h1>`
-> ShopTLU 
2. Selector `.price`: chọn mọi element có class `price` → Chọn:`<p class="price">25.990.000đ</p>` và `<p class="price">45.990.000đ</p>`
->25.990.000đ và 45.990.000đ
3. Selector `#app header`: `#app` chọn element có id = "app", header bên trong `#app` → Chọn: `<header class="top-bar dark">`: ShopTLU, Home, Products, About
4. Selector `nav a:first-child`: chọn thẻ `<a>` và là con đầu tiên bên trogn `<nav>` → Chọn: `<a href="/" class="active">Home</a>`-> Nội dung: Home
5. Selector `.product.featured h2`: có cả 2 class product, featured và thẻ `<h2` trong class này> → Chọn: `<article class="product featured">` -> Macbook Pro
6. Selector `article > p`: chỉ chọn `p` là con trực tiếp của `article` 
→ Chọn: `<p class="price">25.990.000đ</p>`, `<p>Mô tả sản phẩm...</p>`, `<p class="price">45.990.000đ</p>`, `<p>Mô tả sản phẩm...</p>` -> 25.990.000đ, 45.990.000đ, Mô tả sản phẩm...
7. Selector `a[href="/"]`: chọn thẻ `<a>` có `href="/"` → Chọn: `<a href="/" class="active">Home</a>` -> Home
8. Selector `.top-bar.dark h1`: chọn element có class top-bar và dark rồi lấy thẻ `<h1>` bên trong đó → Chọn: `<h1>ShopTLU</h1>` -> ShopTLU

- Kết quả :
![alt text](screenshots/image.png)
#### Tài liệu tham chiếu: tuan_2_css_core/09_css_selector.md
---
# Cấu A3 - Box Model
### Trường hợp 1 — content-box (mặc định)
```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
#### Công thức mặc định: `width = chỉ tính phần CONTENT`
#### Công thức thực tế browser render: `content + padding + border`
#### Tính toán: 
- Content: 400px 
- Padding: trái 20px,phải 20px -> tổng: 40px 
- Border: trái 5px, phải 5px -> tổng: 10px
- Chiều rộng hiển thị: 400 + 40 + 10 = 450px -> Chiều rộng hiển thị = 450px
- Không gian chiếm trên trang: Margin cũng tính vào khoảng không gian chiếm: margin trái + phải:
10 + 10 = 20px -> Không gian chiếm trên trang = 450 + 20 = 470px

### Trường hợp 2 — border-box
```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
- Với: `box-sizing: border-box;` thì width đã bao gồm: `content + padding + border`
- Chiều rộng hiển thị browser render đúng: 400px
#### Tính thực tế
- Padding ngang: 20 + 20 = 40px; Border ngang:5 + 5 = 10px -> Tổng: 50px
- Content thực: 400 - 50 = 350px
##### -> Kích thước content thực tế = 350px

#### Không gian chiếm trên trang
- Margin: 10 + 10 = 20px; 400 + 20 = 420px → Không gian chiếm trên trang = 420px

### Trường hợp 3 — Margin Collapse
```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```
#### Khoảng cách thực tế
##### CSS Margin Collapse
- Margin dọc (vertical margin) của block elements có thể "gộp" lại. 
- Browser sẽ lấy: margin lớn hơn
- Kết quả: max(25, 40) = 40px → Khoảng cách giữa 2 box = 40px

##### Vì sao KHÔNG phải 65px?
Vì: margin-top và margin-bottom theo chiều dọc bị collapse. Browser không cộng 2 margin lại.

#### Nâng cao — Margin âm
```css
.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
```
Theo công thức -> 40 + (-10) = 30px => Khoảng cách = 30px
#### Tài liệu tham chiếu: tuan_2_css_core/11_box_model.md
--- Câu A4 - Specificity 
Cho các CSS rules sau cùng target 1 element `<p class="price" id="main-price">`:
```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```
#### Độ ưu tiện
1. !important              
2. Inline styles          
3. Số ID selectors            
4. Số Class/Pseudo selectors  
5. Số kiểu selectors        
#### 1. Tính Specificity Score:
Form (a,b,c), với:
- a: id selector
- b: số class/pseudo
- c: số kiểu selector
#### Rule A: 
- ID :0
- class: 0
- Kiểu: 1
##### => (0,0,1)
#### Rule B: 
- ID :0
- class: 1
- Kiểu: 0
##### => (0,1,0)
#### Rule C: 
- ID :1
- class: 0
- Kiểu: 0
##### => (1,0,0)
#### Rule D: 
- ID :0
- class: 1
- Kiểu: 1
##### => (0,1,1)
#### 2. Element sẽ có màu gì? Giải thích
So sánh thì rule C có điểm ưu tiên là (1,0,0) là mạnh nhết->Rule C thắng -> element sẽ màu : red
#### 3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?
- Inline CSS có độ ưu tiêncao hơn selector -> màu hiển thị là : orange
#### 4. Nếu Rule A thêm !important, element có màu gì? Tại sao?
- `!important` là mạnh nhất dù rule C có id vẫn thua -> màu hiển thị: black
#### Tài liệu tham chiếu: tuan_2_css_core/10_inheritance_cascading.md -> Cascade