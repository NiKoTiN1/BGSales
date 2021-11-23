import AdvertiserInterface from "./AdvertiserInterface";

export default interface OrderInterface {
    orderId: string,
    bloggerRequests: Array<string>,
    blogger: number,
    title: string;
    description: string;
    budget: number;
    audienceAge: number;
    createDate: string;
    advitiser: AdvertiserInterface;
}