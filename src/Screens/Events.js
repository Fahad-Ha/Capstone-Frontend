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
import UserContext from "../context/UserContext";
import HomeBB from "../../assets/Home1.png";
import { BlurView } from "expo-blur";

const Explore = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useContext(UserContext);
  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["events"]);
      return () => {};
    }, [])
  );

  return (
    <ImageBackground source={HomeBB} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Explore The Beauty Of The World With Us!
        </Text>

        <TextInput
          style={styles.filterInput}
          placeholder="Filter..."
        ></TextInput>
        <View className="flex right-0 top-10 items-end py-2 px-4 absolute ">
          <DMButton />
        </View>
        <EventList />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: "#1E1E1E",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' if you prefer
  },
  filterInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    // backgroundColor: "rgba(117, 141, 226, 0.47)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    paddingTop: 12,
    fontWeight: "bold",

    textAlign: "center",
    marginBottom: 20,
    marginTop: 55,
    color: "white",
  },
  addButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  eventListContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
  },
});
