import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Home3Image from "../../assets/Home3.png";
import LinearGradient from "react-native-linear-gradient";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getChat, sendChat } from "../apis/chat";
import { Socket } from "socket.io-client";
import { BASE_URL } from "../apis";
import {
  Button,
  Platform,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import MsgBubble from "../Components/MsgBubble";

import { socket } from "../../socket";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import HomeB from "../../assets/BGL2.png";
import ROUTES from "../Navigation";
import UserContext from "../context/UserContext";

const Chat1 = ({ route, profileData, navigation }) => {
  const { user } = route.params;
  const { user: me } = useContext(UserContext);
  const QueryClient = useQueryClient();
  const [msg, setMsg] = useState("");
  //get and refetch chat
  const {
    data: data2,

    refetch,
  } = useQuery({
    queryFn: () => {
      return getChat(user._id);
    },
    queryKey: ["getChat", user?._id],
  });

  //send chat
  const { mutate: sendChatFunction } = useMutation({
    mutationKey: ["sendChat", data2?._id],
    mutationFn: () => {
      return sendChat(data2?._id, msg);
    },
    onSuccess: () => {
      refetch();
      setMsg("");
      socket.emit("chat", {
        from: me.username,
        to: user.username,
      });
    },
  });

  // socket io refetching chat and updating other user's chat
  useEffect(() => {
    socket.connect();
    socket.on("reloadChat", (data) => {
      if (data.to == me.username) {
        refetch();
      }
    });
    return () => {
      socket.disconnect();
      QueryClient.cancelQueries(["getChat", user._id]);
    };
  }, []);

  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  const handleSend = () => {
    if (msg.trim() !== "") {
      sendChatFunction();
      scrollToBottom();
    }
  };

  const navigate = useNavigation();

  let lastTimestamp = null;

  const dayElements = [];

  data2?.msgs.forEach((msg, index) => {
    const currentTimestamp = moment(msg.createdAt);

    // Check if the message's timestamp is within the same minute as the last message
    const sameMinute =
      lastTimestamp && currentTimestamp.diff(lastTimestamp, "minutes") === 0;

    if (!sameMinute) {
      // If not the same minute, add a new timestamp element
      const day = currentTimestamp.format("MMM Do YY");
      dayElements.push(
        <Text
          key={`day-${day}-${index}`}
          style={{
            color: "grey",
            textAlign: "center",
          }}
        >
          {day}
        </Text>
      );
    }

    dayElements.push(
      <>
        <MsgBubble
          me={msg.from === me._id}
          msg={msg.msg}
          key={msg._id}
          time={msg.createdAt}
        />
        {index == data2?.msgs.length - 1 && (
          <View style={{ width: "100%", height: 10 }}></View>
        )}
      </>
    );

    // Update the last timestamp
    lastTimestamp = currentTimestamp;
  });
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
        <ImageBackground source={HomeB} style={{ flex: 1 }}>
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          >
            <StatusBar backgroundColor="#1E1E1E" barStyle="dark-content" />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <AntDesign
                  name="left"
                  size={24}
                  color="white"
                  style={{ width: 35 }}
                  onPress={() => navigation.goBack()}
                />
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "black",
                    marginRight: 10,
                  }}
                >
                  <Image
                    className="w-full h-full"
                    style={{
                      borderRadius: 100,
                    }}
                    source={{
                      uri: `${BASE_URL}/${user?.image}`,
                    }}
                  />
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  {user?.username}
                </Text>
              </View>

              <View
                style={{
                  height: 0,
                  backgroundColor: "#1E1E1E",
                  padding: 0,
                }}
              ></View>
              <ScrollView
                ref={scrollViewRef}
                style={{
                  flex: 1,
                  padding: 10,
                  color: "white",
                }}
                onContentSizeChange={scrollToBottom}
              >
                {dayElements}
              </ScrollView>
              {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            ></View> */}
              {/* Footer with background color */}
            </View>
          </SafeAreaView>
          <View
            style={{
              backgroundColor: "#1E1E1E",
              padding: 15,
              flexDirection: "row",
            }}
          >
            <TextInput
              value={msg}
              onChangeText={(v) => setMsg(v)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                backgroundColor: "#F5F5F5",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 8,
              }}
            />
            <MaterialCommunityIcons
              name="send-circle"
              size={50}
              color="#7581E7"
              onPress={handleSend}
            />
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
    // </LinearGradient>
  );
};

export default Chat1;
