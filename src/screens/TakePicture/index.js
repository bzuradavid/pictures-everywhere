import React, { useState } from "react";
import { View, Text } from "react-native";

import { useAppContext } from "../../context";
import Camera from "../../components/Camera";
import { styles } from "./styles";

const TakePictureScreen = ({ navigation }) => {
  const { savePicture } = useAppContext();
  const [saving, setSaving] = useState(false);

  const setCapturedPicture = async ({ base64 }) => {
    setSaving(true);
    await savePicture(base64);
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      {!saving ? (
        <Camera setCapturedPicture={setCapturedPicture} />
      ) : (
        <View style={styles.savingContainer}>
          <Text>Saving...</Text>
        </View>
      )}
    </View>
  );
};

TakePictureScreen.displayName = "TakePictureScreen";

export default TakePictureScreen;
