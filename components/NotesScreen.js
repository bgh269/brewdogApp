import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Header, Text, Input, Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();

export default function MoreInfoScreen({ navigation, route }) {
  const { item } = route.params;

  const [text, setText] = useState("");
  const [points, setPoints] = useState([]);

  //tallennetaan db objektiin tietokannan avaus
  const db = SQLite.openDatabase("pointsdb.db");

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists points (id integer primary key not null, text text);"
        );
      },
      (t, error) => {
        console.log("Error");
      },
      updateList
    );
  }, []);

  //tallennetaan input-kentästä tulleet arvot tietokantaan
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into points (text) values (?);", [text]);
      },
      (t, error) => {
        console.log("Error");
      },
      updateList
    );
  };

  //listan päivitys
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from course;", [], (_, { rows }) =>
        setPoints(rows._array)
      );
    });
  };

  //delete toiminto poistaa itemin tietokannan points taulusta ja päivitää flatlistan deletoinnin jälkeen
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from points where id = ?;", [id]);
      },
      (t, error) => {
        console.log("Error");
      },
      updateList
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

      <Text h3>{item.item.name}</Text>
      <Input
        style={styles.input}
        placeholder="give points"
        label="Points"
        multiline={true}
        onChangeText={(text) => setText(text)}
        value={text}
      ></Input>
      <Button
        buttonStyle={{ width: 250 }}
        type="solid"
        onPress={saveItem}
        title="save points"
      ></Button>
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={{ fontSize: 15 }}>{item.item.text}</Text>
            <Text
              style={{ color: "#0000ff", fontSize: 15 }}
              onPress={() => deleteItem(item.item.id)}
            >
              Done
            </Text>
          </View>
        )}
        data={points}
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
  },
  /*
  textStyle: {
    flex: 2,
    //alignContent: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 10,
  },
  */
});
