import { AsyncStorage } from "react-native";
const userId = "8ba790f3-5acd-4a08-bc6a-97a36c124f29";
const StorageToken = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(userId, userId);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  }
};

export default StorageToken;
