import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import TagItem from "./TagItem";
import { BottomSheet } from "@rneui/themed";

export default function FiltersView() {
  return (
    <>
      <View>
        <View style={styles.tagsContainer}>
          <TagItem tagTitle={"Month"}></TagItem>
          <TagItem tagTitle={"Custom"}></TagItem>
          <TagItem tagTitle={"Filter"}></TagItem>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    margin: 8,
    marginBottom: 0,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 7,
  },
  tagsHolder: {
    flexDirection: "row",
    padding: 2,
    marginHorizontal: 5,
  },
  tagText: {
    fontSize: 13,
    padding: 5,
  },
  tagsOuterBox: {
    borderColor: "#c0c0c0",
    borderWidth: 1,
    borderRadius: 50,
  },
});
