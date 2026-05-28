//Bản 1: Classic FizzBuzz
function classicFizzBuzz(start = 1, end = 100) {
  for (let i = start; i <= end; i++) {
    if (i % 15 === 0) {
      console.log(i, '=>', 'FizzBuzz');
    } else if (i % 3 === 0) {
      console.log(i, '=>', 'Fizz');
    } else if (i % 5 === 0) {
      console.log(i, '=>', 'Buzz');
    } else {
      console.log(i, '=>', i);
    }
  }
}

//Bản 2: Custom rules
function customFizzBuzz(n, rules) {
  for (let i = 1; i <= n; i++) {
    const out = rules.reduce((acc, r) => (i % r.divisor === 0 ? acc + r.word : acc), '');
    console.log(i, '=>', out || i);
  }
}

function getCustomFor(num, rules) {
  return rules.reduce((acc, r) => (num % r.divisor === 0 ? acc + r.word : acc), '') || String(num);
}

// --- Tests ---
console.log('--- Classic FizzBuzz (1..30) ---');
classicFizzBuzz(1, 30);

const rules = [
  { divisor: 3, word: 'Fizz' },
  { divisor: 5, word: 'Buzz' },
  { divisor: 7, word: 'Jazz' }
];

console.log('\n--- Custom FizzBuzz (1..30) with rules 3:Fizz,5:Buzz,7:Jazz ---');
customFizzBuzz(30, rules);

console.log('\n--- Samples ---');
console.log('21 =', getCustomFor(21, rules)); // FizzJazz
console.log('15 =', getCustomFor(15, rules)); // FizzBuzz
console.log('35 =', getCustomFor(35, rules)); // BuzzJazz
console.log('105 =', getCustomFor(105, rules)); // FizzBuzzJazz

module.exports = { classicFizzBuzz, customFizzBuzz, getCustomFor };
