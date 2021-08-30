import { TextComponent } from "react-native";

export default class complex
{ 
  constructor(re,im) {
    this.re = re;
    this.im = im;
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

  conj() {return new complex(this.re, -1 * this.im);}
}