# Câu A1 — 5 Loại Positioning
| Position | Chiếm chỗ? | Tham chiếu vị trí | Cuốn theo trang? | Use case |
|---|---|---|---|---|
| `static` | Có | Không dùng top/left | Có | Mặc định |
| `relative` | Có | Chính nó | Có | Dịch nhẹ, làm mốc cho absolute |
| `absolute` | Không | Cha relative gần nhất | Có | Badge, dropdown, tooltip |
| `fixed` | Không | Viewport | Không | Chat button, modal overlay |
| `sticky` | Ban đầu có nhưng đến cuối thì không | Viewport (khi dính) | 1 phần: Cuộn đến ngưỡng thì dính | Sticky header, sidebar |
##### Tài liệu tham chiếu: tuan_2_css_core/12_css_positioning.md
---
# Câu A2 — Flexbox vs Grid
### Trường hợp 1:
```css
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */
```
- `display: flex` -> các item nằm ngang theo hàng
- `flex: 1` -> mọi item chia đều chiều rộng container

Có 4 item = 1 phần bằng nhau
#### Dự đoán
|  1  |  2  |  3  |  4  |
|-|-|-|-|


### Trường hợp 2:
```css
.container {
    display: flex;
    flex-wrap: wrap;
}
.item {
    width: 45%;
    margin: 2.5%;
}
```
- Mỗi item: 45% width + 2.5% left margin + 2.5% right margin = 50% -> 1 item chiếm khoảng 50% hàng
-  Mỗi hàng chứ được 2 items, có 6 items -> 3 hàng
#### Dự đoán:
|  1  |  2  | 
|-|-|
|  3  |  4  |
|  5  |  6  |

### Trường hợp 3:
```css
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```
- `justify-content: space-between` (theo trục ngang): item đầu sát trái, item cuối sát phải, khoảng giữa chia đều
- `align-items: center` (theo trục dọc): các item căn giữa chiều cao container
#### Dự đoán:

|            |                   |                 |
|-|-|-|
|  [1]       |        [2]        |       [3]    |
|                                             |


### Trường hợp 4:
```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}
```
- grid có 3 cột: Cột 1 = 200px, Cột 2 = phần còn lại (1fr), Cột 3 = 200px
- `gap: 20px` -> khoảng cách giữ các cột
- Có 3 items: mỗi item vào 1 cột
#### Dự đoán:
||||
|-|-|-|
|--200px--|---item2---|--200px|     

### Trường hợp 5:
```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```
- `repeat(3, 1fr)` = 1fr 1fr 1fr
->grid có 3 cột bằng nhau
- Có 7 items thì chia hàng như sau: hàng 1(1,2,3), hangf2(4,5,6), hàng3(7)
#### Dự đoán:
|  1  |  2  | 3 |
|-|-|-|
|  4  |  5  | 6 |
|  7  |    |   |

##### Tài liệu tham chiếu: tuan_3_css_advance