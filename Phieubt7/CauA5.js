var name = 'Duy';
var age = 21;
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
console.log(greeting);

var userId = 42, page = 3;
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
console.log(url);

var title = 'Tiêu đề', description = 'Mô tả ngắn', price = 150000;
var html = `<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>`;
console.log(html);
