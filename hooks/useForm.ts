import React, { useState } from "react";
import { has } from "../utils/lodash";

interface IValidators<T> {
  [key: string]: (value: any, values?: T) => string;
}

interface IErrors {
  [key: string]: string;
}

interface FormArgs<TValues> {
  validators: IValidators<TValues>;
  initialValues: TValues;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>, values: TValues) => void | Promise<void>;
}

interface FormState<TValues> {
  errors: IErrors;
  values: TValues;
  isValid: boolean;
}

interface FormDispatch {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function useForm<TValues>(args: FormArgs<TValues>): [FormState<TValues>, FormDispatch] {
  const { initialValues, validators, onSubmit } = args;
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<IErrors>({});

  function hasValidator(name: string): boolean {
    return has(validators, name);
  }

  function validateField(name: string, value: any): string {
    return hasValidator(name) ? validators[name](value, values) : "";
  }

  function validateAll(valuesToValidate: { [key: string]: any }, allErrors: IErrors = {}): IErrors | boolean {
    Object.keys(valuesToValidate).forEach((name) => {
      const result = validateField(name, valuesToValidate[name]);
      allErrors[name] = result;
    });
    setErrors(allErrors);
    return Object.keys(allErrors).length === 0 || Object.values(allErrors).every((value) => value === "")
      ? true
      : allErrors;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    const validationResult = validateField(name, value);
    setErrors((previousErrors) => {
      const { [name]: _, ...withOmitName } = previousErrors;
      return validationResult === "" ? withOmitName : { ...previousErrors, [name]: validationResult };
    });
    setValues((previousValues) => ({ ...previousValues, [name]: value }));
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (validateAll(values) === true) {
      onSubmit(event, values);
    }
  }

  const isValid = Object.keys(errors).length === 0 || Object.values(errors).every((value) => value === "");

  return [
    { values, errors, isValid },
    { handleChange, handleSubmit },
  ];
}
