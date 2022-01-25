import React from "react";
import {
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "./styles";
import darkMode from "./darkMode";
import * as math from "./math";
import * as utils from "./utils";
import { string } from "mathjs";

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
  } else if(input =="×10ˣ") {
    input = "ₓ₁₀";
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
    // Put a filter on the operators
    if (array.length > 0 && !clearInput) {
      // Disallow having first input be an operator
      if (
        math.operands.includes(lastElement) &&
        ![...math.specialOps,"%","!"].includes(lastElement)
      )
        array[selection] = input; // Disallow 2 consecutive ops
      else {
        array = utils.addItem(array, [input], selection);
        selection++;
      }
      clearInput = false;
    }
  } else if (input == "( - )") {
    // The negative sign should only be allowed in certain situations
    if (
      selection == -1 ||
      ([...math.operands, ...math.complexOps].includes(lastElement) &&
        !["-"].includes(lastElement))
    ) {
      array = utils.addItem(array, ["-"], selection);
      selection++;
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
      array = utils.addItem(array, [input], selection);
      selection++;
      bracketCount++;
    }
  } else if (input == ")") {
    // Do not allow right brackets if there is no corresponding left bracket
    if (
      bracketCount > 0 &&
      (!math.operands.includes(lastElement) || lastElement == ")") &&
      !["-"].includes(lastElement)
    ) {
      array = utils.addItem(array, [input], selection);
      selection++;
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

    array = utils.addItem(array, [input], selection);
    selection++;
  } else if (math.functions.includes(input)) {
    if(clearInput) {
      array = [];
      selection = -1;
      bracketCount = 0;
      clearInput = false;
    }

    array = utils.addItem(array, [input, "("], selection);
    selection+=2;
    bracketCount++;
  } else if (input == "logₙ" || input == "ⁿ√") {
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
      array = utils.addItem(array, ["log", base, "("], selection);
      selection += 3;
      bracketCount++;
    } else if (input == "ⁿ√") {
      var n = (prevNum.length == 0) ? "2" : prevNum.join("");
      var sup = utils.digitToSuperscript(n);
      array = utils.addItem(array, [sup + "√", "("], selection);
      selection += 2;
      bracketCount++;
    }
  } else if (math.shortcuts.includes(input)) {
    if (input == "^2") {
      array = utils.addItem(array, ["^", 2], selection);
      selection += 2;
    } else if (input == "^-1") {
      array = utils.addItem(array, ["^", "-", 1], selection);
      selection += 3;
    }
  } else if (math.conversion.includes(input)) {
    // Disallow conversion right after an operand
    // Conversion will only apply to the answer
    if (answer != null) answer.convert(input);
  } else if (math.angleConversion.includes(input)) {
    if (answer != null) answer.convertAngle(input);
  } else if(input == "ANS") {
    if(answer != null) {
      if(clearInput) {
        array = [];
        selection = -1;
        bracketCount = 0;
        clearInput = false;
      }

      array = utils.addItem(array, [input], selection);
      selection++;
    }
  } else {
    if(clearInput) {
      array = [];
      selection = -1;
      bracketCount = 0;
      clearInput = false;
    }
    
    array = utils.addItem(array, [input], selection);
    selection++;
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
      style: props.style == null ? styles.button : props.style,
    };
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

    specialButtons = {
      "AC": styles.acStyle,
      "DEL": styles.acStyle,
      "−": styles.operatorStyle,
      "+": styles.operatorStyle,
      "×": styles.operatorStyle,
      "÷": styles.operatorStyle,
      "=": styles.ansStyle,
      "ANS": styles.ansStyle,
      "^": styles.textStyle,
      "(": styles.textStyle, 
      ")": styles.textStyle, 
      "π": styles.textStyle, 
      "j": styles.textStyle,
      ".": styles.textStyle,
      "( - )": styles.textStyle
    }

    if (disabled) style = styles.nonExistentButton;
    else style = this.state.style;

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
          <Text style={styles.textStyle}> {this.state.content} </Text>
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
          <Text> {this.state.content} </Text>
        </TouchableOpacity>
      );
    }
   
  }
}

export default Button;
