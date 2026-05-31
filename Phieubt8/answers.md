# Câu A1 — Function Declaration vs Expression vs Arrow
Viết hàm `tinhThueBaoHiem(luong)` (thuế = 10% nếu lương > 11_000_000, ngược lại 0%). Trả về object `{ thuong, thuc_nhan }`.
1. Function Declaration
```js
function tinhThueBaoHiem(luong) {
	const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
	return { thuong, thuc_nhan: luong - thuong };
}
```
2. Function Expression
```js
const tinhThueBaoHiemExpr = function(luong) {
	const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
	return { thuong, thuc_nhan: luong - thuong };
};
```
3. Arrow Function
```js
const tinhThueBaoHiemArrow = (luong) => {
	const thuong = luong > 11_000_000 ? luong * 0.1 : 0;
	return { thuong, thuc_nhan: luong - thuong };
};
```
3 cách này Hoisting có khác nhau. Ví dụ minh họa:

```js
console.log(decl(12000000)); // hoạt động vì function declaration được hoisted
function decl(l) { return l; }

console.log(expr(12000000)); // TypeError: expr is not a function (nếu expr khai báo bằng var) hoặc ReferenceError nếu dùng let/const
var expr = function(l) { return l; };

console.log(arrow(12000000)); // ReferenceError nếu khai báo bằng const/let
const arrow = (l) => l;
```
Function Declaration được hoisted hoàn chỉnh (cả định nghĩa). Function Expression và Arrow khi gán cho `var` sẽ hoisted biến nhưng giá trị là `undefined` (gọi ra sẽ lỗi), còn khi gán cho `let`/`const` sẽ nằm trong Temporal Dead Zone (gọi trước khai báo => ReferenceError).
---

# Câu A2 — Scope & Closure

Đoạn 1 (counter):

```js
const c = counter();
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

Giải thích: `counter` tạo một biến `count` đóng trong closure. Các phương thức thay đổi cùng một biến tham chiếu, nên trạng thái được giữ giữa các lần gọi.

Đoạn 2 (for + setTimeout):

```js
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
	setTimeout(() => console.log("let:", j), 200);
}
```
Output sau 200ms:
- Khoảng 100ms: in 3 dòng `var: 3` (ba lần giống nhau).
- Khoảng 200ms: in `let: 0`, `let: 1`, `let: 2` (mỗi giá trị một lần theo thứ tự).

`var` là function-scoped nên chỉ có một biến `i` dùng chung; khi callbacks chạy sau, `i` đã trở thành `3`. `let` là block-scoped và trong vòng lặp `for` JavaScript tạo một binding mới cho mỗi iteration, nên mỗi callback đóng giữ giá trị hiện tại của `j` trong iteration tương ứng.
---
# Câu A3 — Array Methods
```js
const nums = [1,2,3,4,5,6,7,8,9,10];
```
1. Lấy các số chẵn
```js
nums.filter(n => n % 2 === 0) // [2,4,6,8,10]
```
2. Nhân mỗi số với 3
```js
nums.map(n => n * 3) // [3,6,9,12,15,18,21,24,27,30]
```
3. Tính tổng tất cả
```js
nums.reduce((s, n) => s + n, 0) // 55
```
4. Tìm số đầu tiên > 7
```js
nums.find(n => n > 7) // 8
```
5. Kiểm tra CÓ số > 10 không
```js
nums.some(n => n > 10) // false
```
6. Kiểm tra TẤT CẢ đều > 0
```js
nums.every(n => n > 0) // true
```
7. Tạo mảng "Số X là [chẵn/lẻ]"
```js
nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`)
// ["Số 1 là lẻ", "Số 2 là chẵn", ...]
```
8. Đảo ngược mảng (không mutate gốc)
```js
[...nums].reverse() // [10,9,...,1]  (nums giữ nguyên)
```
---
# Câu A4 — Object Destructuring & Spread
```js
const product = {
	name: "iPhone 16",
	price: 25990000,
	specs: { ram: 8, storage: 256, color: "Titan" }
};
```
Destructuring
```js
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);  // iPhone 16 25990000 8 Titan
console.log(specs);                     // ReferenceError: specs is not defined
```
Giải thích: `specs: { ram, color }` giải nén các thuộc tính con nhưng không khai báo biến `specs` ở scope ngoài, nên `specs` không tồn tại sau destructuring.

Spread
```js
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price); // 23990000
console.log(updated.sale);  // true
console.log(product.price); // 25990000 (gốc không đổi)
```
Spread gotcha (shallow copy)
```js
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // 16
```
Giải thích: Spread tạo shallow copy của object `product`; trường `specs` là một object tham chiếu nên cả `copy.specs` và `product.specs` cùng trỏ tới cùng một object — thay đổi sâu sẽ thấy ở cả hai.

# Câu D - Video
https://drive.google.com/drive/u/0/folders/1BCKjT6CJm6Mm8TLHa_9kToKog42KpMU6

