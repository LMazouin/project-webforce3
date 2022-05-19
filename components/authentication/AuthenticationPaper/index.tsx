import { useState } from "react";
import styled from "@mui/system/styled";
import Paper from "@mui/material/Paper";
import AuthenticationForm from "../AuthenticationForm";
import validators from "../validators";

const PaperWrapper = styled(Paper)(({ theme }) => ({
  width: 500,
  padding: theme.spacing(3),
  margin: theme.spacing(5, "auto", 0),
}));

const initialValues: TValues = { email: "", password: "", passwordConfirmation: "" };

export default function AuthenticationPaper(): JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);

  function toggleLoggedIn(): void {
    setLoggedIn((previousState) => !previousState);
  }

  return (
    <PaperWrapper>
      <AuthenticationForm
        initialValues={initialValues}
        validators={isLoggedIn ? { email: validators.email, password: validators.password } : validators}
        isLoggedIn={isLoggedIn}
        toggleLoggedIn={toggleLoggedIn}
      />
    </PaperWrapper>
  );
}
