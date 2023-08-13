import { View, Text, Pressable, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../Navigation";

const DMButton = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate(ROUTES.APPROUTES.DIRECT_MSGLIST)}
      >
        <Ionicons
          name="md-chatbubble-ellipses-outline"
          size={35}
          color="white"
          style={{ paddingTop: 20 }}
        />
        {/* <Ionicons
          name="md-chatbubble-ellipses"
          size={34}
          color="white"
          style={{ paddingTop: 20 }}
        /> */}
      </Pressable>
    </View>
  );
};

export default DMButton;
