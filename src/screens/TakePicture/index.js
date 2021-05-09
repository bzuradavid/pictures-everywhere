import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, Dimensions } from "react-native";
import { styles } from "./styles";

const TakePictureScreen = () => {
  const [height, setHeight] = useState();

  useEffect(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <Image style={{ height }} source={{ uri: file }} />
      <Text style={styles.location}>{location}</Text>
    </ScrollView>
  );
};

TakePictureScreen.displayName = "TakePictureScreen";

export default TakePictureScreen;
