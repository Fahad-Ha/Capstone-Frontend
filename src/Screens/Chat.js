// import {
//   StyleSheet,
//   View,
//   Platform,
//   KeyboardAvoidingView,
//   Keyboard,
//   Pressable,
//   Button,
// } from "react-native";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import MsgBubble from "../Components/MsgBubble";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getChat, sendChat } from "../apis/chat";
// import UserContext from "../context/UserContext";
// import { socket } from "../../socket";
// import ChatBox from "../Components/ChatBox";
// import ChatInput from "../Components/ChatInput";

// export default function Chat({ route, navigation }) {
//   const { user } = route.params;
//   const { user: me } = useContext(UserContext);
//   const [msg, setMsg] = useState("");

//   const {
//     data: data2,

//     refetch,
//   } = useQuery({
//     queryFn: () => {
//       return getChat(user._id);
//     },
//     queryKey: ["getChat", user._id],
//   });

//   const QueryClient = useQueryClient();

//   const { mutate: sendChatFunction } = useMutation({
//     mutationKey: ["sendChat", data2?._id],
//     mutationFn: () => {
//       return sendChat(data2?._id, msg);
//     },
//     onSuccess: () => {
//       refetch();
//       setMsg("");
//       socket.emit("chat", {
//         from: me.username,
//         to: user.username,
//       });
//     },
//   });

//   const scrollViewRef = useRef();

//   // useEffect(() => {
//   //   navigation.getParent()?.setOptions({
//   //     tabBarStyle: {
//   //       display: "none",
//   //     },
//   //   });
//   //   console.log(navigation);
//   //   navigation.setOptions({
//   //     headerLeft: () => {
//   //       return (
//   //         <Button
//   //           onPress={() => {
//   //             navigation.getParent()?.setOptions({
//   //               tabBarStyle: undefined,
//   //             });
//   //             navigation.pop();
//   //           }}
//   //         >
//   //           Back
//   //         </Button>
//   //       );
//   //     },
//   //   });

//   //   return () =>
//   //     navigation.getParent()?.setOptions({
//   //       tabBarStyle: undefined,
//   //     });
//   // }, [navigation]);

//   useEffect(() => {
//     socket.connect();
//     socket.on("recieve", (data) => {
//       if (data.to == user._id) {
//         refetch().then(() =>
//           scrollViewRef.current?.scrollToEnd({ animated: true })
//         );
//       }
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   // useEffect(() => {
//   //   const keyboardDidShowListener = Keyboard.addListener(
//   //     "keyboardDidShow",
//   //     () => {
//   //       scrollViewRef.current?.scrollToEnd({ animated: true });
//   //     }
//   //   );

//   //   return () => {
//   //     keyboardDidShowListener.remove();
//   //   };
//   // // }, []);
//   const handleSend = () => {
//     sendChatFunction();
//   };

//   return (
//     <KeyboardAvoidingView
//       // behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//       // keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
//     >
//       <ChatBox user={user} data={data2} scrollViewRef={scrollViewRef} />
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ChatInput
//           msg={msg}
//           setMsg={setMsg}
//           sendMsgFn={sendMsgFn}
//         />
//         <Button
//           title="send"
//           style={{ backgroundColor: "green" }}
//           onPress={handleSend}
//         />
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({});
