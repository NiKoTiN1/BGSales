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

const CreateOrder = ({
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
    const userProfile = {
      title: String(form.title),
      audienceAge:  Number(form.audienceAge),
      description:  String(form.description),
      budget:  Number(form.budget),
      createDate:  String(form.createDate),
    };
    if (!errorFlag) {
      dispatch(postOrder(userProfile));
      history.push("/myProjects");
    }
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <div className="media-profile-form">
          <div className="media-profile-form__col-1">
            <h2>Project create</h2>
            <div>
              <TextField
                label="Title"
                defaultValue={form.title}
                variant="outlined"
                error={form.title === ""}
                onChange={(e: any) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Audience Age"
                defaultValue={form.audienceAge}
                variant="outlined"
                error={form.audienceAge === ""}
                onChange={(e: any) =>
                  setForm({ ...form, audienceAge: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Description"
                defaultValue={form.description}
                variant="outlined"
                error={form.description === ""}
                onChange={(e: any) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="container">
              <TextField
                label="Budget"
                defaultValue={form.budget}
                variant="outlined"
                error={form.budget === ""}
                onChange={(e: any) =>
                  setForm({ ...form, budget: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <Button className="button-save" type="submit" variant="contained">
          Apply changes
        </Button>
      </form>
    </>
  );
};
const mapStateToProps = (state: StateInterface) => {
  return {
    order: state.order.order,
  };
};
export default connect(mapStateToProps)(CreateOrder);
