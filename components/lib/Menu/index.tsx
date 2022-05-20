import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { DRAWER_WIDTH } from "./constants";
import TopBar from "./TopBar";
import TemporaryDrawer from "./TemporaryDrawer";
import PermanentDrawer from "./PermanentDrawer";

interface MenuProps {
  children: JSX.Element[];
}

export default function Menu(props: MenuProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuToggle = (): void => {
    setOpen(!open);
  };

  const menuItems: IMenuItem[] = [
    { label: "Accueil", path: "/", authorizations: ["admin", "user"] },
    { label: "Configuration", path: "/settings", authorizations: ["admin"] },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar handleMenuToggle={handleMenuToggle} />
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="navigation">
        <TemporaryDrawer open={open} handleMenuToggle={handleMenuToggle} menuItems={menuItems} />
        <PermanentDrawer menuItems={menuItems} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
