const initialState: any= {
    currentUser: [],
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'REGISTR_USER':
            return {
                ...state,
                currentUser: action.payload,
            } 
        default: 
            return state;
    }
}

export default reducer;