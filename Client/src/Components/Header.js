import axios from "axios";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import AuthContext from "./Store/Auth-Context";

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const onClickHandler = async () => {
    try {
      const response = await axios.delete("http://localhost:4000/user/logout", {
        withCredentials: true,
      });

      if(response.statusText == 'OK'){
        console.log("User Logged Out");
        alert("User Logged Out");
        authCtx.logout();
      }
      
    } catch (err) {
      alert(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className={classes.HeaderBar}>
      <h3>
        <Link to="/">Event Organiser</Link>
      </h3>
      {authCtx.isLoggedIn ? (
        <button onClick={onClickHandler.bind(this)}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};
export default Header;
