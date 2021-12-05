import InitialStateInterface from "./InitialStateInterface";
import InitialStateInterfaceOrders from "./InitialStateInterfaceOrders";
import InitialStateInterfaceChat from "./InitialStateInterfaceChat";

export default interface StateInterface {
  profile: InitialStateInterface;
  order: InitialStateInterfaceOrders;
  chat: InitialStateInterfaceChat;
}
