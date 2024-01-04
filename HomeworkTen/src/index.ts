interface Example {
     mutableProp: string;
     nested: {
         mutableNestedProp: number;
     };
 }

//Задача 1 _________________________________________________________

//Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.

type DeepReadonly<T> = {
     readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
 };
 
 const readonlyExample: DeepReadonly<Example> = {
     mutableProp: "readonly string",
     nested: {
         mutableNestedProp: 42, 
     },
 };


//Задача 2 _________________________________________________________

//Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості 
//вкладених обʼєктів та ще й робити їх обовʼязковими.

type DeepRequireReadonly<T> = {
     readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
 };
 
 const readonlyRequiredExample: DeepRequireReadonly<Example> = {
     mutableProp: "readonly string", 
     nested: {
         mutableNestedProp: 42, 
     },
 };

//Задача 3 _________________________________________________________

//Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.

type UpperCaseKeys<T> = {
     [K in keyof T as Uppercase<string & K>]: T[K];
 };
 
 interface MyObject {
     name: string;
     age: number;
 }
 
 const myObject: MyObject = {
     name: "John",
     age: 25,
 };
 
 const upperCaseKeysObject: UpperCaseKeys<MyObject> = {
     NAME: "John", 
     AGE: 25,
 };

//Задача 4 _________________________________________________________

//І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт 
//на обʼєкт де кожне value є дескриптором.

type ObjectToPropertyDescriptor<T> = {
     [K in keyof T]: TypedPropertyDescriptor<T[K]>;
 };
 
 const normalObject = {
     name: "John",
     age: 25,
 };
 
 const descriptorObject: ObjectToPropertyDescriptor<typeof normalObject> = {
     name: { value: "John", writable: true, enumerable: true, configurable: true },
     age: { value: 25, writable: true, enumerable: true, configurable: true },
 };