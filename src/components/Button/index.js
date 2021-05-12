import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

const Button = ({ title, onButtonPress }) => (
  <TouchableOpacity style={styles.container} onPress={onButtonPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

Button.displayName = "Button";

export default Button;
