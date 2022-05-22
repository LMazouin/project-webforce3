import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@mui/system/styled";
import { useState } from "react";
import { IUser } from "../../../models/users";
import AuthenticationForm from "../AuthenticationForm";
import validators from "../validators";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  width: 500,
  padding: theme.spacing(3),
  margin: theme.spacing(5, "auto", 0),
}));

const initialValues: IUser = { email: "", password: "", passwordConfirmation: "" };

const AuthenticationPaper: React.FC = (): JSX.Element => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

  function toggleLoggedIn(): void {
    setLoggedIn((previousState) => !previousState);
  }

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
};

export default AuthenticationPaper;
