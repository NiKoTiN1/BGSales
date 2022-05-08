import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { assetList } from "../../assets";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./main.scss";
import { connect } from "react-redux";
import StateInterface from "../../interfaces/StateInterface";

interface MainPropsInterface {
  checkUser: boolean;
}

const Main = ({ checkUser }: MainPropsInterface) => {
  return (
    <>
      <p className="text-info">
        Thanks to the site, many media personalities where abele to get decent
        pay, and advertisers gaind new costomers throught advertising media
        personalities
      </p>
      <div className="line"></div>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={assetList.imageInfoFirst} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assetList.imageInfoSecond} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assetList.imageInfoFirst} />
        </SwiperSlide>
      </Swiper>
      {checkUser ? null : (
        <>
          <div className="info">
            <label className="info__label">Sign up to see more</label>
          </div>
          <div className="button-container">
            <Link className="button-container__pressed" to="/authorization">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: StateInterface) => {
  return {
    checkUser: state.profile.checkUser,
  };
};

export default connect(mapStateToProps)(Main);
