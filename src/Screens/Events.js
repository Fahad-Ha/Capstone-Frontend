import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
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
import HomeBB from "../../assets/BGL1.png";
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
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          backgroundColor: "rgba(0, 0, 0)",
          borderColor: "rgba(100, 0, 100, 0.1)",
        }}
        className=" overflow-hidden"
      >
        <ScrollView>
          <SafeAreaView className="flex-1 pt-10">
            <Text className="text-2xl pt-3 font-bold text-center mb-5 mt-14 text-white">
              Explore The Events Around Us!
            </Text>

            <TextInput
              placeholderTextColor={"white"}
              // className="bg-white py-2 px-2 ml-4 mr-4 rounded-lg mb-2"
              style={{
                flex: 1,
                backgroundColor: "rgba(232, 232, 232, 0.45)",
                textAlign: "left",
                height: 40,
                color: "white",
                borderRadius: 15,
                paddingLeft: 20,
                marginLeft: 20,
                marginRight: 20,
              }}
              placeholder="Filter..."
            ></TextInput>
            <View className="flex right-0 top-10 items-end py-2 px-4 absolute ">
              {user ? <DMButton /> : null}
            </View>
            <EventList />
          </SafeAreaView>
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
};

export default Explore;
