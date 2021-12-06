import React from "react";
import {
  Platform,
  TouchableOpacity,
  Text,
  InputAccessoryView,
} from "react-native";
import styles from "./styles";
import * as math from "./math";
import * as utils from "./utils";

export function parseButtonInput(input, array, answer, allowDecimal, bracketCount) {
  var lastElement = utils.last(array);

  if (input == "AC") {
    array = [];
    answer = [];
    allowDecimal = true;
  } else if (input == "DEL") {
    if (lastElement == ".") allowDecimal = true;
    else if (lastElement == "(") bracketCount--;
    else if (lastElement == ")") bracketCount++;
    array = utils.removeLastItem(array);
  } else if (input == "=") {
    // Disallow compute right after an operand
    if (
      (!math.operands.includes(lastElement) ||
        math.specialOps.includes(lastElement)) &&
      array.length > 0
    ) {
      answer = math.doMath(array, "default");
      allowDecimal = !utils.last(answer).toString().includes(".");
    }
  } else if (
    math.operands.includes(input) &&
    !math.specialOps.includes(input)
  ) {
    // Put a filter on the operators
    if (array.length > 0) {
      // Disallow having first input be an operator
      if (
        math.operands.includes(lastElement) &&
        !math.specialOps.includes(lastElement)
      )
        array = utils.removeLastItem(array); // Disallow 2 consecutive ops
      array = [...array, input];
      allowDecimal = true;
    }
  } else if (input == "-") {
    // The negative sign should only be allowed in certain situations
    if (
      array.length == 0 ||
      ([...math.operands, ...math.complexOps].includes(lastElement) &&
        !["-"].includes(lastElement))
    ) {
      array = [...array, input];
    }
  } else if (input == "(") {
    // The left bracket should come after a operand
    if (
      array.length == 0 ||
      math.operands.includes(lastElement) ||
      [...math.complexOps, "-"].includes(lastElement)
    ) {
      array = [...array, input];
      bracketCount++;
    }
  } else if (input == ")") {
    // Do not allow right brackets if there is no corresponding left bracket
    if (
      bracketCount > 0 &&
      (!math.operands.includes(lastElement) || lastElement == ")") &&
      !["-"].includes(lastElement)
    ) {
      array = [...array, input];
      bracketCount--;
    }
  } else if (input == ".") {
    // Disallow 2 decimals in one number
    if (allowDecimal) {
      array = [...array, input];
      allowDecimal = false;
    }
  } else if (math.complexOps.includes(input)) {
    // Imaginary number stuff
    array = [...array, input];
    allowDecimal = true;
  } else if (math.trigonometric.includes(input)) {
    // trigonometric
    array = [...array, input, "("];
    bracketCount++;
    allowDecimal = true;
  } else if (math.conversion.includes(input)) {
    // Disallow conversion right after an operand
    // Conversion will only apply to the answer
    if (
      (!math.operands.includes(lastElement) ||
        math.specialOps.includes(lastElement)) &&
      array.length > 0
    ) {
      answer = math.doMath(answer, input);
      allowDecimal = !utils.last(answer).toString().includes(".");
    }
  } else {
    array = [...array, input];
  }

  return [array, answer, allowDecimal, bracketCount];
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

    if (disabled) style = styles.nonExistentButton;
    else style = this.state.style;

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

export default Button;
