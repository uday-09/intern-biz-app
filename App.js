import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import OtpScreen from "./src/screens/OtpPage";
import DrawerContainer from "./src/screens/DrawerContainer";
import { Provider as AuthProvider, Context } from "./src/Context/AuthContext";
import { Provider as ReviewProvider } from "./src/Context/ReviewsContext";
import UserNameScreen from "./src/screens/UserNameScreen";
import AuthEmptyScreen from "./src/screens/AuthEmptyScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import { Provider as AccountProvider } from "./src/Context/AccountContext";
import { Provider as PublicReviewProvider } from "./src/Context/PublicReviewContext";
const Stack = createNativeStackNavigator();

function App() {
  const { state } = useContext(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.token === null ? (
          <Stack.Group>
            <Stack.Screen
              name="Empty"
              component={AuthEmptyScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerLeft: () => {
                  return null;
                },
              }}
            ></Stack.Screen>
            <Stack.Screen name="OTP" component={OtpScreen}></Stack.Screen>
            <Stack.Screen
              name="Signup"
              component={UserNameScreen}
            ></Stack.Screen>
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen
              name="Main_holder"
              component={DrawerContainer}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Edit_Details"
              component={EditProfileScreen}
              options={{
                headerTitle: "Edit Details",
                headerTintColor: "Tomato",
              }}
            ></Stack.Screen>
            {/* <Stack.Screen name="Questions" component={Questions}></Stack.Screen> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AccountProvider>
      <ReviewProvider>
        <AuthProvider>
          <PublicReviewProvider>
            <App></App>
          </PublicReviewProvider>
        </AuthProvider>
      </ReviewProvider>
    </AccountProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
