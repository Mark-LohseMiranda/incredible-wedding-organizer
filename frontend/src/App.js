import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "bootstrap/dist/css/bootstrap.css";
import Wedding from "./components/Wedding/Wedding";
import "./darkMode.css";
import Display from "./components/Wedding/Display";

export default function App() {
  const [theme, setTheme] = useState("light");

  const [userState, setUserState] = useState({
    firstname: "",
    email: "",
    id: "",
  });
  const [token, setToken] = useState();
  const [showLogin, setShowLogin] = useState(true);

  const logout = (e) => {
    localStorage.removeItem("weddingtoken");
    setUserState({ username: "", email: "", id: "" });
    setToken("");
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const myToken = localStorage.getItem("weddingtoken");

    if (myToken) {
      API.verify(myToken)
        .then((res) => {
          setToken(myToken);
          setUserState({
            firstname: res.data.firstname,
            email: res.data.email,
            id: res.data.id,
          });
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("weddingtoken");
        });
    }
  }, []);
  return (
    <div className="container">
      <div className="mx-0">
        <button onClick={toggleTheme}> Toggle Theme </button>
      </div>
      {!userState.firstname ? (
        <>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-outline-primary btn-lg"
              type="button"
              onClick={() => {
                setShowLogin(false);
              }}
            >
              Signup
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              type="button"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </button>
            {!showLogin ? (
              <div className="col text-center">
                <Signup setToken={setToken} setUserState={setUserState} />
              </div>
            ) : (
              <div className="col text-center">
                <Login setUserState={setUserState} setToken={setToken} />
              </div>
            )}
          </div>
        </>
      ) : null}
      {userState.firstname ? (
        <div>
          <div className="row">
            <div className="text-center">
              <button onClick={logout}>Logout</button>
            </div>
            <div className="text-center">
              <h1>User Info</h1>
            </div>
          </div>
          <div className="row">
            <div className="text-center">Welcome {userState.firstname}!</div>
          </div>
          <div className="row">
            <div className="text-center">Your email is: {userState.email}</div>
            <div className="text-center">Your token is: {token}</div>
          </div>
          <div className="row">
            <Wedding token={token} />
          </div>
          <div className="row">
            <Display token={token} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
