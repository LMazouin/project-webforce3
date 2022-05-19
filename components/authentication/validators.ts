const validators: IValidators<TValues> = {
  email: (value: string) => {
    if (value.length < 1) {
      return "Veuillez saisir un email";
    }
    return "";
  },
  password: (value: string) => {
    if (value.length < 1) {
      return "Veuillez saisir un mot de passe";
    }
    if (value.length < 8) {
      return "Votre mot de passe doit contenir au moins 8 charactères";
    }
    return "";
  },
  passwordConfirmation: (value: string, values?: TValues) => {
    if (value.length < 1) {
      return "Veuillez saisir un mot de passe";
    }
    if (values && value !== values.password) {
      return "Veuillez répéter le même mot de passe";
    }
    return "";
  },
};

export default validators;
