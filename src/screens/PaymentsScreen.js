import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Context as AccountContext } from "../Context/AccountContext";
import StackRow from "../components/StackRow";
import { PricingCard as PriceCard } from "@rneui/themed";
import PricingCard from "../components/PricingCard";
import axios from "axios";
import yuvaOneApi from "../api/yuvaOneApi";
import { Context as AuthContext } from "../Context/AuthContext";
import { Linking } from "react-native";

const PaymentScreen = ({ navigation }) => {
  const { state: accountState } = useContext(AccountContext);
  const { state: authState } = useContext(AuthContext);
  console.log(accountState?.account_info?.first_name);

  const [transactionInfo, setTransactionInfo] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  //   console.log(transactionDetails);
  //   console.log(authState.token);

  const checkTransactionStatus = async (transactionId) => {
    try {
      const result = await yuvaOneApi.get("/customer/payment-details", {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setTransactionDetails(result.data);
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data);
    }
  };

  const doPayment = async () => {
    console.log(accountState?.account_info?.mobile);
    const mobile = accountState?.account_info?.mobile;
    const amount = 15; //Make it dynamic
    try {
      const result = await yuvaOneApi.post(
        "/customer/payment/add",
        {
          customer_mobile: 7036588530,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(result.data);
      setTransactionInfo(result.data);
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    checkTransactionStatus();
  }, []);

  return (
    <>
      <View style={styles.body}>
        <LinearGradient
          colors={["#f46b45", "#eea849"]}
          style={styles.paymentCard}
        >
          <StackRow>
            <View style={styles.paymentTextContainer}>
              <Text style={styles.paymentText}>
                {`Hello, ${
                  accountState?.account_info?.first_name
                    ? accountState?.account_info?.first_name
                    : "Customer"
                }`}
              </Text>
            </View>
          </StackRow>
        </LinearGradient>
        <PriceCard
          color={"#f46b45"}
          title="Services"
          price="₹15"
          info={["For Private Reviews", "Public Reviews", "All Core Features"]}
          button={{ title: "PROCEED TO PAY" }}
          containerStyle={{ margin: 0, marginVertical: 15, borderRadius: 15 }}
          onButtonPress={doPayment}
        />
        {/* <PricingCard content={"Thanks for using our services. The price is "}></PricingCard> */}
        {transactionInfo ? (
          <>
            <Text onPress={() => Linking.openURL(transactionInfo.payment_url)}>
              Link
            </Text>
          </>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 15,
  },
  paymentText: {
    padding: 15,
    color: "white",
    fontSize: 17,
  },
  paymentCard: {
    borderRadius: 10,
  },
  paymentTextContainer: {
    width: "80%",
  },
});

export default PaymentScreen;
