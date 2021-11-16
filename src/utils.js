import {op,fn,sp} from "./operation";
import * as mathjs from 'mathjs';

export function removeLastItem(array) {return array.slice(0,-1);}

export function last(array) {return array[array.length-1];}

export var webInputs = [
  [new sp("7",7), new sp("8",8),  new sp("9",9), new fn("DEL"),     new fn("AC")],
  [new sp("4",4), new sp("5",5),  new sp("6",6), new op("×","×",2), new op("÷","÷",2)],
  [new sp("1",1), new sp("2",2),  new sp("3",3), new op("+","+",2), new op("−","−",2)],
  [new sp("0",0), new sp(".","."), new op("+j","+j",2),  new op("-j","-j",2), new fn("=")],
];

export var mobileInputs = [
  [new op("^","^",2), new sp("(",")") , new sp(")",")"), new sp("π",mathjs.pi),    new sp("e",mathjs.e) ],
  [new sp("7",7), new sp("8",8),  new sp("9",9), new fn("DEL"),     new fn("AC")],
  [new sp("4",4), new sp("5",5),  new sp("6",6), new op("×","×",2), new op("÷","÷",2)],
  [new sp("1",1), new sp("2",2),  new sp("3",3), new op("+","+",2), new op("−","−",2)],
  [new sp("0",0), new sp(".","."), new op("ₓ₁₀","ₓ₁₀",2),  new sp("-","-"), new fn("=")],
];

export var tabInputs = {
  "STD": [
    [new fn("polar"), new fn("exp"),  new fn("cart")],
    [new op("∠","∠",2), new op("eʲ",2), new op("j","j",2)],
    [new fn(""),new fn(""),new fn("")],
    [new fn(""),new fn(""),new fn("")],
  ], 
  "TRIG": [
    [new op("sin","sin(",1),new op("cos","cos(",1),new op("tan","tan(",1)],
    [new op("asin","asin(",1),new op("acos","acos(",1),new op("atan","atan(",1)],
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