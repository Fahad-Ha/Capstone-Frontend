import { StyleSheet, Text, TextInput, View } from "react-native";

const Create = ({ data, setData, setErrorText }) => {
  const handleTitleFocus = () => {
    setErrorText("");
  };

  const handleDescriptionFocus = () => {
    setErrorText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What's the Title of Your Trip?</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#A9A9A9"
        value={data.name}
        onChangeText={(value) => setData({ ...data, name: value })}
        onFocus={handleTitleFocus}
      />
      <Text style={styles.label}>Tell Us More About Your Trip</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        value={data.description}
        onChangeText={(value) => setData({ ...data, description: value })}
        multiline
        onFocus={handleDescriptionFocus}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 45,
    width: 360,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#F8F8F8",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
