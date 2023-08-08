import { Image, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../../apis/index";

const ImagePickerC = ({
  onImagePicked,
  style,
  imageData = null,
  children,
  image,
  setImage,
}) => {
  const getPremisstion = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert("not granted");
    }
  };

  useEffect(() => {
    getPremisstion();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <Pressable onPress={pickImage}>
      <View style={style}>
        {image || imageData ? (
          <Image
            source={{ uri: image || `${BASE_URL}/${imageData}` }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
};

export default ImagePickerC;

const styles = StyleSheet.create({});
