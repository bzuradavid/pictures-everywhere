import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { options } from "./utils/screenOptions";
import MainScreen from "./screens/Main";

const Stack = createStackNavigator();

export default function App() {
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
