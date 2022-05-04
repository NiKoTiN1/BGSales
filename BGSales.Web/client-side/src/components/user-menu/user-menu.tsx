import React, { useState } from "react";
import { connect } from "react-redux";
import "./user-menu.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { addCheckUser, addRole } from "../../actions";
import { imageSrc } from "../../imageRequire";
import PropsUserMenuInterface from "../../interfaces/PropsUserMenuInterface";
import StateInterface from "../../interfaces/StateInterface";

const UserMenu = ({ dispatch, currentUser }: PropsUserMenuInterface) => {
  const [userMenu, setUserMenu] = useState(false);
  const logOut = () => {
    dispatch(addRole(""));
    dispatch(addCheckUser(false));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <div className="user-menu">
      <p>
        <img
          className="user-menu__img"
          src={
            currentUser.profile.imageUrl
              ? currentUser.profile.imageUrl
              : imageSrc
          }
          alt=""
          onClick={() => setUserMenu(!userMenu)}
        />
      </p>
      {userMenu ? (
        <div className="user-menu__select">
          <div>
            <Link
              className="user-menu__select__button"
              to={
                currentUser.role === "Blogger"
                  ? "/profileMedia"
                  : "/profileAdvertiser"
              }
            >
              <Button
                className="user-menu__select__button_exit"
                variant="contained"
              >
                Profile
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/authorization">
              <Button
                className="user-menu__select__button_exit"
                variant="contained"
                onClick={() => logOut()}
              >
                Exit
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(UserMenu);
