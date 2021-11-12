import React, { useState } from "react";
import { connect } from "react-redux";
import "./user-menu.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { addCheckUser } from "../../actions";
import { imageSrc } from "../../imageRequire";
import PropsUserMenuInterface from "../../interfaces/PropsUserMenuInterface";

const UserMenu = ({ dispatch, currentUser }: any) => {
  const [userMenu, setUserMenu] = useState(false);
  const logOut = () => {
    dispatch(addCheckUser(false));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };
  return (
    <div className="user-menu">
      <p>
        <img
          className="user-menu__img"
          src={imageSrc}
          alt=""
          onClick={() => setUserMenu(!userMenu)}
        />
      </p>
      {userMenu ? (
        <div className="user-menu__select">
          <div>
            <Link
              className="user-menu__select__button"
              to={currentUser.role === "Blogger" ? "/profileMedia" : "#"}
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
            <Button
              className="user-menu__select__button_exit"
              variant="contained"
              onClick={() => logOut()}
            >
              Exit
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUser: state.reducer.currentUser,
  };
};
export default connect(mapStateToProps)(UserMenu);
