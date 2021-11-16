import UserProfileInterface from "./UserProfileInterface";
import PartialProfileInterface from "./PartialProfileInterface";

export default interface ActionInterface {
  type: string;
  payload: boolean | UserProfileInterface | string;
  partProfile: PartialProfileInterface;
}
