import ChatInterface from "./ChatInterface";

export default interface ActionInterfaceOrder {
    type: string;
    payload: Array<ChatInterface>;
}
  