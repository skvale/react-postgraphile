const SET_USER = "SET_USER";

export const setUser = payload => ({
  type: SET_USER,
  payload
});

const initialState = {
  user: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      if (!action.payload) {
        return {
          ...initialState
        };
      }
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
