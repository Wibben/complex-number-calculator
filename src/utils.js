import {op,fn,sp,cst} from "./operation";
import * as mathjs from 'mathjs';

export function removeLastItem(array) {return array.slice(0,-1);}

export function last(array) {return array[array.length-1];}

export var webInputs = [
  [new cst("7",7), new cst("8",8),  new cst("9",9), new fn("DEL"),     new fn("AC")],
  [new cst("4",4), new cst("5",5),  new cst("6",6), new op("×",2), new op("÷",2)],
  [new cst("1",1), new cst("2",2),  new cst("3",3), new op("+",2), new op("−",2)],
  [new cst("0",0), new sp(".","."), new op("j",2),  new op("j",2), new fn("=")],
];

export var mobileInputs = [
  [new op("^",2), new sp("(") , new sp(")"), new cst("π",mathjs.pi),    new cst("e",mathjs.e) ],
  [new sp("7",7), new sp("8",8),  new sp("9",9), new fn("DEL"),     new fn("AC")],
  [new sp("4",4), new sp("5",5),  new sp("6",6), new op("×",2), new op("÷",2)],
  [new sp("1",1), new sp("2",2),  new sp("3",3), new op("+",2), new op("−",2)],
  [new sp("0",0), new sp("."), new op("ₓ₁₀",2),  new sp("-"), new fn("=")],
];

export var tabInputs = {
  "STD": [
    [new fn("polar"), new fn("exp"),  new fn("cart")],
    [new op("∠",2), new op("eʲ",2), new op("j",2)],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
  ], 
  "TRIG": [
    [new op("sin",1),new op("cos",1),new op("tan",1)],
    [new op("asin",1),new op("acos",1),new op("atan",1)],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),"test",new fn("")],
  ],
  "temp1": [
    [new fn(""),new fn(""),new fn("")],
    [new fn("temp1"),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
  ], 
  "temp2": [
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("temp2")],
    [new fn(""),new fn(""),new fn("")],
  ], 
  "temp3": [
    [new fn(""),new fn("temp3"),new fn("")],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
  ], 
}