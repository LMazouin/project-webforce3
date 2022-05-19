import { signOut, useSession } from "next-auth/react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { DRAWER_WIDTH } from "../constants";
import { useRouter } from "next/router";

interface TopBarProps {
  handleMenuToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = (props: TopBarProps): JSX.Element => {
  const router = useRouter();
  const { status } = useSession();

  const connect = async (): Promise<void> => {
    await router.push({ pathname: "/authentication" });
  };

  const disconnect: React.MouseEventHandler = async (): Promise<void> => {
    await signOut();
    await router.push({ pathname: "/authentication" });
  };

  console.log({ status });

  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` } }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open side menu"
          edge="start"
          onClick={props.handleMenuToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
        <Button
          variant="text"
          sx={{ color: "white", marginLeft: "auto" }}
          onClick={status === "authenticated" ? disconnect : connect}
        >
          {status === "authenticated" ? "Se déconnecter" : "Se connecter"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
