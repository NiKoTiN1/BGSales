import MessagesInterface from "./MessagesInterface";
import PersonInterface from "./PersonInterface";

export default interface FullChatInterface {
  recivierInfo: PersonInterface;
  messages: Array<MessagesInterface>;
}
