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
          phi: (str.substr(idx + 2) == "") ? 1:str.substr(idx + 2), // Always entered as radians
          r: (idx==0) ? 1:str.substr(0, idx),
        });
        this.form = "exp";
      } else if (str.includes("j")) {
        // Cartesian
        var idx = str.indexOf("j");
        this.val = mathjs.complex({
          re: (idx==0) ? 0:str.substr(0, idx),
          im: (str.substr(idx+1)=="") ? 1:parseFloat(str.substr(idx + 1)),
        });
        this.form = "cart";
      } else if (str.includes("∠")) {
        // Polar
        var idx = str.indexOf("∠");
        var angle = (str.substr(idx+1)=="") ? 0:convertToRadians(str.substr(idx + 1), this.angleMode);
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
      default:
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
      output = [mathjs.round(args[0], 2), "j", mathjs.round(args[1], 2)];
      // output = [args[0], "j", args[1]];
    } else if (this.form == "polar") {
      args = this.val.toPolar();
      var angle = convertRadians(args.phi, this.angleMode);
      output = [mathjs.round(args.r, 2), "∠", mathjs.round(angle, 2)];
      // output = [args.r, "∠", args.ph];
    } else if (this.form == "exp") {
      args = this.val.toPolar();
      output = [mathjs.round(args.r, 2), "eʲ", mathjs.round(args.phi, 2)]; // Always radians
      // output = [args.r, "∠", args.phi];
    }

    return output;
  }
}
