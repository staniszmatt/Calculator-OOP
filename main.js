$(document).ready(loadAfterInitialize);

var buttonPressedArray = [""];
var demoRunning = false;

function loadAfterInitialize() {
  var demo = new Demo();
  $("button").click(getButtonText);
  $("button.demo").click(demo.startCalculations);
  $("button.side-display").click(toggleSideDisplay);
  $("button.cancel-demo").click(demo.cancelDemo);
  $(".main-container").click(demo.cancelDemoCalculator);
}

function toggleSideDisplay(){
  $("output.equation-display").toggle("display");
  $("button.demo").toggle("display");
}

function getButtonText() {

  fadeDisplay();//Fades display each time a button is clicked
  var buttonValue = $(this).text();
  var currentNumberString = buttonPressedArray[buttonPressedArray.length - 1];
  if ($("output.calc-display").text() === "ERROR!" && buttonValue !== "C"){
    return; 
  }
  if (checkToReturnOperator(buttonValue)) {
    if (buttonPressedArray.length === 3 && buttonValue === "=" && buttonPressedArray[buttonPressedArray.length - 1] === "") {
      repeatMathOperationCheck(buttonValue);
    } else {
      repeatMathOperationCheck(buttonValue);
    }
  } else if (buttonValue === "CE" || buttonValue === "C") {
    clearingButtonActions(buttonValue);
  } else if (buttonValue === "+/-") {
    var tempNumber = buttonPressedArray.pop();
    tempNumber = Number(tempNumber) * -1;
    fixFloatNumbers(tempNumber);
  } else if (!isNaN(buttonValue) || buttonValue === ".") {
    if (buttonPressedArray[buttonPressedArray.length - 2] === "=") {
      buttonPressedArray.pop();
      restartCalcAfterEqualwithNum();
    } else if (currentNumberString.length > 13) {
      return;
    } else if (cancelingRepeatingDecimalCheck() && buttonValue === "." || cancelRepeatingZeros(buttonValue)) {
      return;
    }
    if (buttonPressedArray[buttonPressedArray.length-1] === "" && buttonValue === "."){
      buttonPressedArray[buttonPressedArray.length-1] = "0";
    }  else if (buttonPressedArray[buttonPressedArray.length-1] === "0" && buttonValue === "0"){
      return;
    } else if (buttonPressedArray[buttonPressedArray.length-1] === "0"){
      buttonPressedArray[buttonPressedArray.length-1] = "";
    }
    buttonPressedArray[buttonPressedArray.length - 1] += buttonValue;
    orderOfOperations(buttonValue);
    displayNumbers();
  }
  if (buttonPressedArray[buttonPressedArray.length-2] !== "="){
    sideDisplay();
  }
}

function clearingButtonActions(clearButtonOptionCEorC) {
  if (clearButtonOptionCEorC === "C") {
    buttonPressedArray = [""];
    $("output.calc-display").text("0");
    $("#display-wrapper ul").empty();
  } else {
    if (buttonPressedArray[buttonPressedArray.length - 2] === "=") {
      clearingButtonActions("C");
    } else {
      buttonPressedArray[buttonPressedArray.length - 1] = "";
      $("output.calc-display").text("0");
    }
  }
}

function checkToReturnOperator(operatorCheck) {
  switch (operatorCheck) {
    case "+":
    case "-":
    case "x":
    case "/":
    case "=":
      return true;
    default:
      return false;
  }
}

function cancelingRepeatOperatorsCheck(operator) {
  if (operator === buttonPressedArray[buttonPressedArray.length - 2] && buttonPressedArray[buttonPressedArray.length - 1] === "") {
    return true;
  } else if (buttonPressedArray[0] === "") {
    return true;
  }
  return false;
}

function cancelingRepeatingDecimalCheck() {
  var lastNumberDecimalCheck = buttonPressedArray[buttonPressedArray.length - 1];
  return lastNumberDecimalCheck.includes(".");
}

function restartCalcAfterEqualwithNum() {
  if (buttonPressedArray[buttonPressedArray.length - 1] === "=") {
    buttonPressedArray = [""];
    displayNumbers();
  }
}

function repeatMathOperationCheck(operator) {
  var newButtonPressedArray = [];
  if (buttonPressedArray[buttonPressedArray.length - 2] === "=") {
    if (operator !== "=" && buttonPressedArray.length === 5) {
      var tempArray = [];
      tempArray.push(buttonPressedArray[buttonPressedArray.length-1]);
      tempArray.push(operator);
      tempArray.push("");
      buttonPressedArray = tempArray;
    } else {
      newButtonPressedArray.push(buttonPressedArray[4]);
      newButtonPressedArray.push(buttonPressedArray[1]);
      newButtonPressedArray.push(buttonPressedArray[2]);
      var tempTotal = doMathFunction(newButtonPressedArray);
      newButtonPressedArray.push(buttonPressedArray[3]);
      newButtonPressedArray.push(tempTotal);
      buttonPressedArray = newButtonPressedArray;
    }
  } else if (buttonPressedArray[1] === "=") {
    buttonPressedArray.pop();
  } else if (buttonPressedArray.length === 1 && operator === "=") {
    return;
  } else if (operator === "=" && buttonPressedArray[2] === "") {
    buttonPressedArray[2] = buttonPressedArray[0];
    buttonPressedArray.push("=");
    doMathFunction(buttonPressedArray);
  } 
  else if (operator !== "=") { //setup order of operation
    if (buttonPressedArray.length > 2) {
      if (operator !== buttonPressedArray[1] && buttonPressedArray[2] === "") {
        buttonPressedArray[1] = operator;
      } else if (cancelingRepeatOperatorsCheck(operator)) {
        return;
      } else {
        orderOfOperations(operator);
      }
    } else {
      buttonPressedArray.push(operator, "");
    }
  } else {
    buttonPressedArray.push(operator);
    orderOfOperations(operator)
  }
  if (buttonPressedArray[buttonPressedArray.length-2] === "="){
    sideDisplay();
  }
}

function orderOfOperations(operator) {
  var lastOrderArray = ["+", "-"];
  var firstOrderArray = ["x", "/"];
  var preOperator = buttonPressedArray[buttonPressedArray.length - 2];
  var perEqlOp = buttonPressedArray[buttonPressedArray.length - 3]
  if (lastOrderArray.indexOf(operator) !== -1 && buttonPressedArray.length < 4 || operator === "=" && buttonPressedArray.length < 5) {
    orderOfOperationMath(operator, true);
  } else if (firstOrderArray.indexOf(operator) !== -1 && lastOrderArray.indexOf(preOperator) !== -1) {
    buttonPressedArray.push(operator, "");
  } else if (lastOrderArray.indexOf(operator) !== -1 && firstOrderArray.indexOf(preOperator) !== -1 || operator === "=" && (firstOrderArray.indexOf(perEqlOp) !== -1 || lastOrderArray.indexOf(perEqlOp) !== -1)) {
    orderOfOperationMath(operator, false);
  } else if (firstOrderArray.indexOf(operator) !== -1 && firstOrderArray.indexOf(preOperator) !== -1) {
    if (buttonPressedArray.length < 4) {
      sameOperationMath(operator);
    } else {
      orderOfOperationMath(operator, false, true);
    }
  }
}

function sameOperationMath(operator) {
  if (operator === "=") {
    doMathFunction(buttonPressedArray);
    displayNumbers();
  } else {
    var tempTotal = doMathFunction(buttonPressedArray);
    displayNumbers();
    var tempMathArray = [];
    tempMathArray.push(tempTotal);
    tempMathArray.push(operator);
    tempMathArray.push("");
    buttonPressedArray = tempMathArray;
  }
}

function orderOfOperationMath(operator, booleanForWhichOOO, operatorMatches) {
  var multDivArray = [];
  if (booleanForWhichOOO) {
    sameOperationMath(operator);
  } else if (operatorMatches && buttonPressedArray.length > 4) {
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 3]);
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 2]);
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 1]);
    var saveMultDivMath = doMathFunction(multDivArray);
    multDivArray = [];
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 6])
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 5])
    multDivArray.push(saveMultDivMath)
    multDivArray.push(operator, "")
    buttonPressedArray = multDivArray
  } else if (!booleanForWhichOOO && operator === "=") {
    var equalHolder = buttonPressedArray.pop();
    var lastOperator = buttonPressedArray[buttonPressedArray.length - 2];
    var lastNumberPressed = buttonPressedArray[buttonPressedArray.length - 1];
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 3]);
    multDivArray.push(lastOperator);
    multDivArray.push(lastNumberPressed);
    var firstNumMath = doMathFunction(multDivArray);
    multDivArray = [];
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 6]);
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 5]);
    multDivArray.push(firstNumMath);
    firstNumMath = doMathFunction(multDivArray);
    buttonPressedArray = [];
    buttonPressedArray.push(firstNumMath);
    if (operator === "=") {
      buttonPressedArray.push(lastOperator);
      buttonPressedArray.push(lastNumberPressed);
      buttonPressedArray.push(equalHolder);
      buttonPressedArray.push(firstNumMath);
    } else {
      buttonPressedArray.push(operator, "");
    }
  } else {
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 3]);
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 2]);
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 1]);
    var firstNumMath = doMathFunction(multDivArray);
    multDivArray = [];
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 6])
    multDivArray.push(buttonPressedArray[buttonPressedArray.length - 5])
    multDivArray.push(firstNumMath)
    firstNumMath = doMathFunction(multDivArray);
    buttonPressedArray = [];
    buttonPressedArray.push(firstNumMath);
    buttonPressedArray.push(operator, "");
  }
}

function doMathFunction(mathArray) {
  var finalNum = 0;
  var num1 = Number(mathArray[0]);
  var num2 = Number(mathArray[2]);
  var operator = mathArray[1];
  if (num2 === 0 && operator === "/" || isNaN(num1) || isNaN(num2) || num1===Infinity || num2===Infinity) {
    finalNum = "ERROR!";
    setToMathValue(finalNum);
  } else {
    switch (operator) {
      case "+":
        finalNum = (num1 + num2).toPrecision(10);
        finalNum = Number(finalNum);
        fixFloatNumbers(finalNum);
        return finalNum;
      case "-":
        finalNum = (num1 - num2).toPrecision(10);
        finalNum = Number(finalNum);
        fixFloatNumbers(finalNum);
        return finalNum;
      case "x":
        finalNum = (num1 * num2).toPrecision(10);
        finalNum = Number(finalNum);
        fixFloatNumbers(finalNum);
        return finalNum;
      case "/":
        finalNum = (num1 / num2).toPrecision(10);
        finalNum = Number(finalNum);
        fixFloatNumbers(finalNum);
        return finalNum;
      default:
        break;
    }
  }
}

function fixFloatNumbers(finalNumberToChange) {
  var checkIfExponent = finalNumberToChange.toString();
  if (checkIfExponent.includes("e")){
    setToMathValue(finalNumberToChange.toPrecision(6));
  } else if (finalNumberToChange.toString().length > 10) {
    setToMathValue(finalNumberToChange);
  } else {
    setToMathValue(finalNumberToChange);
  }
}

function setToMathValue(mathValue) {
  if (mathValue === "ERROR!") {
    buttonPressedArray = ["ERROR!"];
    displayNumbers();
  } else {
    mathValue = mathValue.toString();
    buttonPressedArray.push(mathValue);
    displayNumbers();
  }
}

function displayNumbers() {
  var displayVar = buttonPressedArray[buttonPressedArray.length - 1];

  if (displayVar.length > 14){
    var tempString = "";
    tempString = displayVar.substring(0, 14); //Limiting the number of characters on display
    if (tempString.endsWith(".")){
      tempString += displayVar.charAt(15); //Adding a character if the cut off ends with a decimal 
    }
    displayVar = tempString;
  }
  $("output.calc-display").text(displayVar);
}

function fadeDisplay(){
  $("output.calc-display").addClass("fade-in");
  setTimeout(
    () => {
      $("output.calc-display").removeClass("fade-in")
    }
    , 100);
}

function sideDisplay(){
  let equationString = '';
  
  for (let arrayIndex = 0; arrayIndex < buttonPressedArray.length; arrayIndex++){
    equationString += buttonPressedArray[arrayIndex] + " ";
  }
  const displayEquation = $("<li>")
    .text(equationString)
    .addClass("display-equations")
  $("#display-wrapper>ul").prepend(displayEquation);
}

function cancelRepeatingZeros(buttonPressed){
  if (buttonPressedArray[0] === "0" && buttonPressed === "0") return true; 
}