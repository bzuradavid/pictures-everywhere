import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

import { options } from "./utils/screenOptions";
import MainScreen from "./screens/Main";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={options.main}
          component={MainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
