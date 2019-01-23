export function compose(...fns) {
  return function (val) {
    return fns.reduceRight((result, fn) => fn(result), val);
  };
}
