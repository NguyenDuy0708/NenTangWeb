(function () {
  function startGame() {
    const secret = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 7;
    const previousGuesses = new Set();
    let attempts = 0;

    while (attempts < maxAttempts) {
      let input = prompt(`Lần ${attempts + 1}/${maxAttempts} - Nhập một số từ 1 đến 100:`);
      if (input === null) { // user canceled
        alert('Bạn đã hủy trò chơi.');
        return;
      }

      input = input.trim();
      if (!/^-?\d+$/.test(input)) {
        alert('Vui lòng nhập một số nguyên hợp lệ.');
        continue;
      }

      const guess = Number(input);
      if (guess < 1 || guess > 100) {
        alert('Vui lòng nhập số trong khoảng 1 đến 100.');
        continue;
      }

      if (previousGuesses.has(guess)) {
        alert('Bạn đã đoán số này rồi! Hãy thử số khác.');
        continue;
      }

      previousGuesses.add(guess);
      attempts++;

      if (guess === secret) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần.`);
        return;
      }

      if (guess < secret) {
        alert('Cao hơn');
      } else {
        alert('Thấp hơn');
      }
    }

    alert(`Hết lượt! Bạn đã dùng ${maxAttempts} lần đoán. Số đúng là ${secret}.`);
  }

  document.getElementById('startBtn').addEventListener('click', startGame);
  document.getElementById('rulesBtn').addEventListener('click', function () {
    alert('Luật chơi:\n- Máy chọn 1 số từ 1-100.\n- Bạn có 7 lần đoán.\n- Nhập số hợp lệ 1-100.\n- Nếu đoán lặp sẽ được nhắc.');
  });
})();
