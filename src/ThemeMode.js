import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import light from "../icons/sun.svg";
import dark from "../icons/moon.svg";

const modeSwitch = {
  0: "LIGHT",
  1: "DARK",
};

export const ThemeMode = (props) => {
  const { mode, handleOnPress, tabs, tabContent, main, style } = props;

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

    for(let i=0; i<tabs.length; i++) {
      tabs[i].ref.current.updateTheme(newMode);
    }
    for(let i=0; i<tabContent.length; i++) {
      for(let j=0; j<tabContent[0].length; j++) {
        tabContent[i][j].ref.current.updateTheme(newMode);
      }
    }
    for(let i=0; i<main.length; i++) {
      for(let j=0; j<main[0].length; j++) {
        main[i][j].ref.current.updateTheme(newMode);
      }
    }
  };

  useEffect(() => {
    setCurrText(
      modeSwitch[mode]
    );
  }, [mode]);

  var icon;
  
  if(currText === "LIGHT"){
    icon = dark;//'../icons/sun.svg';
  }else{
    icon = light;//'../icons/moon.svg';
  }
  
  return (
    <View style={style.ioToggles}>
      <TouchableOpacity onPress={onModeChange}>
        <Image source = {icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ThemeMode;
