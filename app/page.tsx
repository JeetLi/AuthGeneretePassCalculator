"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "../store/useStore";
import s from "./page.module.scss";

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

  const handleRoute = useCallback(
    (path: string) => {
      localStorage.setItem("name", name);
      setNameInStore(name);
      router.push(path);
    },
    [name, setNameInStore, router]
  );

  return (
    <section className={s.wrapper}>
      <div className={s.modal}>
        <h1 className={s.title}>Начать</h1>
        <div className={s.inputWrapper}>
          <label>Напишите ваше имя</label>
          <input
            className={s.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
          />
        </div>
        <div className={s.btnWrapper}>
          <button className={s.btn} onClick={() => handleRoute("calculator")}>
            Открыть калькулятор
          </button>
          <button className={s.btn} onClick={() => handleRoute("generator")}>
            Открыть генератор
          </button>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
