export const updatePlayerX=player=>{
  return{
      type:"CHANGE_NAME_PLAYER_X",
      payload:player
  }
};

export const updatePlayerO=player=>{
    return{
        type:"CHANGE_NAME_PLAYER_O",
        payload:player
    }
};
