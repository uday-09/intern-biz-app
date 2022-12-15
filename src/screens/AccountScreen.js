import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import yuvaOneApi from "../api/yuvaOneApi";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as AccountContext } from "../Context/AccountContext";
import { Avatar } from "@rneui/themed";
import { Input } from "@rneui/themed";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";

const AccountScreen = () => {
  const { state, logout } = useContext(AuthContext);
  const { state: accountContext, setRefreshId } = useContext(AccountContext);
  const [userProfile, setUserProfile] = useState(null);
  const [err, setErr] = useState("");
  const [editProfileMode, setEditProfileMode] = useState(false);
  const getUserProfile = async () => {
    try {
      const profile = await yuvaOneApi.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setUserProfile(profile.data);
      // console.log(userProfile);
    } catch (err) {
      if (err?.response?.data?.code) {
        if (err.response.data.code === "token_not_valid") {
          ToastAndroid.show(
            "Your session has expired. login again",
            ToastAndroid.SHORT
          );
          logout();
        }
      } else {
        setErr("Error while getting user profile");
      }
    }
  };
  // console.log(accountContext);
  useEffect(() => {
    // setUserProfile(null);
    getUserProfile();
  }, [accountContext.refreshId]);

  if (err) {
    return (
      <>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontWeight: "500", fontSize: 16 }}>{err}</Text>
          <CustomButton
            title="Try again"
            textColor="white"
            backgroundColor="tomato"
            onPress={() => {
              setErr("");
              getUserProfile();
            }}
          ></CustomButton>
        </View>
      </>
    );
  }

  if (!userProfile) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color="tomato"></ActivityIndicator>
      </View>
    );
  }

  return (
    <>
      {/* <Header></Header> */}
      <StatusBar backgroundColor="white"></StatusBar>
      <View style={styles.body}>
        {userProfile ? (
          <ScrollView style={{ width: "100%" }}>
            <View style={{ width: "100%" }}>
              <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center" }}>
                  <Avatar
                    title={`${userProfile.first_name[0]}`}
                    titleStyle={{ color: "white" }}
                    rounded
                    containerStyle={{
                      backgroundColor: "tomato",
                      marginRight: 10,
                    }}
                    size={"large"}
                  ></Avatar>
                </View>

                <Text style={styles.sideHeads}>Mobile</Text>
                <Input
                  inputStyle={{ color: "black" }}
                  placeholderTextColor={"black"}
                  value={`${userProfile.mobile}`}
                  keyboardType="number-pad"
                  disabled={!editProfileMode}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                ></Input>
                <Text style={styles.sideHeads}>Business Name</Text>
                <Input
                  inputStyle={{ color: "black" }}
                  placeholderTextColor={"black"}
                  value={`${userProfile.first_name}`}
                  keyboardType="number-pad"
                  disabled={!editProfileMode}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                ></Input>
                <Text style={styles.sideHeads}>Email</Text>
                <Input
                  inputStyle={{ color: "black" }}
                  placeholderTextColor={"black"}
                  value={userProfile.email ? `${userProfile.email}` : "NA"}
                  disabled={!editProfileMode}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                ></Input>
                <Text style={styles.sideHeads}>Public Review URL</Text>
                <Input
                  inputStyle={{ color: "black" }}
                  placeholderTextColor={"black"}
                  value={
                    userProfile?.public_review_links?.Google
                      ? `${userProfile?.public_review_links?.Google}`
                      : "NA"
                  }
                  keyboardType="number-pad"
                  disabled={!editProfileMode}
                  disabledInputStyle={{ color: "black" }}
                  leftIconContainerStyle={{ margin: 10 }}
                  maxLength={30}
                ></Input>

                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <Button
                  title="Edit Profile"
                  onPress={() => {
                    setEditProfileMode(!editProfileMode);
                  }}
                ></Button> */}
                  <CustomButton
                    onPress={() => {
                      logout();
                    }}
                    title="LOGOUT"
                    backgroundColor="tomato"
                    textColor={"white"}
                    width={"50%"}
                    icon={() => (
                      <AntDesign
                        name="logout"
                        size={24}
                        color="white"
                        style={{ marginLeft: 10 }}
                      />
                    )}
                  ></CustomButton>
                </View>
              </View>
              {/* <View style={{ flex: 1, backgroundColor: "yellow" }}>
                <FAB
                  visible={true}
                  onPress={() => setVisible(!visible)}
                  placement="right"
                  title="Show"
                  icon={{ name: "edit", color: "white" }}
                  color="green"
                />
              </View> */}
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
};

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
    fontWeight: "800",
    marginHorizontal: 10,
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

export default AccountScreen;
