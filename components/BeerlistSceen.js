import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View, Text } from "react-native";
import { Header, Button, Card, Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";
//import StarRatingSQLite from "./StarRatingSQLite";
import StarRatingAsyncSto from "./StarRatingSyncSto";

const Stack = createStackNavigator();

export default function BeerlistScreen({ navigation }) {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    getBeers();
  }, []);

  const getBeers = () => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((res) => res.json())
      .then((data) => {
        setBeers(data);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  renderItem = (item) => (
    <Card>
      <Card.Title style={{ fontFamily: "special_Elite", fontSize: 25 }}>
        {item.item.name}
      </Card.Title>
      <Card.Divider />
      <Text
        style={{
          fontFamily: "special_Elite",
          marginBottom: 10,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        {item.item.tagline}
      </Text>
      <Button
        icon={
          <AntDesign
            name="right"
            size={24}
            color="#fff"
            style={{ alignItems: "flex-end" }}
          />
        }
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 10,
          backgroundColor: "#2891c9",
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderRadius: 10,
        }}
        iconRight={true}
        title="More information"
        onPress={() => navigation.navigate("MoreInfo", { item })}
      />
      <Button
        icon={
          <AntDesign
            name="right"
            size={24}
            color="#fff"
            style={{ alignItems: "flex-end" }}
          />
        }
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 15,
          backgroundColor: "#2891c9",
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderRadius: 10,
        }}
        iconRight={true}
        title="Notes"
        onPress={() => navigation.navigate("Notes", { item })}
      />
      {/*<StarRatingSQLite item={item.name} />*/}
      <StarRatingAsyncSto item={item} />
    </Card>
  );

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
      <FlatList
        style={{ width: 350 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => renderItem(item)}
        data={beers}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
