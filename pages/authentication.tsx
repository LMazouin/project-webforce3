import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import AuthenticationForm from "../components/authentication/AuthenticationForm";

const Authentication: NextPage = () => {
  return (
    <Container>
      <AuthenticationForm />
    </Container>
  );
};

export default Authentication;
