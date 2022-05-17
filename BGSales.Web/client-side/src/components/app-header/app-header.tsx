import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";
import UserMenu from "../user-menu";
import AppHeaderInterface from "../../interfaces/AppHeaderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { getPartialProfileData, addNameOrderUrl } from "../../actions";
import { assetList } from "../../assets/";
import {
  getSearchMediaPersons,
  getSearchOrders,
  deleteOrders,
} from "../../actions";
const AppHeader = ({
  checkUser,
  currentUser,
  dispatch,
}: AppHeaderInterface) => {
  const location = useLocation();
  const screenWidth = window.innerWidth;
  const [searchHidden, setSearchHidden] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      dispatch(getPartialProfileData());
    }
  }, []);
  const serchFind = (e: any) => {
    console.log(window.location.href);
    if (window.location.href.search("mediaPersons") !== -1) {
      dispatch(getSearchMediaPersons(e.target.value));
    } else if (window.location.href.search("allProjects") !== -1) {
      dispatch(deleteOrders());
      dispatch(
        getSearchOrders(currentUser.profile.userId, e.target.value, "available")
      );
    } else if (window.location.href.search("selectedProjects") !== -1) {
      dispatch(deleteOrders());
      dispatch(
        getSearchOrders(currentUser.profile.userId, e.target.value, "requested")
      );
    } else if (window.location.href.search("acceptedProjects") !== -1) {
      dispatch(deleteOrders());
      dispatch(
        getSearchOrders(currentUser.profile.userId, e.target.value, "accepted")
      );
    }
  };
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img src={assetList.logo} />
      </Link>
      {checkUser ? (
        <>
          {window.location.href.search("mediaPersons") !== -1 ||
          window.location.href.search("projects") !== -1 ? (
            <div
              className={
                (screenWidth < 1650 && currentUser.role === "Blogger") ||
                screenWidth < 1275
                  ? "header__search low"
                  : "header__search"
              }
            >
              {searchHidden ? (
                <input
                  className="input-hidden"
                  type="text"
                  disabled
                  onChange={serchFind}
                />
              ) : (
                <input type="text" onChange={serchFind} />
              )}
              <img src={assetList.search} />
            </div>
          ) : null}

          {currentUser.role === "Blogger" ? (
            <>
              <Link
                className={
                  location.pathname === ""
                    ? "header__links highlight"
                    : "header__links"
                }
                to="/projects/allProjects"
                onClick={() => dispatch(addNameOrderUrl("allProjects"))}
              >
                All Projects
              </Link>
              <Link
                className={
                  location.pathname === ""
                    ? "header__links highlight"
                    : "header__links"
                }
                to="/projects/selectedProjects"
                onClick={() => dispatch(addNameOrderUrl("selectedProjects"))}
              >
                Selected Projects
              </Link>
              <Link
                className={
                  location.pathname === ""
                    ? "header__links highlight"
                    : "header__links"
                }
                to="/projects/acceptedProjects"
                onClick={() => dispatch(addNameOrderUrl("acceptedProjects"))}
              >
                Accepted Projects
              </Link>
            </>
          ) : (
            <>
              <Link
                className={
                  location.pathname === "/mediaPersons"
                    ? "header__links highlight"
                    : "header__links"
                }
                to="/mediaPersons"
              >
                Bloggers
              </Link>
              <Link
                className={
                  location.pathname === "/projects/myProjects"
                    ? "header__links highlight"
                    : "header__links"
                }
                to="/projects/myProjects"
                onClick={() => dispatch(addNameOrderUrl("myProjects"))}
              >
                My Projects
              </Link>
            </>
          )}
          <Link
            className={
              location.pathname === "/chat"
                ? "header__links highlight"
                : "header__links"
            }
            to="/chat"
          >
            <span>Chat</span>
          </Link>
          <UserMenu onClick={() => setSearchHidden(!searchHidden)} />
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
                location.pathname === "/" ||
                (currentUser.role === "" &&
                  location.pathname !== "/authorization")
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
