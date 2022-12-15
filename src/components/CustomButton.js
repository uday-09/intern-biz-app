import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const MAIN_THEME = "#1df0db";
const CENTERING = {
  alignItems: "center",
  justifyContent: "center",
};

const CustomButton = ({
  title = "Submit",
  backgroundColor = MAIN_THEME,
  textColor = "black",
  textStyles = {},
  width = "75%",
  height = 50,
  icon = () => null,
  onPress = null,
  disabled = false,
  applyStyles = {},
}) => {
  return (
    <Pressable
      style={{
        ...styles.btnStyles,
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        ...applyStyles,
      }}
      android_ripple={{ color: "grey" }}
      onPress={() => onPress()}
      disabled={disabled}
    >
      {title ? (
        <Text style={{ fontWeight: "bold", color: textColor, ...textStyles }}>
          {title}
        </Text>
      ) : null}
      {true ? icon() : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnStyles: {
    backgroundColor: MAIN_THEME,
    ...CENTERING,
    width: "75%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 5,
  },
});

export default CustomButton;
