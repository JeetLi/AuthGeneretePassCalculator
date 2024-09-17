"use client";

import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value: string) => {
    if (value === "=") {
      try {
        setResult(input);
      } catch {
        setResult("Ошибка");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <div>
      <h1>Калькулятор</h1>
      <input type="text" value={input} readOnly />
      <div>{result}</div>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} onClick={() => handleButtonClick(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
        <button onClick={() => handleButtonClick("/")}>/</button>
        <button onClick={() => handleButtonClick("=")}>=</button>
        <button onClick={() => handleButtonClick("C")}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
