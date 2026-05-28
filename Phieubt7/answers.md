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

