class Demo{

  constructor(){
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
  }
  
  startCalculations(){
    buttonPressedArray = [""];
    $("output.calc-display").text("0");
    this.additionDemo();
  }

  timeOutSetup(elmCalcList, callbackFunction){
    let timer = 500;
    for(let elmIdIndex = 0; elmIdIndex < elmCalcList.length; elmIdIndex++) {
      setTimeout(() => {
        $(elmCalcList[elmIdIndex]).trigger("click");
      }, timer);
      timer += 500;
    }
    setTimeout(callbackFunction, timer);
  }

  additionDemo(){
    const elmCalcList = ["#1", "#plus", "#2", "#equal"];
    this.timeOutSetup(elmCalcList, this.subtractionDemo);
  }

  subtractionDemo(){
    const elmCalcList = ["#9", "#minus", "#2", "#equal"];
    this.timeOutSetup(elmCalcList, this.multiplicationDemo);
  }

  multiplicationDemo(){
    const elmCalcList = ["#9", "#negative", "#times", "#9", "#equal"];
    this.timeOutSetup(elmCalcList, this.divisionDemo);
  }

  divisionDemo(){
    const elmCalcList = ["#1", "#divide", "#3", "#equal"];
    this.timeOutSetup(elmCalcList, this.successiveOperationDemo);
  }

  successiveOperationDemo(){
    const elmCalcList = ["#1", "#point", "#5", "#plus", "#1", "#point", "#5", "#plus", "#3", "#equal"];
    this.timeOutSetup(elmCalcList, this.repeatOperationDemo);
  }

  repeatOperationDemo(){
    const elmCalcList = ["#1", "#0", "#minus", "#1", "#equal", "#equal", "#equal", "#equal"];
    this.timeOutSetup(elmCalcList, this.rollOverOperationDemo);
  }

  rollOverOperationDemo(){
    const elmCalcList = ["#1", "#plus", "#1", "#plus", "#equal", "#plus", "#equal",];
    this.timeOutSetup(elmCalcList, this.orderOfOperationsDemo);
  }

  orderOfOperationsDemo(){
    const elmCalcList = ["#1", "#plus", "#3", "#divide", "#4", "#plus", "#1", "#0", "#times", "#2", "#equal"];
    this.timeOutSetup(elmCalcList, this.partialOperandDemo);
  }

  partialOperandDemo(){
    const elmCalcList = ["#3", "#times", "#equal"];
    this.timeOutSetup(elmCalcList, this.divideByZeroDemo);
  }

  divideByZeroDemo(){
    const elmCalcList = ["#3", "#divide", "#0", "#equal"];
    this.timeOutSetup(elmCalcList);
  }
}