export default class complex
{
  constructor(opts) {
    if (opts["re"]) {
      this.re = opts["re"];
      this.im = opts["im"];
      this.form = "cart";
    } else if(opts["str"]) {
      var str = opts["str"].toString();
      // Check if +-j even exists in the value
      if(str.includes("+j")) {
        var idx = str.indexOf("+j");
        this.re = parseFloat(idx > 0 ? str.substring(0,idx):0);
        this.im = parseFloat(idx+2 < str.length ? str.substring(idx+2):1);
      } else if(str.includes("-j")) {
        var idx = str.indexOf("-j");
        this.re = parseFloat(idx > 0 ? str.substring(0,idx):0);
        this.im = -1 * parseFloat(idx+2 < str.length ? str.substring(idx+2):1);
      } else {
        this.re = parseFloat(opts["str"]);
        this.im = 0;
      }
    }
  }

  add(num: complex) {
    this.re += num.re;
    this.im += num.im;
  }

  sub(num: complex) {
    this.re -= num.re;
    this.im -= num.im;
  }

  mult(num: complex) {
    var re = this.re;
    var im = this.im;
    this.re = re * num.re - im * num.im;
    this.im = re * num.im + im * num.re;
  }

  div(num: complex) {
    var temp = num;
    this.mult(temp.conj());
    temp.mult(num.conj());

    this.re = this.re / temp.re;
    this.im = this.im / temp.re;
  }

  exp(num: complex) {
    var temp = new complex({"re": this.re, "im": this.im});;

    // Anything to the 0th power is 0
    this.re = 1;
    this.im = 0;

    for(let i=0; i<num.re; i++) {
      this.mult(temp);
    }
  }

  conj() {return new complex({"re": this.re, "im": -1 * this.im});}

  convert(form) {
    if(form == this.form) return; // No need to do conversion
  }

  toOutput() {
    var output = [];

    output.push(this.re);
    if(this.im > 0) output.push(...["+j", this.im]);
    else if(this.im < 0) output.push(...["-j", this.im]);

    return output;
  }
}