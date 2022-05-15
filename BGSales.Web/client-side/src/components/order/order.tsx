import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./order.scss";
import { Button } from "@material-ui/core";
import PersonProfileInterface from "../../interfaces/PersonProfileInterface";
import { imageSrc } from "../../imageRequire";
import StateInterface from "../../interfaces/StateInterface";
import {
  deleteOrder,
  getOrder,
  joinChat,
  payOrder,
  postOrderReqest,
} from "../../actions";
import OrderInterface from "../../interfaces/OrderInterface";
import AdvertiserInterface from "../../interfaces/AdvertiserInterface";
import MediaPersonsIterface from "../../interfaces/MediaPersonsIterface";
import PartialMediaPersonOrder from "../partial-media-person-order";
import HistoryPropsInterface from "../../interfaces/HistoryPropsInterface";
import UserProfileInterface from "../../interfaces/UserProfileInterface";
import history from "../../history";
import { assetList } from "../../assets";
import PartialMediaPerson from "../partial-media-person";

interface OrderProps {
  id: string;
  dispatch: Function;
  order: OrderInterface;
  role: string;
  profile: UserProfileInterface;
  selectedProfile: UserProfileInterface;
}
const Order = ({
  id,
  order,
  dispatch,
  role,
  profile,
  selectedProfile,
}: OrderProps) => {
  useEffect(() => {
    dispatch(getOrder(id));
  }, [order.isPaid]);

  const [visibleAuthor, setVisibleAuthor] = useState(false);
  const [checkedAccept, setCheckedAccept] = useState(true);

  const removeOrder = () => {
    dispatch(deleteOrder(profile.userId, order.orderId));
  };

  const elements = order.bloggerRequests.map((item: any) => {
    return (
      <li key={item.userId} className="blogger-select">
        <PartialMediaPersonOrder
          checked={true}
          orderId={order.orderId}
          {...item}
        />
      </li>
    );
  });
  if (role === "") {
    history.push("/error");
  }
  const chekedChatId = () => {
    if (!order.chatId) {
      dispatch(joinChat(profile.userId, order.advitiser.userId));
    } else {
      history.push(`/chat/${order.chatId}`);
    }
  };
  return (
    <div className="container">
      <div className="order">
        <div className="information">
          <div className="information__name-title ">
            <p>{order.title}</p>
          </div>
          <div className="information__name">
            <p>Budget: {order.budget ? order.budget + "$" : "Not specified"}</p>
            <p>
              AudienceAge:{" "}
              {order.audienceAge ? order.audienceAge : "Not specified"}
            </p>
            <p>Name Company: {order.advitiser.nameCompany}</p>
          </div>
          <div className="information__name-description">
            <p className="information__name-description__title">About:</p>
            <p>{order.description}</p>
          </div>
        </div>

        <div>
          {role === "Businessman" ? (
            <div className="order__buttons">
              <Link
                className="order__buttons__bin"
                to="/projects/myProjects"
                onClick={removeOrder}
              >
                <img src={assetList.bin} />
              </Link>
              <Link className="order__buttons__edit" to="/projectEdit">
                <img src={assetList.edit} />
              </Link>
            </div>
          ) : (
            <div>
              <div className="order__buttons-media">
                <Link
                  className="order__buttons-media__link"
                  to={`profileAdvertiser/${order.advitiser.userId}`}
                >
                  Look the advertiser
                </Link>
                <button
                  className="order__buttons-media__btn"
                  onClick={chekedChatId}
                >
                  Write message
                </button>
              </div>
                {role === "Businessman" ? null : window.location.href.search("selectedProjects") === -1 && checkedAccept &&
                !order.blogger ? (
                <button
                  className="order__btn-respond"
                  onClick={() => {
                    dispatch(postOrderReqest(profile.userId, id));
                    setCheckedAccept(false);
                  }}
                >
                  <p>Respond</p>
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
      {role === "Businessman" ? (
        <div className="container-blogger">
          <div>
            {order.blogger ? (
              <>
                <button
                  className="container-blogger__btn-author"
                  onClick={() => setVisibleAuthor(!visibleAuthor)}
                >
                  <p>Author</p>
                  <img
                    src={visibleAuthor ? assetList.backTrue : assetList.back}
                  />
                </button>
                {visibleAuthor ? (
                  <div>
                    <div className="container-blogger__accept">
                      <PartialMediaPerson
                        {...order.blogger}
                        onItemSelected={(id: string) => {
                          history.push(`profileMedia/${id}`);
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div>
                <p className="container-blogger__title">
                  Responses: {order.bloggerRequests.length}
                </p>
                <ul className="container-blogger__media-person-ul">
                  {elements}
                </ul>
              </div>
            )}
          </div>
          {!order.isPaid && order.blogger ? (
            <div className="container-blogger__pay">
              <p className="container-blogger__pay__text-pay">Payment</p>
              <div className="container-blogger__pay__wrap">
                <button
                  className="container-blogger__pay__btn-pay"
                  onClick={() =>
                    dispatch(payOrder(order.stripeId, order.orderId))
                  }
                >
                  Pay order
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
    profile: state.profile.currentUser.profile,
    selectedProfile: state.profile.selectedProfile,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(Order);
