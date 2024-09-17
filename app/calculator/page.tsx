"use client";

import { useState, useEffect } from "react";
import s from "./calculator.module.scss";

const btnsArr = [
  { value: "C", color: "#D2D3DA" },
  { value: "+/-", color: "#D2D3DA" },
  { value: "%", color: "#D2D3DA" },
  { value: "/", color: "#3B75A2" },
  { value: "7", color: "#FFFFFF" },
  { value: "8", color: "#FFFFFF" },
  { value: "9", color: "#FFFFFF" },
  { value: "*", color: "#3B75A2" },
  { value: "4", color: "#FFFFFF" },
  { value: "5", color: "#FFFFFF" },
  { value: "6", color: "#FFFFFF" },
  { value: "-", color: "#3B75A2" },
  { value: "1", color: "#FFFFFF" },
  { value: "2", color: "#FFFFFF" },
  { value: "3", color: "#FFFFFF" },
  { value: "+", color: "#3B75A2" },
  { value: ".", color: "#FFFFFF" },
  { value: "0", color: "#FFFFFF" },
  { value: "<X", color: "#FFFFFF" },
  { value: "=", color: "#3B75A2" },
];

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const formatNumber = (number: string | number) => {
    if (isNaN(Number(number))) return "Ошибка";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 10,
    }).format(Number(number));
  };

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "=":
        try {
          setResult(formatNumber(eval(input)));
        } catch {
          setResult("Ошибка");
        }
        break;
      case "C":
        setInput("");
        setResult("");
        break;
      case "+/-":
        setInput(input.startsWith("-") ? input.slice(1) : `-${input}`);
        break;
      case "%":
        setInput((parseFloat(input) / 100).toString());
        break;
      case "<X":
        setInput(input.slice(0, -1));
        break;
      default:
        setInput(input + value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (/\d/.test(key) || ["/", "*", "-", "+", ".", "%"].includes(key)) {
      setInput(input + key);
    } else if (key === "Enter") {
      handleButtonClick("=");
    } else if (key === "Backspace") {
      handleButtonClick("<X");
    } else if (key === "Escape") {
      handleButtonClick("C");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  const renderBtn = (value: string, color: string, span?: number) => (
    <div
      key={value}
      style={{
        backgroundColor: color,
        gridColumn: span ? `span ${span}` : "auto",
      }}
      className={s.btn}
      onClick={() => handleButtonClick(value)}
    >
      {value}
    </div>
  );

  return (
    <div>
      <h1>Калькулятор</h1>
      <div className={s.calculatorWrapper}>
        <div className={s.inputValue}>
          <p>{input || "0"}</p>
        </div>
        <div className={s.outputValue}>
          <p>{result || "0"}</p>
        </div>
        <div className={s.btnWrapper}>
          {btnsArr.map((btn) => renderBtn(btn.value, btn.color))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
