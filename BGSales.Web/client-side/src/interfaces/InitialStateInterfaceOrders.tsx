import PartialOrderInformationInterface from "./PartialOrderInformationInterface";
import OrderInterface from "./OrderInterface";

export default interface InitialStateInterfaceOrders{
    orders: Array<PartialOrderInformationInterface>;
    order: OrderInterface;
}