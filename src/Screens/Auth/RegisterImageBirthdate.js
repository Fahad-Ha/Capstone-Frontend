import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import ImageHandler from "../../Components/Shared/ImagePickerC";
import { useTheme } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import ROUTES from "../../Navigation";
const RegisterImageBirthdate = ({ route, navigation }) => {
  const { username } = route.params;
  const { email } = route.params;
  const { password } = route.params;
  console.log("username", username, email);
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [data, setData] = useState({
    username: username,
    email: email,
    password: password,
    image: null,
  });

  const theme = useTheme();
  const handleNext = () => {
    console.log("====>", image);
    console.log("<====", data);
    navigation.navigate(ROUTES.AUTHROUTES.REGISTER.INTERESTS, data);
  };
  const handleDate = (date) => {
    console.log("date", date);
    setData({ ...data, birthdate: date });
  };
  return (
    <View className="flex-1 items-center bg-gray-200">
      <View className="mt-12 mb-4 w-4/5">
        <Text className="text-xl text-center font-bold mb-4">
          Pick an image
        </Text>
        <Text className="text-center mb-2">
          Pick an image for your new account.
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <ImageHandler
          image={image}
          setImage={setImage}
          height={100}
          width={100}
          className="max-h-52 rounded-xl overflow-hidden"
          style={{ width: 150, height: 150 }}
          onImagePicked={(imageUri) => setData({ ...data, image: imageUri })}
        />
        <View className="w-4/5">
          <CalendarPicker
            onDateChange={handleDate}
            className="w-full mx-auto"
          />
        </View>
        <View className="mt-4">
          <Button title="Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};
export default RegisterImageBirthdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
});
