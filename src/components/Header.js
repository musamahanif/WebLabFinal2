import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logInOut } from "../store/authSlice";

const Header = () => {
  const { error } = useSelector((state) => state.books);
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Fragment>
      {error && (
        <div className="alert alert-danger mb-0" role="alert">
          A simple danger alert—check it out!
        </div>
      )}
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>

        <button
          onClick={() => {
            dispatch(logInOut());
          }}
          className="btn btn-outline-primary"
          type="submit"
        >
          {isLogged ? "logout" : "login"}
        </button>
      </nav>
    </Fragment>
  );
};

export default Header;
