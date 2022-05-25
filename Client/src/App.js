import Header from "./Components/Header";
import { Route, Routes,Navigate } from "react-router-dom";

import React, { Fragment, useContext, useState } from "react";
import EventList from "./Components/EventList";
import AuthForm from "./Components/AuthForm";
import AuthContext from "./Components/Store/Auth-Context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Header IsLoggedIn = {authCtx.isLoggedIn}/>
      <div>
        <Routes>
          <Route path="/" element={<EventList />}></Route>
          <Route path="/login" element={
            authCtx.isLoggedIn ? (<Navigate to="/" />) : (<AuthForm Login={authCtx.login}/>)
          }></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
