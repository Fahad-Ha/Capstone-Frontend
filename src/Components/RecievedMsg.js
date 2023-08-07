import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ReceivedMsg({ msg }) {
  return (
    <View
      style={{
        margin: 3,
        backgroundColor: "#303030", // Set the desired background color here
        maxWidth: "70%",
        borderRadius: 10,
        marginRight: "auto",
      }}
    >
      <View style={{ padding: 12 }}>
        <View>{/* Render your image here */}</View>
        <Text key={msg._id} style={{ color: "#FFF" }}>
          {msg.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
