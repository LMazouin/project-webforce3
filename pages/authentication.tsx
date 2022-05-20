import Container from "@mui/material/Container";
import { NextPage } from "next";
import AuthenticationPaper from "../components/authentication/AuthenticationPaper";

const Authentication: NextPage = (): JSX.Element => (
  <Container>
    <AuthenticationPaper />
  </Container>
);

export default Authentication;
