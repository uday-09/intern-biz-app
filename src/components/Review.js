import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import AverageReview from "./AverageReview";
import { Avatar } from "@rneui/themed";
import ReviewDetailModel from "./ReviewDetailsModal";
const Review = ({
  mainReview: mainItem,
  questionsArray: qnsArray,
  avatarColor,
}) => {
  const [enable, setEnable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ReviewDetailModel
        isVisible={enable}
        data={mainItem}
        reviewQuestions={qnsArray}
        toggle={() => setEnable(!enable)}
        avatarColor={true ? "tomato" : "tomato"}
        follow_up={true}
        onPress={() => {
          setEnable(!enable);
        }}
      ></ReviewDetailModel>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={styles.headerContainer}>
            <Avatar
              title={`${mainItem.customer_mobile[0]}`}
              titleStyle={{ color: "white" }}
              rounded
              containerStyle={{
                backgroundColor: avatarColor,
                marginRight: 10,
              }}
              size={"medium"}
            ></Avatar>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.mobile}>{mainItem.customer_mobile}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.date}>
                  {mainItem.updated_at.substring(0, 10)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Switch
            style={{ margin: 0 }}
            value={mainItem.followed_up}
            onValueChange={() => {
              setEnable((prev) => !prev);
              setOpenModal(!openModal);
            }}
            disabled={mainItem.followed_up}
          ></Switch>
        </View>
      </View>
      <View style={styles.starRatingContainer}>
        <Text style={[styles.mobile, styles.overallRating]}>
          Overall rating
        </Text>
        <AverageReview
          questions={qnsArray}
          singleReview={mainItem}
        ></AverageReview>
      </View>
      <View>
        {mainItem.review_response["Comment"] ? (
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={[styles.mobile, styles.overallRating]}
          >
            Comments{" "}
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{ color: "grey", fontWeight: "100", marginLeft: 5 }}
            >
              {` ` + mainItem.review_response["Comment"]}
            </Text>
          </Text>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    padding: 5,
  },
  date: {
    fontSize: 10,
    fontWeight: "600",
  },
  mobile: {
    fontWeight: "bold",
    marginRight: 5,
  },
  starRatingContainer: {
    flexDirection: "row",
  },
  overallRating: {
    padding: 2.5,
  },
  aligning: {
    alignItems: "center",
  },
});

export default Review;
