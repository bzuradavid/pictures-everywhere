import React, { useState, useEffect } from "react";
import { Text, ScrollView, Image, Dimensions } from "react-native";
import { styles } from "./styles";

const PictureScreen = ({
  route: {
    params: {
      picture: { file, location },
    },
  },
}) => {
  const [height, setHeight] = useState();

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setHeight(height * ((Dimensions.get("screen").width - 30) / width));
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image style={{ height }} source={{ uri: file }} />
      <Text style={styles.location}>{location}</Text>
    </ScrollView>
  );
};

PictureScreen.displayName = "PictureScreen";

export default PictureScreen;
