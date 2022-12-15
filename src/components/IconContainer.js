import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
const CENTERING = {
  alignItems: "center",
  justifyContent: "center",
};

const IconContainer = ({ addOnClick }) => {
  const navLink = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={{ ...CENTERING }}>
          <TouchableOpacity onPress={() => navLink.navigate("Reviews")}>
            <View style={styles.iconStyles}>
              <Feather name="star" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtStyle}>Reviews</Text>
        </View>
        <View style={{ ...CENTERING }}>
          <TouchableOpacity onPress={() => navLink.navigate("Account")}>
            <View style={styles.iconStyles}>
              <MaterialIcons name="account-circle" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtStyle}>Account</Text>
        </View>
        {/* <View style={{ ...CENTERING }}>
          <TouchableOpacity onPress={() => console.log("Hey")}>
            <View style={styles.iconStyles}>
              <FontAwesome5 name="user-edit" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtStyle}>Edit mobile</Text>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconStyles: {
    backgroundColor: "tomato",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    //elevation: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: "rgba(118, 73, 252, 0.2)",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    // elevation: 5,
  },
  txtStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default IconContainer;
