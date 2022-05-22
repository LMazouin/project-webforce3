import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { DRAWER_WIDTH } from "./constants";
import TopBar from "./TopBar";
import SideMenu from "./SideMenu";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps): JSX.Element => {
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
      <SideMenu open={open} handleMenuToggle={handleMenuToggle} menuItems={menuItems} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
