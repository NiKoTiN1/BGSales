export default interface PartialMediaProfileInterface {
  userId: string;
  imageUrl: string | ArrayBuffer | null;
  nickname: string;
  firstName: string;
  secondName: string;
  activity: string;
  numberSubscribers: number | string;
}
