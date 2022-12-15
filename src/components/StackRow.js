import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function StackRow({ children, applyStyles }) {
  return <View style={{ ...styles.stackRow, ...applyStyles }}>{children}</View>;
}

const styles = StyleSheet.create({
  stackRow: {
    flexDirection: "row",
  },
});
