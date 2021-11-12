import InitialStateInterface from "../interfaces/InitialStateInterface";
import ActionInterface from "../interfaces/ActionInterface";
import { ActionType } from "../interfaces/ActionType";
import { imageSrc } from "../imageRequire";

const initialState: InitialStateInterface = {
  currentUser: {
    role: "Businessman",
    profile: {
      imageUrl: imageSrc,
      firstName: "Rodion",
      secondName: "Gatskevich",
      ageAdvertising: "2",
      linkChannel: "https://vk.com/rgatskevich",
      ordersCompleted: 1,
      activity: "1",
      subjects: "1",
      numberSubscribers: 1,
      ageAudience: "1",
      nameCompany: "w",
      numberOffers: 1,
    },
    orders: [],
  },
  checkUser: false,
};

const reducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case ActionType.ADD_CHECK:
      return {
        ...state,
        checkUser: action.payload,
      };
    case ActionType.CHANGE_PROFILE:
      return {
        ...state,
        currentUser: { ...state.currentUser, profile: action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
