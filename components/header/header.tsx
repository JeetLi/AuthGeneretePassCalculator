import React from "react";
import s from "./heades.module.scss";
import Link from "next/link";
import { useStore } from "../../store/useStore";

const Header = () => {
  const name = useStore((state) => state.name);

  return (
    <section className={s.header}>
      <div className={s.wrapper}>
        <div className={s.leftSide}>
          <Link href={"/"}>
            <h3>Главная</h3>
          </Link>
          <Link href={"/calculator"}>
            <h3>калькулятор</h3>
          </Link>
          <Link href={"/generator"}>
            <h3>Генератор</h3>
          </Link>
        </div>
        <div className={s.rightSide}>
          <h3 className={s.userName}>{name && name}</h3>
        </div>
      </div>
    </section>
  );
};

export default Header;
