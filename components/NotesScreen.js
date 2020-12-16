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
        setPoints(JSON.parse(value));
      }
    } catch (e) {
      console.log("Key not found!");
    }
  };

  const storeData = async () => {
    try {
      const obj = points;
      obj.push(text);
      const jsonValue = JSON.stringify(obj);
      setPoints(obj);
      await AsyncStorage.setItem(item.item.name.toString(), jsonValue);
    } catch (e) {
      // saving error
    }
    console.log();
  };

  /*
  
   Otetaan await koko lista, getItemilla text pois listasta, setPoits uusi lista, tallenna asyncSto
*/
  const deletePoints = async () => {
    try {
      const filteredPoints = points.filter(function (e) {
        return e !== index;
      });
    } catch (error) {
      console.log(error);
    }
    console.log(filteredPoints);
  };
  /*
   try {
      const pointsJSON = await AsyncStorage.getItem(item.item.name);
      let pointTxt = JSON.parse(pointsJSON);
      const pointsItems = pointTxt.filter(function (e) {
        return e !== index;
      });
      //päivitetään points lista päivitetyllä pointsItems listalla
      await AsyncStorage.setItem(
        item.item.name.toString(),
        JSON.stringify(pointsItems)
      );
    } catch (error) {
      console.log(error);
    }
    //console.log(item.item.name);
  }; 

    try {
      const pointsJSON = await AsyncStorage.getItem(points);
      let pointTxt = JSON.parse(pointsJSON);
      const pointsItems = pointTxt.filter(function (e) {
        return e !== id;
      });
      //päivitetään points lista päivitetyllä pointsItems listalla
      await AsyncStorage.setItem(points, JSON.stringify(pointsItems));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(points);
*/
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
        onPress={() => storeData()}
        title="save points"
        padding={10}
      ></Button>
      <FlatList
        style={{ margin: "5%", width: 350 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <Text style={{ fontFamily: "special_Elite", fontSize: 15 }}>
              {item}
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
