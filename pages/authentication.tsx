import { GetServerSideProps, NextPage } from "next";
import Container from "@mui/material/Container";
import AuthenticationPaper from "../components/authentication/AuthenticationPaper";

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: any }> => {
  return { props: {} };
};

const Authentication: NextPage = () => {
  return (
    <Container>
      <AuthenticationPaper />
    </Container>
  );
};

export default Authentication;
