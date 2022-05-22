export function has(obj: { [key: string]: any }, path: string | string[]): boolean {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  return pathArray ? !!pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) : false;
}
