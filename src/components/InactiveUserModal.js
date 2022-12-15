import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Overlay } from "@rneui/themed";
function InactiveUserModal({ active, activityStatus }) {
  return (
    <Overlay isVisible={active}>
      <View>
        {activityStatus === null ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              color={"tomato"}
              size={"large"}
            ></ActivityIndicator>
            <Text style={{ marginHorizontal: 10 }}>Please wait...</Text>
          </View>
        ) : (
          <>
            <View>
              <Text>Easy Biz Help</Text>
              <Text>
                Your account is not activated. To get free tier access or paid
                version of services, please contact us action info@asterteq.com
              </Text>
            </View>
          </>
        )}
      </View>
    </Overlay>
  );
}

export default InactiveUserModal;
