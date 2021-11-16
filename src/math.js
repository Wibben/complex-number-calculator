import complex from './complex'
import * as utils from './utils'
import {op,fn, cst} from './operation'

// Handles all the math...
export const operands = ["+","−","×","÷","(",")","ₓ₁₀","^"];
export const specialOps = ["(",")","-"];
export const conversion = ["polar","exp","cart"];
export const trig = ["sin","cos","tan","asin","acos","atan"];
export const constants = ["π","e"];

// Piece together an expression from an array of just singular variables
function createExpression(inputs)
{
  var expression = [];

  // Piece together expression, separating operands from operators
  expression.push(inputs[0].val);

  for(let i=1; i<inputs.length; i++) {
    var lastElement = utils.last(expression);

    // Parsing for exponential form
    if(i+2<inputs.length && inputs[i].button == "e" && inputs[i+1].button == "^" && inputs[i+2].button == "j") {
      expression.push(new op("eʲ",2));
      i = i+2;
    } else if(operands.includes(lastElement) || operands.includes(inputs[i].button)) expression.push(inputs[i]); // Parsing for operands
    else if(inputs[i] instanceof cst) { // Parsing for real special characters, treat as if a bunch of multiplication is applied
      if(constants.includes(inputs[i].button)) expression.push(inputs[i]);
      else expression[expression.length-1] = `${lastElement}${inputs[i].val}`; // Parsing for values
    } 
  }

  // From the expression, generate the base complex numbers
  for(let i=0; i<expression.length; i++) {
    if(!operands.includes(expression[i])) expression[i] = new complex({"str": expression[i]});
  }

  return expression;
}

function getPrecedence(operator) {
  if(["+","−"].includes(operator)) return 1;            //Precedence of + or - is 1
  else if(["×","÷"].includes(operator)) return 2;       //Precedence of * or / is 2
  else if(["^"].includes(operator)) return 3;         //Precedence of ^ is 3
  else if(["ₓ₁₀","-"].includes(operator)) return 4;         //Precedence of ₓ₁₀ or - is 3
  else return 0;
}

// Takes an infix expression and expresses it in postfix, an array can actually functiona as a stack for the postfix data
function generatePostfix(expression) 
{
  var stack = [];
  var postfix = [];

  for(let i=0; i<expression.length; i++) {
    if(expression[i] instanceof complex) 
      postfix.push(expression[i]); // Add to postfix when item is a number or "("
    else if(expression[i] == "(") 
      stack.push(expression[i]);
    else if(expression[i] == ")") {
      // Store and pop until ( has found
      while(stack.length>0 && utils.last(stack) != '(') {
        postfix.push(stack.pop()); 
      }
      stack.pop(); // Remove '(' from stack
    } else {
      if(getPrecedence(expression[i]) > getPrecedence(utils.last(stack))) stack.push(expression[i]); // Push if precedence is high
      else {
        // Store and pop until higher precedence is found
        while(stack.length>0 && getPrecedence(expression[i]) <= getPrecedence(utils.last(stack))) {
          postfix.push(stack.pop());        
        }
        stack.push(expression[i]);
      }
    }
  }

  // Store remaining data in stack
  while(stack.length>0) {
    postfix.push(stack.pop());
  }

  return postfix;
}

export function doMath(inputs, form)
{
  var expression = createExpression(inputs);
  console.log(expression);
  return;
  var postfix = generatePostfix(expression);
  var answer = [];

  // Use a stack and postfix notation to simplify calculations, loop through postfix and pop each element
  // into answer stack until an operator is reached, when operator is reached do calculation with last 
  // 2 elements of answer and push back into answer
  for(let i=0; i<postfix.length; i++) {
    var element = postfix[i];

    if(operands.includes(element)) {
      var b = answer.pop();
      var a = answer.pop();

      if(element == "×") a.mult(b);
      else if(element == ("÷")) a.div(b);
      else if(element == ("+")) a.add(b);
      else if(element == ("−")) a.sub(b);
      else if(element == ("^")) a.exp(b);
      else if(element == ("ₓ₁₀")) a.mult(new complex({"re": Math.pow(10,b.re), "im": 0}));

      // Push computed value back into answer
      answer.push(a);
      if(element == ("-")) {
        b.mult(new complex({"re": -1, "im": 0}));
        answer.push(b);
      }
    } else answer.push(element);
  }

  // var a = new complex({"re": 1,"im": 2});
  // var b = new complex({"re": 3,"im": 4});
  // a.div(b);
  // alert(a.re);
  // alert(a.im);
  // Conversion step
  answer[0].convert(form);

  return answer[0].toOutput();
}

export default doMath;