"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

const IndexPage = () => {
  const [name, setName] = useState("");
  const setNameInStore = useStore((state) => state.setName);
  const router = useRouter();
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
    router.push("generator");
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
