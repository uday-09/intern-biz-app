import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";

import Line from "../components/Line";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../Context/AuthContext";
import AuthForm from "../components/AuthForm";
import { validity } from "../functions/checkValidity";

const { width, height } = Dimensions.get("screen");

const CENTERING = {
  alignItems: "center",
  justifyContent: "center",
};

const LoginScreen = ({ navigation }) => {
  const { state, addPhoneNumber, clearErrorMessage, setIsLoading } =
    useContext(Context);

  useEffect(() => {
    navigation.addListener("focus", () => {
      clearErrorMessage();
    });
    return () => {
      console.log("cleaned up");
    };
  }, [navigation]);

  useEffect(() => {
    console.log(state);
    return () => {
      console.log("cleaned up");
    };
  }, [state.errorMessage]);

  return (
    <View style={{ backgroundColor: "white", flex: 1, ...CENTERING }}>
      <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
        {/* --------------------------------Upper section------------------------ */}
        <View style={{ ...CENTERING, marginTop: 15 }}>
          <Text style={styles.welcomeText}>Welcome to EASY BIZ App!</Text>
          <View style={{ ...CENTERING }}>
            <Image
              source={require("../../assets/OtpImage2.jpg")}
              style={styles.imageStyle}
            ></Image>
          </View>
        </View>
        {/* --------------------------------Middle section------------------------ */}
        <View style={styles.orContainer}>
          <Line></Line>
          <Ionicons name="person" size={20} color="black" />
          <Line></Line>
        </View>
        {/* --------------------------------Lower section------------------------ */}
        <View style={{ ...CENTERING, marginTop: 5 }}>
          <AuthForm
            nav={navigation}
            onSubmit={(phoneNumber) => {
              const isValid = validity(phoneNumber);
              const valid = isValid && phoneNumber.length === 10;
              if (!valid) {
                ToastAndroid.show(
                  "Invalid mobile. Failed to send OTP.",
                  ToastAndroid.SHORT
                );
              } else {
                setIsLoading(true);
                addPhoneNumber(phoneNumber, navigation);
              }
            }}
          ></AuthForm>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: width,
    height: height / 3,
  },
  welcomeText: {
    color: "black",
    fontWeight: "bold",
    padding: 10,
    fontSize: 18,
  },
  orContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 10,
  },
});

export default LoginScreen;
