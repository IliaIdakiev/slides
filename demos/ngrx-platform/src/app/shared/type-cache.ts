const typeCache: { [name: string]: boolean } = {};

export function type(name: string): string {
  if (typeCache[name]) {
    throw new Error(`Action type ${name} already exists!`);
  }
  typeCache[name] = true;
  return name;
}
