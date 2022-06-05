import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../components/lib/Layout";
import UserTable from "../components/settings/UsersTable";
import useData from "../hooks/useUsers";
import { IUser } from "../models/users";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) return { redirect: { permanent: false, destination: "/authentication" } };

  return { props: {} };
};

export default function Settings(): JSX.Element {
  const [state, { getData }] = useData<IUser>({ initialData: [] });

  useEffect(() => {
    getData("/api/users");
  }, []);

  return (
    <Layout>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ marginLeft: "auto", marginBottom: 3 }}>
        Ajouter un utilisateur
      </Button>
      <UserTable users={state.data || []} isLoading={state.isLoading} />
    </Layout>
  );
}
