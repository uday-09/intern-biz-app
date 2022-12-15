import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../Context/AuthContext";

const AuthEmptyScreen = ({ navigation }) => {
  const { tryLocalSignin } = useContext(Context);
  useEffect(() => {
    tryLocalSignin(navigation);
  }, []);

  return <></>;
};

const styles = StyleSheet.create({});

export default AuthEmptyScreen;
