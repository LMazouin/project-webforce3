import { Box } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import PermanentDrawer from "../PermanentDrawer";
import TemporaryDrawer from "../TemporaryDrawer";

interface SideMenuProps {
  open: boolean;
  handleMenuToggle: () => void;
  menuItems: IMenuItem[];
}

const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps): JSX.Element => (
  <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="navigation">
    <TemporaryDrawer open={props.open} handleMenuToggle={props.handleMenuToggle} menuItems={props.menuItems} />
    <PermanentDrawer menuItems={props.menuItems} />
  </Box>
);

export default SideMenu;
