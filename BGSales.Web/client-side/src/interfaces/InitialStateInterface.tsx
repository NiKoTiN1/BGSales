import CurrentUserInterface from "./CurrentUserInterface";
import PartialMediaProfileInterface from "./PartialMediaProfileInterface";

export default interface InitialStateInterface {
  currentUser: CurrentUserInterface;
  checkUser: boolean;
  allMediaPersons: Array<PartialMediaProfileInterface>;
}
