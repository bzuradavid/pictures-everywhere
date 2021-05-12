import React from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import * as Routes from "../../routes";
import { useAppContext } from "../../context";
import Button from "../../components/Button";
import { styles } from "./styles";

const MainScreen = ({ navigation: { navigate } }) => {
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
              navigate(Routes.Picture, {
                picture: item,
              })
            }
          >
            <Image style={styles.picture} source={{ uri: item.file }} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.takePictureButtonContainer}>
        <Button
          title="TAKE PICTURE"
          onButtonPress={() => navigate(Routes.TakePicture)}
        />
      </View>
    </SafeAreaView>
  );
};

MainScreen.displayName = "MainScreen";

export default MainScreen;
