import CurrentUserInterface from "./CurrentUserInterface";

export default interface PartialAdvertiserOrderInterface {
  id: string;
  orderId: string;
  companyName: string;
  title: string;
  currentUser: CurrentUserInterface;
  budget: number;
  requests: number;
  dispatch: Function;
  onItemSelected: Function;
}
