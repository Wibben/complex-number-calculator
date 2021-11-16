import React from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import * as math from './math';
import * as utils from './utils';
import {op,fn,sp} from "./operation";


export function parseButtonInput(input, array, allowDecimal, bracketCount)
{
  var lastElement = utils.last(array);

  if(input instanceof fn) {
    console.log(input.button);
    return;
  }

  if(input == "AC") {
    array = [];
    allowDecimal = true;
  } else if(input == "DEL") {
    if(lastElement == ".") allowDecimal = true;
    array = utils.removeLastItem(array);
  } else if(input == "=") { // Disallow compute right after an operand
    if((!math.operands.includes(lastElement) || math.specialOps.includes(lastElement)) && array.length>0) {
      var answer = math.doMath(array, "default");
      array = [...answer];
      allowDecimal = !utils.last(answer).toString().includes(".");
    }
  } else if(math.operands.includes(input) && !math.specialOps.includes(input)) { // Put a filter on the operators
    if(array.length>0) { // Disallow having first input be an operator
      if(math.operands.includes(lastElement) && !math.specialOps.includes(lastElement)) array = utils.removeLastItem(array); // Disallow 2 consecutive ops
      array = [...array, input];
      allowDecimal = true;
    }
  } else if(input == "-") { // The negative sign should only be allowed in certain situations
    if(array.length == 0 || ([...math.operands,"j","∠"].includes(lastElement) && !["-"].includes(lastElement))) {
      array = [...array, input];
    }
  } else if(input == "(") { // The left bracket should come after a operand
    if(array.length == 0 || math.operands.includes(lastElement) || ["j","∠","-"].includes(lastElement)) {
      array = [...array, input];
      bracketCount++;
    }
  } else if(input == ")") { // Do not allow right brackets if there is no corresponding left bracket
    if(bracketCount>0 && !math.operands.includes(lastElement) && !["-"].includes(lastElement)) {
      array = [...array, input];
      bracketCount--;
    }
  } else if(input == ".") { // Disallow 2 decimals in one number
    if (allowDecimal) {
      array = [...array, input];
      allowDecimal = false;
    }
  } else if(input == "j" || input == "∠") { // Imaginary number stuff
    array = [...array, input];
    allowDecimal = true;
  } else if(math.conversion.includes(input)) { // Disallow conversion right after an operand
    // Conversion will compute along with convert
    if((!math.operands.includes(lastElement) || math.specialOps.includes(lastElement)) && array.length>0) {
      var answer = math.doMath(array, input);
      array = [...answer];
      allowDecimal = !utils.last(answer).toString().includes(".");
    }
  } else if (math.trig.includes(lastElement)) { // Trigonometric functions
    
  } else {
    array = [...array, input];
  }

  return [array, allowDecimal, bracketCount];
}

export class Button extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      content: props.content,
      onPress: props.onPress,
      style: props.style==null ? styles.button:props.style,
    }
  }

  callBack = () => {
    this.props.onPress(this.state.content);
  }

  render() {
    var style,disabled,text;
    
    // Some buttons in the tabs may be disabled because they aren't filled out yet
    // Do a literal string check for === to make sure
    disabled = (this.state.content.button === "");

    if(disabled) style = styles.nonExistentButton;
    else style = this.state.style;

    // Check if button is pure text (tab header) or a calculator input
    if(this.state.content instanceof op || this.state.content instanceof fn || this.state.content instanceof sp) text = this.state.content.button;
    else text = this.state.content;

    return (
      <TouchableOpacity 
        style={style}
        onPress={this.callBack} 
        disabled={disabled}
      >
        <Text> {text} </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;