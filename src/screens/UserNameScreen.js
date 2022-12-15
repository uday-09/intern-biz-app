import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from "react-native";

import CustomButton from "../components/CustomButton";
import { Input } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Context } from "../Context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { Octicons } from "@expo/vector-icons";
import { COLORS } from "../Colors";

const TOP_COLOR = "#87e8bb";
const BTN_COLOR = "#1f97ed";
const MAIN_THEME = "#1df0db";

const { width, height } = Dimensions.get("screen");

const UserNameScreen = ({ navigation }) => {
  const { state, addBusinessName, clearErrorMessage, setIsLoading } = useContext(Context);
  const [businessName, setBusinessName] = useState("");
  const [bizType, setBizType] = useState("clinic"); // Possible values:
  useEffect(() => {
    navigation.addListener("focus", () => {
      clearErrorMessage();
    });
    return () => {
      console.log("cleaned up");
    };
  }, [navigation]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        bounces={false}
        style={{ flex: 1, backgroundColor: "white", marginTop: "5%" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.upperContainer}>
          <Image
            source={require("../../assets/username.jpg")}
            style={styles.imgStyle}
            resizeMode="stretch"
          ></Image>
        </View>
        {/* -------------------------->---------Input Section----------<------------------------ */}
        <View style={styles.lowerContainer}>
          <View style={styles.subContainer}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                margin: 10,
              }}
            >
              USER DETAILS
            </Text>
            <Input
              placeholder="Enter business name"
              style={{ marginBottom: 0, padding: 0 }}
              leftIcon={
                <FontAwesome name="user-circle-o" size={24} color={"black"} />
              }
              leftIconContainerStyle={{ marginRight: 10 }}
              inputStyle={{ color: "black" }}
              onChangeText={(text) => setBusinessName(text)}
            ></Input>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 15,
                // backgroundColor: "grey",
                paddingHorizontal: 5,
                borderWidth: 0.3,
                borderColor: "black",
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopColor: COLORS.bg_pink,
                borderLeftColor: COLORS.bg_pink,
                borderRightColor: COLORS.bg_pink,
                marginBottom: 10,
              }}
            >
              <Octicons name="organization" size={17} color="black" />
              <Picker
                style={{ width: "100%", margin: 0, padding: 0 }}
                selectedValue={bizType}
                onValueChange={(itemValue, itemIndex) => setBizType(itemValue)}
                placeholder={"Enter business type"}
              >
                <Picker.Item label="Clinic" value="Clinic" />
                <Picker.Item label="Restaurant" value="Restaurant" />
                <Picker.Item label="Lodging/Hotel" value="Lodging/Hotel" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>

            {state.isLoading === false ? <CustomButton
              title={"SUBMIT & SEND OTP"}
              backgroundColor={"tomato"}
              textColor="white"
              textStyles={{ fontWeight: "bold" }}
              width={"75%"}
              icon={() => (
                <Feather name="arrow-right" size={24} color="white" />
              )}
              onPress={() => {
                setIsLoading(true)
                addBusinessName(
                  state.phoneNumber,
                  businessName,
                  bizType,
                  navigation
                );
              }}
            ></CustomButton>: <CustomButton
            // onPress={() => {
            //   console.log("disable")
            // }}
            disabled={true}
            title=""
            backgroundColor="rgb(253, 134, 113)"
            textColor={"white"}
            icon={() => (
              <ActivityIndicator size={"large"} color="white"></ActivityIndicator>
            )}
          ></CustomButton>}
            {/* <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 14,
                padding: 5,
                marginTop: 10,
              }}
            >
              Your Business name has not yet been registered. Please enter
              Business name and type.
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    height: height / 3,
    width: "100%",
    resizeMode: "stretch",
  },
  upperContainer: {
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: COLORS.bg_pink,
    borderRadius: 30,
    width: "95%",
    alignItems: "center",
    padding: 20,
  },
  lowerContainer: {
    alignItems: "center",
    borderColor: "black",
    marginTop: 20,
  },
});

export default UserNameScreen;
