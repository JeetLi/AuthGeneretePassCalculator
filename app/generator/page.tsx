"use client";

import { useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  return (
    <div>
      <h1>Генератор паролей</h1>
      <button onClick={generatePassword}>Сгенерировать пароль</button>
      <p>{password}</p>
    </div>
  );
};

export default PasswordGenerator;
