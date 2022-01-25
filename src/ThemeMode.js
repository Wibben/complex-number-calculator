import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {lightTheme, darkTheme} from "./styles";

const modeSwitch = {
  0: "LIGHT",
  1: "DARK",
};

export const ThemeMode = (props) => {
  const { mode, handleOnPress } = props;

  const [currMode, setCurrMode] = useState(mode);
  const [currText, setCurrText] = useState(
      modeSwitch[mode]
  );
  const onModeChange = () => {
    const newMode = (currMode + 1) % 2;
    setCurrMode(newMode);
    handleOnPress();
    setCurrText(
      modeSwitch[mode]
    );
  };

  useEffect(() => {
    setCurrText(
      modeSwitch[mode]
    );
  }, [mode]);

  return (
    <View style={lightTheme.ioToggles}>
      <TouchableOpacity onPress={onModeChange}>
        <Text style={lightTheme.ioTogglesText}>{currText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeMode;
