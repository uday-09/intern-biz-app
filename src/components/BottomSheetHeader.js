import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function BottomSheetHeader({ title, onPress }) {
  return (
    <View>
      <View style={styles.body}>
        <View>
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={{ marginHorizontal: 0 }}
            onPress={() => onPress()}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 18, marginLeft: 10 }}>{title}</Text>
          </View>
          {/* <View>
            <Text style={{ color: "blue", padding: 5 }}>Clear filters</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
  },
});
