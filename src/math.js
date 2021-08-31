import complex from './complex'

// Handles all the math...
export const operands = ["+","-","x","÷"];

// Piece together an expression from an array of just singular variables
function createExpression(inputs)
{
  var expression = [];

  // Piece together expression, separating operands from operators
  expression.push(inputs[0]);

  for(let i=1; i<inputs.length; i++) {
    var lastElement = expression[expression.length-1];

    if(operands.includes(lastElement) || operands.includes(inputs[i])) expression.push(inputs[i]);
    else expression[expression.length-1] = `${lastElement}${inputs[i]}`
  }

  // From the expression, generate the complex numbers
  for(let i=0; i<expression.length; i++) {
    if(!operands.includes(expression[i])) expression[i] = new complex({"str": expression[i]});
  }

  return expression;
}

export function doMath(inputs)
{
  var expression = createExpression(inputs);
  var answer = [];

  // TODO: look into using mathjs instead
  
  // Current Method: evaluate * / first and then + - after, shortening the inputs one at a time
  for(let i=1; i<expression.length; i++) {
    if(expression[i] == "x") {
      expression[i-1].mult(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    } else if(expression[i] == "÷") {
      expression[i-1].div(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    }
  }

  for(let i=1; i<expression.length; i++) {
    if(expression[i] == "+") {
      expression[i-1].add(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    } else if(expression[i] == "-") {
      expression[i-1].sub(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    }
  }

  // var a = new complex({"re": 1,"im": 2});
  // var b = new complex({"re": 3,"im": 4});

  // a.div(b);
  // alert(a.re);
  // alert(a.im);

  return expression[0].toOutput();
}

export default doMath;