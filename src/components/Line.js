import React from "react";
import { View, StyleSheet } from "react-native";

const Line = ({ children }) => {
  return <View style={{ ...styles.Line }}>{children}</View>;
};
const styles = StyleSheet.create({
  Line: {
    backgroundColor: "grey",
    height: 2,
    borderRadius: 5,
    width: 120,
    top: 8,
  },
});
export default Line;
