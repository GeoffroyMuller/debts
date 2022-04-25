import type { Component } from 'solid-js';
import MyRouter from "./router";
import Login from "./pages/Login";
import { isAuth } from "./services/auth.services";
import Menu from './components/Menu';

function App() {

  return (
    <>
      {isAuth() ? (
        <>
        <Menu />
        <MyRouter />
        </>
      ) : <Login />}
    </>
  );
}

export default App;
