# complex-number-calculator

There are many calculator apps for mobile devices, but very few of them can do complex number calculations. Those that do are often in RPN style, which is not popular these days, and often have a very poor user interface. In this project, we want to write a mobile app for a calculator that can handle complex numbers in a natural way, as well as real numbers, with a large set of features for computation and functionality.

## Background

RPN style, or Reverse Polish Notation, is also known as postfix notation, is a mathematical notation where the operator follows the operands. However, we are more used to the infix notation, where the operator is in between the operand. For example, the infix expression `a + b` that we are used to would be written as `a b +` in RPN. This can make some sense for a complex number calculator as a complex number is inherently 2-dimensional in the form of `a + bj`, making it a possible source of confusion when performing calculations without brackets (e.g. `(1+2j)*(1-2j)` vs. `1 + 2j * 1 - 2j`).

RPN calculators are able to avoid this altogether as they usually operate in the following steps:

``` 
input 1 + 2j
Enter
input 1 - 2j
Enter
input *
Enter
```

In this way, RPN calculators are able to reduce confusion and make it easier to compute complex numbers. Of course, as we are more used to using infix notation in our math, this causes confusion anyways and can feel unwieldy. 

## Goal
Our goal, therefore, is to design a calculator (that is at least able to run on an iOS device) that can handle computing complex numbers using the infix notation - a more natural way for us. On top of this, in order for the scope of the project to fix the team, we will include additional features as well as focus on creating the best and most "natural" UX that we can.

-------------------------------------------------------

## Developer Guide

### Setup
Ensure you have Node 12 LTS installed (at https://nodejs.org/en/download/) so we can use `npm`, and install expo with `npm install -g expo-cli`

On your Android (https://play.google.com/store/apps/details?id=host.exp.exponent) or iOS device (https://itunes.com/apps/exponent), install the Expo Go app to be able to run the app on your device through LAN. Alternatively, you can install a iOS or Android emulator to run the app on the computer.

### Opening the App
To start the app, enter the project folder and run `expo start`, this will generate a QR code and perhaps open a browser tab for Metro Bundler and other developer tools. 

To run the app on mobile, you can:
- Scan the QR code with the Expo GO app on Android 
- Scan the QR code with the Camera app on iOS

To run the app in a browser or emulator, you can either use the GUI on the developer tools browser tab or use one of the Expo CLI's shortcuts in terminal:

| key | function |
| --- | -------- |
| `i` | Opens app in iOS imulator |
| `a` | Opens app in Android enumator or connected device |
| `w` | Opens app in web browser |

Hitting `Ctrl+C` in the terminal will exit the app.