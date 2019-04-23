class Demo{

  constructor(){
    this.cancellation = false;
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
  }
  
  startCalculations(){
    this.cancellation = false;
    this.cancelDemoButtonActivate();
    buttonPressedArray = [""];
    $("output.calc-display").text("0");
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
    $("button.demo").toggle("display");
    $("button.side-display").toggle("display");
    $("button.cancel-demo").toggle("display");
    this.cancellation = true;
  }  

  equationTitleDemoAppend(titleToAppend){
    const displayEquation = $("<li>")
    .text(titleToAppend)
    .addClass("display-equations")
    $("#display-wrapper>ul").prepend(displayEquation);
  }

  additionDemo(){
    const elmCalcList = ["#1", "#plus", "#2", "#equal"];
    this.equationTitleDemoAppend("Addition:");
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
    this.equationTitleDemoAppend("Subtraction:");
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
    this.equationTitleDemoAppend("Multiplication with negative number:");
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
    this.equationTitleDemoAppend("Division:");
    this.timeOutSetup(elmCalcList, this.successiveOperationDemo);
  }

  successiveOperationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#point", "#5", "#plus", "#1", "#point", "#5", "#plus", "#3", "#equal"];
    this.equationTitleDemoAppend("Succesive Operation:");
    this.timeOutSetup(elmCalcList, this.repeatOperationDemo);
  }

  repeatOperationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#0", "#minus", "#1", "#equal", "#equal", "#equal", "#equal"];
    this.equationTitleDemoAppend("Repeated Operation:");
    this.timeOutSetup(elmCalcList, this.rollOverOperationDemo);
  }

  rollOverOperationDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#plus", "#1", "#plus", "#equal", "#plus", "#equal",];
    this.equationTitleDemoAppend("Roll Over Operation:");
    this.timeOutSetup(elmCalcList, this.orderOfOperationsDemo);
  }

  orderOfOperationsDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#1", "#plus", "#3", "#divide", "#4", "#plus", "#1", "#0", "#times", "#2", "#equal"];
    this.equationTitleDemoAppend("Order Of Operations:");
    this.timeOutSetup(elmCalcList, this.partialOperandDemo);
  }

  partialOperandDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#3", "#times", "#equal"];
    this.equationTitleDemoAppend("Partial Operand:");
    this.timeOutSetup(elmCalcList, this.divideByZeroDemo);
  }

  divideByZeroDemo(){
    if (this.cancellation){
      return;
    }
    const elmCalcList = ["#3", "#divide", "#0", "#equal"];
    this.equationTitleDemoAppend("Dividing By Zero:");
    this.timeOutSetup(elmCalcList);
  }
}