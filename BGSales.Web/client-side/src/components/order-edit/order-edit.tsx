/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { postOrder, putOrder } from "../../actions";
import "../create-order/create-order.scss";
import FormInterface from "../../interfaces/FormInterface";
import CreateOrderInterface from "../../interfaces/CreateOrderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { TextareaAutosize } from "@material-ui/core";
import { assetList } from "../../assets";
import Error from "../error";

const OrderEdit = ({
  dispatch,
  order,
  history,
  userId,
  nameOrderUrl,
  role,
}: CreateOrderInterface) => {
  const [form, setForm] = useState<FormInterface>({
    title: order.title,
    audienceAge: `${order.audienceAge}`,
    description: order.description,
    budget: `${order.budget}`,
    createDate: order.createDate ? order.createDate : String(new Date()),
  });
  const [warningAge, setWarningAge] = useState(false);
  const [warningBudget, setWarningBudget] = useState(false);
  const [errorEmptyTitle, setErrorEmptyTitle] = useState(false);
  const [errorEmptyAge, setErrorEmptyAge] = useState(false);
  const [errorEmptyBudget, setErrorEmptyBudget] = useState(false);

  const submitForm = (e: any) => {
    e.preventDefault();
    let allCorrect = true;
    setWarningAge(false);
    setWarningBudget(false);
    setErrorEmptyTitle(false);
    setErrorEmptyAge(false);
    setErrorEmptyBudget(false);

    if (form["title"] === "") {
      setErrorEmptyTitle(true);
      allCorrect = false;
    }
    if (form["audienceAge"] === "") {
      setErrorEmptyAge(true);
      allCorrect = false;
    } else if (!Number(form["audienceAge"])) {
      setWarningAge(true);
      allCorrect = false;
    }
    if (form["budget"] === "") {
      setErrorEmptyBudget(true);
      allCorrect = false;
    } else if (!Number(form["budget"])) {
      setWarningBudget(true);
      allCorrect = false;
    }

    const newOrder = {
      orderId: order.orderId,
      title: String(form.title),
      audienceAge: Number(form.audienceAge),
      description: String(form.description),
      budget: Number(form.budget),
      updateDate: String(new Date()),
    };
    if (allCorrect) {
      dispatch(putOrder(newOrder));
      history.goBack();
    }
  };

  if (role !== "Businessman") {
    return <Error />;
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="order-create-form">
          <div className="order-create-form__col-1">
            <h2>Project adit</h2>
            <div className="container">
              <input
                className={errorEmptyTitle ? "warning" : ""}
                defaultValue={form.title}
                placeholder="Title"
                value={form.title}
                onChange={(e: any) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              {errorEmptyTitle ? (
                <>
                  <div className="container__error-image">
                    <img src={assetList.info} />
                  </div>
                  <div className="container__error-text">
                    The field cannot be empty
                  </div>
                </>
              ) : null}
            </div>
            <div className="container">
              <input
                className={errorEmptyAge || warningAge ? "warning" : ""}
                value={form.audienceAge}
                placeholder="Audience age"
                onChange={(e: any) =>
                  setForm({ ...form, audienceAge: e.target.value })
                }
              />
              {errorEmptyAge || warningAge ? (
                <>
                  <div className="container__error-image">
                    <img src={assetList.info} />
                  </div>
                  <div
                    className={
                      warningAge
                        ? "container__warning-text"
                        : "container__error-text"
                    }
                  >
                    {errorEmptyAge
                      ? "The field cannot be empty"
                      : "The field must be a number"}
                  </div>
                </>
              ) : null}
            </div>
            <div className="container">
              <input
                className={errorEmptyBudget || warningBudget ? "warning" : ""}
                value={form.budget}
                placeholder="Budget"
                onChange={(e: any) =>
                  setForm({ ...form, budget: e.target.value })
                }
              />
              {errorEmptyBudget || warningBudget ? (
                <>
                  <div className="container__error-image">
                    <img src={assetList.info} />
                  </div>
                  <div
                    className={
                      warningBudget
                        ? "container__warning-text"
                        : "container__error-text"
                    }
                  >
                    {errorEmptyBudget
                      ? "The field cannot be empty"
                      : "The field must be a number"}
                  </div>
                </>
              ) : null}
            </div>
            <div className="container">
              <textarea
                className="container__text"
                placeholder="Description"
                name="message"
                value={String(form.description)}
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="button-save">
          <button type="submit">Apply changes</button>
        </div>
      </form>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
    nameOrderUrl: state.order.nameOrderUrl,
    userId: state.profile.currentUser.profile.userId,
    role: state.profile.currentUser.role,
  };
};
export default connect(mapStateToProps)(OrderEdit);
