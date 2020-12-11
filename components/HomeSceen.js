import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Header, Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
//import ImageLogo from "./components/ImageLogo";

const Stack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "BREWDOG BEERS",
          style: { color: "#fff", fontSize: 20 },
        }}
        containerStyle={{ backgroundColor: "#049ccc" }}
      ></Header>
      <ImageBackground
        source={require("../assets/ImageLogo.png")}
        style={styles.backgroundImage}
      >
        <Button
          raised
          icon={
            <AntDesign
              name="right"
              size={24}
              color="#fff"
              style={{ alignItems: "flex-end" }}
            />
          }
          buttonStyle={{
            backgroundColor: "#00417a",
            flexDirection: "row",
            justifyContent: "space-around",
            width: 180,
          }}
          iconRight={true}
          title="To beer listing"
          onPress={() => navigation.navigate("Beerlist")}
        ></Button>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}
//#006ca4, #003668,

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    //resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
