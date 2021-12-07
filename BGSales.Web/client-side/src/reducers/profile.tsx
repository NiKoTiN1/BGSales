import InitialStateInterface from "../interfaces/InitialStateInterface";
import ActionInterface from "../interfaces/ActionInterface";
import { ActionType } from "../interfaces/ActionType";
import { imageSrc } from "../imageRequire";

const initialState: InitialStateInterface = {
  currentUser: {
    role: "",
    profile: {
      userId: "",
      imageUrl: "",
      nickname: "",
      chatId: "",
      firstName: "",
      secondName: "",
      urlYouTube: "",
      ordersCompleted: 0,
      activity: "",
      subjects: "",
      subscribers: 0,
      ageAudience: 0,
      nameCompany: "",
      ordersCount: 0,
    },
    money: 0,
    orders: [],
  },
  selectedProfile: {
    userId: "",
    imageUrl: "",
    chatId: "",
    nickname: "",
    firstName: "",
    secondName: "",
    urlYouTube: "",
    ordersCompleted: 0,
    activity: "",
    subjects: "",
    subscribers: 0,
    ageAudience: 0,
    nameCompany: "",
    ordersCount: 0,
  },
  checkUser: false,
  allMediaPersons: [],
};

const reducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case ActionType.ADD_CHECK:
      return {
        ...state,
        checkUser: action.payload,
      };
    case ActionType.CHANGE_PROFILE:
      return {
        ...state,
        currentUser: { ...state.currentUser, profile: action.payload },
      };
    case ActionType.ADD_PARTIAL_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          money: action.partProfile.money,
          profile: {
            ...state.currentUser.profile,
            userId: action.partProfile.userId,
            imageUrl: action.partProfile.imageUrl,
          },
        },
      };
    case ActionType.ADD_ROLE:
      return {
        ...state,
        currentUser: { ...state.currentUser, role: action.payload },
      };
    case ActionType.ADD_MEDIA_PERSONS:
      return {
        ...state,
        allMediaPersons: action.payload,
      };
    case ActionType.ADD_SELECTED_PROFILE:
      return {
        ...state,
        selectedProfile: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
