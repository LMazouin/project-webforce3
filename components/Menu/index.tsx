import { Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import { DRAWER_WIDTH } from "./constants";
import TopBar from "./TopBar";
import TemporaryDrawer from "./TemporaryDrawer";
import PermanentDrawer from "./PermanentDrawer";

interface MenuProps {
  children: JSX.Element;
}

export default function Menu(props: MenuProps): JSX.Element {
  const { children } = props;

  const [open, setOpen] = useState<boolean>(false);

  function handleMenuToggle(): void {
    setOpen(!open);
  }

  const menuItems = ["Accueil", "Configuration"];

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar handleMenuToggle={handleMenuToggle} />
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="navigation">
        <TemporaryDrawer open={open} handleMenuToggle={handleMenuToggle} menuItems={menuItems} />
        <PermanentDrawer menuItems={menuItems} />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
