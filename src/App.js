import React from "react";
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Keyboard,
  Pressable,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { lightTheme, darkTheme } from "./styles";
import * as button from "./button";
import ModeButton from "./ModeButton";
import ThemeMode from "./ThemeMode";
import TutorialSlideshow from "./TutorialSlideshow";

class ComplexNumberCalculator extends React.Component {
  webInputs = [
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "+j", "-j", "="],
  ];
  mobileInputs = [
    ["xⁿ", "(", ")", "π", "j"],
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [".", 0, "( - )", "LAST", "="],
  ];
  tabInputs = {
    STD: [
      ["e", "√", "ⁿ√"],
      ["log", "ln", "logₙ"],
      ["×10ⁿ", "%", "!"],
      ["|x|", "x²", "¹⁄ₓ"],
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
    LAST: ["cart", "polar", "exp"],
    Symbol: ["j", "∠", "eʲ"],
    Angle: ["deg", "rad", "grad"],
  };

  themeInput = {
    theme: ["light", "dark"],
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
      showAnswer: true,
      clearInput: false,
      bracketCount: 0,
      tab: "STD",
      inputMode: 0,
      outputMode: 0,
      angleMode: 0,
      tabButtons: this.generateTabButtons(this.tabInputs),
      tabContent: this.generateTabContent(this.tabInputs),
      mainButtons: this.generateMainButtons(inputs),
      showTutorial: false,
    };
  }

  toggleShowTutorial = () => {
    let currState = this.state.showTutorial;
    this.setState({ showTutorial: !currState });
  };

  handleTabSwitching = (input) => {
    this.setState({ tab: input });
    var theme = global.theme ? lightTheme : darkTheme;

    // Change the toggle on the tab
    for (let i = 0; i < this.state.tabButtons.length; i++) {
      if (this.state.tabButtons[i].props.content == input)
        this.tabElement[i].current.setState({ baseStyle: "seletedTabButton" });
      else this.tabElement[i].current.setState({ baseStyle: "tabButton" });
    }

    // Change the tab button content based on the toggle
    for (let i = 0; i < this.state.tabContent.length; i++) {
      for (let j = 0; j < this.state.tabContent[i].length; j++) {
        this.tabContentElement[i][j].current.setState({
          content: this.tabInputs[input][i][j],
        });
      }
    }
  };

  handleAngleModeChange = () => {
    let currMode = this.state.angleMode;
    currMode = (currMode + 1) % 3;
    this.setState({ angleMode: currMode });
    // The Angle toggle will also trigger a form switch in the output
    this.handleButtonInput(this.modeInput["Angle"][currMode]);
  };

  handleInputModeChange = () => {
    let currMode = this.state.inputMode;
    currMode = (currMode + 1) % 2;
    this.setState({ inputMode: currMode });

    // Change button text
    this.mainElement[0][4].current.setState({
      content: this.modeInput["Symbol"][currMode],
    });
  };

  handleAnsModeChange = () => {
    let currMode = this.state.outputMode;
    currMode = (currMode + 1) % 2;
    this.setState({ outputMode: currMode });
    // The LAST toggle will also trigger a form switch in the output
    this.handleButtonInput(this.modeInput["LAST"][currMode]);
  };

  handleButtonInput = (input) => {
    var array = [...this.state.inputs];
    var answer = this.state.outputs;
    var options = {
      clearInput: this.state.clearInput,
      bracketCount: this.state.bracketCount,
      selection: this.state.selection.start,
      showAnswer: this.state.showAnswer,
    };
    var mode = {
      inputMode: this.modeInput["Input"][this.state.inputMode],
      outputMode: this.modeInput["LAST"][this.state.outputMode],
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
      showAnswer: options.showAnswer,
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
            style={"seletedTabButton"}
          />
        );
      else
        buttons.push(
          <button.Button
            ref={this.tabElement[i]}
            key={"tab_" + i.toString()}
            content={tabs[i]}
            onPress={this.handleTabSwitching}
            style={"tabButton"}
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
            style={"tabContentButton"}
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
    var theme = global.theme ? lightTheme : darkTheme;

    // Generate the tabs
    tabContainer.push(
      <View key={"renderButtonTabs"} style={theme.tabRow}>
        {this.state.tabButtons}
      </View>
    );

    // Generate the content for the tabs
    for (let i = 0; i < this.state.tabContent.length; i++) {
      buttonRows.push(
        <View key={"renderButtonTabs_" + i.toString()} style={theme.buttonRow}>
          {this.state.tabContent[i]}
        </View>
      );
    }
    tabContainer.push(
      <View key={"renderButtonTabsContent"} style={theme.tabContent}>
        {buttonRows}
      </View>
    );

    return (
      <View key="tabButtons" style={theme.tabContainer}>
        {tabContainer}
      </View>
    );
  };

  renderMainButtons = () => {
    var buttonRows = [];
    var theme = global.theme ? lightTheme : darkTheme;

    for (let i = 0; i < this.state.mainButtons.length; i++) {
      buttonRows.push(
        <View key={"renderButtonView_" + i.toString()} style={theme.buttonRow}>
          {this.state.mainButtons[i]}
        </View>
      );
    }
    return (
      <View key="renderButtons" style={theme.mainButtonContainer}>
        {buttonRows}
      </View>
    );
  };

  render = () => {
    var flexDir, header;
    var theme = global.theme ? lightTheme : darkTheme;

    if (Platform.OS == "web") flexDir = "row";
    else flexDir = "column";

    // The header just takes care of the header/notch sometimes for Android / iOS devices
    if (Platform.OS == "ios") header = null;
    else header = <Text style={{ height: StatusBar.currentHeight }}></Text>;

    var output;
    if (this.state.outputs == null || !this.state.showAnswer) output = "";
    else output = ["= ", ...this.state.outputs.toOutput()];

    var input = "";
    for (let i = 0; i < this.state.inputs.length; i++) {
      input = `${input}${this.state.inputs[i]}`;
    }

    let horizontalBar = <View style={theme.horizontalBar} />;

    return true ? (
      <SafeAreaView key="mainView" style={theme.center}>
        {header}
        <TutorialSlideshow
          showTutorial={this.state.showTutorial}
          toggleShowTutorial={this.toggleShowTutorial}
        />
        <View style={theme.topBar}>
          <View style={{ flex: 1 }}>
            <Pressable onPress={() => this.toggleShowTutorial()}>
              {global.theme ? (
                <Image
                  style={theme.tinyLogo}
                  source={require("../icons/help-light.png")}
                />
              ) : (
                <Image
                  style={theme.tinyLogo}
                  source={require("../icons/help-dark.png")}
                />
              )}
            </Pressable>
          </View>
          <View style={{ flex: 1.15 }}>
            <ThemeMode
              mode={global.theme}
              handleOnPress={this.props.handleOnPress}
              tabs={this.state.tabButtons}
              tabContent={this.state.tabContent}
              main={this.state.mainButtons}
              style={theme}
            />
          </View>
        </View>

        <View key="io" style={{ flex: 1, alignSelf: "stretch" }}>
          <TextInput
            // onFocus={() => Clipboard.setString('')} use this for taking iPad screenshots
            contextMenuHidden={true}
            autoCorrect={false}
            key="input"
            showSoftInputOnFocus={false}
            numberOfLines={1}
            autoFocus={true}
            adjustsFontSizeToFit
            style={theme.inputField}
            value={input}
            selection={this.state.selection}
            onSelectionChange={this.handleSelectionChange}
          />
          <ScrollView key="scroll" horizontal={true} style={theme.scrollField}>
            <Text
              key="output"
              numberOfLines={1}
              adjustsFontSizeToFit
              style={theme.answerField}
            >
              {" "}
              {output}{" "}
            </Text>
          </ScrollView>
        </View>

        <View style={theme.ioTogglesContainer}>
          <ModeButton
            isAngle={true}
            isAns={false}
            mode={this.state.angleMode}
            handleOnPress={this.handleAngleModeChange}
            style={theme}
          />
          <ModeButton
            isAngle={false}
            isAns={false}
            mode={this.state.inputMode}
            handleOnPress={this.handleInputModeChange}
            style={theme}
          />
          <ModeButton
            isAngle={false}
            isAns={true}
            mode={this.state.outputMode}
            handleOnPress={this.handleAnsModeChange}
            style={theme}
          />
        </View>

        <View key="buttonArea" style={theme.buttonArea}>
          {this.renderTabButtons()}
          {horizontalBar}
          {this.renderMainButtons()}
        </View>
        {Platform.isPad ? <View style={{ flex: 0.25 }}></View> : null}
      </SafeAreaView>
    ) : (
      <SafeAreaView>
        <View>
          <TutorialSlideshow />
        </View>
      </SafeAreaView>
    );
  };
}

export default ComplexNumberCalculator;
