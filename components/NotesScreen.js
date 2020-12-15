import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { Header, Text, Input, Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";
import * as SQLite from "expo-sqlite";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;

export default function MoreInfoScreen({ navigation, route }) {
  const { item } = route.params;
  // console.log(item);
  //tällä saa oikean oluen id:n
  const beerid = item.item.id;
  //console.log(beerid);

  const [text, setText] = useState("");
  const [points, setPoints] = useState([]);

  //tallennetaan db objektiin tietokannan avaus
  const db = SQLite.openDatabase("pointsdb.db");

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists points (id integer primary key not null, text text, beerid integer);"
        );
      },
      (t, error) => {
        console.log("Error1");
      },
      updateList
    );
  }, []);

  //tallennetaan arvot tietokantaan
  const savePoints = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into points (text, beerid) values (?, ?);", [
          text,
          beerid,
        ]);
      },
      (t, error) => {
        console.log("Error2");
      },
      updateList
    );
  };

  //listan päivitys
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from points;", [], (_, { rows }) =>
        setPoints(rows._array)
      );
    });
  };

  //delete toiminto poistaa itemin tietokannan points taulusta ja päivitää flatlistan deletoinnin jälkeen
  const deletePoints = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from points where id = ?;", [id]);
      },
      (t, error) => {
        console.log("Error3");
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

      <Text
        style={{ fontFamily: "special_Elite", fontSize: 25, paddingTop: 10 }}
      >
        {item.item.name}
      </Text>
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
        onPress={savePoints}
        title="save points"
        padding={10}
      ></Button>
      <FlatList
        style={{ margin: "5%" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={{ fontFamily: "special_Elite", fontSize: 15 }}>
              {item.text}
              {"   "}
            </Text>

            <Button
              icon={
                <AntDesign
                  name="delete"
                  size={24}
                  color="#fff"
                  style={{ alignItems: "flex-end" }}
                />
              }
              iconRight={true}
              onPress={() => deletePoints(item.id)}
            ></Button>
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
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: windowWidth,
    flexWrap: "wrap",
    marginHorizontal: 50,
    marginVertical: 5,
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
