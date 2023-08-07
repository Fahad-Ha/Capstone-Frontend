import axios from "axios";

const getLocationAddress = async (lon, lat) => {
  if (!lon || !lat || lon == "" || lat == "") {
    return "No location provided";
  }
  const res = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
  );
  return res.data;
};
export { getLocationAddress };
