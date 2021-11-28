import CurrentUserInterface from "./CurrentUserInterface";
import HistoryPropsInterface from "./HistoryPropsInterface";
import PartialMediaProfileInterface from "./PartialMediaProfileInterface";

export default interface MediaPersonsIterface {
  allMediaPersons: Array<PartialMediaProfileInterface>;
  dispatch: Function;
  history: HistoryPropsInterface;
  role: string;
}
