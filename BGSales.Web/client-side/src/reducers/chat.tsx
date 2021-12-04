import InitialStateInterfaceChat from "../interfaces/InitialStateInterfaceChat";
import { ActionType } from "../interfaces/ActionType";
import ActionInterfaceChat from "../interfaces/ActionInterfaceChat";


const initialState:  InitialStateInterfaceChat = {
  chats: [],
  chat: {
    person: {
        userId: "",
        imageUrl: "",
        firstName: "",
        secondName: "",
    },
    messages: [], 
  },
};

const reducer = (state = initialState, action: ActionInterfaceChat) => {
  switch (action.type) {
    case ActionType.ADD_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case ActionType.ADD_CHAT:
      return {
        ...state,
        chat: action.payload,
      };  
    default:
      return state;
  }
};

export default reducer;
