import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Context as todoReviews } from "../Context/ReviewsContext";
import { Context as AuthContext } from "../Context/AuthContext";
import Review from "../components/Review";
import { COLORS } from "../Colors";
import CustomButton from "../components/CustomButton";
import ReviewDetailModel from "../components/ReviewDetailsModal";

const processData = (data) => {
  if (data === null) {
    return;
  }
  const qArray = data[0];
  const qnsArray = [];
  for (let qns in qArray) {
    qnsArray.push(qns);
  }
  return qnsArray;
};

function UnactionedReviewScreen({ reviewDayTag = "today", dates = null }) {
  const {
    state: reviewData,
    addReviews,
    clearReviews,
    clearError,
    getAllRequiredReviews,
  } = useContext(todoReviews);

  // console.log(reviewData);

  // console.log(reviewDayTag, "Hey this is tag");

  const { state: authState, logout } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [visibleData, setVisibleData] = useState(null);

  // console.log(reviewData);
  const fetchReview = (noDate) => {
    clearReviews();
    clearError();
    let days = 0;
    if (reviewDayTag === "month") days = 30;
    else if (reviewDayTag === "week") days = 7;

    // console.log("Excuting for " + reviewDayTag);
    const toDateObj = new Date();
    const toStringDate =
      reviewDayTag === "date"
        ? dates.to_date
        : new Date(toDateObj.setDate(toDateObj.getDate() + 1))
            .toISOString()
            .substring(0, 10);
    const fromDateObj = new Date();
    const fromStringDate =
      reviewDayTag === "date"
        ? dates.from_date
        : new Date(fromDateObj.setDate(fromDateObj.getDate() - days))
            .toISOString()
            .substring(0, 10);

    // console.log(fromStringDate, toStringDate);
    const token = authState.token;
    addReviews(fromStringDate, toStringDate, true, token, logout);
  };

  useEffect(() => {
    clearReviews();
    clearError();

    fetchReview();
    return () => {};
  }, [reviewDayTag, dates]);

  let toggle = true;

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Network and other errors <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  if (reviewData.error) {
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            marginHorizontal: 8,
          }}
        >
          <Image
            source={require("../../assets/empty.jpg")}
            resizeMode="contain"
            style={{
              width: Dimensions.get("screen").width / 1.5,
              height: Dimensions.get("screen").width / 1.5,
            }}
          ></Image>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            {reviewData.error}
          </Text>
          {!reviewData.review_type === "default" ? (
            <CustomButton
              title="Try again"
              textColor="white"
              backgroundColor="tomato"
              onPress={() => {
                clearError();
                if (reviewData.review_type === "today") {
                  fetchReview(1);
                } else if (reviewData.review_type === "week") {
                  fetchReview(7);
                } else if (reviewData.review_type === "month") {
                  fetchReview(30);
                }
              }}
            ></CustomButton>
          ) : null}
        </View>
      </>
    );
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> When we have no data to show<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  if (!reviewData.done_review) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 8,
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={"large"} color={"tomato"}></ActivityIndicator>
      </View>
    );
  }

  if (reviewData.done_review !== null && reviewData.done_review.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          marginHorizontal: 8,
        }}
      >
        <>
          <Image
            source={require("../../assets/empty.jpg")}
            resizeMode="contain"
            style={{
              width: Dimensions.get("screen").width / 1.5,
              height: Dimensions.get("screen").width / 1.5,
            }}
          ></Image>
          <Text
            style={{ fontWeight: "bold", fontSize: 17 }}
          >{`You have no reviews for ${
            reviewData.review_type === "default"
              ? "chosen dates"
              : reviewData.review_type
          }.`}</Text>
        </>
      </View>
    );
  }
  return (
    <>
      <ReviewDetailModel
        isVisible={openModal}
        data={visibleData}
        reviewQuestions={processData(reviewData.done_review)}
        toggle={() => setOpenModal(!openModal)}
        avatarColor={!toggle ? "tomato" : "tomato"}
        follow_up={false}
      ></ReviewDetailModel>
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={() => {
            //fetchReview(state.mobile, state.token)
            if (reviewData.review_type === "today") fetchReview(1);
            else if (reviewData.review_type === "week") fetchReview(7);
            else if (reviewData.review_type === "month") fetchReview(30);
            else fetchReview(30);
          }}
          refreshing={reviewData.done_review == null ? true : false}
          data={reviewData.done_review}
          keyExtractor={(key, index) => key + index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          bouncesZoom={0}
          renderItem={({ item: mainItem }) => {
            let bgColor = "";
            if (toggle === true) {
              bgColor = "rgba(118, 73, 252, 0.1)";
              toggle = false;
            } else {
              bgColor = COLORS.bg_pink;
              toggle = true;
            }
            return (
              <Pressable
                style={{ ...styles.pressableStyle, backgroundColor: bgColor }}
                android_ripple={{
                  color: "white",
                }}
                onPress={() => {
                  setOpenModal(!openModal);
                  setVisibleData({ ...mainItem });
                }}
              >
                <Review
                  mainReview={mainItem}
                  questionsArray={processData(reviewData.done_review)}
                  avatarColor={!toggle ? "tomato" : COLORS.btn_blue}
                ></Review>
              </Pressable>
            );
          }}
        ></FlatList>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pressableStyle: {
    marginVertical: 5,
    borderRadius: 10,
    padding: 5.5,
    marginHorizontal: 3,
  },
  mainContainer: {
    flex: 1,
    margin: 8,
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "white",
  },
  heading: {
    fontFamily: "PTSerif_Bold",
  },
});

export default UnactionedReviewScreen;
