// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
  return function(initial) {
    return fns.reduce((val, fn) => fn(val), initial);
  };
}

const process = pipe(
  x => x * 2,
  x => x + 10,
  x => x.toString(),
  x => "Kết quả: " + x
);
console.log(process(5)); // "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  return result;
});
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

// Demo: call search multiple times; only last will run after 500ms
search('a');
search('ab');
search('abc');

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= maxAttempts) throw err;
    }
  }
}

// Demo retry with a function that fails first 2 times
(async () => {
  let counter = 0;
  async function unstable() {
    counter++;
    if (counter < 3) throw new Error('fail ' + counter);
    return 'ok ' + counter;
  }

  try {
    const r = await retry(unstable, 5);
    console.log('retry result:', r);
  } catch (e) {
    console.log('final error:', e.message);
  }
})();

module.exports = { pipe, memoize, debounce, retry };
