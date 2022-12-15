/**
 *  Error messages state changing is still pending
 */

import createDataContext from "./createDataContext";
import yuvaOneApi from "../api/yuvaOneApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_info":
      return { ...state, account_info: action.payload };
    case "add_edit_function":
      return { ...state };
    case "set_refresh_id":
      return { ...state, refreshId: new Date().getTime().toString() };
    default:
      return state;
  }
};

const addAccountDetails = (dispatch) => {
  return async (token, logout) => {
    try {
      const profile = await yuvaOneApi.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "add_info", payload: profile.data });
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.code) {
        if (err.response.data.code === "token_not_valid") {
          logout();
        }
      } else {
        dispatch({ type: "other_errors", payload: "Unable to fetch details" });
      }
    }
  };
};

const setRefreshId = (dispatch) => {
  return () => {
    dispatch({ type: "set_refresh_id" });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { addAccountDetails, setRefreshId },
  { account_info: null, refreshId: null }
);
