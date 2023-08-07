import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ChatInput({ msgInfo, setMsgInfo, sendMsgFn }) {
  const [txtAlign, setTxtAlign] = useState((prev) => prev);
  const handleSendMsg = () => {
    const msgToSend = msgInfo;
    if (msgToSend.length > 0) {
      sendMsgFn(msgToSend);
      setMsgInfo("");
    }
  };
  const handleChangeTxt = (value) => {
    setMsgInfo(value);

    // Simple logic to detect if the text is Arabic, you might want to enhance this
    if (msgInfo.length < 2 && /[\u0600-\u06FF]/.test(value)) {
      setTxtAlign("right");
    } else if (msgInfo.length < 2) {
      setTxtAlign("left");
    }
  };
  return (
    <>
      <TextInput
        multiline
        value={msgInfo}
        placeholder="message.."
        style={{
          padding: 10,
          width: "80%",
          marginBottom: 20,
          marginTop: 10,
          backgroundColor: "white",
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 20,
          minHeight: 50,
          justifyContent: "center",
          textAlign: txtAlign, // Apply the text alignment
        }}
        onChangeText={handleChangeTxt}
      />
      <Button onPress={handleSendMsg}>Send</Button>
      {/* <MaterialCommunityIcons
        name="send-circle"
        size={24}
        color="#FF2500"
        onPress={handleSendMsg}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({});
