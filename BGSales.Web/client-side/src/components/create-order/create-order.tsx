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
    audienceAge: "0",
    description: "",
    budget: "0",
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    let errorFlag = false;
    for (let item in form) {
      if (form[item] === "") {
        errorFlag = true;
      }
    }
    if (!Number(form["audienceAge"]) || !Number(form["budget"])) {
      errorFlag = true;
    }
    const newOrder = {
      title: String(form.title),
      audienceAge: Number(form.audienceAge),
      description: String(form.description),
      budget: Number(form.budget),
    };
    if (!errorFlag) {
      dispatch(postOrder(newOrder, userId));
      setForm({ ...form, title: "" });
      history.goBack();
    }
  };
  if (role !== "Businessman") {
    return <p>Error this page is not available</p>;
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="order-create-form">
          <div className="order-create-form__col-1">
            <h2>Project create</h2>
            <div className="container">
              <label className="container__label">Title</label>
              <TextField
                defaultValue={form.title}
                variant="outlined"
                error={form.title === ""}
                onChange={(e: any) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>
            <div className="container">
              <label className="container__label">Audience Age</label>
              <TextField
                defaultValue={form.audienceAge}
                variant="outlined"
                error={!form.audienceAge || !Number(form.audienceAge)}
                onChange={(e: any) =>
                  setForm({ ...form, audienceAge: e.target.value })
                }
              />
            </div>
            <div className="container">
              <label className="container__label">Budget</label>
              <TextField
                defaultValue={form.budget}
                variant="outlined"
                error={!form.budget || !Number(form.budget)}
                onChange={(e: any) =>
                  setForm({ ...form, budget: e.target.value })
                }
              />
            </div>
            <div className="container">
              <label className="container__label">Description</label>
              <textarea
                className="container__text"
                name="message"
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="button-save">
          <Button type="submit" variant="contained">
            Save
          </Button>
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
