import React, { useEffect, useContext, useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheetHeader from "../components/BottomSheetHeader";
import { BottomSheet } from "@rneui/themed";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import UnactionedReviewScreen from "./UnactionedReviewScreen";
import { COLORS } from "../Colors";
import ThinLine from "../components/ThinLine";
import { Context as ReviewContext } from "../Context/ReviewsContext";
import { Context as AccountContext } from "../Context/AccountContext";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const ReviewScreen = ({ navigation, route }) => {
  const {
    state: reviewData,
    addReviewType,
    overrideReviewData,
    addReviews,
  } = useContext(ReviewContext);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [dates, setDates] = useState({ from_date: null, to_date: null });
  const [todayClicked, setTodayClicked] = useState(true);
  const [customClicked, setCustomClicked] = useState(false);
  const [FilterClicked, setFilterClicked] = useState("Filter");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [fromVal, setFromVal] = useState("Select From Date");
  const [toVal, setToval] = useState("Select To Date");
  const [monthClicked, SetMonthClicked] = useState(false);
  const [weekClicked, setWeekClicked] = useState(false);
  const [selectedOptions, setSelectedOption] = useState(null);
  const [dateSelected, setDateSelected] = useState(false);
  const [confirmedTag, SetConfimedTag] = useState("today");
  const [confirmedDates, setConfimedDates] = useState({
    from_date: "",
    to_date: "",
  });

  const [visible, setVisible] = useState(false);

  const showMenu = () => setVisible(true);

  // useEffect(() => {
  //   setDates((prev) => {
  //     return { from_date: fromVal, to_date: toVal };
  //   });
  // }, [fromVal, toVal]);

  const clearEveryFilter = () => {
    FilterClearToggler("today");
    setCustomClicked(false);
  };

  const FilterClearToggler = (selectedFilterName) => {
    setSelectedOption(selectedFilterName);
    SetMonthClicked(false);
    setWeekClicked(false);
    setBtnDisabled(false);

    if (selectedFilterName !== "date") {
      setFromVal("Select From Date");
      setToval("Select To Date");
    }
    setDateSelected(false);
    if (selectedFilterName === "date") {
      setDateSelected(true);
    }
    if (selectedFilterName === "month") {
      SetMonthClicked(true);
    } else if (selectedFilterName === "week") {
      setWeekClicked(true);
    }
  };

  // >>>>>>>>>>>>>>>>>>>>>> DATE PICKER START HERE <<<<<<<<<<<<<<<<<<<
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

  // >>>>>>>>>>>>>>>>>>>>>>>> DATE PICKER ENDS HERE<<<<<<<<<<<<<<<<<

  return (
    <>
      {/* {>>>>>>>>>>>>>>>>>>>>>>>>>>>>Tags goes here<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<} */}
      <View style={{}}>
        <View style={styles.tagsContainer}>
          {/* {>>>>>>>>>>>>>>>>>>>>>>>>>Today tag<<<<<<<<<<<<<<<<<<<<<<<<<<<<<} */}
          <TouchableOpacity
            style={{
              ...styles.tagsOuterBox,
              backgroundColor: todayClicked ? COLORS.bg_pink : "white",
              borderColor: todayClicked ? "green" : "#c0c0c0",
            }}
            onPress={() => {
              console.log("Hey there today option clicked");
              addReviewType("today");
              setTodayClicked(true);
              setFilterClicked("Filter");
              SetConfimedTag("today" + new Date().getTime().toString());
              clearEveryFilter();
            }}
          >
            <View style={{ ...styles.tagsHolder }}>
              <View>
                <Text style={{ ...styles.tagText }}>Today</Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="sort-down"
                  size={13}
                  color="black"
                  style={{ padding: 5 }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/* {>>>>>>>>>>>>>>>>>>>>>>>>>>Custom tag <<<<<<<<<<<<<<<<<<<<<<<<<<<<} */}
          <TouchableOpacity
            style={{
              ...styles.tagsOuterBox,
              backgroundColor: customClicked ? COLORS.bg_pink : "white",
              borderColor: customClicked ? "green" : "#c0c0c0",
            }}
            onPress={() => setBottomSheetVisible(true)}
          >
            <View style={{ ...styles.tagsHolder }}>
              <View>
                <Text style={{ ...styles.tagText }}>Custom</Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="sort-down"
                  size={13}
                  color="black"
                  style={{ padding: 5 }}
                />
              </View>
            </View>
          </TouchableOpacity>
          {/* {>>>>>>>>>>>>>>>>>>>>>>>> Filter tag <<<<<<<<<<<<<<<<<<<<<<<<} */}
          <TouchableOpacity style={styles.tagsOuterBox}>
            <View style={{ ...styles.tagsHolder }}>
              <Menu
                visible={visible}
                anchor={
                  <Text style={styles.tagText} onPress={showMenu}>
                    {FilterClicked}
                  </Text>
                }
                onRequestClose={() => {
                  setFilterClicked("Filter");
                  setVisible(false);
                }}
              >
                <MenuItem
                  onPress={() => {
                    setFilterClicked("Todo");
                    overrideReviewData(reviewData.todo_reviews, false);
                    setVisible(false);
                  }}
                >
                  To do
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    setFilterClicked("Done");
                    overrideReviewData(reviewData.todo_reviews, true);
                    setVisible(false);
                  }}
                >
                  Done
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onPress={() => {
                    setFilterClicked("Filter");
                    overrideReviewData(reviewData.todo_reviews, "none");
                    setVisible(false);
                  }}
                >
                  None
                </MenuItem>
              </Menu>
              {/* <Dropdown
                placeholder="Filter"
                maxHeight={14}
                data={data}
              ></Dropdown> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* {>>>>>>>>>>>>>>>>>>>>>>>>>>>>END OF TAGS AND START OF SCROLL VIEW<<<<<<<<<<<<<<<<<<<} */}

      <UnactionedReviewScreen
        reviewDayTag={confirmedTag}
        dates={confirmedDates}
      ></UnactionedReviewScreen>

      {/* {>>>>>>>>>>>>>>>>>>>>>>>>Bottom sheets pop ups goes here<<<<<<<<<<<<<<<<<<<<<<<<<<<} */}

      <BottomSheet isVisible={bottomSheetVisible}>
        <BottomSheetHeader
          title={"Custom Dates"}
          onPress={(val) => setBottomSheetVisible(val)}
        ></BottomSheetHeader>
        <ThinLine></ThinLine>
        <View style={{ backgroundColor: "white" }}>
          <View style={styles.dateTags}>
            {/* {>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>From date tag<<<<<<<<<<<<<<<<<<<<<<<<<<} */}
            <TouchableOpacity
              style={
                dateSelected ? styles.weekOrMonthSelected : styles.tagsOuterBox
              }
              onPress={() => {
                showFromDatePicker();
                FilterClearToggler("date");
              }}
            >
              <View style={{ ...styles.tagsHolder, padding: 5 }}>
                <View>
                  <Text style={{ ...styles.tagText }}>{fromVal}</Text>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={"black"}
                    style={{ marginLeft: 5 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
            {/* {>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>To date tag<<<<<<<<<<<<<<<<<<<<<<<<<} */}
            <TouchableOpacity
              style={
                dateSelected ? styles.weekOrMonthSelected : styles.tagsOuterBox
              }
              onPress={() => {
                showToDatePicker();
                FilterClearToggler("date");
              }}
            >
              <View style={{ ...styles.tagsHolder, padding: 5 }}>
                <View>
                  <Text style={{ ...styles.tagText }}>{toVal}</Text>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={"black"}
                    style={{ marginLeft: 5 }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* <ThinLine></ThinLine> */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              margin: 10,
              marginBottom: 15,
              justifyContent: "space-around",
            }}
          >
            {/* {>>>>>>>>>>>>>>>>>>>Month tag<<<<<<<<<<<<<<<<<<<<<<<<<<<} */}
            <TouchableOpacity
              style={
                monthClicked ? styles.weekOrMonthSelected : styles.tagsOuterBox
              }
              onPress={() => {
                FilterClearToggler("month");
              }}
            >
              <View style={{ ...styles.tagsHolder, padding: 5 }}>
                <View>
                  <Text style={{ ...styles.tagText }}>Month</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* {>>>>>>>>>>>>>>>>>>> Week Tag <<<<<<<<<<<<<<<<<<<<<<<<<<<} */}
            <TouchableOpacity
              style={
                weekClicked ? styles.weekOrMonthSelected : styles.tagsOuterBox
              }
              onPress={() => {
                FilterClearToggler("week");
              }}
            >
              <View style={{ ...styles.tagsHolder, padding: 5 }}>
                <View>
                  <Text style={{ ...styles.tagText }}>Week</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* {>>>>>>>>>>>>>>>>>>>>>>>>>>>>Apply tags<<<<<<<<<<<<<<<<<<<} */}
        <CustomButton
          title="APPLY"
          width="100%"
          backgroundColor={btnDisabled ? "rgb(253, 134, 113)" : "tomato"}
          textColor="white"
          applyStyles={{ borderRadius: 0 }}
          onPress={() => {
            addReviewType(
              selectedOptions === "date" ? "default" : selectedOptions
            );
            setFilterClicked("Filter");
            setBottomSheetVisible(false);
            SetConfimedTag(selectedOptions);
            setConfimedDates({
              from_date: fromVal,
              to_date: toVal,
            });
            setCustomClicked(true);
            setTodayClicked(false);
          }}
          disabled={btnDisabled}
        ></CustomButton>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  dateTags: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainHolder: {
    margin: 8,
    marginTop: 0,
  },
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    margin: 8,
    marginBottom: 0,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 7,
    flexWrap: "wrap",
  },
  tagsHolder: {
    flexDirection: "row",
    padding: 2,
    marginHorizontal: 5,
  },
  tagText: {
    fontSize: 13,
    padding: 5,
  },
  tagsOuterBox: {
    borderColor: "#c0c0c0",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  weekOrMonthSelected: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: COLORS.bg_pink,
  },
});

export default ReviewScreen;
