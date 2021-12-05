import ChatInterface from "./ChatInterface";
import FullChatInterface from "./FullChatInterface";
import MessagesInterface from "./MessagesInterface";

export default interface ActionInterfaceOrder {
    type: string;
    payload: Array<ChatInterface> | FullChatInterface | MessagesInterface;
}
  