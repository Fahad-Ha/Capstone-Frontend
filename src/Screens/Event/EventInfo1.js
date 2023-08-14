import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ImagePickerC from "../../Components/Shared/ImagePickerC";

const EventInfo1 = ({ navigation }) => {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);

  const handleNextPage = (data) => {
    console.log("GOING TO NEXT PAGE 2", data);
    navigation.navigate("Add Event 2", { data });
  };
  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ImagePickerC
        image={image}
        setImage={setImage}
        height={100}
        width={100}
        style={{
          maxWidth: "100%",
          height: 100,
          borderRadius: 8,
          overflow: "hidden",
          marginBottom: 16,
        }}
        onImagePicked={(imageUri) => setData({ ...data, image: imageUri })}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            height: "100%",
          }}
        >
          <Text style={{ color: "grey" }}>Tap to select an event image</Text>
        </View>
      </ImagePickerC>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Event name
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
        }}
        placeholder="Title"
        placeholderTextColor="#A9A9A9"
        value={data?.name}
        onChangeText={(value) => setData({ ...data, name: value })}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Price
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
        }}
        placeholder="Price"
        placeholderTextColor="#A9A9A9"
        value={data?.price}
        onChangeText={(value) => setData({ ...data, price: value })}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Description
      </Text>
      <TextInput
        style={{
          height: 100,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          paddingTop: 5,
        }}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={data?.description}
        onChangeText={(value) => setData({ ...data, description: value })}
        multiline
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
          onPress={() => handleNextPage(data)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EventInfo1;
