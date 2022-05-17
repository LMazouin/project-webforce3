import { Typography } from "@mui/material";
import type { NextPage } from "next";
import Menu from "../components/lib/Menu";

const Home: NextPage = () => {
  return (
    <Menu>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio repellendus autem praesentium enim fuga maxime
        suscipit! Voluptatum repellendus eum dolorum eaque ex consequatur dicta? Dolore excepturi nisi aspernatur quo
        quisquam!
      </Typography>
    </Menu>
  );
};

export default Home;
