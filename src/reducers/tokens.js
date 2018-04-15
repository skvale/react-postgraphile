import { getCookie } from "src/utils/cookies";

const SET_TOKEN = "SET_TOKEN";

export const setToken = payload => ({
  type: SET_TOKEN,
  payload
});

const initialState = {
  token: getCookie("jwt_token")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      if (!action.payload) {
        return {
          ...initialState
        };
      }
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};
