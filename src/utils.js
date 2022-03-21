import { multiply, round, pi, e } from "mathjs";
import { Alert } from "react-native";

export const functions = ["sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "asinh", "acosh", "atanh", "log", "ln", "√", "abs"];
export const constants = ["π", "e"];
export const constantVals = [pi, e];

export function snapSelectionToInput(array, selection) {
  // Due to the fact that certain inputs consist of multiple characters, we need to snap the selection to the end of the input
  // to better modify them and to nost cause events like "co2pis("
  if(selection==0) return -1;

  for(let i=0; i<array.length; i++) {
    selection -= array[i].toString().length;
    if(selection<=0) {
      // Certain inputs are meant to have brackets accompanied with then, such as the trig functions
      // in which case the snap should be for after the brackets
      if([...functions].includes(array[i]) && !array[i].includes("log"))
        return (i+1<array.length) ? i+1:i;
      else return i;
    }
  }
}

export function snapSelectionToText(array, selection) {
  var charCount=0;

  for(let i=0; i<selection+1; i++) {
    charCount += array[i].toString().length;
  }

  return charCount;
}

export function removeLastItem(array) {return array.slice(0,-1);}

export function removeSelectedItem(array,n) {
  if(n==array.length-1) return removeLastItem(array);
  else if(n==-1) return array;
  else return [...array.slice(0,n),...array.slice(n+1)];
}

export function last(array) {return array[array.length-1];}

export function lastSelected(array,n) {
  if(n==-1) return "";
  else return array[n];
}

export function addItem(array,input,n) {
  // If the
  if(array.length >= 50) {
    Alert.alert("Input Limit Reached", "You have reached the input limit, please split your expression into parts and compute them");
    return [array, n];
  }

  var new_n = n + input.length;

  if(n==array.length-1) return [[...array,...input], new_n];
  else if(n==-1) return [[...input,...array], new_n];
  else return [[...array.slice(0,n+1), ...input, ...array.slice(n+1)], new_n];
}

export function convertRadians(angle, mode) {
  var result;
  switch(mode) {
    case "deg":
      result = multiply(angle, 360 / (2 * Math.PI));
      break;
    case "grad":
      result = multiply(angle, 400 / (2 * Math.PI));
      break;
    default:
      result = angle;
      break;
  }
  return result;
}

export function convertToRadians(angle, mode) {
  var result;
  switch(mode) {
    case "deg":
      result = multiply(angle, (2 * Math.PI) / 360);
      break;
    case "grad":
      result = multiply(angle, (2 * Math.PI) / 400);
      break;
    default:
      result = angle;
      break;
  }
  return result;
}

export function digitToSuperscript(n) {
  var supers = {"0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹"};
  var result = [];
  for (var i = 0; i < n.length; i++) {
    result.push(supers[n[i]]);
  }
  return result.join("");
}

export function superscriptToDigit(n) {
  var supers = {"⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9"};
  var result = [];
  for (var i = 0; i < n.length; i++) {
    result.push(supers[n[i]]);
  }
  return result.join("");
}

// Will take in an output and round it to a specific precision
// At the same time, it will also check if the output is close
// to a whole multiple of a constant
export function roundOutput(output, precision) {
  return round(output, precision);

  // Legacy the rest/come back to it later

  if (output==0) return 0; // No need to do anything if it's just 0

  // Check if output is a multiple of a constant and which constant it is
  let multiple,constant, roundedOutput;
  multiple = 0;

  for(let i=0; i<constantVals.length && multiple==0; i++) {
    if(round(output/constantVals[i],10) % 1 == 0) {
      multiple = round(output/constantVals[i]);
      constant = constants[i];
    }
  }

  // Piecing together an output string based on certain conditions
  if(multiple == 0 || multiple > 10000) roundedOutput = round(output, precision);
  else if(multiple == 1) roundedOutput = `${constant}`;
  else if(multiple == -1) roundedOutput = `-${constant}`
  else roundedOutput = `${multiple}${constant}`

  return roundedOutput;
}
