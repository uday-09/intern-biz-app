import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Pressable,
} from "react-native";

import { useFonts } from "expo-font";

import AddCustomerForm from "../components/CustomerAddForm";
import yuvaOneApi from "../api/yuvaOneApi";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as AccountContext } from "../Context/AccountContext";
import SkeletonLoading from "../components/SkeletonLoading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const customFonts = {
  Montserrat: require("../../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
  PTSerif_Bold: require("../../assets/fonts/PTSerif-Bold.ttf"),
  PTSerif_BoldItalic: require("../../assets/fonts/PTSerif-BoldItalic.ttf"),
};

const HomeScreen = ({ navigation }) => {
  const [isLoaded] = useFonts(customFonts);
  const [editedMobile, setEditedMobile] = useState("");
  const [toggle, setToggle] = useState(true);
  const { state: authState, logout } = useContext(AuthContext);
  const [recentCustomers, setRecentCustomers] = useState(null);
  const { state: AccountState, addAccountDetails } = useContext(AccountContext);
  const [inactive, setInactive] = useState(true);
  const [timer, setTimer] = useState(0);
  // console.log(AccountState);

  // console.log(editedMobile);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API CALLS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const fetchRecentlyAddedCustomers = async () => {
    try {
      const result = await yuvaOneApi.get("list/transactiondetails", {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      // console.log(result.data);
      setRecentCustomers(result.data);
    } catch (err) {
      if (err?.response?.data?.code) {
        if (err.response.data.code === "token_not_valid") {
          ToastAndroid.show("Session expired!", ToastAndroid.SHORT);
          logout();
        } else {
          ToastAndroid.show("Something went wrong.", ToastAndroid.SHORT);
        }
      }
    }
  };

  const deleteCustomerTransaction = async (transaction_id) => {
    try {
      // console.log(transaction_id);
      const result = await yuvaOneApi.post(
        "delete/transactiondetails",
        {
          transaction_id: transaction_id,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      setRecentCustomers(null);
      fetchRecentlyAddedCustomers();
    } catch (err) {
      // console.log(err.response.data);
      ToastAndroid.show("Failed to delete transaction.", ToastAndroid.SHORT);
      fetchRecentlyAddedCustomers();
    }
  };

  // console.log(timer);

  useEffect(() => {
    // const timerId = setInterval(() => {
    setTimer(timer + 1);
    addAccountDetails(authState.token, logout);
    fetchRecentlyAddedCustomers();
    // setTimer(timer+1);
    // }, 10000);
    return () => {
      // clearInterval(timerId);
    };
  }, []);

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  return isLoaded ? (
    <>
      <KeyboardAvoidingView style={styles.mainContainer}>
        <View style={styles.upperSection}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Image
                source={require("../../assets/mainSplash.png")}
                resizeMode="contain"
                style={styles.iconStyle}
              ></Image>
              <Text style={{ ...styles.txtStyle, alignItems: "center" }}>
                EASY BIZ
              </Text>
            </View>
            {/* <Text style={styles.subTextStyle}>
            A platform to improve your customer experience.
          </Text> */}
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <ImageBackground
            source={require("../../assets/bgMesh.png")}
            style={{
              overflow: "hidden",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <View style={{ marginBottom: 0 }}></View>
            <ScrollView
              style={{ height: "100%" }}
              keyboardShouldPersistTaps="handled"
            >
              {/* <IconContainer
                addOnClick={() => setToggle(!toggle)}
              ></IconContainer> */}
              <AddCustomerForm
                toggler={toggle}
                editedPhoneNumber={editedMobile}
                onSubmit={() => {
                  setRecentCustomers(null);
                  fetchRecentlyAddedCustomers();
                }}
              ></AddCustomerForm>
              <View style={styles.recentAddedCustomerStyles}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "tomato",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PTSerif_BoldItalic",
                      color: "white",
                      padding: 10,
                    }}
                  >
                    Latest Customer Transactions
                  </Text>
                </View>

                {recentCustomers ? (
                  <>
                    {recentCustomers.length !== 0 ? (
                      recentCustomers.map((customerDetail, index) => {
                        return (
                          <View key={`${index}`} style={styles.mobileContainer}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                              }}
                            >
                              <Text style={{ color: "black" }}>
                                {customerDetail.customer_mobile}
                              </Text>
                              {/* <Pressable>
                              <Text
                                style={{ color: "blue", fontWeight: "900" }}
                                onPress={() =>
                                  setEditedMobile(
                                    customerDetail.customer_mobile
                                  )
                                }
                              >
                                Edit
                              </Text>
                            </Pressable> */}
                              <Text style={{ color: "blue" }}>
                                {customerDetail.sms_sent
                                  ? `Review sent`
                                  : `Review Pending`}
                              </Text>
                              <TouchableOpacity>
                                <Text
                                  style={{
                                    color: "red",
                                    fontWeight: "900",
                                  }}
                                  onPress={() => {
                                    Alert.alert(
                                      "Warning",
                                      `${
                                        customerDetail.sms_sent
                                          ? "SMS sent to this Customer."
                                          : "SMS was not yet sent."
                                      } Are you sure to delete this transaction for ${
                                        customerDetail.customer_mobile
                                      } ?`,
                                      [
                                        {
                                          text: "Cancel",
                                          style: "cancel",
                                        },
                                        {
                                          text: "OKay",
                                          onPress: () => {
                                            setRecentCustomers(null);
                                            deleteCustomerTransaction(
                                              customerDetail.transaction_id
                                            );
                                          },
                                        },
                                      ]
                                    );
                                  }}
                                >
                                  Delete
                                </Text>
                              </TouchableOpacity>
                              {/* <View
                              style={{
                                flexDirection: "row",
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text>{`SMS `}</Text>
                              {customerDetail.sms_sent ? (
                                <>
                                  <MaterialIcons
                                    name="done"
                                    size={16}
                                    color="green"
                                  />
                                </>
                              ) : (
                                <>
                                  <Ionicons
                                    name="time-outline"
                                    size={16}
                                    color="black"
                                  />
                                </>
                              )}
                            </View> */}
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ marginVertical: 20, fontWeight: "700" }}>
                          You have no recent transactions
                        </Text>
                      </View>
                    )}
                  </>
                ) : (
                  <>
                    <SkeletonLoading></SkeletonLoading>
                  </>
                )}
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //backgroundColor: "#ffd481",
    // backgroundColor: "white",
  },
  upperSection: {
    height: "10%",
  },
  lowerContainer: {
    backgroundColor: "white",
    elevation: 20,
    height: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  txtStyle: {
    opacity: 1,
    fontFamily: "PTSerif_Bold",
    fontSize: 24,
    marginBottom: 10,
    color: "black", //"rgba(118, 73, 252, 0.5)",
  },
  subTextStyle: {
    fontFamily: "PTSerif_BoldItalic",
    fontSize: 12,
    color: "black",
  },
  iconStyle: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  mobileContainer: {
    margin: 5,
    //backgroundColor: "pink",
    padding: 5,
  },
  recentAddedCustomerStyles: {
    flex: 1,
    backgroundColor: "white",
    margin: 15,
    marginBottom: 5,
    borderRadius: 10,
    elevation: 5,
    // padding: 10,
    paddingTop: 0,
  },
  icon: {
    color: "white",
    fontSize: 18,
    padding: 2,
  },
  options: {
    borderRadius: 10,
    padding: 5,
    width: 100,
    justifyContent: "space-evenly",
  },
  iconButton: {},
});

export default HomeScreen;
