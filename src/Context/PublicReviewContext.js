import createDataContext from "./createDataContext";
import yuvaOneApi from "../api/yuvaOneApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_public_reviews":
      return { ...state, public_reviews: action.payload };
    case "public_reviews_copy":
      return { ...state, public_reviews_copy: action.payload };
    case "network_error":
      return { ...state, error: action.payload };
    case "token_error":
      return { ...state, error: action.payload };
    case "clear_reviews":
      return { ...state, public_reviews: null, public_reviews_copy: null };
    case "clear_error":
      return { ...state, error: "" };
    case "review_type":
      return { ...state, review_type: action.payload };
    case "user_error":
      return { ...state, error: action.payload };
    case "set_fetching":
      return { ...state, fetching: action.payload };
    case "override_data":
      return { ...state, public_reviews: action.payload };
    default:
      return state;
  }
};

const addPublicReviews = (dispatch) => {
  return async (token, logout) => {
    // console.log("hit", from_date, to_date);
    try {
      const res = await yuvaOneApi.get("/list/public/review/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res.data, "kjahdfkaljslkjs");
      dispatch({ type: "add_public_reviews", payload: res.data });
      setFetching(false);
    } catch (err) {
      // console.log(err);
      if (err?.response?.data?.code) {
        if (err.response.data.code === "token_not_valid") {
          dispatch({ type: "token_error", payload: "token_expired" });
          logout();
        } else {
          dispatch({
            type: "network_error",
            payload: "Unable to fetch data...",
          });
          // console.log("Hey there....");
        }
      } else {
        dispatch({ type: "network_error", payload: "Unable to fetch data..." });
        setFetching(false);
      }
    }
  };
};

// const overrideReviewData = (dispatch) => {
//   return (data, filter) => {
//     if (filter === "none") dispatch({ type: "override_data", payload: data });
//     else {
//       const arr = data.filter((review) => {
//         return review?.followed_up === filter;
//       });
//       dispatch({ type: "override_data", payload: arr });
//     }
//   };
// };

const clearReviews = (dispatch) => {
  return () => {
    dispatch({ type: "clear_reviews" });
  };
};

const clearError = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error" });
  };
};

const addReviewType = (dispatch) => {
  return (reviewType) => {
    dispatch({ type: "review_type", payload: reviewType });
  };
};

const addUserError = (dispatch) => {
  return (error) => {
    dispatch({ type: "user_error", payload: error });
  };
};

const setFromToDates = (dispatch) => {
  return (from_date, to_date) => {
    dispatch({
      type: "set_dates",
      payload: { from_date: from_date, to_date: to_date },
    });
  };
};

const setFetching = (dispatch) => {
  return (val) => {
    dispatch({
      type: "set_fetching",
      payload: val,
    });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    addPublicReviews,
    clearReviews,
    clearError,
    addReviewType,
    addUserError,
    setFromToDates,
    setFetching,
  },
  {
    public_reviews: null,
    public_reviews_copy: null,
    error: "",
    review_type: "today",
    fetching: false,
  }
);
