//Задача 1 _________________________________________________________

//Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції. 
//Як параметр типу повинен обов'язково виступати функціональний тип.


type ReturnTypeFromFunction<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never;

function exampleFunction(x: number, y: number): string {
    return (x + y).toString();
}

type ResultType = ReturnTypeFromFunction<typeof exampleFunction>;


//Задача 2 _________________________________________________________

//Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним) 
//та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру


type FunctionInfo<T extends (arg: any) => any> = [ReturnType<T>, Parameters<T>[0]];

function customFunction(x: number): string {
    return x.toString();
}

type Info = FunctionInfo<typeof customFunction>;


//Задача 3 _________________________________________________________

//Створіть тип, який об'єднує властивості двох об'єктів тільки в тому випадку, якщо їхні значення мають спільний тип. 
//Наприклад: { a: number; b: string } та { b: string; c: boolean } => { b: string; }


type IntersectProps<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K] extends U[K] ? T[K] : never;
  };
  
  type Object1 = { a: number; b: string };
  type Object2 = { b: string; c: boolean };
  
  type Intersection = IntersectProps<Object1, Object2>;