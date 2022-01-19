import doMath from "./math";

describe("Calculator tests", () => {
  //Tests addition expressions
  describe("Addition", () => {
    test("Should be able to add two positive integers", () => {
      const result = doMath([1,"+",3], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(4);
    });
    test("Should be able to add a negative integer to a positive floating point number", () => {
      const result = doMath([-1,"+",1.000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0);
    });
    test("Should be able to add a floating point number to an integer", () => {
      const result = doMath([10,".",1,"+",2], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(12.1);
    });
    test("Should be able to add two floating point numbers", () => {
      const result = doMath([34,".",999,"+",1,".",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(35.999);
    });
    test("Should be able to add a negative integer and zero", () => {
      const result = doMath(["-",5,"+",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-5);
    });
    test("Should be able to add a zero to a positive integer", () => {
      const result = doMath([0,"+",5], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(5);
    });
    test("Should be able to add a negative integer with a positive integer", () => {
      const result = doMath(["-",5,"+",5], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0);
    });
    test("Should be able to add two large positive integers", () => {
      const result = doMath([300000000,"+",900000000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(1.2e+9);
    });
    test("Should be able to add a negative floating point to a positive integer", () => {
      const result = doMath(["-",1987,".",50,"+",1987], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-0.5);
    });
    test("Should be able to add a positive integer to the results of a previous operation", () => {
      const result = doMath([1500,"-",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","+",500], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(0);
    });
    test("Should be able to add a positive floating point number to the results of a previous operation", () => {
      const result = doMath([1500,"-",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","+",0.25], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-499.75);
    });
    test("Should be able to add a floating point number with many decimal places to a previous result", () => {
      const result = doMath([1500,"-",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","+",1,".",23456789], prev_answer, "")
      expect(answer["val"]["re"]).toBe(-498.76543211);
    });
    test("Should be able to add a positive floating point number to the results of a previous operation", () => {
      const result = doMath([1500,"-",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","+",123456789], prev_answer, "")
      expect(answer["val"]["re"]).toBe(123456289);
    });
  });
  //Tests subtraction expressions
  describe("Subtraction", () => {
    test("Should be able to subtract two positive integers", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-500);
    });
    test("Should be able to subtract zero from a negative integer", () => {
      const result = doMath(["-",3,"−",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-3);
    });
    test("Should be able to subtract zero from a positive integer", () => {
      const result = doMath([3,"−",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(3);
    });
    test("Should be able to subtract a floating point number from a negative integer", () => {
      const result = doMath(["-",1,"−",2,".",25], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-3.25);
    });
    test("Should be able to subtract a positive number from the results of a previous operation", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","-",500], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-1000);
    });
    test("Should be able to subtract an integer from a floating point number", () => {
      const result = doMath([9,".",35,"-",1], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(8.35);
    });
    test("Should be able to subtract a floating point number from an integer", () => {
      const result = doMath([9,"−",1.35], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(7.65);
    });
    test("Should be able to subtract two floating point numbers", () => {
      const result = doMath([0,".",29,"−",1,".",35], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-1.06);
    });
    test("Should be able to subtract two max input floating point numbers", () => {
      const result = doMath([7,".",1234567,"−",2.2109876], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(4.9124691);
    });
    test("An addition of a negative floating point addend, to an integer addend should be treated as a subtraction of a positive integer subtrahend", () => {
      const result = doMath([1000,"+","-",10.99], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(989.01);
    });
    test("An addition of a negative floating point addend should be treated as a subtraction of a positive floating point subtrahend", () => {
      const result = doMath(["-",1,".",0,"+","-",989,".",99], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-990.99);
    });
    test("An addition of a negative integer addend should be treated as a subtraction of a poisitive integer subtrahend", () => {
      const result = doMath([50,"+","-",60], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-10);
    });
    test("An addition of a negative integer addend to another negative integer addend should be treated as a subtraction of a poisitive integer subtrahend", () => {
      const result = doMath(["-",5,"+","-",20], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-25);
    });
    test("Should be able to subtract a floating point number from the result of a previous operation", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","-",33,".",12], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-533.12);
    });
    test("Should be able to subtract an integer from a negative floating point number", () => {
      const result = doMath(["-",1,".",33,"−",2], null, "defaul")
      const answer = result["val"]["re"]
      expect(answer).toBe(-3.33);
    });
    test("Should be able to subtract two large integers", () => {
      const result = doMath([123456789,"−",210987654], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-87530865);
    });
    test("Should be able to subtract two floating point numbers with many digits", () => {
      const result = doMath([7,".",12345678,"-",2,".",21098765], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(4.91246913);
    });
    test("Should be able to subtract a large decimal number from the results of a previous result", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","-",12,".",3456789], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-512.3456789);
    });
    test("Should be able to subtract a large integer from the results of a previous result", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","-",123456789], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-123457289);
    });
  });
  //Tests multiplication expressions
  describe("Multiplication", () =>{
    test("Should be able to multiply two positive integers", () => {
      const result = doMath([1500,"×",2000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(3000000);
    });
    test("Should be able to multiply a floating point multiplicand with an integer multipliplier", () => {
      const result = doMath([1,".",212,"×",8], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(9.696);
    });
    test("Should be able to multiply an integer multiplicand with a floating point multiplier", () => {
      const result = doMath([3,"×",1,".",212], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(3.636);
    });
    test("Should be able to multiply two floating point numbers", () => {
      const result = doMath([0,".",133,"×",1,".",212], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0.161196);
    });
    test("Should be able to multiply a integer multiplicand with zero", () => {
      const result = doMath([1500,"×",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0);
    });
    test("Should be able to multiply a negative integer multiplicand with a positive intger multiplier", () => {
      const result = doMath(["-",1500,"×",2000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-3000000);
    });
    test("Should be able to multiply a negative floating point multiplicand with a positive integer multiplier", () => {
      const result = doMath(["-",1,".",212,"×",8], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-9.696);
    });
    test("Should be able to multiply a negative integer multiplicand with a positive floating point multiplier", () => {
      const result = doMath(["-",8,"×",1,".",212], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-9.696);
    });
    test("Should be able to multiply the result of a previous operation by a positive floating point number", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","×",1,".",23], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-615);
    });
    test("Should be able to multiply the result of a previous operation by a positive integer", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","×",123], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-61500);
    });
    test("Should be able to multiply two many digit floating point numbers", () => {
      const result = doMath([1,".",23456789,"×",2,".",10987654], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(2.6047858281483007);
    });
    test("Should be able to multiply two large integers", () => {
      const result = doMath([123456789,"×",210987654], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(26047858281483010);
    });
    test("Should be able to multiply the result of a previous operation by large integer", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","×",123456789], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-6.17283945e+10);
    });
    test("Should be able to multiply the result of a previous operation by a many digit floating point number", () => {
      const result = doMath([1500,"-",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","×",123,".",456789], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-61728.3945);
    });
    test("SShould be able to result of a previous operation when the previous result is zero", () => {
      const result = doMath([0,"×",6,"×",6], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0);
    });
  });
  // Tests division expressions
  describe("Division",() =>{
    test("Should be able to divide two positive integers", () => {
      const result = doMath([1500,"÷",2000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0.75);
    });
    test("Should be able to divide 0 by a integer divisor", () => {
      const result = doMath([0,"÷",2000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0);
    });
    test("Should be able to divide a negative dividend by a positive divisor", () => {
      const result = doMath([-1500,"÷",2000], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-0.75);
    });
    test("Should be able to divide a negative floating point dividend by a positive divisor", () => {
      const result = doMath(["-",3,".",123,"÷",5], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(-0.6246);
    });
    test("Should be able to divide an floating point dividend by an integer divisor", () => {
      const result = doMath([4,".",21,"÷",3], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(1.4033333333333333);
    });
    test("Should be able to divide an integer dividend by a floating point divisor", () => {
      const result = doMath([10,"÷",3,".",123], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(3.202049311559398);
    });
    test("Should be able to divide two floating point numbers", () => {
      const result = doMath([0,".",234,"÷",3,".",123], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0.07492795389048991);
    });
    test("Should be able to divide the result of a previous operation by a positive floating point number", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","÷",3,".",12], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-160.25641025641025);
    });
    test("Should be able to divide the result of a previous operation by a positive integer", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","÷",312], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-1.6025641025641026);
    });
    test("Should report error for division by 0", () => {
      const result = doMath([234,"÷",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(Infinity);
    });
    test("Should be able to divide two many digit floating point numbers", () => {
      const result = doMath([1,".",23456789,"÷",2,".",10987654], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0.5851375028796708);
    });
    test("Should be able to divide the result of a previous operation by a many digit floating point number", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","÷",1234,".",56789], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-0.40500000368550004);
    });
    test("Should be able to divide the result of a previous operation by a large integer", () => {
      const result = doMath([1500,"−",2000], null, "default")
      const prev_answer = result["val"]["re"]
      const answer = doMath(["ANS","÷",123456789], prev_answer, "default")
      expect(answer["val"]["re"]).toBe(-0.0000040500000368550004);
    });
  });
  //Tests for bad inputs
  describe("Bad Inputs", () => {
    test('Should treat an initial press of the decimal mark as "0."', () => {
      const result = doMath([".",11111,"+",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0.11111);
    });
    test('Should allow floating point input with multiple digits before and after the decimal mark', () => {
      const result = doMath([1111,".",1111,"+",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(1111.1111);
    });
    test('Should treat an initial press of the decimal mark as "0." on the second operand', () => {
      const result = doMath([0,"+",".",11111], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(0.11111);
    });
    test('Should allow floating point input with multiple digits before and after the decimal mark', () => {
      const result = doMath([1,".",1,"+",0], null, "default")
      const answer = result["val"]["re"]
      expect(answer).toBe(1.1);
    });
  });
  //Tests complex numbers
  describe("Complex Numbers", () => {
    test("Should be able to add two complex numbers using the form xjy", () => {
      const result = doMath([4,"j",3,"+",5,"−","j",4], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const real_part = result["val"]["re"]
      const imag_part = result["val"]["im"]
      const form = result["form"]
      expect(real_part).toBe(9)
      expect(imag_part).toBe(-1)
      expect(form).toBe("cart")
    });
    test("Should be able to add two complex numbers using the form (x+jy)", () => {
      const result = doMath(["(",4,"+","j",3,")","+","(",5,"−","j",4,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const real_part = result["val"]["re"]
      const imag_part = result["val"]["im"]
      const form = result["form"]
      expect(real_part).toBe(9)
      expect(imag_part).toBe(-1)
      expect(form).toBe("cart")
    });
    test("Should be able to add the result of a previous operation by a another complex number", () => {
      const result = doMath(["(",4,"+","j",3,")","+","(",5,"−","j",4,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const prev_answer = result["val"]
      const answer = doMath(["ANS","+","(",3,"+","j",")"], prev_answer, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      expect(answer["val"]["re"]).toBe(12);
    });
    test("Should be able to subtract two complex numbers", () => {
      const result = doMath(["(",6,"+","j",4,")","−","(",-7,"+","j",5,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const real_part = result["val"]["re"]
      const imag_part = result["val"]["im"]
      const form = result["form"]
      expect(real_part).toBe(13)
      expect(imag_part).toBe(-1)
      expect(form).toBe("cart")
    });
    test("Should be able to subtract the result of a previous operation by a another complex number", () => {
      const result = doMath(["(",6,"+","j",4,")","−","(",-7,"+","j",5,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const answer = doMath(["ANS","−","(",3,"+","j",")"], result, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      expect(answer['val']['re']).toBe(10);
      expect(answer['val']['im']).toBe(-2);
    });
    test("Should be able to multiply two complex numbers", () => {
      const result = doMath(["(",3,"+","j",2,")","×","(",1,"+","j",4,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const real_part = result["val"]["re"]
      const imag_part = result["val"]["im"]
      const form = result["form"]
      expect(real_part).toBe(-5)
      expect(imag_part).toBe(14)
      expect(form).toBe("cart")
    });
    test("Should be able to multiply the result of a previous operation by a another complex number", () => {
      const result = doMath(["(",6,"+","j",4,")","×","(",-7,"+","j",5,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const answer = doMath(["ANS","×","(",3,"+","j",")"], result, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      expect(answer['val']['re']).toBe(-188);
      expect(answer['val']['im']).toBe(-56);
    });
    test("Should be able to divide two complex numbers", () => {
      const result = doMath(["(",4,"+","j",3,")","÷","(",5,"−","j",4,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const real_part = result["val"]["re"]
      const imag_part = result["val"]["im"]
      const form = result["form"]
      expect(real_part).toBe(0.19512195121951217);
      expect(imag_part).toBe(0.7560975609756099)
      expect(form).toBe("cart")
    });
    test("Should be able to divide the result of a previous operation by a another complex number", () => {
      const result = doMath(["(",6,"+","j",4,")","÷","(",-7,"+","j",5,")"], null, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      const answer = doMath(["ANS","÷","(",3,"+","j",")"], result, {"angleMode":'deg', "inputMode":'cart', "outputMode": 'cart'})
      expect(answer['val']['re']).toBe(-0.16756756756756755);
      expect(answer['val']['im']).toBe(-0.20540540540540536);
    });
  });
});
//(4+j3)+(5-j3)
//ANS + (3+j)
//(6 + 4i) - (-7 + 5i)
//(3 + 2i)(1 + 4i)