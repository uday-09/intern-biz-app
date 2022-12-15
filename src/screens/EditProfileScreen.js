import React, { useState, useContext } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import { View, ActivityIndicator, Button, ToastAndroid } from "react-native";
import { Avatar } from "@rneui/themed";
import { Input } from "@rneui/themed";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import yuvaOneApi from "../api/yuvaOneApi";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as AccountContext } from "../Context/AccountContext";

export default function EditProfileScreen(props) {
  const [userProfile, setUserProfile] = useState(
    props.route.params?.AccountState?.account_info
  );

  console.log(userProfile);
  const { state: authState, logout } = useContext(AuthContext);
  const { addAccountDetails, setRefreshId } = useContext(AccountContext);
  const details = props.route.params?.AccountState?.account_info;
  const [mobile, setMobile] = useState(userProfile.mobile);
  const [businessName, setBusinessName] = useState(userProfile.first_name);
  const [email, setEmail] = useState(userProfile.email);
  const [url, setUrl] = useState(userProfile.url);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = (mobile, businessName, email, url) => {
    if (!mobile || !businessName) {
      setErr("Please fill the mandatory fields");
      return;
    }
    setIsLoading(true);
    console.log("Comes here");
    const result = yuvaOneApi
      .post(
        "/profile/update",
        {
          mobile: mobile,
          business_name: businessName,
          email: email ? email : "",
          public_review_links: {
            Google: url ? url : "",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      )
      .then((result) => {
        setRefreshId();
        ToastAndroid.show("Profile updated succefully.", ToastAndroid.SHORT);
        setIsLoading(false);
        addAccountDetails(authState.token, logout);
        props.navigation.goBack();
      })
      .catch((apiErr) => {
        console.log(apiErr);
        setIsLoading(false);
        if (apiErr?.response?.data) {
          if (apiErr?.response?.data?.code === "token_not_valid") {
            ToastAndroid.show("Your session expired", ToastAndroid.SHORT);
            logout();
          } else if (apiErr.response.data.success === false) {
            setErr(apiErr.response.data.message);
          } else {
            ToastAndroid.show(
              "Something went wrong try again",
              ToastAndroid.SHORT
            );
          }
        } else {
          ToastAndroid.show(
            "Something went wrong try again",
            ToastAndroid.SHORT
          );
        }
      });
  };

  if (!userProfile) {
    return (
      <>
        <ActivityIndicator size={"large"} color={"Tomato"}></ActivityIndicator>
      </>
    );
  }
  return (
    <>
      {/* <StatusBar backgroundColor="white"></StatusBar> */}
      <View style={styles.body}>
        {userProfile ? (
          <ScrollView
            style={{ width: "100%" }}
            keyboardShouldPersistTaps={"handled"}
          >
            <View style={{ width: "100%" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.sideHeads}>Mobile*</Text>
                <Input
                  inputStyle={{ color: "black", fontSize: 16 }}
                  placeholderTextColor={"black"}
                  value={`${mobile}`}
                  onChangeText={(phoneNumber) => setMobile(phoneNumber)}
                  keyboardType="number-pad"
                  disabled={!true}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                  leftIcon={<Feather name="phone" size={18} color="black" />}
                ></Input>
                <Text style={styles.sideHeads}>Business Name*</Text>
                <Input
                  inputStyle={{ color: "black", fontSize: 16 }}
                  onChangeText={(bizName) => setBusinessName(bizName)}
                  placeholderTextColor={"black"}
                  value={`${businessName}`}
                  disabled={!true}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                  leftIcon={
                    <Ionicons name="business" size={18} color="black" />
                  }
                ></Input>
                <Text style={styles.sideHeads}>Email</Text>
                <Input
                  inputStyle={{ color: "black", fontSize: 16 }}
                  onChangeText={(mail) => setEmail(mail)}
                  placeholder="Enter Email"
                  value={email ? `${email}` : ""}
                  disabled={!true}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="email-edit-outline"
                      size={18}
                      color="black"
                    />
                  }
                ></Input>
                <Text style={styles.sideHeads}>Public Review URL</Text>
                <Input
                  inputStyle={{ color: "black", fontSize: 16 }}
                  onChangeText={(uri) => setUrl(uri)}
                  placeholder="Paste your URL here"
                  value={url ? `${url}` : ""}
                  disabled={!true}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                  leftIcon={
                    <FontAwesome5 name="link" size={18} color="black" />
                  }
                ></Input>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {isLoading === false ? (
                  <CustomButton
                    onPress={() => {
                      updateProfile(mobile, businessName, email, url);
                    }}
                    title="UPDATE CHANGES"
                    backgroundColor="tomato"
                    textColor={"white"}
                    width="100%"
                  ></CustomButton>
                ) : (
                  <CustomButton
                    // onPress={() => {
                    //   console.log("disable")
                    // }}
                    disabled={true}
                    title=""
                    backgroundColor="rgb(253, 134, 113)"
                    textColor={"white"}
                    icon={() => (
                      <ActivityIndicator
                        size={"large"}
                        color="white"
                      ></ActivityIndicator>
                    )}
                    width="100%"
                  ></CustomButton>
                )}
              </View>
              {err ? (
                <>
                  <Text style={{ padding: 10, color: "red" }}>{err}</Text>
                </>
              ) : null}
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 150,
  },
  main: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  mainContainer: {
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 20,
    padding: 15,
    width: "95%",
    marginTop: Dimensions.get("screen").height / 15,
  },
  sideHeads: {
    fontSize: 13,
    fontWeight: "300",
    marginHorizontal: 10,
    color: "grey",
  },
  inputStyles: {
    width: "80%",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  mainHead: {
    fontFamily: "Montserrat",
    fontSize: 25,
    color: "black",
  },
});
