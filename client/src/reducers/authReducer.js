import { FETCH_USER } from "../actions/types";

// Returning null bc by default, we don't know if user is logged in
const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      // Returns user's data or false when fetchUser() is called to determine
      // whether a user is logged in or not
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
