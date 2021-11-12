import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";

const AppHeader = ({ checkUser, currentUser }: AppHeaderInterface) => {
  return (
    <header className="header">
      {checkUser ? (
        <>
          {currentUser.role === "Blogger" ? (
            <>
              <Link className="header__link projects" to="/allProjects">
                All Projects
              </Link>
              <Link className="header__link projects" to="/selectedProjects">
                Selected Projects
              </Link>
            </>
          ) : (
            <>
              <Link className="header__link projects" to="/bloggers">
                Bloggers
              </Link>
              <Link className="header__link projects" to="/myProjects">
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
    checkUser: state.reducer.checkUser,
    currentUser: state.reducer.currentUser,
  };
};

export default connect(mapStateToProps)(AppHeader);
