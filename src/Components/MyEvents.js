import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyEvents = ({ events }) => {
  return (
    <View>
      {events.map((event, index) => (
        <Text key={index}>{event}</Text>
      ))}
    </View>
  );
};

export default MyEvents;

const styles = StyleSheet.create({});
