import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ActionedReviewScreen from "./ActionedReviewScreen";
import UnactionedReviewScreen from "./UnactionedReviewScreen";
const TopTab = createMaterialTopTabNavigator();
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TopNaviagtionContainer = () => {
  return (
    <NavigationContainer independent={true}>
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "white" },
        }}
      >
        <TopTab.Screen
          component={UnactionedReviewScreen}
          name="Not followed"
          options={{
            title: "To Do",
            tabBarActiveTintColor: "tomato",
          }}
        ></TopTab.Screen>
        <TopTab.Screen
          component={ActionedReviewScreen}
          name="followed"
          options={{ title: "Done", tabBarActiveTintColor: "tomato" }}
        ></TopTab.Screen>
      </TopTab.Navigator>
    </NavigationContainer>
  );
};

export default TopNaviagtionContainer;
