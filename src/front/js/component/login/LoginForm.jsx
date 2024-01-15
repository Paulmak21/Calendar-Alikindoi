import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { Context } from "../../store/appContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, actions } = useContext(Context);

  const login = (event) => {
    event.preventDefault();
    console.log("credenciales", { email, password });
    actions.setToken(email, password);
  };
  return (
    <>
      <div className="wrapper">
        <form action="" className="form">
          <h1 className="title">Inicio</h1>
          <div className="inp">
            <input
              type="text"
              id="email"
              className="input"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="inp">
            <input
              type="password"
              id="password"
              className="input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          <button className="submit" onClick={login}>
            Iniciar sesión
          </button>
          <p className="footer">
            ¿No tienes cuenta?{" "}
            <a href="#" className="link">
              Por favor, Registrate
            </a>
          </p>
        </form>
        <div></div>
        <div className="banner">
          <h1 className="wel_text">Bienvenid@</h1>
          <br />
          <p className="para"></p>
        </div>
      </div>
    </>
  );
};
