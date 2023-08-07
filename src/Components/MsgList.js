import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MsgBubble from "./MsgBubble";
import RecievedMsg from "./RecievedMsg";

export default function MsgList({ user, data }) {
  return (
    <View style={{ flex: 1 }}>
      {data?.msgs.map((msg) => {
        if (msg.from._id == user._id) {
          return <MsgBubble msg={msg} />;
        } else {
          return <RecievedMsg msg={msg} />;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
