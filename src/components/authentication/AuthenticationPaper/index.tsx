import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { MouseEventHandler, useState } from "react";
import { IUser } from "../../../models/users";
import AuthenticationForm from "../AuthenticationForm";
import validators from "../validators";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  width: 500,
  padding: theme.spacing(3),
  margin: theme.spacing(5, "auto", 0),
}));

const initialValues: IUser = { email: "", password: "", passwordConfirmation: "" };

export default function AuthenticationPaper(): JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

  const toggleLoggedIn: MouseEventHandler<HTMLButtonElement> = (): void => {
    setLoggedIn((previousState) => !previousState);
  };

  return (
    <PaperWrapper>
      <Typography variant="h6" align="center" marginBottom={3} component="div">
        Authentification
      </Typography>
      <AuthenticationForm
        initialValues={initialValues}
        validators={isLoggedIn ? { email: validators.email, password: validators.password } : validators}
        isLoggedIn={isLoggedIn}
        toggleLoggedIn={toggleLoggedIn}
      />
    </PaperWrapper>
  );
}
