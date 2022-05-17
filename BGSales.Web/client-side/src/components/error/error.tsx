import React from "react";
import { Link } from "react-router-dom";
import { assetList } from "../../assets";

import "./error.scss";

const Error = () => {
  return (
    <div className="container-error">
      <img src={assetList.error} />
      <p>Error this page is not available</p>
    </div>
  );
};

export default Error;
