import { Button, StyleSheet, Text, View, TextInput } from "react-native";

import { useState } from "react";
import { socket } from "../../socket";

const MyForm = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    setIsLoading(true);

    socket.timeout(5000).emit("create-something", value, () => {
      setIsLoading(false);
    });
  }
  return (
    <View>
      <TextInput onChangeText={(value) => setValue(value)} />

      <Button title="submit" onPress={onSubmit} disabled={isLoading}></Button>
    </View>
  );
};

export default MyForm;

const styles = StyleSheet.create({});
