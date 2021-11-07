import InitialStateInterface from '../interfaces/InitialStateInterface';
import ActionInterface from '../interfaces/ActionInterface';
import {ActionType} from '../interfaces/ActionType';

const initialState: InitialStateInterface= {
    checkUser: false
}

const reducer = (state = initialState, action: ActionInterface) => {
    switch (action.type) {
        case ActionType.ADD_CHECK:
            return {
                ...state,
                checkUser: action.payload
            }        
        default: 
            return state;
    }
}

export default reducer;