import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import ROUTES from "../Navigation/index";

import { ActivityIndicator } from "react-native-paper";
import { BASE_URL } from "../apis";
import { useTheme } from "@react-navigation/native";
// import { AntDesign } from "@expo/vector-icons";
import { getMyChats } from "../apis/chat";
import UserContext from "../context/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { getAllUsers } from "../apis/auth";

const DM = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useQuery({
    queryKey: ["myChats"],
    queryFn: () => getMyChats(),
  });
  const theme = useTheme(); // Get the currently active theme
  const { data: usersData } = useQuery(["users"], getAllUsers);

  if (isLoading) return <ActivityIndicator color="black"></ActivityIndicator>;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Direct Messages</Text>
      <View style={styles.usersContainer}>
        {data?.map((chat) => {
          return (
            <Pressable
              key={chat._id}
              onPress={() => {
                navigation.navigate(ROUTES.APPROUTES.DIRECT_MSG, {
                  chatId: chat._id,
                  user: chat.members.find(
                    (member) => member.username !== user.username
                  ),
                });
              }}
              style={styles.userCard}
            >
              <View
                style={{
                  marginRight: "auto",
                  flexDirection: "row",
                  gap: 15,
                  marginLeft: 20,
                  width: "85%",
                }}
              >
                <Image
                  style={styles.profilePicture}
                  source={{
                    uri: `${BASE_URL}/${
                      chat?.members?.find(
                        (member) => member._id !== user._id
                      ) &&
                      chat?.members?.find((member) => member._id !== user._id)
                        .image
                    }`,
                  }}
                />

                <Text style={styles.username}>
                  {chat?.members?.find((member) => member._id !== user._id) &&
                    chat?.members?.find((member) => member._id !== user._id)
                      .username}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 20,
                }}
              >
                <AntDesign name="right" size={24} color="#758DE2" />
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default DM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    marginTop: 60,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  usersContainer: {
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 4,
    elevation: 3,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontSize: 18,

    color: "#fff",
    fontFamily: "System", // Replace with the actual custom font
  },
  noiseEffect: {
    backgroundColor: "yellow", // Change color for noise effect
    opacity: 40,
  },
});
