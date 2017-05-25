import 'reflect-metadata';

function Injectable() {
  return function(target: any, key?: string, descriptor?: PropertyDecorator): any {
    return target;
  }
}

class ReflectiveInjector {
  constructor(private providers: any[]) {

  }

  get(token: any) {
    let deps = Reflect.getMetadata('design:paramtypes', token), depObjects = [];
    if(deps && deps.length > 0) {
      depObjects = deps.map((a: any) => this.get(a));
    }
    const ctorIndex = this.providers.indexOf(token);
    return new this.providers[ctorIndex](...depObjects);
  } 
}

class Http {
  constructor() {
    console.log('Http created');
  }

  get(url: string) {
    return 'data';
  }
}

@Injectable()
class Service {
  constructor(http: Http) {
    console.log(http);
  }
}

var injector = new ReflectiveInjector([ Http, Service ]);
const service = injector.get(Service);
