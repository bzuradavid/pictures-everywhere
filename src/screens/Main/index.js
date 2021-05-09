import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useAppContext } from "../../context";
import { styles } from "./styles";

const MainScreen = ({ navigation }) => {
  const { pictures } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pictureListContentContainer}
        data={pictures}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.pictureContainer}
            onPress={() =>
              navigation.navigate("Picture", {
                picture: item,
              })
            }
          >
            <Image style={styles.picture} source={{ uri: item.file }} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.takePictureButtonContainer}>
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => navigation.navigate("TakePicture")}
        >
          <Text style={styles.takePictureText}>TAKE PICTURE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

MainScreen.displayName = "MainScreen";

export default MainScreen;
