import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import useForm from "../../../hooks/useForm";
import useUsers from "../../../hooks/useUsers";

interface AuthenticationFormProps {
  initialValues: TValues;
  validators: IValidators<TValues>;

  isLoggedIn: boolean;
  toggleLoggedIn: () => void;
}

export default function AuthenticationForm(props: AuthenticationFormProps): JSX.Element {
  const [{ isLoading }, { create }] = useUsers({});

  const [{ values, errors, isValid }, { handleChange, handleSubmit }] = useForm<TValues>({
    initialValues: props.initialValues,
    validators: props.validators,
    onSubmit: async function (event: React.MouseEvent<HTMLButtonElement>, newValues: TValues): Promise<void> {
      if (props.isLoggedIn) {
        await signIn("credentials", {
          redirect: true,
          email: newValues.email,
          password: newValues.password,
          callbackUrl: "/",
        });
      } else {
        await create<TValues>("/api/auth/signup", newValues);
        await signIn("credentials", {
          redirect: true,
          email: newValues.email,
          password: newValues.password,
          callbackUrl: "/",
        });
      }
    },
  });

  return (
    <>
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
        {!props.isLoggedIn && (
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
        )}
      </Grid>
      <Grid container spacing={3} marginTop={3}>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!isValid}>
            {props.isLoggedIn ? "Se connecter" : "Créer un compte"}
          </Button>
        </Grid>
        <Button variant="text" onClick={props.toggleLoggedIn}>
          {props.isLoggedIn ? "Pas ce compte? Cliquez ici!" : "Se connecter"}
        </Button>
      </Grid>
    </>
  );
}
