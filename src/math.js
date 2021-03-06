import complex from "./complex";
import * as utils from "./utils";
import * as mathjs from "mathjs";
import { Alert } from "react-native";

// Handles all the math...
export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const operands = ["+", "−", "×", "÷", "(", ")", "ₓ₁₀", "^", "₊", "ₓ", "↑", "%", "!"]; // ₊ is a "shadow" plus sign used to skirt around precedence issues
export const specialOps = ["(", ")", "-"];
export const conversion = ["polar", "exp", "cart"];
export const angleConversion = ["deg", "rad", "grad"];
export const functions = ["sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "asinh", "acosh", "atanh", "log", "ln", "√", "abs"];
export const specialFunctions = ["logₙ", "ⁿ√"];
export const complexOps = ["j", "∠", "eʲ"];
export const constants = ["π", "e"];
export const shortcuts = ["^2", "^-1"];
export const constantVals = [mathjs.pi, mathjs.e];

// Validate a mathematical expression by essentially simulating an answer
export function validateExpression(inputs) {
  let isValid = true;
  try {
    if(inputs.length==0) return false;
    var expression = createExpression(inputs, "2", "deg");
    var postfix = generatePostfix(expression);
    var answer = [];

    // Go through and pretend to compute the expression, if the answer array does not have enough
    // values for the operands, it is an invalid expression
    for (let i = 0; i < postfix.length && isValid; i++) {
      var element = postfix[i];
      if (["%","!"].includes(element)) {
        // % and ! are operands, but they only take in 1 element
        if(answer.length<1) isValid = false;
      } else if (operands.includes(element)) {
        // Normal operands pop 2 elements and push 1 element, so just pop 1 in sim
        if(answer.length<2) isValid = false;
        answer.pop();
      } else if ([...functions,...specialFunctions,"%","!"].includes(element) ||
                  (typeof element === "string" && element.includes("log")) ||
                  (typeof element === "string" && element.includes("√"))) {
        // Trig functions pop 1 elements and push 1 element, no change in sim
        if(answer.length<1) isValid = false;
      } else answer.push(element);
    }

    // If there are multiple values left in answer, expression is invalid
    if(answer.length>1) isValid = false;
  } catch {
    isValid = false;
  }

  if(isValid) return true;
  else {
    Alert.alert("Error", "There is a syntax error in the expression, please check it over before hitting =");
    return false;
  }
}

// Piece together an expression from an array of just singular variables
function createExpression(inputs, prevAnswer, mode) {
  var expression = [];

  // Count left and right brackets and get number of missing brackets
  let bracketCount=0;
  for (let i=0; i < inputs.length; i++) {
    if(inputs[i] == "(") bracketCount++;
    else if(inputs[i] == ")") bracketCount--;
  }

  // Piece together expression, separating operands from operators
  if (constants.includes(inputs[0]))
    expression.push(
      `${""}${constantVals[constants.findIndex((item) => item === inputs[0])]}`
    );
  else if(inputs[0] == "LAST") expression.push(prevAnswer);
  // Convert constants into values
  else expression.push(inputs[0]);

  for (let i = 1; i < inputs.length; i++) {
    var lastElement = utils.last(expression);

    // Parsing for exponential form
    if (
      i + 2 < inputs.length &&
      inputs[i] == "e" &&
      inputs[i + 1] == "^" &&
      inputs[i + 2] == "j"
    ) {
      expression[expression.length - 1] = `${lastElement}${"eʲ"}`;
      i = i + 2;
    } else if (complexOps.includes(inputs[i])) {
      // Parsing for complex entries - specifically j
      if(inputs[i] == "j") {
        // Checking for compound statements
        if(!operands.includes(lastElement) || [")"].includes(lastElement)) { 
          if([...digits,...constants,...specialOps].includes(inputs[i+1])) {
            if(![...digits,...constants,"(","-"].includes(inputs[i+1])) {
              if(["-"].includes(lastElement)) expression[expression.length - 1] = `${lastElement}${"1"}` // -j
              expression.push("×");
            } else expression.push("₊");
          } else {
            if (["-"].includes(lastElement)) expression[expression.length - 1] = `${lastElement}${"1"}` // -j
            expression.push("×");
          }
        } 

        if (inputs[i + 1] == "(")
          expression.push(`${inputs[i]}${"1"}`, "ₓ");
        else expression.push(inputs[i]);
        
      } else if(inputs[i] == "∠") {
        // Parsing for complex entries - specifically ∠
        if(!operands.includes(lastElement) || [")"].includes(lastElement)) { 
          if([...digits,...constants,...specialOps].includes(inputs[i+1])) {
            if(![...digits,...constants,"(","-"].includes(inputs[i+1])) {
              expression.push("×");
            } else expression.push("ₓ");
          } else {
            expression.push("×");
          }
        } 

        if (inputs[i + 1] == "(")
          expression.push(`${inputs[i]}${"0"}`, "ₓ", "1∠1", "↑");
        else expression.push(inputs[i]);

      } else expression[expression.length - 1] = `${lastElement}${inputs[i]}`
    } else if(inputs[i] == "LAST") {
      // Performing substitution for the LAST operator
      expression.push(prevAnswer);
    } else if (constants.includes(inputs[i])) {
      // Parsing for constants
      // Parse constants as a multiplication if there were values before it
      var complexVal = `${""}${
        constantVals[constants.findIndex((item) => item === inputs[i])]
      }`;
      if (!operands.includes(lastElement)) {
        expression = utils.removeLastItem(expression);
        // ∠ needs to be parsed with a multiply instead
        if(lastElement.toString().includes("∠")) expression.push("(", lastElement, "^", complexVal, ")");
        else expression.push("(", lastElement, "×", complexVal, ")");
      } else expression.push(complexVal); // Convert constants into values
    } else if (operands.includes(lastElement) || [...operands,...functions].includes(inputs[i]) || 
               inputs[i].toString().includes("log") || inputs[i].toString().includes("√")) {
      // Parsing for operands
      if((inputs[i]=="(" && // Implicit Multiplication of A(B)
          ![...operands,...functions,...specialFunctions,...complexOps,...specialOps].includes(lastElement) &&
          !lastElement.toString().includes("log") && !lastElement.toString().includes("√")) || 
          // Implicit multiplication of (A)(B)
          (inputs[i]=="(" && lastElement==")") ||
          // Implicit multiplication of (A)B
          (lastElement==")" &&
          ![...operands,...functions,...specialFunctions,...complexOps,...specialOps].includes(inputs[i]) &&
          !inputs[i].toString().includes("log") && !inputs[i].toString().includes("√")) ||
          // Implicit multiplication of functions like Asin(B)
          (([...functions].includes(inputs[i]) || inputs[i].toString().includes("log") || inputs[i].toString().includes("√")) && 
          (![...operands,...complexOps,...specialOps].includes(lastElement) || lastElement==")"))
        ) {
        expression.push("×",inputs[i]);
      } else expression.push(inputs[i]);
    } else expression[expression.length - 1] = `${lastElement}${inputs[i]}`; // Parsing for values
  }

  // Append Missing brackets
  while(bracketCount>0) {
    expression.push(")");
    bracketCount--;
  }

  // From the expression, generate the complex numbers
  for (let i = 0; i < expression.length; i++) {
    if (![...operands, ...functions,...specialFunctions].includes(expression[i]) &&
        !expression[i].toString().includes("log") &&
        !expression[i].toString().includes("√") &&
        !(expression[i] instanceof complex))
      expression[i] = new complex({ str: `${""}${expression[i]}`, angleMode: mode.angleMode });
  }

  return expression;
}

function getPrecedence(operator) {
  // nth log and nth root are displahyed differently than shown in the arrays, so need to parse back
  var opString = operator ? operator.toString():""; // Only convert to string if it's valid
  if(opString.includes("log") && opString != "log") operator = "logₙ";
  else if(opString.includes("√") && opString != "√") operator = "ⁿ√";

  // Find precedence
  if (["+", "−"].includes(operator)) return 1;
  //Precedence of + or - is 1
  else if (["×", "÷"].includes(operator)) return 2;
  //Precedence of * or / is 2
  else if ([...functions, ...specialFunctions, "^"].includes(operator)) return 3;
  //Precedence of ^ is 3
  else if (["ₓ₁₀", "-", "%", "!"].includes(operator)) return 4;
  //Precedence of ₓ₁₀ or - is 4
  else if (["₊"].includes(operator)) return 100;
  // ₊ is used to concatenate (expr)j without losing precedence
  else if (["ₓ"].includes(operator)) return 101;
  // ₊ is used to concatenate (expr)j without losing precedence
  else if (["↑"].includes(operator)) return 102;
  // ↑ is used to concatenate (expr)∠ without losing precedence
  else return 0;
}

// Takes an infix expression and expresses it in postfix, an array can actually functiona as a stack for the postfix data
function generatePostfix(expression) {
  var stack = [];
  var postfix = [];

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] instanceof complex) postfix.push(expression[i]);
    // Add to postfix when item is a number or "("
    else if (expression[i] == "(") stack.push(expression[i]);
    else if (expression[i] == ")") {
      // Store and pop until ( has found
      while (stack.length > 0 && utils.last(stack) != "(") {
        postfix.push(stack.pop());
      }
      stack.pop(); // Remove '(' from stack
    } else {
      if (getPrecedence(expression[i]) > getPrecedence(utils.last(stack)))
        stack.push(expression[i]);
      // Push if precedence is high
      else {
        // Store and pop until higher precedence is found
        while (
          stack.length > 0 &&
          getPrecedence(expression[i]) <= getPrecedence(utils.last(stack))
        ) {
          postfix.push(stack.pop());
        }
        stack.push(expression[i]);
      }
    }
  }

  // Store remaining data in stack
  while (stack.length > 0) {
    postfix.push(stack.pop());
  }

  return postfix;
}

export function doMath(inputs, prevAnswer, mode) {
  var expression = createExpression(inputs, prevAnswer, mode);
  var postfix = generatePostfix(expression);
  var answer = [];

  // Use a stack and postfix notation to simplify calculations, loop through postfix and pop each element
  // into answer stack until an operator is reached, when operator is reached do calculation with last
  // 2 elements of answer and push back into answer
  for (let i = 0; i < postfix.length; i++) {
    var element = postfix[i];

    // Single input operands
    if (["%","!"].includes(element)) {
      var a = answer.pop();

      if (element == "%") a.div(new complex({ re: 100, im: 0 }));
      else if (element == "!") a.fact();

      // Push computed value back into answer
      answer.push(a);
    } else if (operands.includes(element)) {
      var b = answer.pop();
      var a = answer.pop();

      if (element == "×" || element == "ₓ") a.mult(b);
      else if (element == "÷") a.div(b);
      else if (element == "+" || element == "₊") a.add(b);
      else if (element == "−") a.sub(b);
      else if (element == "^" || element == "↑") a.exp(b);
      else if (element == "ₓ₁₀") 
        a.mult(new complex({ re: Math.pow(10, b.val.re), im: 0 }));

      // Push computed value back into answer
      answer.push(a);
      // if(element == ("-")) {
      //   b.mult(new complex({"re": -1, "im": 0}));
      //   answer.push(b);
      // }
    } else if (functions.includes(element)) {
      // Compute generic functions
      var a = answer.pop();

      a.func(element);
      answer.push(a);
    } else if (specialFunctions.includes(element) ||
                (typeof element === "string" && element.includes("log")) ||
                (typeof element === "string" && element.includes("√"))) {
      // Compute special functions
      var a = answer.pop();

      a.specialFunc(element);
      answer.push(a);
    } else answer.push(element);
  }

  // var a = new complex({"re": 1,"im": 2});
  // var b = new complex({"re": 3,"im": 4});
  // a.div(b);
  // alert(a.re);
  // alert(a.im);
  // Conversion step
  answer[0].convert(mode.outputMode);

  return answer[0];
}

export default doMath;
