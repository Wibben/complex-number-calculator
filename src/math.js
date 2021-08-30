import complex from './complex'

// Handles all the math...
const operands = ["+","-","x","÷"];

// Piece together an expression from an array of just singular variables
function createExpression(inputs)
{
  var expression = [];

  expression.push(inputs[0]);

  for(let i=1; i<inputs.length; i++) {
    var lastElement = expression[expression.length-1];

    if(operands.includes(lastElement) || operands.includes(inputs[i])) expression.push(inputs[i]);
    else expression[expression.length-1] = `${lastElement}${inputs[i]}`
  }
  return expression;
}

function doMath(inputs)
{
  var expression = createExpression(inputs);
  var answer = [];

  // TODO: look into using mathjs instead
  
  // Current Method: evaluate * / first and then + - after, shortening the inputs one at a time
  for(let i=1; i<expression.length; i++) {
    if(expression[i] == "x") {
      expression[i-1] = parseFloat(expression[i-1]) * parseFloat(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    } else if(expression[i] == "÷") {
      expression[i-1] = parseFloat(expression[i-1]) / parseFloat(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    }
  }

  for(let i=1; i<expression.length; i++) {
    if(expression[i] == "+") {
      expression[i-1] = parseFloat(expression[i-1]) + parseFloat(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    } else if(expression[i] == "-") {
      expression[i-1] = parseFloat(expression[i-1]) - parseFloat(expression[i+1]);
      expression.splice(i,2);
      i--; // to account for removed elements
    }
  }

  // var a = new complex(1,2);
  // var b = new complex(3,4);

  // a.div(b);
  // alert(a.re);
  // alert(a.im);

  return expression;
}

export default doMath;