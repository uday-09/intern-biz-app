import React from "react";
import { StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";
import { View } from "react-native";

function SkeletonLoading(props) {
  return (
    <>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Skeleton
          style={styles.skeleton}
          width={"95%"}
          height={30}
          animation="wave"
        />
        <Skeleton
          style={styles.skeleton}
          width={"95%"}
          height={30}
          animation="wave"
        />
        <Skeleton
          style={styles.skeleton}
          width={"95%"}
          height={30}
          animation="wave"
        />
        <Skeleton
          style={styles.skeleton}
          width={"95%"}
          height={30}
          animation="wave"
        />
        <Skeleton
          style={styles.skeleton}
          width={"95%"}
          height={30}
          animation="wave"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    margin: 5,
    borderRadius: 5,
  },
});

export default SkeletonLoading;
