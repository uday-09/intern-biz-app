import React from "react";
import { View, Text, StyleSheet } from "react-native";

function PricingCard({
  title = "SERVICES",
  price = 0,
  content = null,
  buttonTitle = "PROCEED TO PAY",
  color = "tomato",
}) {
  return (
    <>
      <View style={styles.card}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ ...styles.title, color }}>{title}</Text>
          <Text style={styles.price}>{`₹${price}`}</Text>
        </View>
        {content ? <Text>{content}</Text> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    padding: 10,
  },
  price: {
    fontSize: 30,
    fontWeight: "800",
  },
});

export default PricingCard;
