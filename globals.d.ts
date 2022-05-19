type Role = "admin" | "user";

interface IErrors {
  [key: string]: string;
}

interface IValidators<T> {
  [key: string]: (value: any, values?: T) => string;
}
