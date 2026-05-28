console.log('--- Đoạn 1 ---');
try {
  console.log('Trước var x:', x);
  var x = 5;
  console.log('Sau var x:', x);
} catch (e) {
  console.log('Error:', e.toString());
}

console.log('--- Đoạn 2 ---');
try {
  console.log('Trước let y:', y);
  let y = 10;
  console.log('Sau let y:', y);
} catch (e) {
  console.log('Error:', e.toString());
}

console.log('--- Đoạn 3 ---');
try {
  const z = 15;
  z = 20;
  console.log('Sau khi gán lại z:', z);
} catch (e) {
  console.log('Error:', e.toString());
}

console.log('--- Đoạn 4 ---');
try {
  const arr = [1, 2, 3];
  arr.push(4);
  console.log('arr:', arr);
} catch (e) {
  console.log('Error:', e.toString());
}

console.log('--- Đoạn 5 ---');
try {
  let a = 1;
  {
    let a = 2;
    console.log('Trong block:', a);
  }
  console.log('Ngoài block:', a);
} catch (e) {
  console.log('Error:', e.toString());
}
