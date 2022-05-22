import React, { useState } from "react";
import { has } from "../utils/lodash";

interface FormArgs<T> {
  validators: IValidators<T>;
  initialValues: T;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>, values: T) => void | Promise<void>;
}

interface FormState<T> {
  errors: IErrors;
  values: T;
  isValid: boolean;
}

interface FormDispatch {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function useForm<T>(args: FormArgs<T>): [FormState<T>, FormDispatch] {
  const [values, setValues] = useState<T>(args.initialValues);
  const [errors, setErrors] = useState<IErrors>({});

  const hasValidator = (name: string): boolean => has(args.validators, name);

  const validateField = (name: string, value: any): string =>
    hasValidator(name) ? args.validators[name](value, values) : "";

  const validateAll = (valuesToValidate: { [key: string]: any }, allErrors: IErrors = {}): IErrors | boolean => {
    Object.keys(valuesToValidate).forEach((name) => {
      const result = validateField(name, valuesToValidate[name]);
      allErrors[name] = result;
    });
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0 || Object.values(allErrors).every((value) => value === "")
      ? true
      : allErrors;
  };

  const handleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    const validationResult = validateField(name, value);
    setErrors((previousErrors) => {
      const { [name]: _, ...withOmitName } = previousErrors;
      return validationResult === "" ? withOmitName : { ...previousErrors, [name]: validationResult };
    });
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const handleSubmit: React.MouseEventHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (validateAll(values) === true) {
      args.onSubmit(event, values);
    }
  };

  const isValid: boolean = Object.keys(errors).length === 0 || Object.values(errors).every((value) => value === "");

  return [
    { values, errors, isValid },
    { handleChange, handleSubmit },
  ];
}
