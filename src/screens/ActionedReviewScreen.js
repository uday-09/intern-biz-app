import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
  Image,
  Dimensions,
} from "react-native";
import { Context as PublicReviewsContext } from "../Context/PublicReviewContext";
import { Context as AuthContext } from "../Context/AuthContext";
import Review from "../components/Review";
import { COLORS } from "../Colors";
import CustomButton from "../components/CustomButton";
import ReviewDetailModel from "../components/ReviewDetailsModal";

const processData = (data) => {
  const qArray = data[0];
  const qnsArray = [];
  for (let qns in qArray) {
    qnsArray.push(qns);
  }
  return qnsArray;
};

function ActionedReviewScreen({ navigation }) {
  const {
    state: publicReviewData,
    addPublicReviews,
    clearReviews,
    clearError,
    addUserError,
  } = useContext(PublicReviewsContext);
  const { state: authState, logout } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [visibleData, setVisibleData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchReview = (noOfDays) => {
    clearReviews();
    let date = new Date();
    let newFromDate = new Date(date.setDate(date.getDate() - noOfDays));
    date = new Date();
    let newToDate = new Date(date.setDate(date.getDate() + 1));
    const to_date = newToDate.toISOString().substring(0, 10);
    const from_date = newFromDate.toISOString().substring(0, 10);
    const token = authState.token;
    addPublicReviews(token, logout);
  };

  useEffect(() => {
    addPublicReviews(authState.token, logout);
  }, []);

  let toggle = true;

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Network and other errors <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  if (publicReviewData.error) {
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
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
          <Text style={{ fontWeight: "500", fontSize: 18, padding: 5 }}>
            {publicReviewData.error}
          </Text>
          {!publicReviewData.review_type === "default" ? (
            <CustomButton
              title="Try again"
              textColor="white"
              backgroundColor="tomato"
              onPress={() => {
                clearError();
                if (publicReviewData.review_type === "today") fetchReview(1);
                else if (publicReviewData.review_type === "week")
                  fetchReview(7);
                else if (publicReviewData.review_type === "month")
                  fetchReview(30);
              }}
            ></CustomButton>
          ) : null}
        </View>
      </>
    );
  }

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> When we have no data to show<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  if (!publicReviewData.public_reviews) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"tomato"}></ActivityIndicator>
      </View>
    );
  }

  if (
    publicReviewData.public_reviews !== null &&
    publicReviewData.public_reviews.length === 0
  ) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: 15,
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
        <Text
          style={{ fontWeight: "bold", fontSize: 17 }}
        >{`You have no followed up reviews for ${
          publicReviewData.review_type === "default"
            ? "chosen dates"
            : publicReviewData.review_type
        }.`}</Text>
      </View>
    );
  }

  return (
    <>
      <ReviewDetailModel
        isVisible={openModal}
        data={visibleData}
        reviewQuestions={processData(publicReviewData.public_reviews)}
        toggle={() => setOpenModal(!openModal)}
        avatarColor={!toggle ? "tomato" : "tomato"}
        follow_up={false}
      ></ReviewDetailModel>
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={() => {
            if (publicReviewData.review_type === "today") fetchReview(1);
            else if (publicReviewData.review_type === "week") fetchReview(7);
            else if (publicReviewData.review_type === "month") fetchReview(30);
            else fetchReview(30);
          }}
          refreshing={publicReviewData.public_reviews == null ? true : false} // FIXME: "need to fix this"
          data={publicReviewData.public_reviews}
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
                  questionsArray={processData(publicReviewData.public_reviews)}
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
  },
  mainContainer: {
    flex: 1,
    margin: 15,
    marginBottom: 0,
  },
  heading: {
    fontFamily: "PTSerif_Bold",
  },
});

export default ActionedReviewScreen;
