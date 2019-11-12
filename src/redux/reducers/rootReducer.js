import {combineReducers} from "redux";
import showMenuReducer from "./showMenuReducer";
import playersReducer from "./playersReducer";
import gameReducer from "./gameReducers";

export default combineReducers({
    toggleMenu:showMenuReducer,
    players:playersReducer,
    game:gameReducer,
})