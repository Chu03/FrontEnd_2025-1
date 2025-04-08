const winningArea = document.getElementById('winning-numbers');
const input = document.getElementById('count-input');
const resultBox = document.querySelector('.result-box');
const resultArea = document.getElementById('result');
const buyButton = document.getElementById('buy-button');
const totalPrice = document.getElementById('total-price');

function RandomNumber() {
    const number = [];
    while (number.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!number.includes(num)) {
        number.push(num);
      }
    }
    return number.sort((a, b) => a - b);
}

function ballColor(number) {
    if (number <= 10) return 'ball-yellow';
    else if (number <= 20) return 'ball-blue';
    else if (number <= 30) return 'ball-red';
    else if (number <= 40) return 'ball-gray';
    else return 'ball-green';
}

function createLotto(numbers) {
    const lottoRow = document.createElement('div');
    lottoRow.className = 'lotto-number';
    numbers.forEach(number => {
      const span = document.createElement('span');
      span.classList.add('ball', ballColor(number));
      span.textContent = number;
      lottoRow.appendChild(span);
    });
    return lottoRow;
}


function displayWinningNumbers() {
    const winningNumbers = RandomNumber();
  
    winningArea.innerHTML = `
      <h3 class="section-title">당첨 결과 확인</h3>
      <p class="section-title">이번 주 당첨 번호:</p>
    `;
    const row = createLotto(winningNumbers);
    winningArea.appendChild(row);
  
    const MyNumber = document.createElement('p');
    MyNumber.textContent = "내가 구매한 번호:";
    winningArea.appendChild(MyNumber);
    winningArea.style.display = 'block';
  
    return winningNumbers;
}

function checkMatches(picked, winning) {
    return picked.filter(num => winning.includes(num)).length;
}

buyButton.addEventListener('click', () => {
    const count = parseInt(input.value);
    if (!count || count <= 0) {
      alert("로또를 구매해주세요");
      return;
    }
  
    resultBox.style.display = 'block';
    resultArea.innerHTML = '';
  
    const winning = displayWinningNumbers();
  
    for (let i = 0; i < count; i++) {
      const numbers = RandomNumber();
      const matchCount = checkMatches(numbers, winning);
      const row = createLotto(numbers);
  
      const resultText = document.createElement('p');
      resultText.className = 'result-badge';
      resultText.textContent = `결과: ${matchCount}개 일치` + (matchCount === 6 ? ' - 당첨!' : '');
  
      const wrapper = document.createElement('div');
      wrapper.classList.add('lotto-set');
      wrapper.appendChild(row);
      wrapper.appendChild(resultText);
      resultArea.appendChild(wrapper);
    }
});


document.getElementById('count-input').addEventListener('input', () => {
    const count = parseInt(input.value) || 0;
    totalPrice.textContent = `총 금액: ${count * 1000}원 (1장당 1,000원)`;
});