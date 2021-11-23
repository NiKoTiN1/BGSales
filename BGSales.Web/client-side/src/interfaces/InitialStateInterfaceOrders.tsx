import PartialOrderInformationInterface from "./PartialOrderInformationInterface";
import OrderInterface from "./OrderInterface";

export default interface InitialStateInterfaceOrders{
    ordersAdvertiser: Array<PartialOrderInformationInterface>;
    order: OrderInterface;
}