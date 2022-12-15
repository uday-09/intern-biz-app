import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ThinLine() {
  return <View style={styles.line}></View>;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "#c0c0c0",
  },
});
