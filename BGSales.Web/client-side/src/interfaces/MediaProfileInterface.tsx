export default interface MediaProfileInterface {
  userId: string;
  imageUrl: string | ArrayBuffer | null;
  nickname: string;
  firstName: string;
  secondName: string;
  ageAdvertising: string;
  linkChannel: string;
  activity: string;
  subjects: string;
  numberSubscribers: number | string;
  ageAudience: number | string;
}
