import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { Header, Text, Input, Button } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import MyCustomLeftComponent from "./MyCustomLeftComponent";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const windowWidth = Dimensions.get("window").width;

export default function NotesScreen({ navigation, route }) {
  const { item } = route.params;
  //tällä saa oikean oluen id:n
  //const beerid = item.item.id;
  // console.log(item.item.name);
  const [text, setText] = useState("");
  const [points, setPoints] = useState([]);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const value = await AsyncStorage.getItem(item.item.name);
      if (value !== null) {
        setPoints(value);
      }
    } catch (e) {
      console.log("Key not found!");
    }
  };

  const storeData = async (value) => {
    try {
      const obj = {
        name: item.item.name,
        //beerid: beerid,
        text: value,
      };
      const jsonValue = JSON.stringify(obj);
      setPoints(value);
      await AsyncStorage.setItem(item.item.name.toString(), value.toString());
    } catch (e) {
      // saving error
    }
  };

  const displayData = async (value) => {
    try {
      text = await AsyncStorage.getItem(value);
      let parsed = JSON.parse(text);
    } catch (e) {
      console.log(e);
    }
  };

  const deletePoints = async () => {
    try {
      await AsyncStorage.removeItem(obj);
    } catch (error) {}
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
        buttonStyle={{ width: 250, borderRadius: 10 }}
        type="solid"
        onPress={(storeData, displayData)}
        title="save points"
        padding={10}
      ></Button>
      <FlatList
        style={{ margin: "5%" }}
        keyExtractor={(item, index) => index.toString()}
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
    borderRadius: 6,
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
