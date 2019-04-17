class Demo{

  constructor(){
    //bindings
    this.startCalculations = this.startCalculations.bind(this);
    this.timeOutSetup = this.timeOutSetup.bind(this);
    this.additionDemo = this.additionDemo.bind(this);
    this.subtractionDemo = this.subtractionDemo.bind(this);
    this.multiplication = this.multiplication.bind(this);
  }
  
  startCalculations(){
    this.additionDemo();
  }

  timeOutSetup(elmCalcList, callbackFunction){
    let timer = 1000;
    for(let elmIdIndex = 0; elmIdIndex < elmCalcList.length; elmIdIndex++) {
      setTimeout(() => {
        $(elmCalcList[elmIdIndex]).trigger("click");
      }, timer);
      timer += 1000;
    }
    setTimeout(callbackFunction, timer);
  }

  additionDemo(){
    const elmCalcList = ["#1", "#plus", "#2", "#equal"];
    this.timeOutSetup(elmCalcList, this.subtractionDemo);
  }

  subtractionDemo(){
    const elmCalcList = ["#9", "#minus", "#2", "#equal"];
    this.timeOutSetup(elmCalcList, this.multiplication);
  }

  multiplication(){
    const elmCalcList = ["#9", "#times", "#9", "#equal"];
    this.timeOutSetup(elmCalcList);
  }
}