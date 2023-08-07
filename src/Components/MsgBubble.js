import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MsgBubble = ({ msg, me }) => {
  return (
    <View
      style={[
        styles.bubble,
        {
          alignSelf: me ? "flex-end" : "flex-start",
          backgroundColor: me ? "#FF2500" : "#FF2500",
        },
      ]}
    >
      <Text style={{ color: me ? "#FFF" : "#FFF" }}>{msg}</Text>
    </View>
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
