import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";

const MsgBubble = ({ msg, me, time }) => {
  return (
    <>
      <View
        style={[
          styles.bubble,
          {
            alignSelf: me ? "flex-end" : "flex-start",
            backgroundColor: me ? "#758DE2" : "#323435",
            elevation: Platform.OS === "android" ? 4 : 0,
            shadowColor: "#758DE2",

            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.5,
            shadowRadius: 50,
            shadowOpacity: 0.25,
            marginLeft: me ? 20 : 0,
            marginRight: me ? 0 : 20,
          },
        ]}
      >
        <Text style={{ color: me ? "#FFF" : "#FFF" }}>{msg}</Text>
        <Text
          style={{
            fontSize: 10,
            paddingLeft: "auto",

            alignSelf: me ? "flex-end" : "flex-start",
            color: me
              ? "#rgba(255, 255, 255, 0.5);"
              : "#rgba(255, 255, 255, 0.5);",
          }}
        >
          {moment(time).format("LT")}
        </Text>
      </View>
      {/* <Text
        style={{
          alignSelf: me ? "flex-end" : "flex-start",
          color: me
            ? "#rgba(255, 255, 255, 0.5);"
            : "#rgba(255, 255, 255, 0.5);",
        }}
      >
        {moment(time).format("LT")}
      </Text> */}
    </>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "70%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
  },
});

export default MsgBubble;
