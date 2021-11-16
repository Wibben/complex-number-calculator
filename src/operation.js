// Operators
export class op
{
  constructor(button,display,numInputs) {
    this.button = button;
    this.numInputs = numInputs;
  }
}

// Functions (ones that do not take values as inputs)
export class fn
{
  constructor(button) {
    this.button = button;
  }
}

// Special characters...
export class sp
{
  constructor(button) {
    this.button = button;
  }
}

// Constants
export class cst 
{
  constructor(button,val) {
    this.button = button;
    this.val = val;
  }
}