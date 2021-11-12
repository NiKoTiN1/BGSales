import UserProfileInterface from "./UserProfileInterface";

export default interface ActionInterface {
  type: string;
  payload: boolean | UserProfileInterface;
}
