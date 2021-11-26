import UserProfileInterface from "./UserProfileInterface";
import PartialProfileInterface from "./PartialProfileInterface";
import PartialMediaProfileInterface from "./PartialMediaProfileInterface";

export default interface ActionInterface {
  type: string;
  payload: boolean | UserProfileInterface | string | Array<PartialMediaProfileInterface>;
  partProfile: PartialProfileInterface;
}
