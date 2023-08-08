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
            backgroundColor: me ? "#CC1233" : "#323435",
          },
        ]}
      >
        <Text style={{ color: me ? "#FFF" : "#FFF" }}>{msg}</Text>
      </View>
      <Text
        style={{
          alignSelf: me ? "flex-end" : "flex-start",
          color: me
            ? "#rgba(255, 255, 255, 0.5);"
            : "#rgba(255, 255, 255, 0.5);",
        }}
      >
        {moment(time).format("LT")}
      </Text>
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
