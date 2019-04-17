class Demo{

  constructor(){
    this.storeCalcuations = [];

    this.startCalculations = this.startCalculations.bind(this);
  }
  
  startCalculations(){
    return console.log("Made it to calc");
  }
}