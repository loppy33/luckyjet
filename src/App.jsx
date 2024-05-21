import React, { useState } from 'react';
import './App.sass';

function App() {
  const [randomNumber, setRandomNumber] = useState(10.50); // Начальное значение
  const [displayNumber, setDisplayNumber] = useState(1.01); // Отображаемое значение
  const [isAnimating, setIsAnimating] = useState(false); // Состояние анимации

  // Функция для генерации случайного числа в диапазоне от 1.01 до 100.00
  const generateRandomNumber = () => {
    if (isAnimating) return; // Если анимация уже идет, выходим из функции
    setIsAnimating(true); // Устанавливаем флаг, что анимация началась

    const min = 1.01;
    const max = 100.00;
    const random = (Math.random() * (max - min) + min).toFixed(2);
    setRandomNumber(parseFloat(random));

    // Рассчитываем скорость анимации
    const speed = 100 / random; // Чем больше число, тем быстрее скорость

    // Запуск анимации
    let currentNumber = 1.01;
    const interval = setInterval(() => {
      if (currentNumber >= parseFloat(random)) {
        clearInterval(interval);
        setDisplayNumber(parseFloat(random));
        setIsAnimating(false); // Анимация завершилась, устанавливаем флаг обратно
      } else {
        currentNumber = (parseFloat(currentNumber) + 0.01).toFixed(2);
        setDisplayNumber(parseFloat(currentNumber));
      }
    }, speed); // Скорость анимации зависит от случайного числа
  };

  return (
    <div className="App">
      <div className="container">
        <h1>LUCKY JET | СОФТ</h1>
        <span className="random-number">{`x${displayNumber.toFixed(2)}`}</span>
        <button onClick={generateRandomNumber} disabled={isAnimating}>
          ПОЛУЧИТЬ СИГНАЛ
        </button>
      </div>
    </div>
  );
}

export default App;
