import axios from "axios";
import { FETCH_USER } from "./types";

// Gets the user of person who is currently logged in
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};
