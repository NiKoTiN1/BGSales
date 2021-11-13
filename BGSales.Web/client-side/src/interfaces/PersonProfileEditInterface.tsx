import CurrentUserInterface from "../interfaces/CurrentUserInterface";
import HistoryPropsInterface from "../interfaces/HistoryPropsInterface";

export default interface PersonProfileEditInterface {
  dispatch: Function;
  currentUser: CurrentUserInterface;
  history: HistoryPropsInterface;
}
