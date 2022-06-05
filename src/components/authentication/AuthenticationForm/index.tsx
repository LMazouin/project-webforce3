import { Button, CircularProgress, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { MouseEvent, MouseEventHandler } from "react";
import useForm from "../../../hooks/useForm";
import useUsers from "../../../hooks/useUsers";
import { IUser } from "../../../models/users";
import PasswordInput from "../../lib/PasswordInput";
import TextInput from "../../lib/TextInput";

interface AuthenticationFormProps {
  initialValues: IUser;
  validators: IValidators<IUser>;
  isLoggedIn: boolean;
  toggleLoggedIn: MouseEventHandler;
}

export default function AuthenticationForm(props: AuthenticationFormProps): JSX.Element {
  const [{ isLoading }, { create }] = useUsers<IUser>({});

  const { initialValues, validators, isLoggedIn, toggleLoggedIn } = props;

  const [{ values, errors, isValid }, { handleChange, handleSubmit }] = useForm<IUser>({
    initialValues,
    validators,
    onSubmit: async (event: MouseEvent<HTMLButtonElement>, newValues: IUser): Promise<void> => {
      if (isLoggedIn) {
        await signIn("credentials", {
          redirect: true,
          email: newValues.email,
          password: newValues.password,
          callbackUrl: "/",
        });
      } else {
        const isSuccess = await create("/api/auth/signup", newValues);
        if (isSuccess) {
          await signIn("credentials", {
            redirect: true,
            email: newValues.email,
            password: newValues.password,
            callbackUrl: "/",
          });
        }
      }
    },
  });

  return (
    <>
      <Grid container display="flex" justifyContent="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <TextInput
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email) && !isValid}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordInput
            name="password"
            label="Mot de passe"
            value={values.password || ""}
            onChange={handleChange}
            error={Boolean(errors.password) && !isValid}
            helperText={errors.password}
          />
        </Grid>
        {!isLoggedIn && (
          <Grid item xs={12}>
            <PasswordInput
              name="passwordConfirmation"
              label="Confirmation du mot de passe"
              value={values.passwordConfirmation || ""}
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
            {isLoggedIn ? "Se connecter" : "Créer un compte"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="text" onClick={toggleLoggedIn}>
            {isLoggedIn ? "Pas ce compte? Cliquez ici!" : "Se connecter"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? <CircularProgress color="secondary" /> : null}
        </Grid>
      </Grid>
    </>
  );
}
