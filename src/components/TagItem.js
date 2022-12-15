import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function ({
  tagTitle,
  onPress,
  showRightIcon = true,
  icon = null,
  applyStyles = {},
}) {
  return (
    <>
      {/* <View>
        <View style={styles.tagsContainer}> */}
      <TouchableOpacity
        style={styles.tagsOuterBox}
        onPress={() => {
          onPress(true);
        }}
      >
        <View style={{ ...styles.tagsHolder, ...applyStyles }}>
          <View>
            <Text style={{ ...styles.tagText, ...applyStyles }}>
              {tagTitle}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {showRightIcon ? (
              <View>
                {icon == null ? (
                  <FontAwesome
                    name="sort-down"
                    size={13}
                    color="black"
                    style={{ padding: 5 }}
                  />
                ) : (
                  icon()
                )}
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
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
