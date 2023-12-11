class Property {
     public readonly name: string;
     public readonly color: string;

     constructor(name: string, color: string) {
          this.name = name;
          this.color = color;
     }
}

class Circle extends Property {
     public radius: number;

     constructor(name: string, color: string, radius: number) {
          super(name, color);
          this.radius = radius;
     }

     calculateArea(): number {
          return Math.PI * this.radius ** 2;
     }
}

class Rectangle extends Property {
     public width: number;
     public height: number;

     constructor(name: string, color: string, width: number, height: number) {
          super(name, color);
          this.width = width;
          this.height = height;
     }

     calculateArea(): number {
          return this.width * this.height;
     }

     print(): void {
          console.log(
               `Area of ${this.name} (Color: ${this.color}): ${this.width} * ${this.height}`
          );
     }
}

class Square extends Rectangle {
     constructor(name: string, color: string, side: number) {
          super(name, color, side, side);
     }

     print(): void {
          console.log(`Area of ${this.name} (Color: ${this.color}): ${this.width} * ${this.width}`);
     }
}

class Triangle extends Property {
     public base: number;
     public height: number;

     constructor(name: string, color: string, base: number, height: number) {
          super(name, color);
          this.base = base;
          this.height = height;
     }

     calculateArea(): number {
          return (this.base * this.height) / 2;
     }
}

const circle = new Circle("Circle", "Black", 15);
console.log(circle.calculateArea());

const rectangle = new Rectangle("Rectangle", "Red", 3, 8);
console.log(rectangle.calculateArea());
rectangle.print();

const square = new Square("Square", "Pink", 7);
console.log(square.calculateArea());
square.print();

const triangle = new Triangle("Triangle", "Orange", 4, 6);
console.log(triangle.calculateArea());
