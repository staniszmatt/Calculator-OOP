class Demo{

  constructor(){
    this.cancellation = true;
    this.demoRunning = false; 
    //bindings
    this.startCalculations = this.startCalculations.bind(this);
    this.timeOutSetup = this.timeOutSetup.bind(this);
    this.additionDemo = this.additionDemo.bind(this);
    this.subtractionDemo = this.subtractionDemo.bind(this);
    this.multiplicationDemo = this.multiplicationDemo.bind(this);
    this.divisionDemo = this.divisionDemo.bind(this);
    this.successiveOperationDemo = this.successiveOperationDemo.bind(this);
    this.repeatOperationDemo = this.repeatOperationDemo.bind(this);
    this.rollOverOperationDemo = this.rollOverOperationDemo.bind(this);
    this.orderOfOperationsDemo = this.orderOfOperationsDemo.bind(this);
    this.partialOperandDemo = this.partialOperandDemo.bind(this);
    this.divideByZeroDemo = this.divideByZeroDemo.bind(this);
    this.cancelDemoButtonActivate = this.cancelDemoButtonActivate.bind(this);
    this.cancelDemo = this.cancelDemo.bind(this);
    this.cancelDemoCalculator = this.cancelDemoCalculator.bind(this);
  }
  
  startCalculations(){
    this.cancellation = false;
    this.demoRunning = true;
    this.cancelDemoButtonActivate();
    buttonPressedArray = [""];
    $("output.calc-display").text("0");
    clearingButtonActions("C");
    this.additionDemo();
  }

  timeOutSetup(elmCalcList, callbackFunction){
    let timer = 500;

    if (this.cancellation){
      return;
    }
    for(let elmIdIndex = 0; elmIdIndex < elmCalcList.length; elmIdIndex++) {
      if (this.cancellation){
        return;
      }
      setTimeout(() => {
        if (this.cancellation){
          return;
        }
        $(elmCalcList[elmIdIndex]).trigger("click");
      }, timer);
      timer += 500;
    }
    if (this.cancellation){
      return;
    } else {
      setTimeout(callbackFunction, timer);
    }
  }

  cancelDemoButtonActivate(){
    $("button.demo").toggle("display");
    $("button.side-display").toggle("display");
    $("button.cancel-demo").toggle("display");
  }

  cancelDemo(){
    event.stopPropagation();
    $("button.demo").toggle("display");
    $("button.side-display").toggle("display");
    $("button.cancel-demo").toggle("display");
    this.cancellation = true;
    this.demoRunning = false;
  }  

  cancelDemoCalculator(){
    if (this.demoRunning){
      this.cancelDemo();
    }
  }

  equationTitleDemoAppend(titleToAppend, equationToDisplay){
    const displayEquationHeader = $("<li>")
    .text(titleToAppend)
    .addClass("display-equations");
    const displayEquation = $("<li>")
    .text(equationToDisplay)
    .addClass("display-equations");
    $("#display-wrapper>ul").prepend("<br>");
    $("#display-wrapper>ul").prepend(displayEquation);
    $("#display-wrapper>ul").prepend(displayEquationHeader);
    $("#display-wrapper>ul").prepend("<br>");
  }

  additionDemo(){
    const elmCalcList = ["#1", "#plus", "#2", "#equal"];
    this.equationTitleDemoAppend('Addition:', "Equations: 1 + 2 = 3");
    if (this.cancellation){
      return;
    }
    this.timeOutSetup(elmCalcList, this.subtractionDemo);
  }

  subtractionDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#9", "#minus", "#2", "#equal"];
    this.equationTitleDemoAppend("Subtraction:", "Equation: 9 - 2 = 7");
    if (this.cancellation){
      return;
    }
    this.timeOutSetup(elmCalcList, this.multiplicationDemo);
  }

  multiplicationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#9", "#negative", "#times", "#9", "#equal"];
    this.equationTitleDemoAppend("Multiplication with negative number:", "Equation: -9 X 9 = -81");
    if (this.cancellation){
      return;
    }
    this.timeOutSetup(elmCalcList, this.divisionDemo);
  }

  divisionDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#divide", "#3", "#equal"];
    this.equationTitleDemoAppend("Division:", "Equation: 1 / 3 = 1.3333333333");
    this.timeOutSetup(elmCalcList, this.successiveOperationDemo);
  }

  successiveOperationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#point", "#5", "#plus", "#1", "#point", "#5", "#plus", "#3", "#equal"];
    this.equationTitleDemoAppend("Succesive Operation:", "Equations: 1.5 + 1.5 + 3 = 6");
    this.timeOutSetup(elmCalcList, this.repeatOperationDemo);
  }

  repeatOperationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#0", "#minus", "#1", "#equal", "#equal", "#equal", "#equal"];
    this.equationTitleDemoAppend("Repeated Operation:", "Equation: 10 - 1 = 9 = 8 = 7 = 6");
    this.timeOutSetup(elmCalcList, this.rollOverOperationDemo);
  }

  rollOverOperationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#plus", "#1", "#plus", "#equal", "#plus", "#equal",];
    this.equationTitleDemoAppend("Roll Over Operation:", "Equation: 1 + 1 += 4 += 8");
    this.timeOutSetup(elmCalcList, this.orderOfOperationsDemo);
  }

  orderOfOperationsDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#plus", "#3", "#divide", "#4", "#plus", "#1", "#0", "#times", "#2", "#equal"];
    this.equationTitleDemoAppend("Order Of Operations:", "Equation: 1 + 3 / 4 + 10 X 2 = 21.75");
    this.timeOutSetup(elmCalcList, this.partialOperandDemo);
  }

  partialOperandDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#3", "#times", "#equal"];
    this.equationTitleDemoAppend("Partial Operand:", "Equation: 3 *= 9");
    this.timeOutSetup(elmCalcList, this.divideByZeroDemo);
  }

  divideByZeroDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#3", "#divide", "#0", "#equal"];
    this.equationTitleDemoAppend("Dividing By Zero:", "Equation: 3 / 0 = ERROR");
    this.timeOutSetup(elmCalcList, this.cancelDemoButtonActivate);
    this.demoRunning = false;
  }
}