import React, { useEffect } from "react";
import Main from "../main";
import LoginForm from "../login-form";
import RegistrationForm from "../registration-form";
import MediaPersonProfile from "../media-person-profile";
import MediaPersonProfileEdit from "../media-person-profile-edit";
import AdvertiserPersonProfile from "../advertiser-person-profile";
import AdvertiserPersonProfileEdit from "../advertiser-person-profile-edit";
import OrderEdit from "../order-edit";
import Chat from "../chat";
import Order from "../order";
import CreateOrder from "../create-order";
import Orders from "../orders";
import MediaPersons from "../media-persons";
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
    if (token != null) {
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
        <Route path="/profileMedia" exact component={MediaPersonProfile} />
        <Route
          path="/profileMedia/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <MediaPersonProfile id={id} />;
          }}
        />
        <Route
          path="/projects/myProjects/profileMedia/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <MediaPersonProfile id={id} />;
          }}
        />
        <Route
          path="/projects/:nameBloggerPage/profileAdvertiser/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <AdvertiserPersonProfile id={id} />;
          }}
        />
        <Route
          path="/profileMediaEdit"
          exact
          component={MediaPersonProfileEdit}
        />
        <Route
          path="/profileAdvertiser"
          exact
          component={AdvertiserPersonProfile}
        />
        <Route
          path="/profileAdvertiserEdit"
          exact
          component={AdvertiserPersonProfileEdit}
        />
        <Route path="/projects/:selectProjects" exact component={Orders} />
        <Route
          path="/projects/:selectProjects/:id"
          exact
          render={({ match }) => {
            const { id } = match.params;
            return <Order id={id} />;
          }}
        />
        <Route path="/project" exact component={Order} />
        <Route path="/projectEdit" exact component={OrderEdit} />
        <Route path="/createProjects" exact component={CreateOrder} />
        <Route path="/mediaPersons" exact component={MediaPersons} />
        <Route path="/chat/:chatId"  exact
          render={({ match }) => {
            const { chatId } = match.params;
            return <Chat chatId={chatId} />;
          }}
        />
        <Route path="/chat" exact component={Chat} />
      </Switch>
      <AppFooter />
    </div>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    currentUser: state.profile.currentUser,
  };
};
export default connect(mapStateToProps)(App);
