import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pictureListContentContainer: {
    padding: 15,
  },
  pictureContainer: {
    width: 0.3333 * (Dimensions.get("screen").width - 50),
    aspectRatio: 1,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  picture: {
    borderRadius: 10,
    aspectRatio: 1,
  },
  takePictureButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  takePictureButton: {
    height: 60,
    width: 180,
    backgroundColor: "#00A99D",
    justifyContent: "center",
    margin: 16,
    marginBottom: 32,
    borderRadius: 10,
  },
  takePictureText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
});
