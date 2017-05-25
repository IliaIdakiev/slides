function log(message?: string) {
  if (message) message += ' ';
  else message = '';
  return function (target: any, key?: string, propertyDescroptor?: PropertyDescriptor): any {
    let _val: any;
    Object.defineProperty(target, key, {
      set: function (val: any) {
        console.log(`${message}old: ${_val} --> new: ${val}`);
        _val = val;
      },
      get: function () {
        return _val;
      }
    });
    return target;
  }
}

class Person {
  @log()
  public name: string;
}

const ivan = new Person();
ivan.name = 'Ivan';
ivan.name = 'Ivann';

// Ouput:
// old: undefined --> new: Ivan
// old: Ivan --> new: Ivann