import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CreatableSelect from "react-select/creatable";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const RegisterInterests = ({ route, navigation }) => {
  const { data } = route.params;
  console.log(data);

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([createOption("here")]);
  const [value, setValue] = useState([createOption("here")]);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    // createIngredientFn({ name: inputValue });
  };

  const handleSelectChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
      <Text>RegisterInterests</Text>
      <CreatableSelect
        isMulti
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleSelectChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </View>
  );
};

export default RegisterInterests;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    padding: 16,
    position: "absolute",
    right: 0,
  },
});
