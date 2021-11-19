import UserProfileInterface from "./UserProfileInterface";

export default interface CurrentUserInterface {
  role: string;
  profile: UserProfileInterface;
  money: number;
  orders: [];
}
