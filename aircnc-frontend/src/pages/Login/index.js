import React, { useState } from "react";

import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (email) {
      const response = await api.post("/sessions", {
        email
      });
      const { _id } = response.data;
      console.log("_id", _id);

      localStorage.setItem("user", _id);

      history.push("/dashboard");
    }
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong> para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu melhor e-mail"
          onChange={evt => setEmail(evt.target.value)}
          value={email}
        />
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </>
  );
}
