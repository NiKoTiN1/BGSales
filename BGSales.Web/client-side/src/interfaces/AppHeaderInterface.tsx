import CurrentUserInterface from "./CurrentUserInterface";

export default interface AppHeaderInterface {
  checkUser: boolean;
  currentUser: CurrentUserInterface;
  dispatch: Function;
}
