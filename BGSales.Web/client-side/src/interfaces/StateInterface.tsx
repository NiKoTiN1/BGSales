import InitialStateInterface from "./InitialStateInterface";
import InitialStateInterfaceOrders from "./InitialStateInterfaceOrders";

export default interface StateInterface {
  profile: InitialStateInterface;
  order: InitialStateInterfaceOrders;
}
