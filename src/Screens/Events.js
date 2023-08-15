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
import HomeBB from "../../assets/Home1.png";
import UserContext from "../context/UserContext";
import { BlurView } from "expo-blur";
import SuggestedEvents from "../Components/Events/SuggestedEvents";

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
          flex: 1,
        }}
        className=" overflow-hidden"
      >
        <SafeAreaView>
          <TextInput
            placeholderTextColor={"white"}
            // className="bg-white py-2 px-2 ml-4 mr-4 rounded-lg mb-2"
            style={{
              backgroundColor: "rgba(232, 232, 232, 0.45)",
              textAlign: "left",
              height: 40,
              color: "white",
              borderRadius: 15,
              paddingLeft: 20,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
              marginTop: 20,
            }}
            placeholder="Search by Event name..."
          ></TextInput>

          {user ? (
            <View style={{ height: "15%", paddingHorizontal: 20 }}>
              <SuggestedEvents />
            </View>
          ) : null}
          <Text className=" text-2xl pt-3 font-bold text-center mb-5 mt-14 text-white  bg-blue-900">
            Explore The Events Around Us!
          </Text>

          <View className="right-0 top-10 items-end py-2 px-4 absolute ">
            {user ? <DMButton /> : null}
          </View>
          <EventList />
        </SafeAreaView>
      </BlurView>
    </ImageBackground>
  );
};

export default Explore;
