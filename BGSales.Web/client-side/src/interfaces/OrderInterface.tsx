import AdvertiserInterface from "./AdvertiserInterface";
import PartialMediaProfileInterface from "./PartialMediaProfileInterface";

export default interface OrderInterface {
  orderId: string;
  chatId: string;
  bloggerRequests: Array<string>;
  blogger: PartialMediaProfileInterface;
  title: string;
  description: string;
  budget: number;
  audienceAge: number;
  createDate: string;
  advitiser: AdvertiserInterface;
  isPaid: boolean;
  stripeId: string; 
}
