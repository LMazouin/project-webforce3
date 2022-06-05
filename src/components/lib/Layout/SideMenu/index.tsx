import { Box } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import PermanentDrawer from "../PermanentDrawer";
import TemporaryDrawer from "../TemporaryDrawer";

interface SideMenuProps {
  open: boolean;
  handleMenuToggle: () => void;
  menuItems: IMenuItem[];
}

export default function SideMenu(props: SideMenuProps): JSX.Element {
  const { open, handleMenuToggle, menuItems } = props;

  return (
    <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="navigation">
      <TemporaryDrawer open={open} handleMenuToggle={handleMenuToggle} menuItems={menuItems} />
      <PermanentDrawer menuItems={menuItems} />
    </Box>
  );
}
