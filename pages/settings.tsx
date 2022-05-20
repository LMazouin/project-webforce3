import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import Menu from "../components/lib/Menu";
import UserTable from "../components/settings/UsersTable";
import useData from "../hooks/useUsers";
import { IUser } from "../models/users";
import { auth } from "../utils/auth";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const token = auth(context);

  if (!token) {
    return { redirect: { permanent: false, destination: "/authentication" } };
  }

  return { props: { token } };
};

const Settings: NextPage = (): JSX.Element => {
  const [state, { getData }] = useData<IUser>({ initialData: [] });
  useEffect(() => {
    getData("/api/users");
  }, []);

  return (
    <Menu>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ marginLeft: "auto", marginBottom: 3 }}>
        Ajouter un utilisateur
      </Button>
      <UserTable users={state.data || []} isLoading={state.isLoading} />
    </Menu>
  );
};

export default Settings;
