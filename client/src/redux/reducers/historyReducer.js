import { HISTORY } from "../types";

const initialState = {
  allHistory: [],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY.GET_ALL_HISTORY:
      console.log("OKOKOKHIHGGFGDYSFKSHAJD", state);
      return {
        ...state,
        allHistory: action.payload,
      };
    default:
      return state;
  }
};

export default historyReducer;
