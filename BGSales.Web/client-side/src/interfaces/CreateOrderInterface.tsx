import OrderInterface from "./OrderInterface";
import HistoryPropsInterface from "./HistoryPropsInterface";

export default interface CreateOrderInterface {
    dispatch: Function;
    order: OrderInterface;
    history: HistoryPropsInterface;
    userId: string;
    nameOrderUrl: string;
}