import CurrentUserInterface from "./CurrentUserInterface";
import HistoryPropsInterface from "./HistoryPropsInterface";
import PartialOrderInformationInterface from "./PartialOrderInformationInterface";

export default interface OrdersInterface {
  orders: Array<PartialOrderInformationInterface>;
  dispatch: Function;
  currentUser: CurrentUserInterface;
  history: HistoryPropsInterface;
  nameOrderUrl: string;
}
