import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeContainer from "./HomeContainer";
import AccountScreen from "./AccountScreen";
const Drawer = createDrawerNavigator();
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../Context/AuthContext";
import { View } from "react-native";
import { version } from "../../package.json";
import { Dimensions } from "react-native";
import { COLORS } from "../Colors";
import PaymentScreen from "./PaymentsScreen";

export default () => {
  const { logout } = useContext(AuthContext);
  const CustomDrawerElements = (props) => {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <DrawerItemList {...props}></DrawerItemList>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <DrawerItem
            style={{ backgroundColor: COLORS.bg_pink }}
            label={"Logout"}
            onPress={() => {
              logout();
            }}
          ></DrawerItem>
          <DrawerItem label={`version: ${version}`}></DrawerItem>
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerHideStatusBarOnOpen: false,
        // headerStyle: { backgroundColor: "tomato" },
        headerShown: false,
      }}
      drawerContent={(props) => (
        <CustomDrawerElements {...props}></CustomDrawerElements>
      )}
      defaultScreenOptions={{
        drawerType: "front",
        drawerStatusBarAnimation: "fade",
        headerLeft: () => {
          return ({ focused }) => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={focused ? "blue" : "black"}
            />
          );
        },
      }}
    >
      <Drawer.Screen
        name="Feedback"
        component={HomeContainer}
        options={{
          // headerLeft: () => {
          //   return null;
          // },
          headerTitle: "Feedback",
          headerTitleAlign: "left",
          drawerLabel: "Home",
          drawerIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Account"
        component={AccountScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialIcons
              name="account-circle"
              size={24}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Bills & Payments"
        component={PaymentScreen}
        options={{
          headerShown: true,
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};
