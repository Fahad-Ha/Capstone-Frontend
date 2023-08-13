import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useContext } from "react";
import EventList from "../Components/Events/EventList";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";
import DMButton from "../Components/DMButton";
import HomeBB from "../../assets/Home1.png";
import { BlurView } from "expo-blur";
import UserContext from "../context/UserContext";

const Explore = () => {
  const { user, setUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["events"]);
      return () => {};
    }, [])
  );
  return (
    <ImageBackground source={HomeBB} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 p-20">
        <Text className="text-2xl pt-3 font-bold text-center mb-5 mt-14 text-white">
          Explore The Events Around Us!
        </Text>

        <TextInput
          className="bg-white py-2 px-2 ml-4 mr-4 rounded-lg mb-2"
          placeholder="Filter..."
        ></TextInput>
        <View className="flex right-0 top-10 items-end py-2 px-4 absolute ">
          {user ? <DMButton /> : null}
        </View>
        <EventList />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Explore;
