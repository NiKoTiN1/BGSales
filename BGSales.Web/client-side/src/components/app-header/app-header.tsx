import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";
import UserMenu from "../user-menu";
const AppHeader = (props: any) => {
  return (
    <header className="header">
      {props.checkUser ? (
        <>
          <Link className="header__link projects" to="/allProjects">
            All Projects
          </Link>
          <Link className="header__link projects" to="/myProjects">
            My Projects
          </Link>
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

const mapStateToProps = (state: any) => {
  return {
    checkUser: state.reducer.checkUser,
  };
};

export default connect(mapStateToProps)(AppHeader);
