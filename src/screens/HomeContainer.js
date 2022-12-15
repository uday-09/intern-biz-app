import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ReviewScreen from "./ReviewsScreen";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Context as AuthContext } from "../Context/AuthContext";
import { Context as AccountContext } from "../Context/AccountContext";
import AccountScreen from "./AccountScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PublicReviewScreen from "./PublicReviewScreen";
const Tab = createBottomTabNavigator();

const HomeContainer = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { state: AccountState } = useContext(AccountContext);
  // console.log(AccountState, "From container");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarHideOnKeyboard: true,
          tabBarVisibilityAnimationConfig: {
            visible: true,
            animation: "none",
          },
          tabBarIcon: ({ focused }) => {
            let sz = focused ? 24 : 18;
            if (route.name === "HomeScreen") {
              return (
                <FontAwesome
                  name="home"
                  size={sz}
                  color={focused ? "tomato" : "black"}
                />
              );
            } else if (route.name === "Account") {
              return (
                <MaterialIcons
                  name="account-circle"
                  size={sz}
                  color={focused ? "tomato" : "black"}
                />
              );
            } else if (route.name === "Public_Reviews") {
              return (
                <MaterialIcons
                  name="public"
                  size={sz}
                  color={focused ? "tomato" : "black"}
                />
              );
            } else {
              return (
                <TouchableOpacity>
                  <AntDesign
                    name="star"
                    size={sz}
                    color={focused ? "tomato" : "black"}
                  />
                </TouchableOpacity>
              );
            }
          },
        };
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerTitle: "Feedback",
          headerTitleStyle: { fontWeight: "900" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <MaterialIcons name="menu" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => logout()}>
                <AntDesign
                  name="logout"
                  size={24}
                  color="black"
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Reviews"
        component={ReviewScreen}
        options={{
          tabBarLabel: "Reviews",
          headerTitle: "Reviews",
          headerTitleStyle: { fontWeight: "500" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <MaterialIcons name="menu" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          // headerStyle: { backgroundColor: "tomato" },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Public_Reviews"
        component={PublicReviewScreen}
        options={{
          tabBarLabel: "Public Reviews",
          headerTitle: "EasyBiz",
          headerTitleStyle: { fontWeight: "500" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <MaterialIcons name="menu" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          // headerStyle: { backgroundColor: "tomato" },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          headerTitle: "Account",
          headerTitleStyle: { fontWeight: "900" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.toggleDrawer()}
              >
                <MaterialIcons name="menu" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit_Details", { AccountState })
                }
              >
                {AccountState?.account_info ? (
                  <MaterialCommunityIcons
                    name="account-edit-outline"
                    size={24}
                    color="black"
                    style={{ padding: 10 }}
                  />
                ) : null}
              </TouchableOpacity>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeContainer;
