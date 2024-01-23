import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Context } from "./store/appContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";

import { About } from "./pages/about";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

import injectContext from "./store/appContext";
// import { TodoistView } from "./todoistView";

import LoginForm from "./component/login/LoginForm";
import LandingPage from "./pages/landing";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context);
  // const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      const tokenJwt = localStorage.getItem("tokenJwt");
      if (tokenJwt) {
        // Si hay un token, lo guardamos en el store
        await actions.setToken(tokenJwt);
        // navigate("/home");
      } else {
        // navigate("/login");
      }
    }
    init();
  }, []);

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

  const isUserAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Routes>
            {/* {store.token ?
              <Route path="/home" element={<Home />} /> :
              <Route path="/login" element={<Login />} />
            } */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
