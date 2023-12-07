//Створіть інтерфейс, який описує структуру об'єкта, що представляє калькулятор.
//Калькулятор повинен мати методи для виконання арифметичних операцій: додавання, віднімання, множення та ділення.
//Потім створіть функцію calculate, яка приймає об'єкт цього типу та виконує операцію і повертає результат.

interface Calculator {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
}

const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : NaN),
};

function calculate(operation: keyof Calculator, a: number, b: number): number {
  if (!(operation in calculator)) {
    throw new Error(`Unknown operation: ${operation}`);
  }

  return calculator[operation](a, b);
}
