import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import CustomButton from "./CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import { Context } from "../Context/AuthContext";
import { COLORS } from "../Colors";

const CENTERING = {
  alignItems: "center",
  justifyContent: "center",
};

const AuthForm = ({ onSubmit, nav }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { state, setIsLoading } = useContext(Context);
  console.log(state.isLoading)
  return (
    <>
      <View style={styles.subContainer}>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 18,
            margin: 10,
          }}
        >
          LOGIN
        </Text>
        <Input
          placeholder="Enter Phone number"
          leftIcon={<AntDesign name="phone" size={24} color={"black"} />}
          leftIconContainerStyle={{ margin: 10 }}
          inputStyle={{ color: "black" }}
          placeholderTextColor={"black"}
          onChangeText={(value) => setPhoneNumber(value)}
          keyboardType="number-pad"
        ></Input>
        {!state.isLoading  ?
          <CustomButton
          onPress={() => {
            onSubmit(phoneNumber);
          }}
          title="SUBMIT"
          backgroundColor="tomato"
          textColor={"white"}
          icon={() => (
            <AntDesign
              style={{ margin: 5 }}
              name="login"
              size={24}
              color={"white"}
            />
          )}
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
      </View>
      {state.errorMessage !== "" ? (
        <View style={{ ...CENTERING, ...styles.errorContainer }}>
          <Text style={styles.errorStyle}>{state.errorMessage}</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: COLORS.bg_pink, //"rgba(118, 73, 252, 0.9)",
    borderRadius: 30,
    width: "95%",
    alignItems: "center",
    padding: 20,
    shadowRadius: 10,
    marginHorizontal: 20,
  },
  errorStyle: {
    color: "red",
    marginBottom: 0,
  },
  errorContainer: {
    backgroundColor: "rgba(220, 0, 0, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AuthForm;
