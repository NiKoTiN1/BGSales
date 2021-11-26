import React from "react";
import { Link } from "react-router-dom";
import "./main.scss";

const Main = () => {
  return (
    <>
      <div className="cards">
        <div className="card-1 card">
          <div className="card-1__image image">
            <div className="data">
              <div className="content">
                <h1 className="title">
                  Our application was launched - the best application in the CIS
                </h1>
                <p className="text">
                  This application will help to find income for bloggers, as well as help the customer with advertising.
                  Using this app you can't go wrong with your choice!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-2 card">
          <div className="card-2__image image">
            <div className="data">
              <div className="content">
                <h1 className="title">
                   Project forecast
                </h1>
                <p className="text">
                Using this site you can find a large number of orders if you are a blogger, 
                and quickly get advertising if you are a customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info">
        <label className="info__label">
          Thanks to this site, many media personalities were able to get decent
          pay, and advertisers gained new customers through advertising media
          personalities.
        </label>
      </div>
      <div className="button-container">
        <Link className="button-container__pressed" to="/authorization">
          Start now
        </Link>
      </div>
    </>
  );
};

export default Main;
