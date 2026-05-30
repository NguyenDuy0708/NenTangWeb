# Câu A1 — DOM Tree

Cấu trúc cây DOM:

- html
	- body
		- div#app
			- header
				- h1 (Todo App)
				- nav
					- a.active (All)
					- a (Active)
					- a (Completed)
			- main
				- form#todoForm
					- input#todoInput[type="text"]
					- button[type="submit"] (Add)
				- ul#todoList
					- li.todo-item (Learn HTML)
					- li.todo-item.completed (Learn CSS)

Selectors (querySelector / querySelectorAll):
- Chọn thẻ <h1>:
	- document.querySelector('#app > header > h1')
- Chọn input trong form:
	- document.querySelector('#todoForm input')
	- (hoặc) document.querySelector('#todoInput')
- Chọn tất cả `.todo-item`:
	- document.querySelectorAll('.todo-item')
- Chọn link đang active:
	- document.querySelector('#app header nav a.active')
- Chọn `<li>` đầu tiên trong `#todoList`:
	- document.querySelector('#todoList li:first-child')
- Chọn tất cả `<a>` bên trong `<nav>`:
	- document.querySelectorAll('#app header nav a')

---

# Câu A2 — innerHTML vs textContent

- textContent: gán/đọc text thuần, không parse HTML. An toàn cho dữ liệu từ user.
- innerHTML: parse và chèn cú pháp HTML, dùng khi cần render markup (trusted).

Khi dùng:
- Dùng `textContent` cho nội dung do người dùng cung cấp hoặc khi chỉ cần text.
- Dùng `innerHTML` khi chèn template HTML đã được kiểm soát hoặc đã sanitize.

Vấn đề bảo mật (XSS): `innerHTML` sẽ parse HTML, nên nếu gán trực tiếp chuỗi do user nhập có thể chèn script hoặc attribute nguy hiểm.

Ví dụ nguy hiểm:
```js
// user nhập: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector('#search').value;
document.querySelector('#result').innerHTML = userInput; // nguy hiểm
```
Sửa an toàn (1) — dùng textContent:
```js
const userInput = document.querySelector('#search').value;
document.querySelector('#result').textContent = userInput; // an toàn
```
Sửa an toàn (2) — escape trước khi dùng innerHTML:
```js
function escapeHtml(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}
document.querySelector('#result').innerHTML = escapeHtml(userInput);
```
# Câu A3 — Event Bubbling

HTML:
<div id="outer">
	<div id="inner">
		<button id="btn">Click me</button>
	</div>
</div>

Listeners (không dùng capture). Khi click vào button:
- Nếu không gọi `e.stopPropagation()` trong listener của button:
	1) BUTTON
	2) INNER
	3) OUTER

- Nếu trong listener của button gọi `e.stopPropagation()`:
	1) BUTTON
	(không chạy INNER và OUTER)

Sự kiện thực thi ở target trước, sau đó bubble lên các ancestor; `stopPropagation()` chặn việc bubble tiếp.

