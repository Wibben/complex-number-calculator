import React from "react";
import {
  TouchableOpacity,
  Text,
} from "react-native";
import {lightTheme, darkTheme} from "./styles";
import * as math from "./math";
import * as utils from "./utils";

export function parseButtonInput(input, array, answer, options, mode) {
  var bracketCount = options.bracketCount;
  var selection = options.selection;
  var clearInput = options.clearInput;
  var showAnswer = options.showAnswer;

  var selection = utils.snapSelectionToInput(array,selection);
  var lastElement = utils.lastSelected(array,selection);

  // absolute values shown as abs(x)
  if (input == "|x|") {
    input = "abs";
  } else if(input == "×10ⁿ") {
    input = "ₓ₁₀";
  } else if(input == "xⁿ") {
    input = "^";
  } else if(input == "x²") {
    input = "^2"
  } else if(input == "¹⁄ₓ") {
    input = "^-1";
  }

  if (input == "AC") {
    array = [];
    selection = -1;
    bracketCount = 0;
    // answer = null;
    showAnswer = false;
    clearInput = false;
  } else if (input == "DEL") {
    if (lastElement == "(") bracketCount--;
    else if (lastElement == ")") bracketCount++;
    array = utils.removeSelectedItem(array,selection);
    selection--;

    // Certain functions, such as trig, are accompanied by brackets, and thus should
    // also delete the corresponding trig function
    let lastSelected = utils.lastSelected(array,selection);
    if(([...math.functions].includes(lastSelected) || (typeof lastSelected === "string" && lastSelected.includes("√")))
        && lastElement == "(") {
      array = utils.removeSelectedItem(array,selection);
      selection--;
    }
  } else if (input == "=") {
    // Disallow compute right after an operand
    if (math.validateExpression(array)) {
      answer = math.doMath(array, answer, mode);
      showAnswer = true;
      // After a valid calculations, the next button press will clear the input field
      clearInput = true;
    }
  } else if (
    math.operands.includes(input) &&
    !math.specialOps.includes(input)
  ) {
    if(clearInput) {
      array = ["LAST"];
      selection = 0;
      bracketCount = 0;
      clearInput = false;
    }

    // Put a filter on the operators
    if (array.length > 0) {
      // Disallow having first input be an operator
      if (
        math.operands.includes(lastElement) &&
        ![...math.specialOps,"%","!"].includes(lastElement)
      )
        array[selection] = input; // Disallow 2 consecutive ops
      else {
        [array, selection] = utils.addItem(array, [input], selection);
      }
    }
  } else if (input == "( - )") {
    // The negative sign should only be allowed in certain situations
    if (
      selection == -1 ||
      ([...math.operands, ...math.complexOps].includes(lastElement) &&
        !["-"].includes(lastElement))
    ) {
      [array, selection] = utils.addItem(array, ["-"], selection);
      clearInput = false;
    }
  } else if (input == "(") {
    // The left bracket should come after a operand
    if (
      selection == -1 ||
      math.operands.includes(lastElement) ||
      [...math.complexOps, "-", ...math.digits].includes(lastElement)
    ) {
      if(clearInput) {
        array = [];
        selection = -1;
        bracketCount = 0;
        clearInput = false;
      }
      [array, selection] = utils.addItem(array, [input], selection);
      bracketCount++;
    }
  } else if (input == ")") {
    // Do not allow right brackets if there is no corresponding left bracket
    if (
      bracketCount > 0 &&
      (!math.operands.includes(lastElement) || lastElement == ")") &&
      !["-"].includes(lastElement)
    ) {
      [array, selection] = utils.addItem(array, [input], selection);
      bracketCount--;
    }
  } else if (math.complexOps.includes(input)) {
    // Imaginary number stuff
    if(clearInput) {
      array = [];
      selection = -1;
      bracketCount = 0;
      clearInput = false;
    }

    var isValid = true;
    var startingPos = array.length-1;
    while (startingPos >= 0 && math.digits.includes(array[startingPos])) startingPos -= 1;
    
    // cannot insert 2 complex ops as part of the same number. it causes ambiguity
    // due to how complex numbers are parsed (e.g. x+ij or xji)
    if (startingPos >= 0 && math.complexOps.includes(array[startingPos])) isValid = false;

    if (isValid) {
      [array, selection] = utils.addItem(array, [input], selection);
    }
  } else if (math.functions.includes(input)) {
    if(clearInput) {
      array = ["LAST"];
      selection = -1;
      bracketCount = 0;
    }

    [array, selection] = utils.addItem(array, [input, "("], selection);
    if(clearInput) selection++;
    bracketCount++;
  } else if (input == "logₙ" || input == "ⁿ√") {
    if(clearInput) {
      array = [];
      selection = -1;
      bracketCount = 0;
      clearInput = false;
    }

    // get number entered before which will be the custom base
    var startingPos = array.length-1;
    while (startingPos >= 0 && array[startingPos] in math.digits) startingPos -= 1;

    // if digits are from decimal part or negative, don't take it as the log's base
    if (startingPos >= 0 && (array[startingPos] == "." || array[startingPos] == "-"))
      startingPos = array.length-1;

    // remove the base from entered digits list
    var prevNum = array.slice(startingPos+1, array.length);
    if (prevNum.length > 0) {
      array.splice(startingPos+1, prevNum.length);
      selection -= prevNum.length;
    }

    if (input == "logₙ") {
      var base = (prevNum.length == 0) ? "10" : prevNum.join("");
      [array, selection] = utils.addItem(array, ["log", base, "("], selection);
      bracketCount++;
    } else if (input == "ⁿ√") {
      var n = (prevNum.length == 0) ? "2" : prevNum.join("");
      var sup = utils.digitToSuperscript(n);
      [array, selection] = utils.addItem(array, [sup + "√", "("], selection);
      bracketCount++;
    }
  } else if (math.shortcuts.includes(input)) {
    if(clearInput) {
      array = ["LAST"];
      selection = 0;
      bracketCount = 0;
      clearInput = false;
    }

    if (input == "^2") {
      [array, selection] = utils.addItem(array, ["^", 2], selection);
    } else if (input == "^-1") {
      [array, selection] = utils.addItem(array, ["^", "-", 1], selection);
    }
  } else if (math.conversion.includes(input)) {
    // Disallow conversion right after an operand
    // Conversion will only apply to the answer
    if (answer != null) answer.convert(input);
  } else if (math.angleConversion.includes(input)) {
    if (answer != null) answer.convertAngle(input);
  } else if(input == "LAST") {
    if(answer != null) {
      if(clearInput) {
        array = [];
        selection = -1;
        bracketCount = 0;
        clearInput = false;
      }

      [array, selection] = utils.addItem(array, [input], selection);
    }
  } else {
    if(clearInput) {
      array = [];
      selection = -1;
      bracketCount = 0;
      clearInput = false;
    }
    
    [array, selection] = utils.addItem(array, [input], selection);
    clearInput = false;
  }

  selection = utils.snapSelectionToText(array,selection);

  options.bracketCount = bracketCount;
  options.selection = {start:selection,end:selection};
  options.clearInput = clearInput;
  options.showAnswer = showAnswer;

  return [array, answer, options];
}

export class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content,
      onPress: props.onPress,
      baseStyle: props.style == null ? "button":props.style,
    };
  }

  updateTheme = () => {
    this.setState({});
  }

  callBack = () => {
    this.props.onPress(this.state.content);
  };

  render() {
    var style, disabled;

    // Some buttons in the tabs may be disabled because they aren't filled out yet
    // Do a literal string check for === to make sure
    disabled = this.state.content === "";

    digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

    var themeMode = global.theme ? lightTheme:darkTheme;

    specialButtons = {
      "AC": themeMode.acStyle,
      "DEL": themeMode.acStyle,
      "−": themeMode.operatorStyle,
      "+": themeMode.operatorStyle,
      "×": themeMode.operatorStyle,
      "÷": themeMode.operatorStyle,
      "=": themeMode.ansStyle,
      "LAST": themeMode.ansStyle,
      "^": themeMode.textStyle,
      "(": themeMode.textStyle, 
      ")": themeMode.textStyle, 
      "π": themeMode.textStyle, 
      "j": themeMode.textStyle,
      ".": themeMode.textStyle,
      "( - )": themeMode.textStyle
    }

    if (disabled) style = themeMode.nonExistentButton;
    else style = themeMode[this.state.baseStyle];

    if(this.state.content in specialButtons){
      var specificStyle = specialButtons[this.state.content];
      return (
        <TouchableOpacity
        style={style}
        onPress={this.callBack}
        disabled={disabled}
      >
        <Text style={specificStyle}> {this.state.content} </Text>
      </TouchableOpacity>
      );
    }
    else if (this.state.content in digits){
      return (
        <TouchableOpacity
          style={style}
          onPress={this.callBack}
          disabled={disabled}
        >
          <Text style={themeMode.textStyle}> {this.state.content} </Text>
        </TouchableOpacity>
      );
    }
    else{
      return (
        <TouchableOpacity
          style={style}
          onPress={this.callBack}
          disabled={disabled}
        >
          <Text style={themeMode.tabTextStyle}> {this.state.content} </Text>
        </TouchableOpacity>
      );
    }
   
  }
}

export default Button;
