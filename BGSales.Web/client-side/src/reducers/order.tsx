import InitialStateInterfaceOrders from "../interfaces/InitialStateInterfaceOrders";
import { ActionType } from "../interfaces/ActionType";
import { imageSrc } from "../imageRequire";
import ActionInterfaceOrder from "../interfaces/ActionInterfaceOrder";


const initialState: InitialStateInterfaceOrders = {
    ordersAdvertiser: [],
    order: {
      orderId: "",
      bloggerRequests: [],
      blogger: 0,
      title: "",
      description: "",
      budget: 0,
      audienceAge: 0,
      createDate: "",
      advitiser: {
        userId: "",
        imageUrl: "",
        firstName: "",
        secondName: "",
        nameCompany: "",
        ordersCount: 0,
      }
    },

};

const reducer = (state = initialState, action: ActionInterfaceOrder) => {
  switch (action.type) {
    case ActionType.ADD_ORDERS_ADVERTISER:
      return {
        ...state,
        ordersAdvertiser: action.payload,
      };
    case ActionType.ADD_ORDER:
        return {
          ...state,
          order: action.payload,
        };  
    default:
      return state;
  }
};

export default reducer;
