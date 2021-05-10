import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Camera as ExpoCamera } from "expo-camera";

import CameraButton from "../../assets/camera_btn.png";

import { styles } from "./styles";

export const Camera = ({ setCapturedPicture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const camRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.getPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        const { status } = await ExpoCamera.requestPermissionsAsync();
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (camRef) {
        const image = await camRef.current.takePictureAsync({
          base64: true,
          skipProcessing: true,
          exif: false,
          quality: 0.1,
        });
        setCapturedPicture(image);
      }
    } catch (err) {
      console.log("[Camera]: takePicture() error", err);
    }
  };

  if (hasPermission === false) {
    return (
      <View style={styles.error}>
        <Text>No tiene Acceso a la Camara</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ExpoCamera
        useCamera2Api={true}
        style={styles.camera}
        type={ExpoCamera.Constants.Type.back}
        ref={camRef}
      >
        <View style={styles.bottomBar}>
          <TouchableOpacity activeOpacity={0.9} onPress={takePicture}>
            <Image source={CameraButton} style={styles.cameraButton} />
          </TouchableOpacity>
        </View>
      </ExpoCamera>
    </SafeAreaView>
  );
};

Camera.displayName = "Camera";

export default Camera;
