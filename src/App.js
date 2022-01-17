import React from "react";
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./styles";
import darkMode from "./darkMode";
import * as button from "./button";
import ModeButton from "./ModeButton";

class ComplexNumberCalculator extends React.Component {
  webInputs = [
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "+j", "-j", "="],
  ];
  mobileInputs = [
    ["^", "(", ")", "π", "j"],
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [".", 0, "( - )", "ANS", "="],
  ];
  tabInputs = {
    STD: [
      ["x10", "e", ""],
      ["log", "ln", "logₙ"],
      ["", "", ""],
      ["", "", ""],
    ],
    TRIG: [
      ["sin", "cos", "tan"],
      ["asin", "acos", "atan"],
      ["sinh", "cosh", "tanh"],
      ["asinh", "acosh", "atanh"],
    ],
  };
  modeInput = {
    Input: ["cart", "polar", "exp"],
    ANS: ["cart", "polar", "exp"],
    Symbol: ["j", "∠", "eʲ"],
    Angle: ["deg", "rad", "grad"],
  };

  constructor(props) {
    super(props);

    var inputs, header;
    if (Platform.OS == "web") inputs = this.webInputs;
    else inputs = this.mobileInputs;

    this.tabElement = [];
    this.tabContentElement = [];
    this.mainElement = [];

    this.state = {
      inputs: [],
      selection: { start: 0, end: 0 },
      outputs: null,
      clearInput: false,
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
    this.setState({ tab: input });

    // Change the toggle on the tab
    for (let i = 0; i < this.state.tabButtons.length; i++) {
      if (this.state.tabButtons[i].props.content == input)
        this.tabElement[i].current.setState({ style: styles.seletedTabButton });
      else this.tabElement[i].current.setState({ style: styles.tabButton });
    }

    // Change the tab button content based on the toggle
    for (let i = 0; i < this.state.tabContent.length; i++) {
      for (let j = 0; j < this.state.tabContent[i].length; j++) {
        this.tabContentElement[i][j].current.setState({ content: this.tabInputs[input][i][j] });
      }
    }
  };

  handleAngleModeChange = () => {
    let currMode = this.state.angleMode;
    currMode = (currMode + 1) % 3;
    this.setState({ angleMode: currMode });
    // The Angle toggle will also trigger a form switch in the output
    this.handleButtonInput(this.modeInput["Angle"][currMode]);

    // Change button text
    const content = "Angle Mode: " + this.modeInput["Angle"][currMode];
  };

  handleInputModeChange = () => {
    let currMode = this.state.inputMode;
    currMode = (currMode + 1) % 3;
    this.setState({ inputMode: currMode });

    // Change button text
    const content = "Input Mode: " + this.modeInput["Input"][currMode];
    this.mainElement[0][4].current.setState({
      content: this.modeInput["Symbol"][currMode],
    });
  };

  handleAnsModeChange = () => {
    let currMode = this.state.outputMode;
    currMode = (currMode + 1) % 3;
    this.setState({ outputMode: currMode });
    // The ANS toggle will also trigger a form switch in the output
    this.handleButtonInput(this.modeInput["ANS"][currMode]);

    // Change button text
    const content = "ANS Mode: " + this.modeInput["ANS"][currMode];
  };

  handleButtonInput = (input) => {
    var array = [...this.state.inputs];
    var answer = this.state.outputs;
    var options = {
      clearInput: this.state.clearInput,
      allowDecimal: this.state.allowDecimal,
      bracketCount: this.state.bracketCount,
      selection: this.state.selection.start,
    };
    var mode = {
      inputMode: this.modeInput["Input"][this.state.inputMode],
      outputMode: this.modeInput["ANS"][this.state.outputMode],
      angleMode: this.modeInput["Angle"][this.state.angleMode],
    };

    [array, answer, options] = button.parseButtonInput(
      input,
      array,
      answer,
      options,
      mode
    );

    this.setState({
      inputs: array,
      outputs: answer,
      allowDecimal: options.allowDecimal,
      bracketCount: options.bracketCount,
      selection: options.selection,
      clearInput: options.clearInput,
    });
  };

  handleSelectionChange = ({ nativeEvent: { selection } }) => {
    // Change cursor position as well as make sure to not clear input on next button press
    this.setState({ selection: selection, clearInput: false });
  };

  generateTabButtons = (inputs) => {
    var tabs = Object.keys(inputs);
    var buttons = [];

    // Generate the tabs
    for (let i = 0; i < tabs.length; i++) {
      this.tabElement.push(React.createRef());
      if (tabs[i] == tabs[0])
        buttons.push(
          <button.Button
            ref={this.tabElement[i]}
            key={"tab_" + i.toString()}
            content={tabs[i]}
            onPress={this.handleTabSwitching}
            style={styles.seletedTabButton}
          />
        );
      else
        buttons.push(
          <button.Button
            ref={this.tabElement[i]}
            key={"tab_" + i.toString()}
            content={tabs[i]}
            onPress={this.handleTabSwitching}
            style={styles.tabButton}
          />
        );
    }

    return buttons;
  };

  generateTabContent = (inputs) => {
    var tabs = Object.keys(inputs);
    var buttons = [];

    // Generate the content for the tabs
    for (let i = 0; i < inputs[tabs[0]].length; i++) {
      buttons.push([]);
      this.tabContentElement.push([]);
      for (let j = 0; j < inputs[tabs[0]][i].length; j++) {
        this.tabContentElement[i].push(React.createRef());

        buttons[i].push(
          <button.Button
            ref={this.tabContentElement[i][j]}
            key={"tab_" + i.toString() + "_" + j.toString()}
            content={inputs[tabs[0]][i][j]}
            onPress={this.handleButtonInput}
            style={styles.tabContentButton}
          />
        );
      }
    }

    return buttons;
  };

  generateMainButtons = (inputs) => {
    var buttons = [];

    for (let i = 0; i < inputs.length; i++) {
      buttons.push([]);
      this.mainElement.push([]);
      for (let j = 0; j < inputs[i].length; j++) {
        this.mainElement[i].push(React.createRef());
        buttons[i].push(
          <button.Button
            ref={this.mainElement[i][j]}
            key={i.toString() + "_" + j.toString()}
            content={inputs[i][j]}
            onPress={this.handleButtonInput}
          />
        );
      }
    }

    return buttons;
  };

  renderTabButtons = () => {
    var buttonRows = [];
    var tabContainer = [];

    // Generate the tabs
    tabContainer.push(
      <View key={"renderButtonTabs"} style={styles.tabRow}>
        {this.state.tabButtons}
      </View>
    );

    // Generate the content for the tabs
    for (let i = 0; i < this.state.tabContent.length; i++) {
      buttonRows.push(
        <View key={"renderButtonTabs_" + i.toString()} style={styles.buttonRow}>
          {this.state.tabContent[i]}
        </View>
      );
    }
    tabContainer.push(
      <View key={"renderButtonTabsContent"} style={styles.tabContent}>
        {buttonRows}
      </View>
    );

    return (
      <View key="tabButtons" style={styles.tabContainer}>
        {tabContainer}
      </View>
    );
  };

  renderMainButtons = () => {
    var buttonRows = [];

    for (let i = 0; i < this.state.mainButtons.length; i++) {
      buttonRows.push(
        <View key={"renderButtonView_" + i.toString()} style={styles.buttonRow}>
          {this.state.mainButtons[i]}
        </View>
      );
    }

    return (
      <View key="renderButtons" style={styles.mainButtonContainer}>
        {buttonRows}
      </View>
    );
  };

  render = () => {
    var flexDir, header;
    if (Platform.OS == "web") flexDir = "row";
    else flexDir = "column";

    // The header just takes care of the header/notch sometimes for Android / iOS devices
    if (Platform.OS == "ios") header = null;
    else header = <Text style={{ height: StatusBar.currentHeight }}></Text>;

    var output;
    if (this.state.outputs == null) output = "";
    else output = ["= ", ...this.state.outputs.toOutput()];

    var input = "";
    for (let i = 0; i < this.state.inputs.length; i++) {
      input = `${input}${this.state.inputs[i]}`;
    }

    let horizontalBar = <View
                          style={{
                            borderBottomColor: "#CACACA",
                            borderBottomWidth: 2,
                            borderRadius: 5,
                            marginTop: 5,
                            marginHorizontal: 40,
                          }}
                        />;

    return (
      <SafeAreaView key="mainView" style={styles.center}>
        {header}

        <View key="io" style={{ flex: 1, alignSelf: "stretch" }}>
          <TextInput
            autoCorrect={false}
            key="input"
            showSoftInputOnFocus={false}
            numberOfLines={1}
            autoFocus={true}
            adjustsFontSizeToFit
            style={styles.inputField}
            value={input}
            selection={this.state.selection}
            onSelectionChange={this.handleSelectionChange}
          />
          <Text
            key="output"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.answerField}
          >
            {" "}
            {output}{" "}
          </Text>
        </View>

        <View style={styles.ioTogglesContainer}>
          <ModeButton
            isAngle={true}
            isAns={false}
            mode={this.state.angleMode}
            handleOnPress={this.handleAngleModeChange}
          />
          <ModeButton
            isAngle={false}
            isAns={false}
            mode={this.state.inputMode}
            handleOnPress={this.handleInputModeChange}
          />
          <ModeButton
            isAngle={false}
            isAns={true}
            mode={this.state.outputMode}
            handleOnPress={this.handleAnsModeChange}
          />
        </View>

        <View
          key="buttonArea"
          style={{
            flex: 4,
            flexDirection: flexDir,
            backgroundColor: "#DEE4E7",
          }}
        >
          {this.renderTabButtons()}
          {horizontalBar}
          {this.renderMainButtons()}
        </View>
      </SafeAreaView>
    );
  };
}

export default ComplexNumberCalculator;
