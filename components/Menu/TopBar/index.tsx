import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { DRAWER_WIDTH } from "../constants";

interface TopBarProps {
  handleMenuToggle: () => void;
}

export default function TopBar(props: TopBarProps): JSX.Element {
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
      </Toolbar>
    </AppBar>
  );
}
