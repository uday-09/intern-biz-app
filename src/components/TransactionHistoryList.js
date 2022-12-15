import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "@rneui/themed";

const TransactionHistoryList = ({ transaction }) => {
  console.log(transaction);
  let transactionDate = transaction.created_at;
  const date = new Date();
  const dateString = date.toISOString().substring(0, 10);
  console.log(transactionDate.substring(0, 10), typeof transactionDate);
  return (
    <>
      <View style={styles.holder}>
        <View style={{ backgroundColor: "pink", ...styles.center }}>
          <Avatar
            title={`${transaction.customer_mobile[0]}`}
            titleStyle={{
              color: transaction.sms_sent === true ? "white" : "black",
              fontWeight: "bold",
            }}
            rounded
            containerStyle={{
              backgroundColor:
                transaction.sms_sent === true ? "#42ba96" : "#fbdb2b",
              marginRight: 10,
            }}
            size={"small"}
          ></Avatar>
          <Text style={styles.datesStyles}>
            {transaction?.created_at.substring(0, 10) === dateString
              ? "today"
              : "older"}
          </Text>
        </View>

        <View style={styles.transaction}>
          <Text>{transaction?.customer_mobile}</Text>
          <Text>
            {transaction?.sms_sent === true
              ? "Review Sent to Customer"
              : "Review Pending"}
          </Text>
        </View>
        <View style={styles.deleteOption}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  holder: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  transaction: {},
  success: {
    backgroundColor: "#42ba96",
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteOption: {
    width: 40,
    height: 40,
    backgroundColor: "yellow",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  datesStyles: {
    fontSize: 10,
  },
});

export default TransactionHistoryList;
