import React from "react";
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import portraitStyles from "./portraitStyles";
import * as button from "./button";

class ComplexNumberCalculator extends React.Component {
  webInputs = [
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "+j", "-j", "="],
  ];
  mobileInputs = [
    ["( - )", "(", ")", "^", "j"],
    [7, 8, 9, "DEL", "AC"],
    [4, 5, 6, "×", "÷"],
    [1, 2, 3, "+", "−"],
    [0, ".", "ₓ₁₀", "ANS", "="],
  ];
  tabInputs = {
    STD: [
      ["π", "e", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "ANS Mode: cart", "Input Mode: cart"],
    ],
    TRIG: [
      ["sin", "cos", "tan"],
      ["asin", "acos", "atan"],
      ["", "", ""],
      ["", "", ""],
    ],
    temp1: [
      ["", "", ""],
      ["temp1", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    temp2: [
      ["", "", ""],
      ["", "", ""],
      ["", "", "temp2"],
      ["", "", ""],
    ],
    temp3: [
      ["", "temp3", ""],
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
  complexInput = {
    Mode: ["cart", "polar", "exp"],
    Input: ["j", "∠", "eʲ"],
  };

  constructor(props) {
    super(props);

    var inputs, header;
    if (Platform.OS == "web") inputs = this.webInputs;
    else inputs = this.mobileInputs;

    this.tabElement = [];
    this.tabContentElement = [];
    this.mainElement = [];

    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? "portrait" : "landscape",
      inputs: [],
      outputs: null,
      count: 0,
      allowDecimal: true,
      bracketCount: 0,
      tab: "STD",
      inputMode: 0,
      outputMode: 0,
      tabButtons: this.generateTabButtons(this.tabInputs),
      tabContent: this.generateTabContent(this.tabInputs),
      mainButtons: this.generateMainButtons(inputs),
    };
    // Event Listener for orientation changes
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape",
      });
    });
  }

  handleTabSwitching = (input) => {
    this.setState({ tab: input });

    // Change the toggle on the tab
    for (let i = 0; i < this.state.tabButtons.length; i++) {
      if (this.state.tabButtons[i].props.content == input)
        this.tabElement[i].current.setState({ style: portraitStyles.seletedTabButton });
      else this.tabElement[i].current.setState({ style: portraitStyles.tabButton });
    }

    // Change the tab button content based on the toggle
    for (let i = 0; i < this.state.tabContent.length; i++) {
      for (let j = 0; j < this.state.tabContent[i].length; j++) {
        var content;
        if (this.tabInputs[input][i][j].includes("Input Mode"))
          content =
            "Input Mode: " + this.complexInput["Mode"][this.state.inputMode];
        else if (this.tabInputs[input][i][j].includes("ANS Mode"))
          content =
            "ANS Mode: " + this.complexInput["Mode"][this.state.outputMode];
        else content = this.tabInputs[input][i][j];

        this.tabContentElement[i][j].current.setState({ content: content });
      }
    }
  };

  handleButtonInput = (input) => {
    this.setState({ count: this.state.count + 1 });

    // Mode switching will be handled right here
    if (input.toString().includes("Input Mode")) {
      var inputMode = (this.state.inputMode + 1) % 3;

      this.tabContentElement[3][2].current.setState({
        content: "Input Mode: " + this.complexInput["Mode"][inputMode],
      });
      this.mainElement[0][4].current.setState({
        content: this.complexInput["Input"][inputMode],
      });
      this.setState({ inputMode: inputMode });
    } else {
      // Actual calculator operations
      // Output Mode is also a toggle, parse it and then pass it into the calculator
      if (input.toString().includes("ANS Mode")) {
        var outputMode = (this.state.outputMode + 1) % 3;

        this.tabContentElement[3][1].current.setState({
          content: "ANS Mode: " + this.complexInput["Mode"][outputMode],
        });
        this.setState({ outputMode: outputMode });

        input = this.complexInput["Mode"][outputMode];
      }

      var array = [...this.state.inputs];
      var answer = this.state.outputs;
      var allowDecimal = this.state.allowDecimal;
      var bracketCount = this.state.bracketCount;

      [array, answer, allowDecimal, bracketCount] = button.parseButtonInput(
        input,
        array,
        answer,
        allowDecimal,
        bracketCount
      );

      this.setState({
        inputs: array,
        outputs: answer,
        allowDecimal: allowDecimal,
        bracketCount: bracketCount,
      });
    }
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
            style={portraitStyles.seletedTabButton}
          />
        );
      else
        buttons.push(
          <button.Button
            ref={this.tabElement[i]}
            key={"tab_" + i.toString()}
            content={tabs[i]}
            onPress={this.handleTabSwitching}
            style={portraitStyles.tabButton}
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
            style={portraitStyles.tabContentButton}
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
      <View key={"renderButtonTabs"} style={portraitStyles.buttonRow}>
        {this.state.tabButtons}
      </View>
    );

    // Generate the content for the tabs
    for (let i = 0; i < this.state.tabContent.length; i++) {
      buttonRows.push(
        <View key={"renderButtonTabs_" + i.toString()} style={portraitStyles.buttonRow}>
          {this.state.tabContent[i]}
        </View>
      );
    }
    tabContainer.push(
      <View key={"renderButtonTabsContent"} style={portraitStyles.tabContent}>
        {buttonRows}
      </View>
    );

    return (
      <View key="tabButtons" style={portraitStyles.tabContainer}>
        {tabContainer}
      </View>
    );
  };

  renderMainButtons = () => {
    var buttonRows = [];

    for (let i = 0; i < this.state.mainButtons.length; i++) {
      buttonRows.push(
        <View key={"renderButtonView_" + i.toString()} style={portraitStyles.buttonRow}>
          {this.state.mainButtons[i]}
        </View>
      );
    }

    return (
      <View key="renderButtons" style={portraitStyles.mainButtonContainer}>
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

    if (this.state.orientation === "portrait") {
      return (
        <SafeAreaView key="mainView" style={portraitStyles.center}>
          {header}
          {/* <TestFunction key="test1" in="Hello World!" />
        <Text>You've pressed the buttons {this.state.count} times</Text>
        <TestFunction key="test2" in="This is done with a function call" /> */}

          <View key="io" style={{ flex: 1, alignSelf: "stretch" }}>
            <Text
              key="input"
              numberOfLines={1}
              adjustsFontSizeToFit
              style={portraitStyles.inputField}
            >
              {" "}
              {this.state.inputs}{" "}
            </Text>
            <Text
              key="output"
              numberOfLines={1}
              adjustsFontSizeToFit
              style={portraitStyles.answerField}
            >
              {" "}
              {output}{" "}
            </Text>
          </View>

          <View key="buttonArea" style={{ flex: 4, flexDirection: flexDir }}>
            {this.renderTabButtons()}
            {this.renderMainButtons()}
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        //Render View to be displayed in landscape mode
        <SafeAreaView>
          <View>
            <Text>hello</Text>
          </View>
        </SafeAreaView>
      );
    }
  };
}

export default ComplexNumberCalculator;
