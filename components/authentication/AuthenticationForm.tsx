import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import useForm from "../../hooks/useForm";

const initialValues = { email: "", password: "", passwordConfirmation: "" };

type TValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const validators = {
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

export default function AuthenticationForm(): JSX.Element {
  async function create<T>(url: string, body: T): Promise<boolean> {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return false;
  }

  const onSubmit = async function onSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    newValues: TValues
  ): Promise<void> {
    await create<TValues>("/api/auth/signup", newValues);
  };

  const [{ values, errors, isValid }, { handleChange, handleSubmit }] = useForm<TValues>({
    initialValues,
    validators,
    onSubmit,
  });

  return (
    <Paper sx={{ width: "500px", p: 3, mx: "auto", mt: "50px" }}>
      <Typography align="center" marginY={3}>
        Créer un compte
      </Typography>
      <Grid container display="flex" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email) && !isValid}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            name="password"
            label="Mot de passe"
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={Boolean(errors.password) && !isValid}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            name="passwordConfirmation"
            label="Confirmation du mot de passe"
            fullWidth
            value={values.passwordConfirmation}
            onChange={handleChange}
            error={Boolean(errors.passwordConfirmation) && !isValid}
            helperText={errors.passwordConfirmation}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!isValid}>
            Envoyer
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
