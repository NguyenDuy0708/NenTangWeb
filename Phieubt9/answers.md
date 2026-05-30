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

---

# Câu C1 — Debug DOM Code
Code đã sửa:

```js
const countDisplay = document.querySelector('.count');
const historyList = document.getElementById('history');

let count = 0;

function updateDisplay() {
	countDisplay.textContent = count;
}

document.querySelector('#incrementBtn')?.addEventListener('click', function() {
	count++;
	updateDisplay();

	// Lưu history
	const li = document.createElement('li');
	li.textContent = 'Count changed to ' + count;
	historyList.appendChild(li);
});

document.querySelector('#decrementBtn')?.addEventListener('click', function() {
	count--;
	updateDisplay();

	const li = document.createElement('li');
	li.textContent = 'Count changed to ' + count;
	historyList.appendChild(li);
});

document.querySelector('#resetBtn')?.addEventListener('click', () => {
	count = 0;
	updateDisplay();
	historyList.innerHTML = '';
});

// Click trên một item history sẽ xóa item đó (event delegation có thể dùng)
historyList.addEventListener('click', e => {
	const li = e.target.closest('li');
	if (li) li.remove();
});

// Clear all history
document.querySelector('#clearHistory')?.addEventListener('click', () => {
	const items = historyList.querySelectorAll('li');
	items.forEach(item => item.remove());
});

// Save to localStorage
window.addEventListener('beforeunload', () => {
	localStorage.setItem('count', String(count));
	localStorage.setItem('history', historyList.innerHTML);
});

// Load from localStorage
window.addEventListener('load', () => {
	const storedCount = localStorage.getItem('count');
	count = storedCount !== null ? Number(storedCount) : 0;
	updateDisplay();
	const storedHistory = localStorage.getItem('history');
	if (storedHistory) historyList.innerHTML = storedHistory;
});
```

Các lỗi chính đã sửa:
- 1) Sai event name: `addEventListener("onclick", ...)` -> phải là `"click"`.
- 2) Gán DOM element: `countDisplay = count` -> phải cập nhật `countDisplay.textContent`.
- 3) Xóa history: dùng `historyList.innerHTML = null` không chuẩn -> dùng `''`.
- 4) Gọi `item.remove` thiếu dấu `()` -> phải `item.remove()`.
- 5) `localStorage.getItem` trả về chuỗi hoặc null — cần parse Number và xử lý null fallback.
- 6) Thiết lập sự kiện xóa history cho từng item có thể dễ gây lỗi; chuyển sang event delegation (gắn 1 listener trên `historyList`).
- 7) Khi thêm history ban đầu không cần gán click handler cho từng li (đã lược bỏ) — tránh rò rỉ bộ nhớ.
---

# Câu C2 — Performance (event binding & DocumentFragment)

1) Tại sao bind event lên 1000 elements là BAD PRACTICE?
- Memory & CPU: mỗi event listener là 1 hàm tham chiếu, gắn 1000 listeners tốn bộ nhớ và khi có sự kiện chung (ví dụ resize) có thể gây overhead.
- Cost khi thao tác DOM: nếu tạo phần tử và ngay lập tức append vào DOM nhiều lần, mỗi append có thể gây reflow/repaint, khiến quá trình chậm.

Event Delegation giải quyết thế nào?
- Thay vì gắn listener lên từng phần tử con, gắn 1 listener lên cha (hoặc document) và trong handler kiểm tra event.target/closest để phát hiện phần tử đích. Điều này giảm số listeners, tiết kiệm bộ nhớ và đơn giản hoá quản lý động (thêm/xóa phần tử không cần gắn listener mới).

2) Refactor dùng DocumentFragment để tránh 1000 lần reflow

Đoạn code ban đầu (tạo và append 1000 phần tử trực tiếp):
```js
for (let i = 0; i < 1000; i++) {
	const div = document.createElement('div');
	div.textContent = `Item ${i}`;
	document.body.appendChild(div);   // ← 1000 lần reflow!
}
```

Refactor (dùng DocumentFragment):

```js
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
	const div = document.createElement('div');
	div.textContent = `Item ${i}`;
	frag.appendChild(div);
}
document.body.appendChild(frag); // chỉ 1 lần reflow
```

Vì sao nhanh hơn?
- DocumentFragment là một container nhẹ không phải phần của cây DOM hiển thị. Thao tác append vào fragment không kích hoạt reflow/repaint.
- Khi tất cả phần tử đã được thêm vào fragment, append fragment vào DOM chỉ thực hiện một lần reflow/repaint, thay vì 1000 lần. Điều này giảm rất nhiều chi phí layout và render.

