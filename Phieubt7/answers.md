# Câu A1 — var / let / const
### Dự đoán kết quả:
- Đoạn 1
  - Kết quả: undefined
  - Giải thích ngắn: `var` được hoisted và khởi tạo với `undefined` trước khi gán 5.

- Đoạn 2
  - Kết quả: ReferenceError: Cannot access 'y' before initialization
  - Giải thích ngắn: `let` bị trong Temporal Dead Zone nếu truy cập trước khi gán.

- Đoạn 3
  - Kết quả: TypeError: Assignment to constant variable
  - Giải thích ngắn: `const` không cho phép gán lại; phép gán gây lỗi và câu lệnh sau (console.log) không chạy.

- Đoạn 4
  - Kết quả: [1, 2, 3, 4]
  - Giải thích ngắn: `const` khóa tham chiếu biến, nhưng nội dung mảng có thể bị mutate (push).

- Đoạn 5
  - Kết quả:
    - Trong block: 2
    - Ngoài block: 1
  - Giải thích ngắn: `let` có scope trong block, biến trong block che khuất biến bên ngoài.

### So sánh:
- Nếu đặt tất cả các đoạn trong cùng một file và chạy tuần tự, mã sẽ dừng ở lỗi đầu tiên gặp phải (ví dụ đoạn 2 sẽ ném ReferenceError và chặn các đoạn sau). Để kiểm tra từng đoạn, chạy riêng từng đoạn hoặc comment các đoạn gây lỗi.
- Khi chạy riêng lẻ trên Node hoặc trình duyệt hiện đại, kết quả thực tế khớp với dự đoán trên.

### Giải thích các kết quả bất ngờ:
- khai báo `var` bị đưa lên đầu scope và khởi tạo bằng `undefined`, nên console trước gán in `undefined`.
- TDZ với let/const: mặc dù khai báo được hoisted về mặt cú pháp, biến chưa được khởi tạo và truy cập trước khởi tạo gây ReferenceError.
- const vs mutable objects: `const` ngăn gán lại identifier, nhưng không làm bất biến giá trị nội tại của object/array.
- Block scope của let/const: khác với `var` (function-scoped), `let`/`const` chỉ tồn tại trong block nơi chúng được khai báo.

# Câu A2 — Data Types & Coercion
### Đoạn code :
```javascript
console.log(typeof null);              // ???
console.log(typeof undefined);         // ???
console.log(typeof NaN);               // ???
console.log("5" + 3);                 // ???
console.log("5" - 3);                 // ???
console.log("5" * "3");             // ???
console.log(true + true);               // ???
console.log([] + []);                   // ???
console.log([] + {});                   // ???
console.log({} + []);                   // ???
```

### Dự đoán (trước khi chạy):
- typeof null -> "object" 
- typeof undefined -> "undefined"
- typeof NaN -> "number"
- "5" + 3 -> "53" 
- "5" - 3 -> 2 
- "5" * "3" -> 15 
- true + true -> 2 (true -> 1)
- [] + [] -> "" 
- [] + {} -> "[object Object]" 
- {} + [] ->  "[object Object]"

### Kết quả thực tế:
---
object
undefined
number
53
2
15
2

[object Object]
[object Object]
---
### Tại sao `"5" + 3` và `"5" - 3` khác nhau?
- Toán tử + trong JavaScript dùng quy tắc ToPrimitive và nếu một trong hai toán hạng là chuỗi (string), phép toán thực hiện nối chuỗi. Vì vậy `"5" + 3` chuyển 3 thành chuỗi rồi nối → `"53"`.
- Toán tử -, * và các toán tử số học khác không định nghĩa nối chuỗi; chúng ép các toán hạng về Number (ToNumber) trước khi thực hiện phép toán. Do đó `"5" - 3` ép `"5"` về số 5 rồi thực hiện phép trừ -> `2`.

# Câu A3 — So sánh == vs ===
### Dự đoán (true / false):
- console.log(5 == "5");                // true
- console.log(5 === "5");               // false
- console.log(null == undefined);       // true
- console.log(null === undefined);      // false
- console.log(NaN == NaN);             // false
- console.log(0 == false);             // true
- console.log(0 === false);            // false
- console.log("" == false);          // true

Nên dùng `===` (strict equality) để tránh ép kiểu ngầm và các kết quả bất ngờ của `==`. Chỉ dùng `==` khi thực sự muốn ép kiểu theo quy tắc ToPrimitive/ToNumber và hiểu rõ hậu quả.

# Câu A4 — Truthy & Falsy
### Giá trị falsy trong JavaScript (đầy đủ):
- false
- 0 và -0
- 0n (BigInt zero)
- "" (empty string)
- null
- undefined
- NaN

### Dự đoán kết quả các if (in hay không):
- if ("0") console.log("A");    → In (truthy)
- if ("") console.log("B");     → Không in (falsy)
- if ([]) console.log("C");     → In (truthy)
- if ({}) console.log("D");     → In (truthy)
- if (null) console.log("E");   → Không in (falsy)
- if (0) console.log("F");      → Không in (falsy)
- if (-1) console.log("G");     → In (truthy)
- if (" ") console.log("H");    → In (truthy) (chuỗi có space là không rỗng)

# Câu A5 — Template Literals (backtick)
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
var html = `<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>`;


