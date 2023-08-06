import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { socket } from "../../socket";

export default function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  return (
    <View>
      <Button title="connect" onPress={connect}></Button>
      <Button title="disconnect" onPress={disconnect}></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
