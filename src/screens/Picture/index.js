import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, Dimensions } from "react-native";
import Share from "react-native-share";

import Button from "../../components/Button";
import { styles } from "./styles";

const PictureScreen = ({
  route: {
    params: {
      picture: { file, location },
    },
  },
}) => {
  const [height, setHeight] = useState();

  const share = () => {
    Share.open({
      message: "Check this cool picture I took!",
      title: "Hey!",
      url: file,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setHeight(height * ((Dimensions.get("screen").width - 30) / width));
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image style={{ height }} source={{ uri: file }} />
      <Text style={styles.location}>{location}</Text>
      <View style={styles.sharePictureButtonContainer}>
        <Button title="SHARE PICTURE" onButtonPress={share} />
      </View>
    </ScrollView>
  );
};

PictureScreen.displayName = "PictureScreen";

export default PictureScreen;
