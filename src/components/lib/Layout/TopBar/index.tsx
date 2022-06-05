import { signOut, useSession } from "next-auth/react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useRouter } from "next/router";
import { DRAWER_WIDTH } from "../constants";

interface TopBarProps {
  handleMenuToggle: () => void;
}

export default function TopBar(props: TopBarProps): JSX.Element {
  const router = useRouter();
  const { status, data } = useSession();

  const userEmail = data ? data.token.email : "";

  const connect = async (): Promise<void> => {
    await router.push({ pathname: "/authentication" });
  };

  const disconnect: React.MouseEventHandler = async (): Promise<void> => {
    await signOut();
    await router.push({ pathname: "/authentication" });
  };

  const { handleMenuToggle } = props;

  return (
    <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` } }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open side menu"
          edge="start"
          onClick={handleMenuToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Menu
        </Typography>
        <Typography noWrap component="div" marginLeft="auto">
          {userEmail}
        </Typography>
        <Button variant="text" sx={{ color: "white" }} onClick={status === "authenticated" ? disconnect : connect}>
          {status === "authenticated" ? "Se déconnecter" : "Se connecter"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
