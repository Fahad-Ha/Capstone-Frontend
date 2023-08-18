import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import ROUTES from "../Navigation/index";
import ProfileB from "../../assets/BGL2.png";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL } from "../apis";
import { useTheme } from "@react-navigation/native";
import { getMyChats } from "../apis/chat";
import UserContext from "../context/UserContext";
import { AntDesign, Feather } from "@expo/vector-icons";
import { getAllUsers } from "../apis/auth";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DM = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useQuery({
    queryKey: ["myChats"],
    queryFn: () => getMyChats(),
  });
  const theme = useTheme(); // Get the currently active theme
  const { data: usersData } = useQuery(["users"], getAllUsers);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color="white"></ActivityIndicator>
      </View>
    );

  // Sort chats based on the last message date
  const sortedChats = data?.slice().sort((chatA, chatB) => {
    const lastMessageA = chatA.msgs[chatA.msgs.length - 1];
    const lastMessageB = chatB.msgs[chatB.msgs.length - 1];

    if (lastMessageA && lastMessageB) {
      return moment(lastMessageB.createdAt).diff(
        moment(lastMessageA.createdAt)
      );
    } else if (lastMessageA) {
      return -1; // Put chatA first since chatB has no last message
    } else if (lastMessageB) {
      return 1; // Put chatB first since chatA has no last message
    }

    return 0; // Both chats have no last message
  });
  return (
    // <SafeAreaView
    //   style={{ flex: 1, paddingBottom: 88, backgroundColor: "#1E1E1E" }}
    // >
    <ImageBackground source={ProfileB} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute  top-8 left-0 rounded-full shadow p-2"
        >
          <View className="flex-row items-center">
            <Feather name="arrow-left" size={32} color={"white"} />
          </View>
        </TouchableOpacity>
        <Text style={styles.header}>Direct Messages</Text>
        <View style={styles.usersContainer}>
          {sortedChats?.map((chat) => {
            console.log(
              `${BASE_URL}/${
                chat?.members?.find((member) => member._id !== user._id).image
              }`
            );
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
                        chat?.members?.find((member) => member._id !== user._id)
                          .image
                      }`,
                    }}
                  />
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <Text style={styles.username}>
                      {
                        chat?.members?.find((member) => member._id !== user._id)
                          .username
                      }
                    </Text>
                    <Text style={{ color: "#797979", marginTop: 10 }}>
                      {chat.msgs[chat.msgs.length - 1]?.msg}
                    </Text>
                    <Text style={{ marginLeft: "auto", color: "#797979" }}>
                      {moment(
                        chat.msgs[chat.msgs.length - 1]?.createdAt
                      ).format("LT")}
                    </Text>
                  </View>
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
    </ImageBackground>
    // </SafeAreaView>
  );
};

export default DM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#1E1E1E",
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
    paddingBottom: hp(6),
  },
  usersContainer: {
    paddingBottom: hp(14),
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0, 0,0, 0.5)",
    // backgroundColor: "#222",
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
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "System", // Replace with the actual custom font
  },
  noiseEffect: {
    backgroundColor: "yellow", // Change color for noise effect
    opacity: 40,
  },
});
