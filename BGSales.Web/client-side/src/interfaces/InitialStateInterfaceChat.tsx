import ChatInterface from "./ChatInterface";
import FullChatInterface from "./FullChatInterface";

export default interface InitialStateInterfaceChat {
  chats: Array<ChatInterface>;
  chat: FullChatInterface;
}
