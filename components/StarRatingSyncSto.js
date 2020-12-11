import React, { useEffect, useState } from "react";
//import { Rating } from "react-native-ratings";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
//React ei importoidu?
//Propsit ei välity?
export default function StarRatingAsyncSto(props) {
  const [StarCount, setStarCount] = useState();

  useEffect(() => {
    GetData();
  }, []);
}

const GetData = async () => {
  try {
    const value = await AsyncStorage.getItem(props.item.name);
    if (value !== null) {
      setStarCount(parseFloat(value));
    }
  } catch (e) {
    console.log("Key not found!");
  }
};

const storeData = async (value) => {
  try {
    const obj = {
      name: props.item.name,
      starRating: value,
    };
    const jsonValue = JSON.stringify(obj);
    setStarCount(value);
    await AsyncStorage.setItem(props.item.name.toString(), value.toString());
  } catch (e) {
    // saving error
  }
};

return (
  /* EN KEKSI MITEN SAISIN TOIMIMAAN TÄLLÄ
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
    rating={StarRate}
  />
  */
  <StarRating
    maxStars={5}
    rating={StarCount}
    selectedStar={(rating) => storeData(rating)}
  ></StarRating>
);
