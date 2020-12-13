import React from "react";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MyCustomLeftComponent(props) {
  let navigation = props.navigate;
  return (
    <TouchableOpacity onPress={() => navigation.goBack(null)}>
      <Icon name="arrowleft" size={24} color="#fff" type="antdesign" />
    </TouchableOpacity>
  );
}
