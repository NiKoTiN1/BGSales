import ChatInterface from "./ChatInterface";
import FullChatInterface from "./FullChatInterface";

export default interface ActionInterfaceOrder {
    type: string;
    payload: Array<ChatInterface> | FullChatInterface;
}
  