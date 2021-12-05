import MessagesInterface from "./MessagesInterface";
import PersonInterface from "./PersonInterface";

export default interface FullChatInterface{
    person: PersonInterface,
    messages: Array<MessagesInterface>,
}