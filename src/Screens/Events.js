import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import EventList from "../Components/Events/EventList";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";
import DMButton from "../Components/DMButton";

const Explore = () => {
  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries(["events"]);
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore The Beauty Of The World With Us!</Text>
      <View className="flex right-0 items-end py-2 px-4 absolute">
        <DMButton />
      </View>
      <EventList />
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    paddingTop: 12,
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.7)",

    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: "black",
  },
});
