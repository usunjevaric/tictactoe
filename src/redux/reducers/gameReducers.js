const initialState={
    squares: Array(9).fill(null),
    xIsNext: true,
    winns:{
        x:0,
        o:0
    },
};

const gameReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "CLICK_ON_SQUARE":
            return {
                ...state,
                squares: action.payload.squares,
                xIsNext:action.payload.xIsNext
            };
        case "RESET_GAME":
            return{
                ...state,
                squares: initialState.squares,
                xIsNext:state.xIsNext,
            };
        case "WINNER_INCREMET":
            return {
                ...state,
                winns: {
                    ...state.winns,
                    [action.payload]:state.winns[action.payload]+1
                }
            };
        case "NEW_GAME":
            return {
                squares: initialState.squares,
                xIsNext: initialState.xIsNext,
                winns:initialState.winns
            };
        default:
            return state
    }
};

export default gameReducer;