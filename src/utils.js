import { multiply } from "mathjs";
import { functions, specialFunctions } from "./math";

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
  if(n==array.length-1) return [...array,...input];
  else if(n==-1) return [...input,...array];
  else return [...array.slice(0,n+1), ...input, ...array.slice(n+1)];
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
