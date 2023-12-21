//Задача 1 _________________________________________________________

//Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком. Потім використовуйте її для звуження
//типу змінної.

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const data: unknown = "Hello, World";

if (isString(data)) {
  console.log(data.toUpperCase());
}


//Задача 2 _________________________________________________________

//У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку
//в ньому залишилися тільки рядки. Використовуйте захисника типу для цього завдання.

const filterTextValues = (dataToFilter: unknown[]): string[] => {
  const isText = (value: unknown): value is string => {
    return typeof value === "string";
  };

  return dataToFilter.filter(isText);
};

const customArray = [1, "apple", 3, "orange", "melon"];
console.log(filterTextValues(customArray));


//Задача 3 _________________________________________________________

//У вас є об'єкт, який може містити довільні властивості. Напишіть функцію, яка приймає цей об'єкт і повертає значення
//однієї з властивостей, якщо воно існує і має певний тип.

type AnyObject = { [key: string]: any };

function getValueByType(obj: AnyObject, targetType: string): any | null {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === targetType)
      return obj[key];
  }
  return null;
}

const myObject: AnyObject = { name: "Julia", age: 21, isStudent: false };

console.log(getValueByType(myObject, "string"));
console.log(getValueByType(myObject, "number"));
console.log(getValueByType(myObject, "boolean"));


//Задача 4 _________________________________________________________

//Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості
//або її тип). Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш
//конкретного типу.

interface Person {
  name: string;
  age: number;
  isStudent: boolean;
}

interface Phone {
  brand: string;
  model: string;
  releaseYear: number;
}

type AnyObj = Person | Phone;

function isPerson(obj: AnyObj): obj is Person {
  return 'name' in obj && 'age' in obj && 'isStudent' in obj;
}

function isPhone(obj: AnyObj): obj is Phone {
  return 'brand' in obj && 'model' in obj && 'releaseYear' in obj;
}

function processObject(obj: AnyObj): void {
  if (isPerson(obj)) {
    console.log(`${obj.name} is a person.`);
  } else if (isPhone(obj)) {
    console.log(`This is a ${obj.brand} phone.`);
  } else {
    console.log("Unknown object type.");
  } 
}

const person: AnyObj = { name: 'Julia', age: 21, isStudent: false };
const phone: AnyObj = { brand: 'Samsung', model: 'Fold', releaseYear: 2022 };

processObject(person); 
processObject(phone);  


//Задача 5 _________________________________________________________

//У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число). Напишіть функцію, яка приймає цю
//змінну і виконує довільні операції, специфічні для кожного з типів.

function variable(input: string | number): void {
  if (typeof input === 'string') {
    console.log(`Input is a string: ${input.toUpperCase()}`);
  } else if (typeof input === 'number') {
    console.log(`Input is a number: ${input * 2}`);
  } else {
    console.log('Unknown type');
  }
}

const variableString: string = 'Julia';
const variableNumber: number = 21;
const variableOther: any = true;

variable(variableString); 
variable(variableNumber);  
variable(variableOther);    


//Задача 6 _________________________________________________________

//Створіть захисник типу, який перевірятиме, чи є передане значення функцією. Потім напишіть функцію, яка використовує
//цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.

type CustomFunctionType = () => any;

function isCustomFunction(value: any): value is CustomFunctionType {
  return typeof value === "function";
}

function processFunction(func: any): void {
  if (isCustomFunction(func)) {
    func(); 
  } else {
    console.log("Not a custom function");
  }
}

const myCustomFunc: CustomFunctionType = () => {
  console.log("Custom function called");
};

processFunction(myCustomFunc);


//Задача 7 _________________________________________________________

//Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу для звуження
//типу об'єктів, що базуються на цій ієрархії.

class Device {
  constructor(public name: string) {}
  turnOn(): void {
    console.log(`${this.name} is turned on.`);
  }
}

class Smartphone extends Device {
  makeCall(): void {
    console.log(`Calling from ${this.name}.`);
  }
}

class Tablet extends Device {
  openApp(appName: string): void {
    console.log(`Opening ${appName} on ${this.name}.`);
  }
}

function processDevice(device: Device): void {
  if (device instanceof Smartphone) {
    console.log(`${device.name} is a smartphone.`);
    device.makeCall();
  } else if (device instanceof Tablet) {
    console.log(`${device.name} is a tablet.`);
    device.openApp("Weather App");
  } else {
    console.log(`${device.name} is a generic device.`);
    device.turnOn();
  }
}

const genericDevice = new Device("Generic Device");
const mySmartphone = new Smartphone("iPhone");
const myTablet = new Tablet("iPad");

processDevice(genericDevice); 
processDevice(mySmartphone);  
processDevice(myTablet);      
