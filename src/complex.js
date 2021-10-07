import * as mathjs from 'mathjs'

export default class complex
{
  constructor(opts) {
    if (opts instanceof complex) {
      this.val = opts.val.clone();
      this.form = opts.form;
    } else if (opts["re"]) {
      this.val = mathjs.complex(opts["re"],opts["im"]);
      this.form = "cart";
    } else if(opts["str"]) {
      var str = opts["str"].toString();
      // Check if +/-j even exists in the value
      if(str.includes("j")) {
        var idx = str.indexOf("j");
        str =  str.substr(0, idx) + "i" + str.substr(idx+1);;
      }
      
      this.val = mathjs.complex(str);
    }
  }

  add(num: complex) {
    this.val = mathjs.add(this.val,num.val);
  }

  sub(num: complex) {
    this.val = mathjs.subtract(this.val,num.val);
  }

  mult(num: complex) {
    this.val = mathjs.multiply(this.val,num.val);
  }

  div(num: complex) {
    this.val = mathjs.divide(this.val,num.val);
  }

  exp(num: complex) {
    this.val = mathjs.pow(this.val,num.val);
  }

  conj() {return new complex({"re": this.val.re, "im": -1 * this.val.im});}

  convert(form) {
    if(form == this.form) return; // No need to do conversion
  }

  toOutput() {
    var output = [];

    output.push(this.val.re);
    if(this.val.im > 0) output.push(...["+j", this.val.im]);
    else if(this.val.im < 0) output.push(...["-j", this.val.im*-1]);

    return output;
  }
}