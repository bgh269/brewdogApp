import React, { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import * as SQLite from "expo-sqlite";

export default function StarRating(props) {
  const [stars, setStars] = useState("");
  const [starRate, setStarRate] = useState([]);

  //console.log(props.item); antaa oluiden nimet
  const ratingCompleted = (rating) => {
    // console.log(rating); antaa annetun arvon
    //rating;
    setStars(rating);
    console.log(stars); //tulee undefined
    //setStarRate(stars);
    saveRate(stars); //ei tunnista stars
  };
  /*
  const saveGivenStars = (ratingCompleted) => {
    setStarRate(ratingCompleted);
    saveRate(starRate);
  };
*/
  // console.log(starRate);
  //starRate antaa tyhjän taulukon?
  //Mihin starRate pitäisi laittaa?

  //tallennetaan db objektiin tietokannan avaus
  const db = SQLite.openDatabase("starrated.db");

  //tietokannan avaus palauttaa db olion ja sillä on transaction metodi, jota käytetään tietokannan operaatioihin
  //db.transaction(callback, error, success)
  //luodaan tietokanta useEffectillä ja tx.executeSql metodilla
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists starrate (id integer primary key not null, stars real, starname text;"
        );
      },
      (t, error) => {
        console.log("Error1");
      },
      updateRateList
    );
  }, []);

  //tallennetaan stars-kentästä tulleet arvot tietokantaan [parseInt(stars)]
  const saveRate = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into starrate (stars, starname) values (?, ?);", [
          parseFloat(stars),
          props.item.toString(),
        ]);
      },
      (t, error) => {
        console.log("Error2");
      },
      updateRateList
    );
  };

  //listan päivitys, tässä updateList metodi hakee kaikki stars:t tietokannan starrate-taulusta
  //ja tallentaa datan starRate stateen(->rerender)
  //executeSql-metodin kolmas parametri on success functio, joka ottaa resultset objektin toisena argumenttina
  //resultset objekti sis. rows._array mikä on taulukko riveistä mitkä palautuu sql kyselyllä
  const updateRateList = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from starrate;", [], (_, { rows }) => {
        setStarRate(rows._array);
      });
    });
  };

  return (
    <Rating
      type="star"
      style={{ paddingVertical: 10 }}
      onFinishRating={ratingCompleted}
      // onChange={saveGivenStars}
      ratingCount={5}
      imageSize={30}
      showRating
      fractions={1}
      startingValue={3.3}
      minValue={0.1}
    />
  );
}
