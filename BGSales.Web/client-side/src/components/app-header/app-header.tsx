import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getPartialProfileData} from "../../actions";

const AppHeader = ({
  checkUser,
  currentUser,
  dispatch,
}: AppHeaderInterface) => {
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      dispatch(getPartialProfileData());
    }
  }, []);
  return (
    <header className="header">
      {checkUser ? (
        <>
          {currentUser.role === "Blogger" ? (
            <>
              <Link className="header__link projects" to="/projects/allProjects">
                All Projects
              </Link>
              <Link className="header__link projects" to="/projects/selectedProjects">
                Selected Projects
              </Link>
            </>
          ) : (
            <>
              <Link className="header__link projects" to="/mediaPersons">
                Bloggers
              </Link>
              <Link className="header__link projects" to="/projects/myProjects">
                My Projects
              </Link>{" "}
            </>
          )}
          <Link className="header__link notification" to="#">
            <span>Inbox</span>
            <span className="notification__badge">1</span>
          </Link>
          <Link className="header__link wallet" to="/wallet">
            0.00 $
          </Link>
          <UserMenu />
        </>
      ) : (
        <Link className="header__link" to="/authorization">
          Authorization
        </Link>
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
