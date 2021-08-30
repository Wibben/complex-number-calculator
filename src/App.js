import React from 'react';
import { Alert, ShadowPropTypesIOS, Text, View } from 'react-native';
import styles from './styles'
import Button from './button'
import math from './math'

const TestFunction = (props) => {
  return (
    <Text>{props.in}</Text>
  );
}

class ComplexNumberCalculator extends React.Component
{
  inputs = [
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "x", "÷"],
    [1, 2, 3, "+", "-"],
    [0, ".", "+j", "-j", "="]
  ];
  operands = ["+","-","x","÷"];

  state = {
    inputs: [],
    count: 0,
    allowDecimal: true,
  }

  removeLastItem = (array) => {
    return array.slice(0,-1)
  }

  handleButtonInput = (input) => {
    this.setState({count: this.state.count+1});
    var array = [...this.state.inputs];
    var lastElement = array[array.length-1];
    var allowDecimal = this.state.allowDecimal;

    if(input == "AC") {
      array = [];
      allowDecimal = true;
    } else if(input == "DEL") {
      if(lastElement == ".") allowDecimal = true;
      array = this.removeLastItem(array);
    } else if(input == "=") { // Disallow compute right after an operand
      if(!this.operands.includes(lastElement)) {
        // var answer = math.doMath(...this.state.inputs)
        var answer = "Insert Answer Here"
        array = [answer];
        allowDecimal = !answer.includes(".");
      }
    } else if(this.operands.includes(input)) { // Put a filter on the operators
      if(array.length>0) { // Disallow having first input be an operator
        if(this.operands.includes(lastElement)) array = this.removeLastItem(array); // Disallow 2 consecutive ops
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
    this.setState({inputs: array, allowDecimal: allowDecimal});
  }

  renderButtons = (inputs) => {
    var buttons = [];
    var buttonRows = [];

    for (let i=0; i<this.inputs.length; i++) {
      buttons = [];
      // buttons[i].push();
      for (let j=0; j<this.inputs[i].length; j++) {
        buttons.push(<Button key={i.toString()+"_"+j.toString()} content={this.inputs[i][j]} onPress={this.handleButtonInput} />)
      }
      buttonRows.push(<View key={"renderButtonView_"+i.toString()} style={styles.buttonRow}>{buttons}</View>);
    }

    return (
      <View 
        key="renderButtons"
        style={styles.buttonContainer}
      >
        {buttonRows}
      </View>
    )
  }

  render = () => {
    return (
      <View key="mainView" style={styles.center}>
        <TestFunction key="test1" in="Hello World!" />
        <TestFunction key="test2" in="This is done with a function call" />
        
        <Text key="output"> {this.state.inputs} </Text>
        {this.renderButtons(this.inputs)}

        <Text>You've pressed the buttons {this.state.count} times</Text>
      </View>
    )
  }
}

export default ComplexNumberCalculator;