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
        this.val = mathjs.complex({
          phi: (str.substr(idx + 2) == "") ? 1:str.substr(idx + 2),
          r: (idx==0) ? 1:str.substr(0, idx),
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
          console.log("HERE!");
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
        this.val = mathjs.complex({
          phi: (str.substr(idx+1)=="") ? 0:str.substr(idx + 1),
          r: (idx==0) ? 1:str.substr(0, idx),
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
      var re = mathjs.round(args[0], 2);
      var im = mathjs.round(args[1], 2);
      if(im==0) output = [re];
      else if(re==0) output = ["j", im];
      else output = [re, "j", im];
      // output = [args[0], "j", args[1]];
    } else if (this.form == "polar") {
      args = this.val.toPolar();
      output = [mathjs.round(args.r, 2), "∠", mathjs.round(args.phi, 2)];
      // output = [args.r, "∠", args.ph];
    } else if (this.form == "exp") {
      args = this.val.toPolar();
      output = [mathjs.round(args.r, 2), "eʲ", mathjs.round(args.phi, 2)];
      // output = [args.r, "∠", args.phi];
    }

    return output;
  }
}
