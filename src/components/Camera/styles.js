import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text: {
    color: "#fff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomBar: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    height: 68,
    width: 68,
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textError: {
    marginBottom: 32,
  },
});
