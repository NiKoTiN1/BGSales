import React from "react";
import { assetList } from "../../assets";
import "./app-footer.scss";

const AppFooter = () => {
  return (
    <div className="footer">
      <label className="footer__label">The best project</label>
      <label className="footer__label">rodinhatskevich@gmail.com</label>
      <label className="footer__label">
        &#169; Gatskevich Rodion, Biletsky Nikita
      </label>
      <div className="footer__background-images">
        <img src={assetList.groupImg} />
      </div>
    </div>
  );
};

export default AppFooter;
