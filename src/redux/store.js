import { createStore, combineReducers } from "redux";
import { gameReducer as game } from "./game/reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
  game
});

let store = createStore(
  rootReducer,
  devToolsEnhancer({ trace: true })
);

export default store;
