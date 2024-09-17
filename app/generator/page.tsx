"use client";

import { useEffect, useState } from "react";
import s from "./pass-generator.module.scss";
import CopiedIcon from "../../components/UI/copiedIcon";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [lengthPass, setLengthPass] = useState(12);
  const [arrPasswords, setArrPasswords] = useState<string[]>([]);

  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [avoidRepeats, setAvoidRepeats] = useState(false);

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "%*)?@#$~";

  const generatePassword = () => {
    let chars = "";
    if (useUppercase) chars += uppercaseChars;
    if (useLowercase) chars += lowercaseChars;
    if (useNumbers) chars += numberChars;
    if (useSymbols) chars += symbolChars;

    if (chars.length === 0) {
      alert("Выберите хотя бы одну опцию для генерации пароля.");
      return;
    }

    let newPassword = "";
    while (newPassword.length < lengthPass) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      if (avoidRepeats && newPassword.includes(randomChar)) {
        continue;
      }
      newPassword += randomChar;
    }

    setPassword(newPassword);
    setArrPasswords((prev) => [newPassword, ...prev]);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <section>
      <h1 className={s.title}>Генератор паролей</h1>
      <div className={s.wrapper}>
        <div className={s.leftSide}>
          <div className={s.inputWrapper}>
            <label>Длина пароля:</label>
            <input
              className={s.input}
              type="number"
              min="1"
              value={lengthPass}
              onChange={(e) => setLengthPass(Number(e.target.value))}
            />
          </div>

          <div className={s.optionsWrapper}>
            <label>
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={() => setUseUppercase(!useUppercase)}
              />
              Использовать прописные буквы
            </label>
            <label>
              <input
                type="checkbox"
                checked={useLowercase}
                onChange={() => setUseLowercase(!useLowercase)}
              />
              Использовать строчные буквы
            </label>
            <label>
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={() => setUseNumbers(!useNumbers)}
              />
              Использовать цифры
            </label>
            <label>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={() => setUseSymbols(!useSymbols)}
              />
              Использовать символы: %, *, ), ?, @, #, $, ~
            </label>
            <label>
              <input
                type="checkbox"
                checked={avoidRepeats}
                onChange={() => setAvoidRepeats(!avoidRepeats)}
              />
              Избегать повторения символов
            </label>
          </div>

          <button className={s.btn} onClick={generatePassword}>
            Сгенерировать пароль
          </button>
        </div>
        <div className={s.rightSide}>
          <div className={s.passwordList}>
            {arrPasswords.map((item, index) => (
              <div className={s.passWrapper} key={index}>
                <p onClick={() => handleCopy(item)}>{item}</p>
                <CopiedIcon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordGenerator;
