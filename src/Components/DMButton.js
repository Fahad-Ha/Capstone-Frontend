import { View, Text, Pressable, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const DMButton = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Users")}>
        <Feather name="mail" color={"black"} size={36} />
      </Pressable>
    </View>
  );
};

export default DMButton;
