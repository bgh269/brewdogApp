import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeSceen";
import BeerlistScreen from "./components/BeerlistSceen";
import MoreInfoScreen from "./components/MoreInfoScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Beerlist"
          component={BeerlistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MoreInfo"
          component={MoreInfoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
