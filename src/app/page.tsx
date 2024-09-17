"use client";

import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const [name, setName] = useState("");
  const setNameInStore = useStore((state) => state.setName);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
      setNameInStore(storedName);
    }
  }, [setNameInStore]);

  const handleRouteCalculator = () => {
    localStorage.setItem("name", name);
    setNameInStore(name);
  };

  const handleRouteGenerate = () => {
    localStorage.setItem("name", name);
    setNameInStore(name);
  };

  console.log(name);

  return (
    <div>
      <h1>Главная страница</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите ваше имя"
      />
      <button onClick={handleRouteCalculator}>Открыть калькулятор</button>
      <button onClick={handleRouteGenerate}>Открыть генератор</button>
    </div>
  );
};

export default IndexPage;
