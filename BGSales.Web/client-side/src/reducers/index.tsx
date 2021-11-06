const initialState: any= {
    currentUser: [],
    checkUser: false
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'PROFILE_USER':
            return {
                ...state,
                currentUser: action.payload,
            } 
        case 'ADD_CHECK':
            return {
                ...state,
                checkUser: action.payload
            }        
        default: 
            return state;
    }
}

export default reducer;