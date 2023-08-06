import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ConnectionState = ({ isConnected }) => {
  return (
    <View>
      <Text>State: {"" + isConnected}</Text>
    </View>
  );
};

export default ConnectionState;

const styles = StyleSheet.create({});
