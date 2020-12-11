import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Header, Text } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";

const Stack = createStackNavigator();

export default function MoreInfoScreen({ navigation, route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Header
        leftComponent={<MyCustomLeftComponent navigate={navigation} />}
        centerComponent={{
          text: "BREWDOG BEERS",
          style: {
            color: "#fff",
            fontSize: 20,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        containerStyle={{ backgroundColor: "#049ccc" }}
      ></Header>

      <Text h3>{item.item.name}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
  },
  textStyle: {
    flex: 2,
    //alignContent: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 10,
  },
});
