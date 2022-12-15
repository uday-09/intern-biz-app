import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const colors = [
  { light: "#32a8a4", dark: "#093b39" },
  { light: "#71eb9b", dark: "#0f632c" },
  { light: "rgb(253, 134, 113)", dark: "tomato" },
  { light: "#b694d1", dark: "#431b63" },
  { light: "#f097e7", dark: "#e62e46" },
  //   { light, dark },
  //   { light, dark },
  //   { light, dark },
];

export default function ({
  width = 30,
  height = 30,
  roundness = 50,
  backgroundColor = "tomato",
  children,
  text = "U",
  applyStyles = {},
}) {
  //   const [randInt, setRandInt] = useState(Math.floor(Math.random() * 5));
  return (
    <View
      style={{
        ...styles.rounded,
        width,
        height,
        backgroundColor,
        borderRadius: roundness,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rounded: {
    alignItems: "center",
    justifyContent: "center",
  },
});
