import React, { useState } from "react";
import { connect } from "react-redux";
import "./user-menu.scss";
import { Link, useLocation } from "react-router-dom";
import { addCheckUser, addRole } from "../../actions";
import { assetList } from "../../assets";
import PropsUserMenuInterface from "../../interfaces/PropsUserMenuInterface";
import StateInterface from "../../interfaces/StateInterface";

const UserMenu = ({
  dispatch,
  currentUser,
  onClick,
}: PropsUserMenuInterface) => {
  const [userMenu, setUserMenu] = useState(false);

  const loacation = useLocation();

  const logOut = () => {
    dispatch(addRole(""));
    dispatch(addCheckUser(false));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <div className="user-menu">
      {userMenu ? (
        <div className="user-menu__select">
          <div>
            <Link
              className={
                (loacation.pathname === "/profileAdvertiser" &&
                  currentUser.role !== "Blogger") ||
                (loacation.pathname === "/profileMedia" &&
                  currentUser.role === "Blogger")
                  ? "user-menu__select__button highlight"
                  : "user-menu__select__button"
              }
              to={
                currentUser.role === "Blogger"
                  ? "/profileMedia"
                  : "/profileAdvertiser"
              }
            >
              Profile
            </Link>
          </div>
          <div>
            <Link
              className="user-menu__select__button_exit"
              to="/authorization"
              onClick={() => logOut()}
            >
              Exit
            </Link>
          </div>
        </div>
      ) : null}
      <div>
        <img
          className="user-menu__img"
          src={assetList.menu}
          alt=""
          onClick={() => {
            setUserMenu(!userMenu);
            onClick();
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(UserMenu);
