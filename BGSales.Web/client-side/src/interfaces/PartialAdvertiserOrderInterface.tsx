export default interface PartialAdvertiserOrderInterface{
    id: string;
    orderId: string;
    companyName: string;
    title: string;
    budget: number;
    requests: number;
    dispatch: Function;
    onItemSelected: Function;
}