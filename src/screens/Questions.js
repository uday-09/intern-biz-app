import React, { useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { Input } from "@rneui/themed";

import { EvilIcons } from "@expo/vector-icons";
import { COLORS } from "../Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import { Context } from "../Context/AuthContext";
import yuvaOneApi from "../api/yuvaOneApi";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQns, setNewQns] = useState("");
  const { state } = useContext(Context);
  const updateQuestions = async () => {
    const qnObject = {};
    questions.forEach((qn) => {
      qnObject[qn] = "";
    });
    // console.log(qnObject);
    try {
      const res = await yuvaOneApi.post(
        "/review/qns/add",
        {
          mobile: state.phoneNumber,
          qns_data: qnObject,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <View>
        <Text style={styles.headStyles}>Your Questions</Text>
        <View style={styles.faqContainer}>
          {questions.length === 0 ? (
            <Text style={styles.headStyles}>NONE</Text>
          ) : (
            <>
              <FlatList
                data={questions}
                keyExtractor={(key, index) => key + index}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      style={styles.FaqQ}
                      android_ripple={{ color: COLORS.bg_pink }}
                    >
                      <EvilIcons name="question" size={24} color="black" />
                      <Text>{item} </Text>
                    </Pressable>
                  );
                }}
              ></FlatList>
              <View style={{ alignItems: "center", margin: 10 }}>
                <CustomButton
                  title="Submit"
                  backgroundColor={"tomato"}
                  width="50%"
                  textColor="white"
                  height={40}
                  onPress={() => updateQuestions()}
                ></CustomButton>
              </View>
            </>
          )}
        </View>
      </View>
      {/**======================================================================== */}
      <View>
        <Text style={styles.headStyles}>Add Questions</Text>
        <View
          style={{
            ...styles.faqContainer,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Enter question"
            leftIcon={
              <MaterialCommunityIcons
                name="chat-question"
                size={24}
                color="black"
              />
            }
            inputContainerStyle={{ margin: 10, marginBottom: 0 }}
            leftIconContainerStyle={{ marginRight: 10 }}
            multiline={true}
            onChangeText={(newQn) => setNewQns(newQn)}
            inputStyle={{ fontSize: 16 }}
          ></Input>

          <CustomButton
            title="Add Question"
            backgroundColor={COLORS.btn_blue}
            width={"50%"}
            textColor="white"
            onPress={() => setQuestions([...questions, newQns])}
          ></CustomButton>
          <View style={{ marginBottom: 20 }}></View>
        </View>
      </View>
      {/**======================================================================== */}
      <Text style={{ ...styles.headStyles }}>
        Add frequently Asked Questions
      </Text>
      <View style={styles.faqContainer}>
        <Pressable
          style={styles.FaqQ}
          android_ripple={{ color: COLORS.bg_pink }}
          onPress={() =>
            setQuestions([...questions, "Please rate your experience"])
          }
        >
          <EvilIcons name="question" size={24} color="black" />
          <Text>Please rate your experience</Text>
        </Pressable>
        <Pressable
          style={styles.FaqQ}
          android_ripple={{ color: COLORS.bg_pink }}
          onPress={() =>
            setQuestions([...questions, "Please rate our servies"])
          }
        >
          <EvilIcons name="question" size={24} color="black" />
          <Text>Please rate our servies</Text>
        </Pressable>
        <Pressable
          style={styles.FaqQ}
          android_ripple={{ color: COLORS.bg_pink }}
          onPress={() => setQuestions([...questions, "Rate us"])}
        >
          <EvilIcons name="question" size={24} color="black" />
          <Text>Rate us</Text>
        </Pressable>
        <Pressable
          style={styles.FaqQ}
          android_ripple={{ color: COLORS.bg_pink }}
          onPress={() => setQuestions([...questions, "Rate the food quality"])}
        >
          <EvilIcons name="question" size={24} color="black" />
          <Text>Rate the food quality</Text>
        </Pressable>
        <Pressable
          style={styles.FaqQ}
          android_ripple={{ color: COLORS.bg_pink }}
          onPress={() =>
            setQuestions([...questions, "Help us to improve through feedback"])
          }
        >
          <EvilIcons name="question" size={24} color="black" />
          <Text>Help us to improve through feedback</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  faqContainer: {
    backgroundColor: COLORS.bg_pink,
    borderRadius: 20,
    elevation: 5,
  },
  FaqQ: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headStyles: {
    margin: 5,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Questions;
