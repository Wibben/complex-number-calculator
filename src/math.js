import complex from "./complex";
import * as utils from "./utils";
import * as mathjs from "mathjs";

// Handles all the math...
export const operands = ["+", "−", "×", "÷", "(", ")", "ₓ₁₀", "^", "₊"]; // ₊ is a "shadow" plus sign used to skirt around precedence issues
export const specialOps = ["(", ")", "-"];
export const conversion = ["polar", "exp", "cart"];
export const trigonometric = ["sin", "cos", "tan", "asin", "acos", "atan"];
export const complexOps = ["j", "∠", "eʲ"];
export const constants = ["π", "e"];
export const constantVals = [mathjs.pi, mathjs.e];

// Validate a mathematical expression by essentially simulating an answer
export function validateExpression(inputs) {
  var expression = createExpression(inputs, "2");
  var postfix = generatePostfix(expression);
  var answer = [];

  // Go through and pretend to compute the expression, if the answer array does not have enough
  // values for the operands, it is an invalid expression
  for (let i = 0; i < postfix.length; i++) {
    var element = postfix[i];

    if (operands.includes(element)) {
      // Normal operands pop 2 elements and push 1 element, so just pop 1 in sim
      if(answer.length<2) return false;
      answer.pop();
    } else if (trigonometric.includes(element)) {
      // Trig functions pop 1 elements and push 1 element, no change in sim
      if(answer.length<1) return false;
    } else answer.push(element);
  }

  // If there are multiple values left in answer, expression is invalid
  if(answer.length>1) return false;
  else return true;
}

// Piece together an expression from an array of just singular variables
function createExpression(inputs, prevAnswer) {
  var expression = [];

  // Piece together expression, separating operands from operators
  if (constants.includes(inputs[0]))
    expression.push(
      `${""}${constantVals[constants.findIndex((item) => item === inputs[0])]}`
    );
  else if(inputs[0] == "ANS") expression.push(prevAnswer);
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
        if(!operands.includes(lastElement)) expression.push("₊");

        if (inputs[i + 1] == "(")
          expression.push(`${inputs[i]}${"1"}`, "×", inputs[i]);
        else expression.push(inputs[i]);
        
      } else expression[expression.length - 1] = `${lastElement}${inputs[i]}`
    } else if(inputs[i] == "ANS") {
      // Performing substitution for the ANS operator
      expression.push(prevAnswer);
    } else if (operands.includes(lastElement) || operands.includes(inputs[i])) {
      // Parsing for operands
      if(inputs[i]=="(" && (![...operands,...trigonometric,...complexOps,...specialOps].includes(lastElement) || lastElement==")")) {
        expression.push("×",inputs[i]);
      } else if(lastElement==")" && ![...operands,...trigonometric,...complexOps,...specialOps].includes(inputs[i])) {
        expression.push("×",inputs[i]);
      } else expression.push(inputs[i]);
    } else if (constants.includes(inputs[i])) {
      // Parsing for constants
      // Parse constants as a multiplication if there were values before it
      var complexVal = `${""}${
        constantVals[constants.findIndex((item) => item === inputs[i])]
      }`;
      if (!operands.includes(lastElement)) {
        expression = utils.removeLastItem(expression);
        expression.push("(", lastElement, "×", complexVal, ")");
      } else expression.push(complexVal); // Convert constants into values
    } else expression[expression.length - 1] = `${lastElement}${inputs[i]}`; // Parsing for values
  }

  // From the expression, generate the complex numbers
  for (let i = 0; i < expression.length; i++) {
    if (![...operands, ...trigonometric].includes(expression[i]) && !(expression[i] instanceof complex))
      expression[i] = new complex({ str: `${""}${expression[i]}` });
  }

  return expression;
}

function getPrecedence(operator) {
  if (["+", "−"].includes(operator)) return 1;
  //Precedence of + or - is 1
  else if (["×", "÷"].includes(operator)) return 2;
  //Precedence of * or / is 2
  else if ([...trigonometric, "^"].includes(operator)) return 3;
  //Precedence of ^ is 3
  else if (["ₓ₁₀", "-"].includes(operator)) return 4;
  //Precedence of ₓ₁₀ or - is 3
  else if (["₊"].includes(operator)) return 100;
  // ₊ is used to concatenate (expr)j without losing precedence
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
  var expression = createExpression(inputs, prevAnswer);
  var postfix = generatePostfix(expression);
  var answer = [];

  // Use a stack and postfix notation to simplify calculations, loop through postfix and pop each element
  // into answer stack until an operator is reached, when operator is reached do calculation with last
  // 2 elements of answer and push back into answer
  for (let i = 0; i < postfix.length; i++) {
    var element = postfix[i];

    if (operands.includes(element)) {
      var b = answer.pop();
      var a = answer.pop();

      if (element == "×") a.mult(b);
      else if (element == "÷") a.div(b);
      else if (element == "+") a.add(b);
      else if (element == "₊") a.add(b);
      else if (element == "−") a.sub(b);
      else if (element == "^") a.exp(b);
      else if (element == "ₓ₁₀")
        a.mult(new complex({ re: Math.pow(10, b.val.re), im: 0 }));

      // Push computed value back into answer
      answer.push(a);
      // if(element == ("-")) {
      //   b.mult(new complex({"re": -1, "im": 0}));
      //   answer.push(b);
      // }
    } else if (trigonometric.includes(element)) {
      // Compute the trig functions
      var a = answer.pop();

      a.trig(element, mode.angleMode);
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
