/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { postOrder } from "../../actions";
import "./create-order.scss";
import FormInterface from "../../interfaces/FormInterface";
import CreateOrderInterface from "../../interfaces/CreateOrderInterface";
import StateInterface from "../../interfaces/StateInterface";
import { TextareaAutosize } from "@material-ui/core";
import { assetList } from "../../assets";

const CreateOrder = ({
  dispatch,
  order,
  history,
  userId,
  nameOrderUrl,
  role,
}: CreateOrderInterface) => {
  const [form, setForm] = useState<FormInterface>({
    title: "",
    audienceAge: "",
    description: "",
    budget: "",
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
      title: String(form.title),
      audienceAge: Number(form.audienceAge),
      description: String(form.description),
      budget: Number(form.budget),
    };
    if (allCorrect) {
      dispatch(postOrder(newOrder, userId));
      setForm({ ...form, title: "" });
      history.goBack();
    }
  };

  if (role !== "Businessman") {
    history.push("/error");
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="order-create-form">
          <div className="order-create-form__col-1">
            <h2>Project create</h2>
            <div className="container">
              <input
                className={errorEmptyTitle ? "warning" : ""}
                defaultValue={form.title}
                placeholder="Title"
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
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="button-save">
          <button type="submit">Save</button>
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
export default connect(mapStateToProps)(CreateOrder);
