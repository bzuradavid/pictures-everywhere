import React from "react";
import { View } from "react-native";

import { useAppContext } from "../../context";
import Camera from "../../components/Camera";
import { styles } from "./styles";

const TakePictureScreen = ({ navigation }) => {
  const { savePicture } = useAppContext();

  const setCapturedPicture = ({ base64 }) => {
    savePicture(base64);
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Camera setCapturedPicture={setCapturedPicture} />
    </View>
  );
};

TakePictureScreen.displayName = "TakePictureScreen";

export default TakePictureScreen;
