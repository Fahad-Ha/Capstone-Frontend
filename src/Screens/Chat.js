import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MsgBubble from "../Components/MsgBubble";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChat, sendChat } from "../apis/chat";
import UserContext from "../context/UserContext";
import { socket } from "../../socket";

const Chat = ({ route }) => {
  const { user } = route.params;
  const { user: me } = useContext(UserContext);
  const queryClient = useQueryClient();
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
      queryClient.cancelQueries(["getChat", user._id]);
    };
  }, []);

  const handleSend = () => {
    sendChatFunction();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.1,
            backgroundColor: "red",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              margin: "5%",
              borderRadius: 50,
              width: 50,
              height: 50,
              backgroundColor: "blue",
            }}
          ></View>
          <Text>{user.username}</Text>
        </View>
        <View style={{ flex: 0.8, backgroundColor: "grey" }}>
          {data2?.msgs.map((msg) => (
            <MsgBubble me={msg.from == me._id} msg={msg.msg} key={msg._id} />
          ))}
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            value={msg}
            onChangeText={(v) => setMsg(v)}
            style={{ flex: 0.5, backgroundColor: "white", width: "80%" }}
          ></TextInput>
          <Button
            title="send"
            style={{ backgroundColor: "green" }}
            onPress={handleSend}
          ></Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
