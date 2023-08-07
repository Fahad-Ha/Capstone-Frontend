import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MsgBubble = ({ me, msg }) => {
  if (me) {
    return (
      <View style={{ marginLeft: "auto" }}>
        <Text>{msg}</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>{msg}</Text>
    </View>
  );
};

export default MsgBubble;

const styles = StyleSheet.create({});
