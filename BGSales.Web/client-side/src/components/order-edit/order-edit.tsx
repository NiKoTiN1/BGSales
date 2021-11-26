/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { putOrder } from "../../actions";
import "./order-edit.scss";
import FormInterface from "../../interfaces/FormInterface";
import CreateOrderInterface from "../../interfaces/CreateOrderInterface";
import StateInterface from "../../interfaces/StateInterface";

const OrderEdit = ({
  dispatch,
  order,
  history,
}: CreateOrderInterface) => {
  const [form, setForm] = useState<FormInterface>({
    title: order.title,
    audienceAge:  `${order.audienceAge}`,
    description:  order.description,
    budget:  `${order.budget}`,
    createDate: order.createDate? order.createDate: String(new Date()),
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    let errorFlag = false;
    for (let item in form) {
      if (form[item] === "") {
        errorFlag = true;
      }
    }
    const orderNew = {
      orderId: order.orderId,
      title: String(form.title),
      audienceAge:  Number(form.audienceAge),
      description:  String(form.description),
      budget:  Number(form.budget),
      updateDate:  String(new Date()),
    };
    if (!errorFlag) {
      dispatch(putOrder(orderNew));
      history.goBack();
    }
  };
  return (
    <>
       <form onSubmit={submitForm}>
        <div className="order-create-form">
          <div className="order-create-form__col-1">
            <h2>Project adit</h2>
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
                error={form.audienceAge === ""}
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
                error={form.budget === ""}
                onChange={(e: any) =>
                  setForm({ ...form, budget: e.target.value })
                }
              />
            </div>
            <div className="container">
              <label className="container__label">Description</label>
              <textarea className="container__text" name="message" value={String(form.description)} onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }>
              </textarea>
            </div>
          </div>
        </div>
        <div className="button-save">
          <Button type="submit" variant="contained">
            Apply changes
          </Button>
        </div>
      </form>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
  };
};
export default connect(mapStateToProps)(OrderEdit);
