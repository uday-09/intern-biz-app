import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Input } from "@rneui/themed";
const { width, height } = Dimensions.get("screen");
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Context } from "../Context/AuthContext";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../Colors";
import { version } from "../../package.json";

const CENTERING = {
  alignItems: "center",
  justifyContent: "center",
};

const OtpScreen = ({ navigation }) => {
  const { state, verifyOtp, clearErrorMessage, setIsLoading } =
    useContext(Context);
  const [otp, setOtp] = useState("");
  const [vesrion, setVersion] = useState("");
  useEffect(() => {
    navigation.addListener("focus", () => {
      clearErrorMessage();
    });
    setVersion(version);
    return () => {};
  }, [navigation]);
  return (
    <ScrollView
      bounces={false}
      style={{ flex: 1, backgroundColor: "white" }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.upperContainer}>
        <Image
          source={require("../../assets/OtpImage4.jpg")}
          style={styles.imgStyles}
          resizeMode="stretch"
        ></Image>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.otpStyles}>
          An OTP has been sent your mobile number. Please verify.
        </Text>
      </View>
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
            Verify OTP
          </Text>
          <Input
            placeholder="Enter OTP"
            leftIcon={<FontAwesome5 name="lock" size={24} color={"black"} />}
            leftIconContainerStyle={{ marginRight: 30 }}
            inputStyle={{ color: "black" }}
            keyboardType="number-pad"
            onChangeText={(val) => setOtp(val)}
          ></Input>
          {state.isLoading === false ? (
            <CustomButton
              onPress={() => {
                const phoneNumber = state.phoneNumber;
                setIsLoading(true);
                verifyOtp({ phoneNumber, otp, version });
              }}
              title="VERIFY"
              backgroundColor={"tomato"}
              textColor="white"
              icon={() => (
                <Feather
                  style={{ margin: 5 }}
                  name="check-circle"
                  size={24}
                  color={"white"}
                />
              )}
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
            ></CustomButton>
          )}
          <View style={{ ...CENTERING }}>
            {state.errorMessage !== "" ? (
              <Text style={styles.errorStyle}>{state.errorMessage}</Text>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgStyles: {
    width: width - 0,
    height: height / 2.5,
    margin: 20,
    backgroundColor: "pink",
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
  },
  otpStyles: {
    padding: 10,
    fontWeight: "bold",
  },
  errorStyle: {
    color: "red",
    margin: 10,
    marginBottom: 0,
  },
});

export default OtpScreen;
