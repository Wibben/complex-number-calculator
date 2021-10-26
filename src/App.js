import React from 'react';
import { Platform, Text, View, SafeAreaView, StatusBar } from 'react-native';
import styles from './styles';
import * as button from './button';

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
    ["^", "(" , ")", "j", "∠" ],
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "ₓ₁₀", "-", "="],
  ];
  tabInputs = {
    "STD": [
      ["polar","exp","cart"],
      ["π","e",""],
      ["","",""],
      ["","",""],
    ], 
    "TRIG": [
      ["sin","cos","tan"],
      ["","",""],
      ["","",""],
      ["","test",""],
    ],
    "temp1": [
      ["","",""],
      ["temp1","",""],
      ["","",""],
      ["","",""],
    ], 
    "temp2": [
      ["","",""],
      ["","",""],
      ["","","temp2"],
      ["","",""],
    ], 
    "temp3": [
      ["","temp3",""],
      ["","",""],
      ["","",""],
      ["","",""],
    ], 
  };

  constructor(props) {
    super(props);

    var inputs,header;
    if(Platform.OS == "web") inputs = this.webInputs;
    else inputs = this.mobileInputs;

    this.tabElement = [];
    this.tabContentElement = [];

    this.state = {
      inputs: [],
      count: 0,
      allowDecimal: true,
      bracketCount: 0,
      tab: "STD",
      tabButtons: this.generateTabButtons(this.tabInputs),
      tabContent: this.generateTabContent(this.tabInputs),
      mainButtons: this.generateMainButtons(inputs),
    };
  }

  handleTabSwitching = (input) => {
    this.setState({tab: input});

    // Change the toggle on the tab
    for(let i=0; i<this.state.tabButtons.length; i++) {
      if(this.state.tabButtons[i].props.content == input) this.tabElement[i].current.setState({style: styles.seletedTabButton});
      else this.tabElement[i].current.setState({style: styles.tabButton});
    }

    // Change the tab button content based on the toggle
    for(let i=0; i<this.state.tabContent.length; i++) {
      for(let j=0; j<this.state.tabContent[i].length; j++) {
        this.tabContentElement[i][j].current.setState({content: this.tabInputs[input][i][j]});
      }
    }
  }

  handleButtonInput = (input) => {
    this.setState({count: this.state.count+1});
    var array = [...this.state.inputs];
    var allowDecimal = this.state.allowDecimal;
    var bracketCount = this.state.bracketCount;

    [array, allowDecimal, bracketCount] = button.parseButtonInput(input, array, allowDecimal, bracketCount);
    
    this.setState({inputs: array, allowDecimal: allowDecimal, bracketCount: bracketCount});
  }

  generateTabButtons = (inputs) => {
    var tabs = Object.keys(inputs);
    var buttons = [];

    // Generate the tabs
    for (let i=0; i<tabs.length; i++) {
      this.tabElement.push(React.createRef());
      if(tabs[i] == tabs[0]) buttons.push(<button.Button ref={this.tabElement[i]} key={"tab_"+i.toString()} content={tabs[i]} onPress={this.handleTabSwitching} style={styles.seletedTabButton} />)
      else buttons.push(<button.Button ref={this.tabElement[i]} key={"tab_"+i.toString()} content={tabs[i]} onPress={this.handleTabSwitching} style={styles.tabButton} />)
    }

    return buttons;
  }

  generateTabContent = (inputs) => {
    var tabs = Object.keys(inputs);
    var buttons = [];

    // Generate the content for the tabs
    for (let i=0; i<inputs[tabs[0]].length; i++) {
      buttons.push([]);
      this.tabContentElement.push([]);
      for(let j=0; j<inputs[tabs[0]][i].length; j++) {
        this.tabContentElement[i].push(React.createRef());
        buttons[i].push(<button.Button ref={this.tabContentElement[i][j]} key={"tab_"+i.toString()+"_"+j.toString()} content={inputs[tabs[0]][i][j]} onPress={this.handleButtonInput} style={styles.tabContentButton} />)
      }
    }

    return buttons;
  }

  generateMainButtons = (inputs) => {
    var buttons = [];

    for (let i=0; i<inputs.length; i++) {
      buttons.push([]);
      for (let j=0; j<inputs[i].length; j++) {
        buttons[i].push(<button.Button key={i.toString()+"_"+j.toString()} content={inputs[i][j]} onPress={this.handleButtonInput} />)
      }
    }

    return buttons;
  }

  renderTabButtons = () => {
    var buttonRows = [];
    var tabContainer = [];

    // Generate the tabs
    tabContainer.push(<View key={"renderButtonTabs"} style={styles.buttonRow}>{this.state.tabButtons}</View>);

    // Generate the content for the tabs
    for (let i=0; i<this.state.tabContent.length; i++) {
      buttonRows.push(<View key={"renderButtonTabs_"+i.toString()} style={styles.buttonRow}>{this.state.tabContent[i]}</View>);
    }
    tabContainer.push(<View key={"renderButtonTabsContent"} style={styles.tabContent}>{buttonRows}</View>)
    
    return (
      <View
        key="tabButtons"
        style={styles.tabContainer}
      >
        {tabContainer}
      </View>
    )
  }

  renderMainButtons = () => {
    var buttonRows = [];

    for (let i=0; i<this.state.mainButtons.length; i++) {
      buttonRows.push(<View key={"renderButtonView_"+i.toString()} style={styles.buttonRow}>{this.state.mainButtons[i]}</View>);
    }

    return (
      <View 
        key="renderButtons"
        style={styles.mainButtonContainer}
      >
        {buttonRows}
      </View>
    )
  }

  render = () => {
    var flexDir,header;
    if(Platform.OS == "web") flexDir = "row";
    else flexDir = "column";

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

        <View key="buttonArea" style={{flex: 4, flexDirection: flexDir}}>
          {this.renderTabButtons()}
          {this.renderMainButtons()}
        </View>
      </SafeAreaView>
    )
  }
}

export default ComplexNumberCalculator;