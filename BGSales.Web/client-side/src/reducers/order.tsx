import InitialStateInterfaceOrders from "../interfaces/InitialStateInterfaceOrders";
import { ActionType } from "../interfaces/ActionType";
import { imageSrc } from "../imageRequire";
import ActionInterfaceOrder from "../interfaces/ActionInterfaceOrder";


const initialState: InitialStateInterfaceOrders = {
    orders: [],
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
    nameOrderUrl: "",

};

const reducer = (state = initialState, action: ActionInterfaceOrder) => {
  switch (action.type) {
    case ActionType.ADD_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ActionType.ADD_ORDER:
        return {
          ...state,
          order: action.payload,
        };  
    case ActionType.ADD_NAME_ORDER_URL:
        return {
          ...state,
          nameOrderUrl: action.payload,
        };  
    case ActionType.DELETE_ORDERS:
        return {
          ...state,
          orders: [],
        };           
    default:
      return state;
  }
};

export default reducer;
