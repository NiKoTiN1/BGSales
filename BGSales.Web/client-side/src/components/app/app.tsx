import React, { useEffect } from "react";
import Main from "../main";
import LoginForm from "../login-form";
import RegistrationForm from "../registration-form";
import MediaPersonProfile from "../media-person-profile";
import MediaPersonProfileEdit from "../media-person-profile-edit";
import AdvertiserPersonProfile from "../advertiser-person-profile";
import AdvertiserPersonProfileEdit from "../advertiser-person-profile-edit";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import AppHeader from "../app-header";
import AppFooter from "../app-footer";
import PropsAppInterface from "../../interfaces/PropsAppInterface";
import jwt from "jwt-decode";
import "./app.scss";
import StateInterface from "../../interfaces/StateInterface";
import { addRole } from "../../actions";

const App = ({ currentUser, dispatch }: PropsAppInterface) => {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if(token!= null){
      const user = jwt(String(token));
      dispatch(addRole(Object(user).Role));
    }
  }, []);
  return (
    <div className="main-content">
      <AppHeader />
      <Switch>
        <Route path="/authorization" exact component={LoginForm} />
        <Route path="/registration" exact component={RegistrationForm} />
        <Route path="/" exact component={Main} />
        <Route path="/profileMedia" exact>
          {currentUser.role !== "Blogger" ? (
            <Redirect to="/authorization" />
          ) : (
            <MediaPersonProfile />
          )}
        </Route>
        <Route path="/profileMediaEdit" exact>
          {currentUser.role !== "Blogger" ? (
            <Redirect to="/authorization" />
          ) : (
            <Route component={MediaPersonProfileEdit} />
          )}
        </Route>
        <Route path="/profileAdvertiser" exact>
          {currentUser.role !== "Businessman" ? (
            <Redirect to="/authorization" />
          ) : (
            <AdvertiserPersonProfile />
          )}
        </Route>
        <Route path="/profileAdvertiserEdit" exact>
          {currentUser.role !== "Businessman" ? (
            <Redirect to="/authorization" />
          ) : (
            <Route component={AdvertiserPersonProfileEdit} />
          )}
        </Route>
      </Switch>
      <AppFooter />
    </div>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.reducer.currentUser,
  };
};
export default connect(mapStateToProps)(App);
