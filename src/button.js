import React from "react";
import {
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "./styles";
import * as math from "./math";
import * as utils from "./utils";

export function parseButtonInput(input, array, answer, options, mode) {
  var allowDecimal = options.allowDecimal;
  var bracketCount = options.bracketCount;
  var selection = options.selection;
  var clearInput = options.clearInput;

  var selection = utils.snapSelectionToInput(array,selection);
  var lastElement = utils.lastSelected(array,selection);

  if (input == "AC") {
    array = [];
    selection = -1;
    bracketCount = 0;
    answer = null;
    allowDecimal = true;
    clearInput = false;
  } else if (input == "DEL") {
    if (lastElement == ".") allowDecimal = true;
    else if (lastElement == "(") bracketCount--;
    else if (lastElement == ")") bracketCount++;
    array = utils.removeSelectedItem(array,selection);
    selection--;

    // Certain functions, such as trig, are accompanied by brackets, and thus should
    // also delete the corresponding trig function
    if(math.trigonometric.includes(utils.lastSelected(array,selection))) {
      array = utils.removeSelectedItem(array,selection);
      selection--;
    }
  } else if (input == "=") {
    // Disallow compute right after an operand
    if (math.validateExpression(array)) {
      answer = math.doMath(array, answer, mode);
      allowDecimal = !utils.last(answer.toOutput()).toString().includes(".");
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
        !math.specialOps.includes(lastElement)
      )
        array[selection] = input; // Disallow 2 consecutive ops
      else {
        array = utils.addItem(array, [input], selection);
        selection++;
      }
      allowDecimal = true;
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
      [...math.complexOps, "-", 0,1,2,3,4,5,6,7,8,9].includes(lastElement)
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
  } else if (input == ".") {
    // Disallow 2 decimals in one number
    if (allowDecimal) {
      if(clearInput) {
        array = [];
        selection = -1;
        bracketCount = 0;
        clearInput = false;
      }

      array = utils.addItem(array, [input], selection);
      selection++;
      allowDecimal = false;
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
    allowDecimal = true;
  } else if (math.trigonometric.includes(input)) {
    // trigonometric
    if(clearInput) {
      array = [];
      selection = -1;
      bracketCount = 0;
      clearInput = false;
    }

    array = utils.addItem(array, [input, "("], selection);
    selection+=2;
    bracketCount++;
    allowDecimal = true;
  } else if (math.conversion.includes(input)) {
    // Disallow conversion right after an operand
    // Conversion will only apply to the answer
    if (answer != null) {
      answer.convert(input);
      allowDecimal = !utils.last(answer.toOutput()).toString().includes(".");
    }
  } else if (math.angleConversion.includes(input)) {
    if (answer != null) {
      answer.convertAngle(input);
    }
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

  options.allowDecimal = allowDecimal;
  options.bracketCount = bracketCount;
  options.selection = {start:selection,end:selection};
  options.clearInput = clearInput;

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
