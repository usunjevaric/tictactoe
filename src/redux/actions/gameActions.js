export const resetGame=()=>{
    return{
        type:"RESET_GAME",
    }
};

export const incrementWinn=(winner)=>{
    return{
        type:"WINNER_INCREMET",
        payload:winner
    }
};

export const clickOnSquare=(obj)=>{
    return{
        type:"CLICK_ON_SQUARE",
        payload:obj
    }
};

export const newGame=()=>{
    return{
        type:"NEW_GAME"
    }
};