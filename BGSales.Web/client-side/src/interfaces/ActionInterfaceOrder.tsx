import OrderInterface from "./OrderInterface";
import PartialOrderInformationInterface from "./PartialOrderInformationInterface";

export default interface ActionInterfaceOrder {
    type: string;
    payload: PartialOrderInformationInterface | OrderInterface | string;
}