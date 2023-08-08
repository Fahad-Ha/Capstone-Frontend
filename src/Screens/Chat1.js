import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Home3Image from "../../assets/Home3.png";
import LinearGradient from "react-native-linear-gradient";
import { useContext, useEffect, useState } from "react";
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
} from "react-native";
import MsgBubble from "../Components/MsgBubble";
import UserContext from "../context/UserContext";
import { socket } from "../../socket";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

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
    queryKey: ["getChat", user._id],
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

  const handleSend = () => {
    if (msg.trim() !== "") {
      sendChatFunction();
    }
  };

  const navigate = useNavigation();

  const uniqueDays = {};
  const dayElements = [];

  data2?.msgs.forEach((msg) => {
    const day = moment(msg.createdAt).format("MMM Do YY");

    if (!uniqueDays[day]) {
      uniqueDays[day] = true;
      dayElements.push(
        <Text
          key={`day-${day}`}
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
      <MsgBubble
        me={msg.from === me._id}
        msg={msg.msg}
        key={msg._id}
        time={msg.createdAt}
      />
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <ImageBackground source={Home3Image} style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
                onPress={() => navigation.navigate("Users")}
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
                  source={{
                    uri: `${BASE_URL}/${profileData?.image}`,
                  }}
                />
              </View>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
              >
                {user.username}
              </Text>
            </View>

            <View
              style={{
                height: 0,
                backgroundColor: "#1E1E1E",
                padding: 0,
              }}
            ></View>
            <ScrollView style={{ flex: 1, padding: 10, color: "white" }}>
              {dayElements}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            ></View>
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
            color="#FF2500"
            onPress={handleSend}
          />
        </View>
      </ImageBackground>
    </View>
    // </LinearGradient>
  );
};

export default Chat1;
