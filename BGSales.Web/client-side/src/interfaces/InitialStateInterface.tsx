import CurrentUserInterface from "./CurrentUserInterface";
import PartialMediaProfileInterface from "./PartialMediaProfileInterface";
import UserProfileInterface from "./UserProfileInterface";

export default interface InitialStateInterface {
  currentUser: CurrentUserInterface;
  checkUser: boolean;
  allMediaPersons: Array<PartialMediaProfileInterface>;
  selectedProfile: UserProfileInterface;
}
