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