import React from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import styles from './styles'
import * as math from './math'
import * as utils from './utils'

export function parseButtonInput(input, array, allowDecimal)
{
  var lastElement = utils.last(array);

  if(input == "AC") {
    array = [];
    allowDecimal = true;
  } else if(input == "DEL") {
    if(lastElement == ".") allowDecimal = true;
    array = utils.removeLastItem(array);
  } else if(input == "=") { // Disallow compute right after an operand
    if(!math.operands.includes(lastElement) && array.length>0) {
      var answer = math.doMath(array)
      array = [...answer];
      allowDecimal = !utils.last(answer).toString().includes(".");
    }
  } else if(math.operands.includes(input)) { // Put a filter on the operators
    if(array.length>0) { // Disallow having first input be an operator
      if(math.operands.includes(lastElement)) array = utils.removeLastItem(array); // Disallow 2 consecutive ops
      array = [...array, input];
      allowDecimal = true;
    }
  } else if(input == ".") { // Disallow 2 decimals in one number
    if (allowDecimal) {
      array = [...array, input];
      allowDecimal = false;
    }
  } else if(input == "+j" || input == "-j") { // Imaginary number stuff
    array = [...array, input];
    allowDecimal = true;
  } else {
    array = [...array, input];
  }

  return [array, allowDecimal];
}

export class Button extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      onPress: props.onPress,
    }
  }

  callBack = () => {
    this.props.onPress(this.state.content);
  }

  render() {
    var style;
    // On mobile view, want to just make the = sign wide for kicks
    if(Platform.OS != "web" && this.state.content == "=") style = styles.wideButton;
    else style = styles.button;

    return (
      <TouchableOpacity 
        style={style}
        onPress={this.callBack} 
      >
        <Text> {this.state.content} </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;