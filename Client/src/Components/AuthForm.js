import { useRef, useContext, useState } from "react";
import axios from "axios";

// import { useHistory } from "react-router-dom";

// import AuthContext from "../../Store/Auth-Context";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const EmailRef = useRef();
  const PasswordRef = useRef();
  const ConfirmPassRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  // const authCtx = useContext(AuthContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const OnSubmitHandler = (event) => {
    event.preventDefault();
    const EnteredEmail = EmailRef.current.value;
    const EnteredPass = PasswordRef.current.value;
    let url = "";
    if (isLogin) {
      url = "http://localhost:4000/user/login";
    } else if (!isLogin) {
      url = "http://localhost:4000/user/signup";
    }

    axios
      .post(
        url,
        {
          email: EnteredEmail,
          password: EnteredPass,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200 || res.status === 201) {
          props.Login();
          return;
          // res.data;
        } else if (res.status === 401) {
          throw new Error("Email or Password Invalid");
        } else if (res.status !== 500) {
          throw new Error("Something Went Wrong");
        } else {
          throw new Error("Page Not Found");
        }
      })
      // .then((data) => {
      // const expTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
      // authCtx.login(data.idToken, expTime.toISOString());
      // history.replace("/home");
      //   console.log(data);
      // })
      .catch((err) => {
        alert(err.response.data.message);
        alert(err.message);
      });
  };
  return (
    <div className={classes.Auth}>
      <h1>{isLogin ? "Log in to your account" : "Sign Up"}</h1>
      <h2>
        {isLogin
          ? "Welcome back, Please login to your account."
          : "Please fill the details."}
      </h2>
      <form onSubmit={OnSubmitHandler}>
        <div className={classes.Control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={EmailRef} />
        </div>
        <div className={classes.Control}>
          <label htmlFor="password">
            {isLogin ? "Your Password" : "Create Password"}
          </label>
          <input type="password" id="password" required ref={PasswordRef} />
        </div>
        <div className={classes.Actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
        </div>
        <div className={classes.Toggle}>
          <label>
            {isLogin ? "Don't have an account?" : "Already have an account."}
          </label>
          <button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
