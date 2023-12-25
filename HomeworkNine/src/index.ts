//Задача 1 _________________________________________________________

//Напишіть узагальнену функцію filterArray(array, condition), яка фільтрує масив елементів на основі наданої умови.

function filterArray<T>(array: T[], condition: (element: T) => boolean): T[] {
  return array.filter(condition);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = filterArray(numbers, (number) => number % 2 === 0);

console.log(evenNumbers); 

//Задача 2 _________________________________________________________

//Створіть узагальнений клас Stack, який являє собою стек елементів з методами push, pop і peek.

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(numberStack.peek()); 
console.log(numberStack.pop());  
console.log(numberStack.pop());  

//Задача 3 _________________________________________________________

//Створіть узагальнений клас Dictionary, який являє собою словник (асоціативний масив) 
//з методами set, get і has. Обмежте ключі тільки валідними типами для об'єкта

class Dictionary<K extends string | number, V> {
  private items: Record<K, V> = {} as Record<K, V>;

  set(key: K, value: V): void {
    this.items[key] = value;
  }

  get(key: K): V | undefined {
    return this.items[key];
  }

  has(key: K): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, key);
  }
}

const myDictionary = new Dictionary<string, number>();
myDictionary.set("apple", 0);
myDictionary.set("banana", 3);

console.log(myDictionary.get("apple"));  //0
console.log(myDictionary.has("banana")); //3 
console.log(myDictionary.get("melon"));  //undefined