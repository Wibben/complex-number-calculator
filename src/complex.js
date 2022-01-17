import * as mathjs from "mathjs";
import { convertRadians, convertToRadians } from "./utils";

export default class complex {
  constructor(opts) {
    this.angleMode = (opts["angleMode"]) ? opts["angleMode"] : "deg";

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
        this.val = mathjs.complex({
          phi: (str.substr(idx + 2) == "") ? "1":str.substr(idx + 2), // Always entered as radians
          r: (idx==0) ? "1":str.substr(0, idx),
        });
        this.form = "exp";
      } else if (str.includes("j")) {
        // Cartesian
        var idx = str.indexOf("j");
        if(str=="j") { // Only j
          this.val = mathjs.complex({
            re: 0,
            im: 1,
          });
        } else if(idx==0) { // jY
          this.val = mathjs.complex({
            re: 0,
            im: parseFloat(str.substr(idx + 1)),
          });
        } else if(str.substr(idx+1)=="") { // Xj
          this.val = mathjs.complex({
            re: 0,
            im: parseFloat(str.substr(0, idx)),
          });
        } else { // XjY
          this.val = mathjs.complex({
            re: str.substr(0, idx),
            im: parseFloat(str.substr(idx + 1)),
          });
        }
        this.form = "cart";
      } else if (str.includes("∠")) {
        // Polar
        var idx = str.indexOf("∠");
        var angle = (str.substr(idx+1)=="") ? "":convertToRadians(str.substr(idx + 1), this.angleMode);
        this.val = mathjs.complex({
          phi: angle,
          r: (idx==0) ? 1:Number(str.substr(0, idx)),
        });
        this.form = "polar";
      } else {
        // Scalar
        this.val = mathjs.complex(str);
        this.form = "cart";
      }
    }
  }

  add(num) {
    this.val = mathjs.add(this.val, num.val);
  }

  sub(num) {
    this.val = mathjs.subtract(this.val, num.val);
  }

  mult(num) {
    this.val = mathjs.multiply(this.val, num.val);
  }

  div(num) {
    this.val = mathjs.divide(this.val, num.val);
  }

  exp(num) {
    this.val = mathjs.pow(this.val, num.val);
  }

  fact() {
    // The factorial function relies on the gamma function
    // where n! = gamma(n+1), this is because the factorial function
    // only takes in integers as an input as opposed to the gamma fn
    this.add(new complex({ re: 1, im: 0 }));
    // The gamma function may return a pure int if it's a real integer, need to case back to complex
    this.val = mathjs.complex(mathjs.gamma(this.val)); 
  }

  conj() {
    return new complex({ re: this.val.re, im: -1 * this.val.im })
      .convert(this.form)
      .convertAngle(this.angleMode);
  }

  trig(fn) {
    switch (fn) {
      case "sin":
        this.val = mathjs.sin(mathjs.unit(this.val, this.angleMode));
        break;
      case "cos":
        this.val = mathjs.cos(mathjs.unit(this.val, this.angleMode));
        break;
      case "tan":
        this.val = mathjs.tan(mathjs.unit(this.val, this.angleMode));
        break;
      case "asin":
        this.val = convertRadians(mathjs.asin(this.val), this.angleMode);
        break;
      case "acos":
        this.val = convertRadians(mathjs.acos(this.val), this.angleMode);
        break;
      case "atan":
        this.val = convertRadians(mathjs.atan(this.val), this.angleMode);
        break;
      case "sinh":
        this.val = mathjs.sinh(mathjs.unit(this.val, this.angleMode));
        break;
      case "cosh":
        this.val = mathjs.cosh(mathjs.unit(this.val, this.angleMode));
        break;
      case "tanh":
        this.val = mathjs.tanh(mathjs.unit(this.val, this.angleMode));
        break;
      case "asinh":
        this.val = convertRadians(mathjs.asinh(this.val), this.angleMode);
        break;
      case "acosh":
        this.val = convertRadians(mathjs.acosh(this.val), this.angleMode);
        break;
      case "atanh":
        this.val = convertRadians(mathjs.atanh(this.val), this.angleMode);
        break;
      default:
        break;
    }
  }

  log(fn) {
    switch(fn) {
      case "log":
        this.val = mathjs.log10(this.val);
        break;
      case "ln":
        this.val = mathjs.log(this.val, Math.E);
        break;
      default:
        // log of base n
        var base = Number(fn.replace("log", ""));
        if (base) {
          this.val = mathjs.log(this.val, base);
        }
        break;
    }
  }

  convert(form) {
    // "default" is for keeping the form the same as initial input
    if (form != "default") this.form = form;
  }

  convertAngle(angleMode) {
    this.angleMode = angleMode;
  }

  toOutput() {
    var output, args;

    if (this.form == "cart") {
      args = this.val.toVector();
      var re = mathjs.round(args[0], 2);
      var im = mathjs.round(args[1], 2);
      if(im==0) output = [re];
      else if(re==0) output = ["j", im];
      else output = [re, "j", im];
    } else if (this.form == "polar") {
      args = this.val.toPolar();
      var re = mathjs.round(args.r, 2);
      var phi = mathjs.round(convertRadians(args.phi, this.angleMode), 2);
      output = [re, "∠", phi];
    } else if (this.form == "exp") {
      args = this.val.toPolar();
      var re = mathjs.round(args.r, 2);
      var phi = mathjs.round(args.phi, 2); // Always radians
      if (phi == 0) output = [re];
      else output = [re, "eʲ", phi];
    }

    return output;
  }
}
