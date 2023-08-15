import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import ImagePickerC from "../../Components/Shared/ImagePickerC";
import HomeB from "../../../assets/BGL1.png";
import homeB from "../../../assets/BGL.png";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const EventInfo1 = ({ navigation }) => {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const handleNextPage = (data) => {
    console.log("GOING TO NEXT PAGE 2", data);
    navigation.navigate("Add Event 2", { data });
  };
  console.log(data);
  return (
    <ImageBackground source={homeB} style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 50,
        }}
      >
        <TouchableOpacity className="absolute  top-10 left-1 rounded-full shadow p-2">
          <View className="flex-row items-center ">
            <Feather
              name="arrow-left"
              size={32}
              color={"white"}
              onPress={() => navigation.goBack()}
            />
          </View>
        </TouchableOpacity>
        <ImagePickerC
          image={image}
          setImage={setImage}
          height={100}
          width={100}
          style={{
            width: 300,
            height: 210,
            borderRadius: 30,
            overflow: "hidden",
            marginTop: 90,
            marginBottom: 20,
          }}
          onImagePicked={(imageUri) => setData({ ...data, image: imageUri })}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",

              // backgroundColor: "rgba(0, 0,0, 0.5)",
              backgroundColor: "rgba(232, 232, 232, 0.30)",
            }}
          >
            {/* <MaterialIcons
              name="add-a-photo"
              size={40}
              color="rgba(255, 255, 255, 0.70)"
            /> */}
            <MaterialIcons
              name="insert-photo"
              size={40}
              color="rgba(255, 255, 255, 0.80)"
            />
            {/* <Text style={{ color: "white" }}>Tap to select an event image</Text> */}
          </View>
        </ImagePickerC>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",

          // backgroundColor: "green",
        }}
      > */}
      <View
        style={{
          flexDirection: "column",

          justifyContent: "space-between",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Event name
        </Text>
        <TextInput
          style={{
            backgroundColor: "rgba(232, 232, 232, 0.30)",
            height: 40,
            width: 200,
            borderRadius: 10,
            textAlign: "left",
            paddingLeft: 15,
            // marginTop: 5,
          }}
          placeholder="Title"
          placeholderTextColor="#A9A9A9"
          value={data?.name}
          onChangeText={(value) => setData({ ...data, name: value })}
        />
        {/* </View> */}
        {/* <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></View> */}
      </View>
      <View
        style={{
          flex: 0.8,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
            textAlign: "left",
            color: "white",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Description
        </Text>
        <TextInput
          style={{
            backgroundColor: "rgba(232, 232, 232, 0.30)",
            height: 100,
            width: 270,
            fontStyle: "italic",
            borderRadius: 10,
            textAlign: "left",
            paddingLeft: 15,
          }}
          placeholder="Description..."
          placeholderTextColor="#A9A9A9"
          value={data?.description}
          onChangeText={(value) => setData({ ...data, description: value })}
          multiline
        />
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 10,
            color: "white",
          }}
        >
          Price
        </Text>
        <TextInput
          style={{
            backgroundColor: "rgba(232, 232, 232, 0.30)",
            height: 40,
            width: 55,
            borderRadius: 10,

            paddingLeft: 10,
            marginLeft: 10,
          }}
          placeholder="Price"
          placeholderTextColor="#A9A9A9"
          value={data?.price}
          onChangeText={(value) => setData({ ...data, price: value })}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF005C",
            marginLeft: "auto",
            marginRight: "auto",
            width: 200,
            height: 50,
            marginTop: 50,
            borderRadius: 10,
            bottom: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleNextPage(data)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EventInfo1;
