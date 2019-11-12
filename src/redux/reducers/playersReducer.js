const initialState={
        playerX:'Player1',
        playerO:'Player2'
};
const playersReducer=(state=initialState, action)=>{
    switch (action.type) {
        case "CHANGE_NAME_PLAYER_X":
            return {
                ...state,
                playerX:action.payload
            };
        case "CHANGE_NAME_PLAYER_O":
            return{
                ...state,
                playerO:action.payload
            };
        default:
            return state;
    }
};

export default playersReducer;
