import React, { useState, useReducer, useContext } from "react";
import { View, Text, StyleSheet, Pressable, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Context as ReviewContext } from "../Context/ReviewsContext";
import { Context as AuthContext } from "../Context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { COLORS } from "../Colors";
import { FontAwesome } from "@expo/vector-icons";

const reducer = (state, action) => {
  const option = action.payload;
  state[action.payload] = styles.button;
  switch (action.type) {
    case 1:
      return { ...state, 1: styles.active };
    case 2:
      return { ...state, 2: styles.active };
    case 3:
      return { ...state, 3: styles.active };
    case 4:
      return { ...state, 4: styles.active };
    default:
      return state;
  }
};

const reducerText = (state, action) => {
  const option = action.payload;
  state[action.payload] = styles.optionText;
  switch (action.type) {
    case 1:
      return { ...state, 1: styles.activeText };
    case 2:
      return { ...state, 2: styles.activeText };
    case 3:
      return { ...state, 3: styles.activeText };
    case 4:
      return { ...state, 4: styles.activeText };
    default:
      return state;
  }
};

const FilterOptions = ({ bottomSheetOnPress }) => {
  const {
    addReviews,
    clearReviews,
    addReviewType,
    addUserError,
    clearError,
    setFromToDates,
  } = useContext(ReviewContext);
  const { state: AuthState, logout } = useContext(AuthContext);
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [datePickerVisible, setDatePickerVisible] = useState(true);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromVal, setFromVal] = useState("from");
  const [toVal, setToval] = useState("To");

  const [state, dispatch] = useReducer(reducer, {
    1: { ...styles.button },
    2: styles.button,
    3: styles.button,
    4: styles.button,
  });

  const [textColor, dispatchTextColor] = useReducer(reducerText, {
    1: styles.optionText,
    2: styles.optionText,
    3: styles.optionText,
    4: styles.optionText,
  });

  const fetchReview = (noOfDays) => {
    clearReviews();
    clearError();

    if (noOfDays === 1) {
      let date = new Date();

      let newFromDate = new Date(date.setDate(date.getDate() - 1));
      date = new Date();
      let newToDate = new Date(date.setDate(date.getDate() + 1));
      const to_date = newToDate.toISOString().substring(0, 10);
      const from_date = newFromDate.toISOString().substring(0, 10);
      const token = AuthState.token;
      console.log(to_date, from_date);
      addReviews(from_date, to_date, false, token, logout);
      addReviews(from_date, to_date, true, token, logout);
      return;
    }

    const date = new Date();
    let dup = new Date(date.setDate(date.getDate() + 1));
    const from_date = dup.toISOString().substring(0, 10);
    let newDate = new Date(date.setDate(date.getDate() - noOfDays));
    const to_date = newDate.toISOString().substring(0, 10);
    console.log(from_date, to_date);
    const token = AuthState.token;
    addReviews(to_date, from_date, false, token, logout);
    addReviews(to_date, from_date, true, token, logout);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFromDate(currentDate);
    setFromVal(currentDate.toISOString().substring(0, 10));
  };

  const showFromDatePicker = () => {
    console.log("hey");
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const showToDatePicker = () => {
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange: (event, date) => {
        setToDate(date);
        setToval(date.toISOString().substring(0, 10));
      },
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <>
      <SafeAreaView style={styles.body}>
        <View style={{}}>
          <>
            <View style={styles.holder}>
              <Pressable style={{ ...styles.buttons, ...styles.activeButton }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={{ fontWeight: "500" }}>Today</Text>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <FontAwesome
                      name="sort-down"
                      size={16}
                      color="black"
                      style={{ padding: 5 }}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={styles.buttons}
                onPress={() => bottomSheetOnPress(true)}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={{ fontWeight: "500" }}>Custom</Text>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <AntDesign
                      name="calendar"
                      size={16}
                      color={"black"}
                      style={{ padding: 5 }}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  holder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttons: {
    backgroundColor: "pink",
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  activeButton: {
    borderWidth: 1,
    borderBottomColor: "tomato",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
  },
});

export default FilterOptions;
