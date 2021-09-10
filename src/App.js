import React from 'react';
import { Platform, Text, View, SafeAreaView, StatusBar } from 'react-native';
import styles from './styles'
import * as button from './button'

const TestFunction = (props) => {
  return (
    <Text>{props.in}</Text>
  );
}

class ComplexNumberCalculator extends React.Component
{
  webInputs = [
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "+j", "-j", "="],
  ];
  mobileInputs = [
    ["polar", "exp", "cart"],
    ["^", "(" , ")", "+j", "-j" ],
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "ₓ₁₀", "-", "="],
  ];

  state = {
    inputs: [],
    count: 0,
    allowDecimal: true,
  };

  handleButtonInput = (input) => {
    this.setState({count: this.state.count+1});
    var array = [...this.state.inputs];
    var allowDecimal = this.state.allowDecimal;

    [array, allowDecimal] = button.parseButtonInput(input, array, allowDecimal);
    
    this.setState({inputs: array, allowDecimal: allowDecimal});
  }

  renderButtons = (inputs) => {
    var buttons = [];
    var buttonRows = [];

    for (let i=0; i<inputs.length; i++) {
      buttons = [];
      // buttons[i].push();
      for (let j=0; j<inputs[i].length; j++) {
        buttons.push(<button.Button key={i.toString()+"_"+j.toString()} content={inputs[i][j]} onPress={this.handleButtonInput} />)
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
    var inputs,header;
    if(Platform.OS == "web") inputs = this.webInputs;
    else inputs = this.mobileInputs;

    // The header just takes care of the header/notch sometimes for Android / iOS devices
    if(Platform.OS == "ios") header = null;
    else header = (<Text style={{height: StatusBar.currentHeight}}></Text>);

    return (
      <SafeAreaView key="mainView" style={styles.center}>
        {header}
        {/* <TestFunction key="test1" in="Hello World!" />
        <Text>You've pressed the buttons {this.state.count} times</Text>
        <TestFunction key="test2" in="This is done with a function call" /> */}
        
        <Text key="output" numberOfLines={1} adjustsFontSizeToFit style={styles.io}> {this.state.inputs} </Text>

        {/* <Tab value={index} onChange={setIndex}>  <Tab.Item title="recent" />  <Tab.Item title="favorite" />  <Tab.Item title="cart" /></Tab> */}

        {this.renderButtons(inputs)}
      </SafeAreaView>
    )
  }
}

export default ComplexNumberCalculator;