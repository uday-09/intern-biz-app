import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import StackRow from "../components/StackRow";
import { Context as PublicReviewContext } from "../Context/PublicReviewContext";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as AccountContext } from "../Context/AccountContext";
import RoundedProfile from "../components/RoundedProfile";
import CustomButton from "../components/CustomButton";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../Colors";

export default function PublicReviewScreen({ navigation }) {
  const {
    state: publicReviewState,
    addPublicReviews,
    clearError,
    clearReviews,
  } = useContext(PublicReviewContext);
  // console.log(publicReviewState);

  const { state: authContext, logout } = useContext(AuthContext);
  const { state: AccountState } = useContext(AccountContext);

  const [uniqueId, setUinqueId] = useState(new Date().getTime().toString());

  useEffect(() => {
    clearReviews();
    addPublicReviews(authContext.token, logout);
  }, [uniqueId]);

  if (publicReviewState.error) {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ padding: 10 }}>OOPS! Something went wrong!</Text>
          <CustomButton
            backgroundColor="tomato"
            width="50%"
            textStyles={{ color: "white" }}
            title="RETRY"
            onPress={() => {
              clearError();
              setUinqueId(new Date().getTime().toString());
            }}
          ></CustomButton>
        </View>
      </>
    );
  }

  if (!publicReviewState.public_reviews) {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={"tomato"} size="large"></ActivityIndicator>
        </View>
      </>
    );
  }
  console.log(AccountState?.account_info);
  if (publicReviewState.public_reviews.length === 0) {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>No public reviews sent.</Text>
          {!AccountState?.account_info?.public_review_links?.Google ? (
            <>
              <Text>You have not provided Public review link.</Text>
              <Text
                onPress={() => {
                  if (AccountState.account_info) {
                    navigation.navigate("Edit_Details", { AccountState });
                  } else {
                    navigation.navigate("Account");
                  }
                }}
                style={{ color: "blue" }}
              >
                Provide here
              </Text>
            </>
          ) : null}
        </View>
      </>
    );
  }
  let toggle = 0;
  return (
    <>
      <View style={styles.body}>
        <View style={styles.reviewHolder}>
          <FlatList
            onRefresh={() => {
              setUinqueId(new Date().getTime().toString());
            }}
            refreshing={publicReviewState.public_reviews == null ? true : false}
            data={publicReviewState.public_reviews}
            keyExtractor={(key, index) => key + index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            bouncesZoom={0}
            renderItem={({ item: mainItem }) => {
              let temp = new Date();
              toggle = toggle === 0 ? 1 : 0;
              return (
                <View>
                  <StackRow>
                    <RoundedProfile
                      backgroundColor={toggle ? COLORS.btn_blue : "tomato"}
                      width={40}
                      height={40}
                      text={mainItem.customer_mobile[0]}
                    ></RoundedProfile>
                    <StackRow
                      applyStyles={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <StackRow
                        applyStyles={{ justifyContent: "space-between" }}
                      >
                        <View style={styles.contentHolder}>
                          <Text style={styles.mobile}>
                            {mainItem.customer_mobile}
                          </Text>
                          <StackRow>
                            <Ionicons
                              name="checkmark-done"
                              size={20}
                              color="green"
                            />
                            <Text
                              style={{
                                color: "grey",
                                paddingBottom: 10,
                                paddingLeft: 5,
                              }}
                            >
                              Review request sent
                            </Text>
                          </StackRow>
                        </View>
                        {/* {>>>>>>>>>>>>>>>>>>>>>>>> DATE <<<<<<<<<<<<<<<<<<} */}
                        <View style={{ justifyContent: "center" }}>
                          <Text
                            style={{
                              fontSize: 10,
                              marginRight: 10,
                              color: "grey",
                            }}
                          >
                            {mainItem.created_at.substring(0, 10)}
                          </Text>
                        </View>
                      </StackRow>
                      <View
                        style={{
                          marginTop: 5,
                          marginBottom: 15,
                          height: 1,
                          backgroundColor: "#cfcdca",
                        }}
                      ></View>
                    </StackRow>
                  </StackRow>
                </View>
              );
            }}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 0,
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
  },
  reviewHolder: {
    backgroundColor: "white",
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  contentHolder: {
    paddingHorizontal: 20,
  },
  mobile: {
    fontWeight: "200",
    fontSize: 16,
  },
});
