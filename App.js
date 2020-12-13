import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeSceen";
import BeerlistScreen from "./components/BeerlistSceen";
import MoreInfoScreen from "./components/MoreInfoScreen";
import NotesScreen from "./components/NotesScreen";
const Stack = createStackNavigator();

const getFont = () =>
  Font.loadAsync({
    special_Elite: require("./assets/fonts/SpecialElite-Regular.ttf"),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (fontLoaded) {
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
          <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading startAsync={getFont} onFinish={() => setFontLoaded(true)} />
    );
  }
}
