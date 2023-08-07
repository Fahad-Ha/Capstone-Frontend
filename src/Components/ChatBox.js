import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MsgList from "./MsgList";

export default function ChatBox({ user, data, scrollViewRef }) {
  return (
    <ScrollView
      ref={scrollViewRef} // Attach the reference
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: true })} // Start from the end
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    >
      <MsgList user={user} data={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
