type Role = "admin" | "user" | "visitor";

interface IErrors {
  [key: string]: string;
}

interface IValidators<T> {
  [key: string]: (value: any, values?: T) => string;
}
