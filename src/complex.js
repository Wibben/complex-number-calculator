import * as mathjs from "mathjs";

export default class complex {
  constructor(opts) {
    if (opts instanceof complex) {
      this.val = opts.val.clone();
      this.form = opts.form;
    } else if (opts["re"]) {
      this.val = mathjs.complex(opts["re"], opts["im"]);
      this.form = "cart";
    } else if (opts["str"]) {
      var str = opts["str"].toString();
      // Check if j or ∠ even exists in the value
      if (str.includes("eʲ")) {
        // Exponential
        var idx = str.indexOf("eʲ");
        if (str.substr(idx + 2) == "")
          this.val = mathjs.complex({ phi: 1, r: str.substr(0, idx) });
        else
          this.val = mathjs.complex({
            phi: str.substr(idx + 2),
            r: str.substr(0, idx),
          });
        this.form = "exp";
      } else if (str.includes("j")) {
        // Cartesian
        var idx = str.indexOf("j");
        if (str.substr(idx + 1) == "")
          this.val = mathjs.complex({ re: str.substr(0, idx), im: 1 });
        else
          this.val = mathjs.complex({
            re: str.substr(0, idx),
            im: str.substr(idx + 1),
          });
        this.form = "cart";
      } else if (str.includes("∠")) {
        // Polar
        var idx = str.indexOf("∠");
        this.val = mathjs.complex({
          phi: str.substr(idx + 1),
          r: str.substr(0, idx),
        });
        this.form = "polar";
      } else {
        // Scalar
        this.val = mathjs.complex(str);
        this.form = "cart";
      }
    }
  }

  add(num: complex) {
    this.val = mathjs.add(this.val, num.val);
  }

  sub(num: complex) {
    this.val = mathjs.subtract(this.val, num.val);
  }

  mult(num: complex) {
    this.val = mathjs.multiply(this.val, num.val);
  }

  div(num: complex) {
    this.val = mathjs.divide(this.val, num.val);
  }

  exp(num: complex) {
    this.val = mathjs.pow(this.val, num.val);
  }

  conj() {
    return new complex({ re: this.val.re, im: -1 * this.val.im }).convert(
      this.form
    );
  }

  trig(fn) {
    switch (fn) {
      case "sin":
        this.val = mathjs.sin(this.val);
        break;
      case "cos":
        this.val = mathjs.cos(this.val);
        break;
      case "tan":
        this.val = mathjs.tan(this.val);
        break;
      case "asin":
        this.val = mathjs.asin(this.val);
        break;
      case "acos":
        this.val = mathjs.acos(this.val);
        break;
      case "atan":
        this.val = mathjs.atan(this.val);
        break;
      default:
        break;
    }
  }

  convert(form) {
    // "default" is for keeping the form the same as initial input
    if (form != "default") this.form = form;
  }

  toOutput() {
    var output, args;

    if (this.form == "cart") {
      args = this.val.toVector();
      output = [mathjs.round(args[0], 2), "j", mathjs.round(args[1], 2)];
    } else if (this.form == "polar") {
      args = this.val.toPolar();
      output = [mathjs.round(args.r, 2), "∠", mathjs.round(args.phi, 2)];
    } else if (this.form == "exp") {
      args = this.val.toPolar();
      output = [mathjs.round(args.r, 2), "eʲ", mathjs.round(args.phi, 2)];
    }

    return output;
  }
}
