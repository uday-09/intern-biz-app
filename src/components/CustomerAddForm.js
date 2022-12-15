import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  Linking,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Input } from "@rneui/themed";
import CustomButton from "./CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { Context as AccountContext } from "../Context/AccountContext";
import { Context as AuthContext } from "../Context/AuthContext";
import yuvaOneApi from "../api/yuvaOneApi";
import { validity } from "../functions/checkValidity";
const AddCustomerForm = ({ toggler = true, editedPhoneNumber, onSubmit }) => {
  const [toggle, setToggle] = useState(true);
  const { state, logout, setIsLoading } = useContext(AuthContext);
  const { state: AccountState } = useContext(AccountContext);
  const [customerMobile, setCustomerMobile] = useState(editedPhoneNumber);
  const addCustomer = async () => {
    yuvaOneApi
      .post(
        "/customer/add",
        {
          customer_mobile: customerMobile,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.success === true) {
          ToastAndroid.show("Customer added succesfully", ToastAndroid.SHORT);
          setCustomerMobile("");
        }
        onSubmit();
        if (AccountState !== null) {
          if (
            AccountState?.account_info?.freetier_before_active === true &&
            AccountState?.account_info?.is_activated === false
          ) {
            Alert.alert(
              "Warning",
              `Hi ${AccountState.account_info.first_name}! Your Free Tier Services has expired. If you would like to continue using our service, Please Contact our sales associate or email us at info@asterteq.com`,
              [
                {
                  text: "OKay! I understand",
                },
              ]
            );
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.response?.data?.code) {
          console.log("code" in err.response.data, "Hey*");
          if (err.response.data.code === "token_not_valid") {
            ToastAndroid.show(
              "Your has expired. login again",
              ToastAndroid.SHORT
            );
            logout();
          } else {
            ToastAndroid.show("Failed to add Customer.", ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show("Failed to add Customer.", ToastAndroid.SHORT);
        }
      });
  };

  useEffect(() => {
    setToggle(toggler);
    setCustomerMobile(editedPhoneNumber);
    return () => {
      console.log("unmounted");
    };
  }, [toggler, editedPhoneNumber]);

  return (
    <>
      <View style={styles.container}>
        {toggle ? (
          <>
            <View style={styles.topInnerContainer}>
              {/* <Avatar
                source={require("../../assets/welcome.jpg")}
                containerStyle={styles.avatar}
                resizeMode="contain"
                size={"large"}
              ></Avatar> */}
              <Image
                source={require("../../assets/welcome2.jpg")}
                style={{ width: "100%", height: 100, marginBottom: 10 }}
                resizeMode="contain"
              ></Image>
            </View>
            <View style={styles.innerConatiner}>
              <Input
                value={customerMobile}
                placeholder="Enter Phone number"
                leftIcon={<AntDesign name="phone" size={24} color="black" />}
                leftIconContainerStyle={{ margin: 10 }}
                inputStyle={{ color: "black", width: "80%" }}
                keyboardType="number-pad"
                onChangeText={(text) => setCustomerMobile(text)}
              ></Input>
              {state.isLoading === false ? (
                <CustomButton
                  backgroundColor={"tomato"}
                  title="Add Customer"
                  textColor="white"
                  onPress={() => {
                    console.log(validity(customerMobile));
                    const valid =
                      validity(customerMobile) && customerMobile.length === 10;
                    if (valid) {
                      setIsLoading(true);
                      addCustomer();
                    } else
                      ToastAndroid.show(
                        "Invalid mobile number. Failed to add customer",
                        ToastAndroid.SHORT
                      );
                  }}
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
            </View>
          </>
        ) : (
          <Image
            source={require("../../assets/Home.jpg")}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          ></Image>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", //COLORS.bg_pink, //"rgba(252,238,227,0.5)"
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    marginBottom: 5,
    borderRadius: 20,
    elevation: 5,
    padding: 20,
  },
  topInnerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  avatar: {
    marginBottom: 20,
  },
});

export default AddCustomerForm;
