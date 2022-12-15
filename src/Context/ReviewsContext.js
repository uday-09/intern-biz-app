import createDataContext from "./createDataContext";
import yuvaOneApi from "../api/yuvaOneApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_done_reviews":
      return { ...state, done_review: action.payload };
    case "add_todo_reviews":
      return { ...state, todo_reviews: action.payload };
    case "network_error":
      return { ...state, error: action.payload };
    case "token_error":
      return { ...state, error: action.payload };
    case "clear_reviews":
      return { ...state, done_review: null, todo_reviews: null };
    case "clear_error":
      return { ...state, error: "" };
    case "review_type":
      return { ...state, review_type: action.payload };
    case "user_error":
      return { ...state, error: action.payload };
    case "set_dates":
      return { ...state, reviewDates: action.payload };
    case "set_fetching":
      return { ...state, fetching: action.payload };
    case "override_data":
      return { ...state, done_review: action.payload };
    default:
      return state;
  }
};

const addReviews = (dispatch) => {
  return async (from_date, to_date, followed_up, token, logout) => {
    try {
      const res = await yuvaOneApi.post(
        "/filter/review/details",
        {
          // followed_up: followed_up,
        },
        {
          params: {
            from_date: from_date,
            to_date: to_date,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(res, "Hey");
      if (followed_up === true)
        dispatch({ type: "add_done_reviews", payload: res.data });
      dispatch({ type: "add_todo_reviews", payload: res.data.reverse() });
      setFetching(false);
    } catch (err) {
      if (err?.response?.data?.code) {
        if (err.response.data.code === "token_not_valid") {
          dispatch({ type: "token_error", payload: "token_expired" });
          logout();
        } else {
          dispatch({
            type: "network_error",
            payload: "Something went wrong. Try again",
          });
          // console.log("Hey there....");
        }
      } else {
        //setErr("Something went wrong. Try again");
        dispatch({
          type: "network_error",
          payload: "Something went wrong. Try again",
        });
        // console.log("Hey there hello!");
        setFetching(false);
      }
    }
  };
};

const overrideReviewData = (dispatch) => {
  return (data, filter) => {
    if (filter === "none") dispatch({ type: "override_data", payload: data });
    else {
      const arr = data.filter((review) => {
        return review?.followed_up === filter;
      });
      dispatch({ type: "override_data", payload: arr });
    }
  };
};

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
    addReviews,
    clearReviews,
    clearError,
    addReviewType,
    addUserError,
    setFromToDates,
    setFetching,
    overrideReviewData,
  },
  {
    done_review: null,
    todo_reviews: null,
    error: "",
    review_type: "today",
    reviewDates: {
      from_date: null,
      to_date: null,
    },
    fetching: false,
  }
);
