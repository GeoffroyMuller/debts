import type { Component } from 'solid-js';
import MyRouter from "./router";
import Login from "./pages/Login";
import { isAuth } from "./services/auth.services";

function App() {

  return (
    <>
      {isAuth() ? <MyRouter /> : <Login />}
    </>
  );
}

export default App;
