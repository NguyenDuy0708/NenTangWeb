// Câu C1 — Refactor code
const processOrders = orders =>
  orders
    .filter(({ status, total }) => status === 'completed' && total > 100000)
    .map(({ id, customer, total }) => {
      const discount = total * 0.1;
      return { id, customer, total, discount, finalTotal: total - discount };
    })
    .sort((a, b) => b.finalTotal - a.finalTotal);

// Ví dụ
const sampleOrders = [
  { id: 1, customer: 'A', status: 'completed', total: 200000 },
  { id: 2, customer: 'B', status: 'pending', total: 500000 },
  { id: 3, customer: 'C', status: 'completed', total: 90000 },
  { id: 4, customer: 'D', status: 'completed', total: 300000 }
];
console.log(processOrders(sampleOrders));

// Câu C2 — miniArray
const miniArray = {
  map(arr, fn) {
    const res = [];
    for (let i = 0; i < arr.length; i++) res.push(fn(arr[i], i, arr));
    return res;
  },

  filter(arr, fn) {
    const res = [];
    for (let i = 0; i < arr.length; i++) if (fn(arr[i], i, arr)) res.push(arr[i]);
    return res;
  },

  reduce(arr, fn, initialValue) {
    let i = 0;
    let acc;
    if (arguments.length >= 3) {
      acc = initialValue;
    } else {
      if (arr.length === 0) throw new TypeError('Reduce of empty array with no initial value');
      acc = arr[0];
      i = 1;
    }
    for (; i < arr.length; i++) acc = fn(acc, arr[i], i, arr);
    return acc;
  }
};

// Ví dụ
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10

module.exports = { processOrders, miniArray };
