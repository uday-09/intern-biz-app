import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Overlay } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { AirbnbRating } from "@rneui/themed";
import { customFonts } from "../Colors";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import { useState } from "react";
import yuvaOneApi from "../api/yuvaOneApi";
import { Context as AuthContext } from "../Context/AuthContext";
const ReviewDetailModel = ({
  isVisible,
  data,
  toggle,
  bgColor,
  avatarColor,
  follow_up,
  onPress = null,
}) => {
  const [isLoaded] = useFonts(customFonts);
  const [followText, setFollowText] = useState("");
  const { state: authState } = useContext(AuthContext);
  if (data === null) {
    return null;
  }
  if (!isLoaded) {
    return null;
  }

  const followUpAction = async (followText) => {
    try {
      const result = await yuvaOneApi.post(
        "user/followup",
        {
          transaction_id: data.transaction_id,
          followed_up: true,
          followed_text: followText,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      ToastAndroid.show("Your follow up recorded.", ToastAndroid.SHORT);
      onPress();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Overlay isVisible={isVisible} overlayStyle={{ margin: 5, width: "95%" }}>
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 2.5,
            }}
          >
            <Pressable
              onPress={() => toggle()}
              android_ripple={{ color: "tomato" }}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.headerContainer}>
            <Avatar
              title={`${data.customer_mobile[0]}`}
              titleStyle={{ color: "white" }}
              rounded
              containerStyle={{
                backgroundColor: avatarColor,
                marginRight: 10,
              }}
              size={"medium"}
            ></Avatar>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.mobile}>{data.customer_mobile}</Text>
              <Text style={styles.date}>
                {data.updated_at.substring(0, 10)}
              </Text>
            </View>
          </View>
          {follow_up === false ? (
            <>
              {Object.keys(data.review_response).map((reviewQ, index) => {
                if (reviewQ == "Comment") {
                  return null;
                }
                return (
                  <View key={`${index}`}>
                    <Text style={styles.texts}>{reviewQ} </Text>
                    <AirbnbRating
                      isDisabled={true}
                      defaultRating={data.review_response[reviewQ]}
                      size={16}
                      ratingContainerStyle={{ alignItems: "flex-start" }}
                      showRating={false}
                      selectedColor={"orange"}
                      starContainerStyle={{ padding: 5 }}
                    ></AirbnbRating>
                  </View>
                );
              })}
              <Text style={[styles.mobile, styles.overallRating]}>
                Comments{" "}
                {data.review_response["Comment"] ? (
                  <Text
                    style={{ color: "grey", fontWeight: "100", marginLeft: 5 }}
                  >
                    {` ` + data.review_response["Comment"]}
                  </Text>
                ) : (
                  <Text
                    style={{ color: "grey", fontWeight: "100", marginLeft: 5 }}
                  >
                    No Comments
                  </Text>
                )}
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Overall rating:</Text>
                <AirbnbRating
                  isDisabled={true}
                  defaultRating={data.overall_rating}
                  size={16}
                  ratingContainerStyle={{ alignItems: "flex-start" }}
                  showRating={false}
                  selectedColor={"orange"}
                  starContainerStyle={{ padding: 5 }}
                ></AirbnbRating>
              </View>
              <Text style={{ paddingVertical: 10, fontWeight: "bold" }}>
                Let us know what action you have taken?
              </Text>
              <View style={styles.followUpView}>
                <TextInput
                  multiline={true}
                  textAlignVertical={"top"}
                  style={{ padding: 5 }}
                  placeholder="Enter follow up text here...."
                  onChangeText={(val) => setFollowText(val)}
                ></TextInput>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <CustomButton
                  width="50%"
                  backgroundColor="tomato"
                  textColor="white"
                  onPress={() => {
                    followUpAction(followText);
                  }}
                ></CustomButton>
              </View>
            </>
          )}
        </View>
      </Overlay>
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
  texts: {
    fontWeight: "bold",
    padding: 5,
  },
  followUpView: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default ReviewDetailModel;
