import AdvertiserInterface from "./AdvertiserInterface";
import PartialMediaProfileInterface from "./PartialMediaProfileInterface";

export default interface OrderInterface {
  orderId: string;
  bloggerRequests: Array<string>;
  blogger: PartialMediaProfileInterface;
  title: string;
  description: string;
  budget: number;
  audienceAge: number;
  createDate: string;
  advitiser: AdvertiserInterface;
}
