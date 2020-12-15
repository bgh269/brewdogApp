import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header, Text } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";

const Stack = createStackNavigator();

export default function MoreInfoScreen({ navigation, route }) {
  const { item } = route.params;

  //const jos sisältö ei muutu
  const malts = item.item.ingredients.malt.map((maltType) => {
    return maltType.name;
  });

  const hops = item.item.ingredients.hops.map((hopType) => {
    return hopType.name;
  });

  const foodPairing = item.item.food_pairing.map((dish) => {
    return dish;
  });

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

      <Text
        style={{
          fontFamily: "special_Elite",
          fontSize: 25,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {item.item.name}
      </Text>
      <ScrollView>
        <View style={styles.textStyle}>
          <Text
            style={{
              fontFamily: "special_Elite",
              fontSize: 20,
              textDecorationLine: "underline",
              //paddingTop: 10,
            }}
          >
            Slogan
          </Text>
          <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
            {item.item.tagline}
          </Text>
          <Text
            style={{
              fontFamily: "special_Elite",
              fontSize: 20,
              textDecorationLine: "underline",
              paddingTop: 10,
            }}
          >
            Description
          </Text>
          <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
            {item.item.description}
          </Text>
          <Text
            style={{
              fontFamily: "special_Elite",
              fontSize: 20,
              textDecorationLine: "underline",
              paddingTop: 10,
            }}
          >
            Malts
          </Text>
          <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
            {" "}
            {malts.join("\n")}{" "}
          </Text>
          <Text
            style={{
              fontFamily: "special_Elite",
              fontSize: 20,
              textDecorationLine: "underline",
              paddingTop: 10,
            }}
          >
            Hops
          </Text>
          <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
            {hops.join("\n")}{" "}
          </Text>
          <Text
            style={{
              fontFamily: "special_Elite",
              fontSize: 20,
              textDecorationLine: "underline",
              paddingTop: 10,
            }}
          >
            Yest
          </Text>
          <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
            {item.item.ingredients.yeast}
          </Text>
          <Text
            style={{
              fontFamily: "special_Elite",
              fontSize: 20,
              textDecorationLine: "underline",
              paddingTop: 10,
            }}
          >
            Food pairing
          </Text>
          <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
            {foodPairing.join("\n")}
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
//.join() saa pilkut

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
