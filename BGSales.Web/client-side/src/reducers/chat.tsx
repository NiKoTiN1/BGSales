import InitialStateInterfaceChat from "../interfaces/InitialStateInterfaceChat";
import { ActionType } from "../interfaces/ActionType";
import ActionInterfaceChat from "../interfaces/ActionInterfaceChat";
interface PersonInterface{
    userId: string;
    imageUrl: string;
    firstName: string;
    secondName: string;
}
interface MessagesInterface{
    userId: string;
    messageId: string;
    text: string;
    sentTime: string;
}
export default interface FullChatInterface{
    person: PersonInterface,
    messages: Array<MessagesInterface>,
}
const initialState:  InitialStateInterfaceChat = {
  chats: [],
  chat: {
    person: {
        userId: "",
        imageUrl: "",
        firstName: "",
        secondName: "",
    },
    messages: [
        {
            userId: "",
            messageId: "",
            text: "",
            sentTime: "",
        }
    ], 
  },
};

const reducer = (state = initialState, action: ActionInterfaceChat) => {
  switch (action.type) {
    case ActionType.ADD_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
