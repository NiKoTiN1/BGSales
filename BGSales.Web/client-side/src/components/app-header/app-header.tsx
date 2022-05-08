import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getPartialProfileData, addNameOrderUrl } from "../../actions";
import { assetList } from "../../assets/";

const AppHeader = ({
  checkUser,
  currentUser,
  dispatch,
}: AppHeaderInterface) => {
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      console.log("It's profile");
      dispatch(getPartialProfileData());
    }
  }, []);

  const location = useLocation();

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img src={assetList.logo} />
      </Link>
      {checkUser ? (
        <>
          {currentUser.role === "Blogger" ? (
            <>
              <Link
                className="header__links projects"
                to="/projects/allProjects"
                onClick={() => dispatch(addNameOrderUrl("allProjects"))}
              >
                All Projects
              </Link>
              <Link
                className="header__links projects"
                to="/projects/selectedProjects"
                onClick={() => dispatch(addNameOrderUrl("selectedProjects"))}
              >
                Selected Projects
              </Link>
              <Link
                className="header__links projects"
                to="/projects/acceptedProjects"
                onClick={() => dispatch(addNameOrderUrl("acceptedProjects"))}
              >
                Accepted Projects
              </Link>
            </>
          ) : (
            <>
              <Link className="header__links projects" to="/mediaPersons">
                Bloggers
              </Link>
              <Link
                className="header__links projects"
                to="/projects/myProjects"
                onClick={() => dispatch(addNameOrderUrl("myProjects"))}
              >
                My Projects
              </Link>
            </>
          )}
          <Link className="header__links notification" to="/chat">
            <span>Inbox</span>
          </Link>
          <UserMenu />
        </>
      ) : (
        <div className="header__links">
          {location.pathname !== "/authorization" ? (
            <Link className="header__links-login" to="/authorization">
              Log in
            </Link>
          ) : null}
          {location.pathname !== "/registration" ? (
            <Link
              className={
                location.pathname === "/"
                  ? "header__links-signup"
                  : "header__links-login"
              }
              to="/registration"
            >
              Sign up
            </Link>
          ) : null}
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state: StateInterface) => {
  return {
    checkUser: state.profile.checkUser,
    currentUser: state.profile.currentUser,
  };
};

export default connect(mapStateToProps)(AppHeader);
