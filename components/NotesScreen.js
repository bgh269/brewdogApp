import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Header, Text, Input, Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;

export default function NotesScreen({ navigation, route }) {
  const { item } = route.params;

  const [text, setText] = useState("");
  const [points, setPoints] = useState([]);
  //tarvitaan tämä, jotta flatlista rerenderöi muutokset heti
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    GetData();
  }, []);

  //haetaan JSON olio
  const GetData = async () => {
    try {
      const value = await AsyncStorage.getItem(item.item.name);
      if (value !== null) {
        setPoints(JSON.parse(value));
      }
    } catch (e) {
      console.log("Key not found!");
    }
  };

  //tallennetaan muistiin inputista tulleet tekstit listaan
  const storeData = async () => {
    try {
      setRefresh(true);
      const obj = points;
      obj.push(text);
      const jsonValue = JSON.stringify(obj);
      setPoints(obj);
      console.log(points);
      await AsyncStorage.setItem(item.item.name.toString(), jsonValue);
      setRefresh(false);
    } catch (e) {
      // saving error
    }
    console.log();
  };

  //filteröidään points-listalta yksittäinen item ja tallennetaan muuttunut lista points-listalle
  const deletePoints = async (itemName) => {
    try {
      setRefresh(true);
      const filteredPoints = points.filter(function (e) {
        return e !== itemName;
      });
      console.log(filteredPoints);
      setPoints(filteredPoints);
      const jsonValue = JSON.stringify(filteredPoints);
      await AsyncStorage.setItem(item.item.name.toString(), jsonValue);
      console.log(filteredPoints);
      setRefresh(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.listContainer}>
        <Text style={{ fontFamily: "special_Elite", fontSize: 18 }}>
          {item}
        </Text>

        <TouchableHighlight>
          <Text
            onPress={() => deletePoints(item)}
            style={{ color: "#e00404", fontWeight: "bold" }}
          >
            DELETE
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

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
        style={{ fontFamily: "special_Elite", fontSize: 30, paddingTop: 10 }}
      >
        {item.item.name}
      </Text>
      <Input
        style={styles.input}
        placeholder=" give points"
        label="Points"
        multiline={true}
        onChangeText={(text) => setText(text)}
        value={text}
      ></Input>
      <Button
        buttonStyle={{ width: 250, borderRadius: 10 }}
        type="solid"
        onPress={() => storeData()}
        title="save points"
        padding={10}
      ></Button>
      <FlatList
        style={{ margin: "5%", width: 350 }}
        keyExtractor={(item, index) => index.toString()}
        data={points}
        extraData={refresh}
        renderItem={({ item }) => renderItem(item)}
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
    //justifyContent: "center",
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: windowWidth,
    flexWrap: "wrap",
    marginHorizontal: 50,
    marginVertical: 5,
  },
});
