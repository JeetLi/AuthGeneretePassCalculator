"use client";

import { useReducer } from "react";
import s from "./pass-generator.module.scss";
import CopiedIcon from "../../components/UI/copiedIcon";

interface State {
  password: string;
  lengthPass: number;
  arrPasswords: string[];
  options: {
    useUppercase: boolean;
    useLowercase: boolean;
    useNumbers: boolean;
    useSymbols: boolean;
    avoidRepeats: boolean;
  };
}

type Action =
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_LENGTH"; payload: number }
  | { type: "TOGGLE_OPTION"; payload: keyof State["options"] };

const initialState: State = {
  password: "",
  lengthPass: 12,
  arrPasswords: [],
  options: {
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: false,
    avoidRepeats: false,
  },
};

const chars: Record<string, string> = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "%*)?@#$~",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        arrPasswords: [action.payload, ...state.arrPasswords],
      };
    case "SET_LENGTH":
      return { ...state, lengthPass: action.payload };
    case "TOGGLE_OPTION":
      return {
        ...state,
        options: {
          ...state.options,
          [action.payload]: !state.options[action.payload],
        },
      };
    default:
      return state;
  }
};

const PasswordGenerator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generatePassword = () => {
    const { lengthPass, options } = state;
    let selectedChars = Object.entries(options)
      .filter(([key, value]) => value && chars[key.slice(3).toLowerCase()])
      .map(([key]) => chars[key.slice(3).toLowerCase() as keyof typeof chars])
      .join("");

    if (!selectedChars) return alert("Выберите хотя бы одну опцию.");

    let newPassword = "";
    while (newPassword.length < lengthPass) {
      const randomChar = selectedChars.charAt(
        Math.floor(Math.random() * selectedChars.length)
      );
      if (options.avoidRepeats && newPassword.includes(randomChar)) continue;
      newPassword += randomChar;
    }

    dispatch({ type: "SET_PASSWORD", payload: newPassword });
  };

  const optionsList = [
    { label: "Использовать прописные буквы", option: "useUppercase" },
    { label: "Использовать строчные буквы", option: "useLowercase" },
    { label: "Использовать цифры", option: "useNumbers" },
    {
      label: "Использовать символы: %, *, ), ?, @, #, $, ~",
      option: "useSymbols",
    },
    { label: "Избегать повторения символов", option: "avoidRepeats" },
  ];

  const handleCopy = async (value: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value);
        alert("Пароль скопирован!");
      } else {
        alert("Ваш браузер не поддерживает копирование через Clipboard API");
      }
    } catch (err) {
      alert("Ошибка копирования: " + err);
    }
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
              value={state.lengthPass}
              onChange={(e) =>
                dispatch({
                  type: "SET_LENGTH",
                  payload: Number(e.target.value),
                })
              }
            />
          </div>

          <div className={s.optionsWrapper}>
            {optionsList.map(({ label, option }) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={state.options[option as keyof State["options"]]}
                  onChange={() =>
                    dispatch({
                      type: "TOGGLE_OPTION",
                      payload: option as keyof State["options"],
                    })
                  }
                />
                {label}
              </label>
            ))}
          </div>

          <button className={s.btn} onClick={generatePassword}>
            Сгенерировать пароль
          </button>
        </div>

        <div className={s.rightSide}>
          <div className={s.passwordList}>
            {state.arrPasswords.map((item: string, index: number) => (
              <div
                onClick={() => handleCopy(item)}
                className={s.passWrapper}
                key={index}
              >
                <p>{item}</p>
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
