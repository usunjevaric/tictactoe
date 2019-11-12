const initialState={
    showMenu:true,
    darkTheme:false
};

const showMenuReducer=(state=initialState,action)=>{
  switch (action.type) {
      case "TOGGLE_MENU":
          return{
              ...state,
              showMenu:!state.showMenu
          };
      case "SWITCH_MENU":
          return {
            ...state,
            darkTheme: !state.darkTheme
          };
      default:
              return state
  }
};

export default showMenuReducer