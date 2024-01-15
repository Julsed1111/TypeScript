//Задача 1 _________________________________________________________

//Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину, 
//через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.


class NewClassInfo {
  constructor(public readonly reason: string, public readonly replacement?: string) {}
}

function DeprecatedMethod(info: NewClassInfo): MethodDecorator {
  return function (target: any, methodName: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
      const originalMethod = descriptor.value;

      descriptor.value = function (this: any, ...args: any[]): void {
          console.warn(`Warning: Method '${String(methodName)}' is deprecated. Reason: ${info.reason}`);

          if (info.replacement) {
              console.warn(`Replacement: ${info.replacement}`);
          }

          originalMethod.apply(this, args);
      };

      return descriptor;
  };
}


//Задача 2 _________________________________________________________

//Створіть декоратори MinLength, MaxLength та Email. 


function MinLength(min: number): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    let value: any;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      if (newVal.length < min) {
        throw new Error(`Value must have a minimum length of ${min}`);
      } else {
        value = newVal;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function MaxLength(max: number): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    let value: any;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      if (newVal.length > max) {
        throw new Error(`Value must have a maximum length of ${max}`);
      } else {
        value = newVal;
      }
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function Email(target: any, propertyKey: string | symbol): void {
  let value: any;

  const getter = function () {
    return value;
  };

  const setter = function (newVal: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newVal)) {
      throw new Error(`Invalid email format`);
    } else {
      value = newVal;
    }
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}


//Задача 3 _________________________________________________________

//Використайте попередню версію декораторів і зробіть так, щоб їх можно було використовувати разом.


class User {
  @DeprecatedMethod({ reason: 'Deprecated', replacement: 'newMethod' })
  @MinLength(5)
  @MaxLength(20)
  @Email
  private _email: string = '';

  set email(value: string) {
    this._email = value;
  }

  get email(): string {
    return this._email;
  }
}

const user = new User();
user.email = 'valid.email@example.com'; 
user.email = 'qwert'; 
user.email = 'qwertyqwertyqwerryyqwertyy@example.com'; 
user.email = 'valid.email'; 
  
