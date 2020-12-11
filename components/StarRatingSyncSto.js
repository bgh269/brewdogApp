import React, { useEffect, useState } from "react";
//import { Rating } from "react-native-ratings";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StarRatingAsyncSto(props) {
  const [StarCount, setStarCount] = useState();

  console.log(props);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    try {
      const value = await AsyncStorage.getItem(props.item.item.name);
      if (value !== null) {
        setStarCount(parseInt(value));
      }
    } catch (e) {
      console.log("Key not found!");
    }
  };

  const storeData = async (value) => {
    try {
      const obj = {
        name: props.item.item.name,
        starRating: value,
      };
      const jsonValue = JSON.stringify(obj);
      setStarCount(value);
      await AsyncStorage.setItem(
        props.item.item.name.toString(),
        value.toString()
      );
    } catch (e) {
      // saving error
    }
  };

  return (
    <StarRating
      maxStars={5}
      rating={StarCount}
      selectedStar={(rating) => storeData(rating)}
      fullStarColor={"orange"}
      starSize={40}
    ></StarRating>
    /*
    EN SAA TALLENNETTUA TÄLLÄ VALINTAA MUISTIIN
    <Rating 
      type="star"
      style={{ paddingVertical: 10 }}
      ratingCount={5}
      imageSize={30}
      showRating
      onFinishRating={(rating) => storeData(rating)}
    />
    */
  );
}
