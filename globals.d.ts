enum Role {
  ADMIN = "admin",
  USER = "user",
}

interface IErrors {
  [key: string]: string;
}

interface IValidators<T> {
  [key: string]: (value: any, values?: T) => string;
}
