/*
1) Create a class called Person with the following conditions.
Attributes: name, age, DNI, sex (M for male, F for female), weight and height.
Every attribute, except DNI, will have default values according to its type (0 for numbers, empty string for String, etc..). Sex will be male by default.
*/
 
class Person {
  constructor(){
/*
2) Create the following constructors:
A constructor with default values.
*/
    this.name  = "";
    this.age   = 0;
    this.sex   = "M";
    this.weight= 0;
    this.height= 0;
    
    this.dni = this._createDNI();
  }
//A constructor with name, age and sex as parameters (other values by default).
  constructorV2(age, name, sex){
    if(!(age && name && sex)){
      throw new Error("you must set age, name, sex");
    }

    this.name  = name;
    this.age   = age;
    this.sex   = sex;
    this.weight= 0;
    this.height= 0;
    this.dni = this._createDNI();
  }
//A constructor with all attributes received as parameters.
  constructorV3(age, name, sex, weight, height){
    if(!(age && name && sex&& weight && height)){
      throw new Error("you must set age, name, sex, weight, height");
    }

    this.name  = name;
    this.age   = age;
    this.sex   = sex;
    this.weight= weight;
    this.height= height;
    this.dni = this._createDNI();
  }
 
/*
3) Create the following methods:
 
calculateIMC()
 
This method will calculate if the person is in its ideal weight. Use this formula to calculate it: (weight in KG)/(height^2  in Mts.).
If the result is less than 20, the function will return -1.
If the result is a number between 20 and 25 (included), means that the person is under its ideal weight and the function must return 0.
If the result is a number above 25 means the person is overweight and the function must return 1.
*/
 
	calculateIMC(){
	  let imc =  this.weight /(this.height^2);
	
	  return this._getIMCDiagnostic(imc);
  }
 
  _getIMCDiagnostic(imc){
	  if(imc < 20){
      return -1;
    }else if(imc > 20 && imc <= 25){
      return 0;
    }else if(imc > 25){
      return 1;
    }else{
      throw new Error("IMC exactly 20, there are no requirements for this case");
    }
  }
/*
isAdult()
Will return 1 if the person is 18 or above and 0 if it’s not.
*/
	isAdult(){
	  return this.age >= 18 ? 1 : 0;
  }
/* 
checkSex(char sex)
Will check if the value for sex is correct or not. If it’s not, will set sex as M by default.
*/
 
	checkSex(sex){
    let isValid;
 
    if(sex === "M" || sex === "F"){
      isValid = true;
    }

    if(!isValid){
      this._setSexAsMasculine();
    }
  }
 
  _setSexAsMasculine(){
	  this.sex = "M";
  }
/*
toString()
Returns all the information from the object.
*/
	toString(){
    return JSON.stringify(this._getProperties());
  }
  
  _getProperties(){
    let name      = this.name,
        age       = this.age,
        sex       = this.sex,
        weight    = this.weight,
        height    = this.height,
        dni       = this.dni;
    
    return {
      name,
      age,
      sex,
      weight,
      height,
      dni
    };
  }
/*
createDNI()
Will create an 8 figure random number and assign it to DNI attribute. This function will be called when the object is created.
*/
  _createDNI(){
		return Math.floor(Math.random() * (99999999 -10000000 +1)) + 1;
  }
/*
Create SET methods for every parameter but DNI.
*/
	setName(name){
		if(typeof name !== "string"){
	    throw new Errro("name must be a string");
    }
	  
    this.name = name;
  }
 
  setAge(age){
			//validation
			//propertie setting
  }

//etc...
}
/* 
4) Create a runnable class that executes the following:
Asks the user for name, age, sex, weight and height. NOTE: no need to create an interface, you can just set the values in variables to use for creating the following objects.
*/
class PersonApp{
	constructor(){
		this.people = [];
  }
 
	run(){
		this.createPersonV1();
		this.createPersonV2();
		this.createPersonV3();
    
    this.checkPeopleWeight();
    this.checkPeopleAge();
    this.showPeople();
  }
/*
Create 3 objects of class Person as follows:
First one will have the previous asked values.
*/
  createPersonV1(){
    let newPerson = new Person();
    
    newPerson.constructorV3(17, "Carlos", "M", 80, 1.70);
    this.people.push(newPerson);
  }
/*
Second one will have all of the previous asked values BUT weight and height.
*/
  createPersonV2(){
    let newPerson = new Person();
    
    newPerson.constructorV2(43, "Marta", "F");
    this.people.push(newPerson);
  }
/*Third one will have all values by default. Use SET methods to assign the values to the attributes.*/
  createPersonV3(){
    let newPerson = new Person();
    
    newPerson.setName("Mercedes");
    //etc...
    this.people.push(newPerson);
  }
/*
For each object check if the person is in its ideal weight, overweight or underweight.
*/
  checkPeopleWeight(){
    for (let person of this.people) {
      let message = person.name + " has";
      
      switch(person.calculateIMC()){
        case 0:
          message += " underweight";
          break;
        case -1:
          message += " ideal weight";
          break;
        case 1:
          message += " overweight";
          break;
      }
      console.log(message);
    }
  }
/*
For each object check if the person is an adult.
*/
  checkPeopleAge(){
    for (let person of this.people) {
      let message = person.name + " is";
      
      if(person.isAdult() === 1){
        message += " an adult";
      }else{
        message += " not an adult";
      }
      
      console.log(message);
    }
  }  
/*
Finally show all the information of each object.
*/
  
  showPeople(){
    for (let person of this.people) {
      console.log(person.toString());
    }
  }  
}

(new PersonApp()).run();