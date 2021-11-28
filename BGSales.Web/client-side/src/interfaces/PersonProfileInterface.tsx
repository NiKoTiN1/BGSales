import CurrentUserInterface from "./CurrentUserInterface";
import UserProfileInterface from "./UserProfileInterface";

export default interface PersonProfileInterface {
  dispatch: Function;
  profile: UserProfileInterface;
  selectedProfile: UserProfileInterface;
  id: string;
  role: string;
}
