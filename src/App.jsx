import React, { useState, useRef, useEffect } from 'react';
import './App.sass';
import Video from "./assets/video.MP4";
import icon from "./assets/icon.png";

import LoadImage from "./assets/loading.svg";

const delay = seconds => new Promise(res => setTimeout(res, 1000 * seconds));

function App() {
  const [randomNumber, setRandomNumber] = useState(10.50); // Начальное значение
  const [displayNumber, setDisplayNumber] = useState(1.01); // Отображаемое значение
  const [isAnimating, setIsAnimating] = useState(false); // Состояние анимации
  const [loading, setLoading] = useState(false); // Состояние анимации


  // Функция для генерации случайного числа с учетом шанса
  const generateRandomNumber = async () => {
    if (isAnimating) return; // Если анимация уже идет, выходим из функции

    setIsAnimating(true); // Устанавливаем флаг, что анимация началась
    setLoading(false)

    await delay(3)

    setLoading(true)



    // Генерация случайного числа для определения шанса
    const chanceRandom = Math.random();

    let min, max;
    // Если случайное число для шанса меньше 0.7, то шанс для меньшего "X" будет больше
    if (chanceRandom < 0.7) {
      min = 1.01;
      max = 5.00;
    } else {
      min = 5.01;
      max = 25.00;
    }

    const random = (Math.random() * (max - min) + min).toFixed(2);
    setRandomNumber(parseFloat(random));

    // Рассчитываем скорость анимации
    const speed = 25; // Базовая скорость анимации в миллисекундах

    // Запуск анимации
    let currentNumber = 1.01;
    const interval = setInterval(() => {
      if (currentNumber >= parseFloat(random)) {
        clearInterval(interval);
        setDisplayNumber(parseFloat(random));
        setIsAnimating(false); // Анимация завершилась, устанавливаем флаг обратно
      } else {
        let increment;
        if (currentNumber < 5) {
          increment = 0.01;
        } else if (currentNumber < 20) {
          increment = 0.05;
        } else if (currentNumber < 50) {
          increment = 0.1;
        } else {
          increment = 0.5;
        }

        currentNumber = (parseFloat(currentNumber) + increment).toFixed(2);
        setDisplayNumber(parseFloat(currentNumber));
      }
    }, speed); // Скорость анимации постоянная
  };

  return (
    <div className="App">
      <div className="container">
        <h3><img src={icon} alt="" /> gorilla_dzhiev</h3>
        <h2><span>LUCKY</span> JET</h2>

        <div className="gameContainer">
          {loading ?
            <>
              <span className="random-number">{`x${displayNumber.toFixed(2)}`}</span>
            </> :
            <>
              <img src={LoadImage} className='loading' alt="" />

            </>
          }
          <video src={Video} muted autoPlay loop playsInline ></video>
        </div>

        <button onClick={generateRandomNumber} disabled={isAnimating} style={isAnimating ? { opacity: 0.5 } : { opacity: 1 }}>
          GET SIGNAL
        </button>
      </div>
    </div>
  );
}

export default App;
