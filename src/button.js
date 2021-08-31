import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles'
import * as math from './math'

function removeLastItem(array) {return array.slice(0,-1);}

export function parseButtonInput(input, array, allowDecimal)
{
  var lastElement = array[array.length-1];

  if(input == "AC") {
    array = [];
    allowDecimal = true;
  } else if(input == "DEL") {
    if(lastElement == ".") allowDecimal = true;
    array = removeLastItem(array);
  } else if(input == "=") { // Disallow compute right after an operand
    if(!math.operands.includes(lastElement) && array.length>0) {
      var answer = math.doMath(array)
      array = [...answer];
      allowDecimal = !answer[0].toString().includes(".");
    }
  } else if(math.operands.includes(input)) { // Put a filter on the operators
    if(array.length>0) { // Disallow having first input be an operator
      if(math.operands.includes(lastElement)) array = removeLastItem(array); // Disallow 2 consecutive ops
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
    return (
      <TouchableOpacity 
        style={styles.button}
        onPress={this.callBack} 
      >
        <Text> {this.state.content} </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;