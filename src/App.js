import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

import * as Routes from "./routes";
import { options } from "./utils/screenOptions";
import { AppProvider } from "./context";
import MainScreen from "./screens/Main";
import PictureScreen from "./screens/Picture";
import TakePictureScreen from "./screens/TakePicture";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Routes.Main}
            options={options.main}
            component={MainScreen}
          />
          <Stack.Screen
            name={Routes.Picture}
            options={options.picture}
            component={PictureScreen}
          />
          <Stack.Screen
            name={Routes.TakePicture}
            options={options.takePicture}
            component={TakePictureScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
