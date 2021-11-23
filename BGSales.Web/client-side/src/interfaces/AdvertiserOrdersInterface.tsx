import CurrentUserInterface from "./CurrentUserInterface";
import HistoryPropsInterface from "./HistoryPropsInterface";
import PartialOrderInformationInterface from "./PartialOrderInformationInterface";

export default interface AdvertiserOrdersInterface{
    ordersAdvertiser: Array<PartialOrderInformationInterface>;
    dispatch: Function;
    currentUser: CurrentUserInterface;
    history: HistoryPropsInterface;
}