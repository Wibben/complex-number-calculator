import React from 'react';
import { Platform, Text, View, SafeAreaView, StatusBar, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
    ["( - )", "(" , ")", "^", "j" ],
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "ₓ₁₀", "ANS", "="],
  ];
  tabInputs = {
    "STD": [
      ["π","e", ""],
      ["","", ""],
      ["","",""],
      ["Angle Mode: deg","ANS Mode: cart","Input Mode: cart"],
    ], 
    "TRIG": [
      ["sin","cos","tan"],
      ["asin","acos","atan"],
      ["","",""],
      ["","",""],
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
  modeInput = {
    "Input": ["cart","polar","exp"],
    "ANS": ["cart","polar","exp"],
    "Symbol": ["j","∠","eʲ"],
    "Angle": ["deg","rad","grad"],
  };

  constructor(props) {
    super(props);

    var inputs,header;
    if(Platform.OS == "web") inputs = this.webInputs;
    else inputs = this.mobileInputs;

    this.tabElement = [];
    this.tabContentElement = [];
    this.mainElement = [];

    this.state = {
      inputs: [],
      selection: {start: 0, end: 0},
      outputs: null,
      count: 0,
      allowDecimal: true,
      bracketCount: 0,
      tab: "STD",
      inputMode: 0,
      outputMode: 0,
      angleMode: 0,
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
        var content;
        if(this.tabInputs[input][i][j].includes("Input Mode")) content = "Input Mode: "+this.modeInput["Input"][this.state.inputMode];
        else if (this.tabInputs[input][i][j].includes("ANS Mode")) content = "ANS Mode: "+this.modeInput["ANS"][this.state.outputMode];
        else if (this.tabInputs[input][i][j].includes("Angle Mode")) content = "Angle Mode: "+this.modeInput["Angle"][this.state.angleMode];
        else content = this.tabInputs[input][i][j];

        this.tabContentElement[i][j].current.setState({content: content});
      }
    }
  }

  handleToggleInput = (input) => {
    var config = {
      "Input":  {mode: this.state.inputMode,  buttonCol: 2},
      "ANS":    {mode: this.state.outputMode, buttonCol: 1},
      "Angle":  {mode: this.state.angleMode,  buttonCol: 0},
    }

    var source = input.substr(0,input.indexOf("Mode")-1);
    var mode = config[source].mode;
    var buttonCol = config[source].buttonCol;

    // Move onto next mode
    mode = (mode+1)%3;
    this.tabContentElement[3][buttonCol].current.setState({content: source+" Mode: "+this.modeInput[source][mode]});

    // Set states
    if(source == "Input") {
      this.setState({inputMode: mode});

      // Input toggle will also toggle the j, ∠, eʲ button on the main panel
      this.mainElement[0][4].current.setState({content: this.modeInput["Symbol"][mode]});
    } else if(source == "ANS") {
      this.setState({outputMode: mode});

      // The ANS toggle will also trigger a form switch in the output
      this.handleButtonInput(this.modeInput["ANS"][mode]);
    } else if(source == "Angle") {
      this.setState({angleMode: mode});

      // The Angle toggle will also trigger a form switch in the output
      this.handleButtonInput(this.modeInput["Angle"][mode]);
    }    
  }

  handleButtonInput = (input) => {
    this.setState({count: this.state.count+1});

    var array = [...this.state.inputs];
    var answer = this.state.outputs;
    var allowDecimal = this.state.allowDecimal;
    var bracketCount = this.state.bracketCount;
    var selection = this.state.selection.start;
    var mode = {
        inputMode: this.modeInput["Input"][this.state.inputMode],
        outputMode: this.modeInput["ANS"][this.state.outputMode],
        angleMode: this.modeInput["Angle"][this.state.angleMode]
    };

    [array, answer, allowDecimal, bracketCount, selection] = button.parseButtonInput(input, array, answer, allowDecimal, bracketCount, selection, mode);
    
    this.setState({inputs: array, outputs: answer, allowDecimal: allowDecimal, bracketCount: bracketCount, selection: selection});
  }

  handleSelectionChange = ({nativeEvent: {selection}}) => {
    this.setState({selection: selection});
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

        // Use a difference callback for toggle buttons for code clarity
        if(inputs[tabs[0]][i][j].includes("Mode"))
          buttons[i].push(<button.Button ref={this.tabContentElement[i][j]} key={"tab_"+i.toString()+"_"+j.toString()} content={inputs[tabs[0]][i][j]} onPress={this.handleToggleInput} style={styles.tabContentButton} />)
        else
          buttons[i].push(<button.Button ref={this.tabContentElement[i][j]} key={"tab_"+i.toString()+"_"+j.toString()} content={inputs[tabs[0]][i][j]} onPress={this.handleButtonInput} style={styles.tabContentButton} />)
      }
    }

    return buttons;
  }

  generateMainButtons = (inputs) => {
    var buttons = [];

    for (let i=0; i<inputs.length; i++) {
      buttons.push([]);
      this.mainElement.push([]);
      for (let j=0; j<inputs[i].length; j++) {
        this.mainElement[i].push(React.createRef());
        buttons[i].push(<button.Button ref={this.mainElement[i][j]} key={i.toString()+"_"+j.toString()} content={inputs[i][j]} onPress={this.handleButtonInput} />)
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

    var output;
    if(this.state.outputs == null) output = "";
    else output = ["= ",...(this.state.outputs.toOutput())];

    var input = "";
    for (let i=0; i<this.state.inputs.length; i++) {
      input = `${input}${this.state.inputs[i]}`;
    }

    return (
      <SafeAreaView key="mainView" style={styles.center}>
        {header}
        {/* <TestFunction key="test1" in="Hello World!" />
        <Text>You've pressed the buttons {this.state.count} times</Text>
        <TestFunction key="test2" in="This is done with a function call" /> */}
        
        <View key="io" style={{flex:1, alignSelf: "stretch"}}>
          <TextInput key="input" showSoftInputOnFocus={false} numberOfLines={1} autoFocus={true} adjustsFontSizeToFit style={styles.inputField} value={input} selection={this.state.selection} onSelectionChange={this.handleSelectionChange} />
          <Text key="output" numberOfLines={1} adjustsFontSizeToFit style={styles.answerField}> {output} </Text>
        </View>

        <View key="buttonArea" style={{flex: 4, flexDirection: flexDir}}>
          {this.renderTabButtons()}
          {this.renderMainButtons()}
        </View>
      </SafeAreaView>
    )
  }
}

export default ComplexNumberCalculator;