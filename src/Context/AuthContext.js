import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import yuvaOneApi from "../api/yuvaOneApi";
import { version } from "../../package.json";

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        errorMessage: "",
        token: action.payload.token,
        phoneNumber: action.payload.phoneNumber,
      };
    case "add_mobile":
      return { ...state, phoneNumber: action.payload };
    case "logout":
      return { errorMessage: "", token: null, phoneNumber: "" };
    case "error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    case "is_loading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

/*
here we are trying to login keep the user loggedin. So, first we look in AsyncStorage if token available
we simply login the user.
*/

const tryLocalSignin = (dispatch) => {
  return async (navLink) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const phoneNumber = await AsyncStorage.getItem("phoneNumber");
      const loginDate = await AsyncStorage.getItem("loginDate");
      console.log("Main", phoneNumber);
      if (token !== null && phoneNumber !== null) {
        dispatch({
          type: "login",
          payload: { token: token, phoneNumber: phoneNumber },
        });
      } else {
        navLink.replace("Login");
        dispatch({
          type: "error",
          payload: "Something went wrong with login!",
        });
      }
    } catch (err) {
      dispatch({ type: "error", payload: "Something went wrong with login!" });
    }
  };
};

/* 
Every action( Ex:addPhoneNumber, addBusinessName functions are ideally actions here) recieves the dispatch function
as argument. Then the dispatch function internally be send to our main login function in createDataContext.js
file with bounded action loop. if we want to do any change to our state we can use that dispatch function.
*/

const addPhoneNumber = (dispatch) => {
  return async (phoneNumber, navLink) => {
    try {
      const response = await yuvaOneApi.post("/mobile/add", {
        mobile: phoneNumber,
      });

      navLink.navigate("OTP");
      dispatch({ type: "is_loading", payload: false });
    } catch (err) {
      const resp = err.response.data;
      if (resp.success === false && resp.error_code === "NAME_DOESNT_EXISTS") {
        navLink.navigate("Signup");
      } else if (resp.success === false) {
        dispatch({ type: "error", payload: resp.message });
      }
    }
    dispatch({ type: "add_mobile", payload: phoneNumber });
    dispatch({ type: "is_loading", payload: false });
  };
};

const addBusinessName = (dispatch) => {
  return async (phoneNumber, businessName, bizType, navLink) => {
    try {
      console.log(bizType);
      const resp = await yuvaOneApi.post("/name/add", {
        mobile: phoneNumber,
        business_name: businessName,
        biz_type: bizType,
      });
      navLink.navigate("OTP");
      dispatch({ type: "is_loading", payload: false });
    } catch (err) {
      console.log("Failed to add business user!");
      dispatch({ type: "is_loading", payload: false });
    }
  };
};

const logout = (dispatch) => {
  return async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("loginDate");
      dispatch({ type: "logout" });
    } catch {
      dispatch({
        type: "error",
        payload: "Something went wrong with logging out",
      });
    }
  };
};

const verifyOtp = (dispatch) => {
  return async ({ phoneNumber, otp, appVersion }) => {
    console.log("App version : ", appVersion);
    try {
      const resp = await yuvaOneApi.post("/verify/otp", {
        mobile: phoneNumber,
        otp: otp,
        app_version: version,
      });

      //Store the token and phone in the  AsyncStorage if request is succesfull
      await AsyncStorage.setItem("token", resp.data.access_token);
      await AsyncStorage.setItem("phoneNumber", phoneNumber);
      const loginDate = new Date();
      console.log(loginDate.toString());
      await AsyncStorage.setItem("loginDate", loginDate.toDateString());
      dispatch({
        type: "login",
        payload: { token: resp.data.access_token, phoneNumber },
      });
      dispatch({ type: "is_loading", payload: false });
    } catch (err) {
      dispatch({ type: "error", payload: "Invalid OTP. Please try again." });
      dispatch({ type: "is_loading", payload: false });
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error" });
    dispatch({ type: "is_loading", payload: false });
  };
};

const setIsLoading = (dispatch) => {
  return (loading) => {
    dispatch({ type: "is_loading", payload: loading });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    addPhoneNumber,
    logout,
    addBusinessName,
    verifyOtp,
    clearErrorMessage,
    tryLocalSignin,
    setIsLoading,
  },
  {
    token: null,
    errorMessage: "",
    phoneNumber: "",
    isLoading: false,
  }
);
