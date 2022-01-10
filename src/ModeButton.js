import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const angleConstants = {
  0: "DEG",
  1: "RAD",
  2: "GRAD",
};

const inputConstants = {
  0: "IN: CART",
  1: "IN: POLAR",
  2: "IN: EXP",
};

const outputConstants = {
  0: "ANS: CART",
  1: "ANS: POLAR",
  2: "ANS: EXP",
};

export const ModeButton = (props) => {
  const { isAngle, isAns, mode, handleOnPress } = props;

  const [currMode, setCurrMode] = useState(mode);
  const [currText, setCurrText] = useState(
    isAngle
      ? angleConstants[mode]
      : isAns
      ? outputConstants[mode]
      : inputConstants[mode]
  );
  const onModeChange = () => {
    const newMode = (currMode + 1) % 3;
    setCurrMode(newMode);
    handleOnPress();
    setCurrText(
      isAngle
        ? angleConstants[newMode]
        : isAns
        ? outputConstants[newMode]
        : inputConstants[newMode]
    );
  };

  useEffect(() => {
    setCurrText(
      isAngle
        ? angleConstants[mode]
        : isAns
        ? outputConstants[mode]
        : inputConstants[mode]
    );
  }, [mode]);

  return (
    <View style={styles.ioToggles}>
      <TouchableOpacity onPress={onModeChange}>
        <Text style={styles.ioTogglesText}>{currText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModeButton;
