import { Drawer } from "@mui/material";
import { styled } from "@mui/system";
import { DRAWER_WIDTH } from "../constants";
import SideMenuList from "../SideMenuList";

interface PermanentDrawerProps {
  menuItems: IMenuItem[];
}

const DrawerWrapper = styled(Drawer)({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: DRAWER_WIDTH,
  },
});

const PermanentDrawer: React.FC<PermanentDrawerProps> = (props: PermanentDrawerProps): JSX.Element => (
  <DrawerWrapper variant="permanent" sx={{ display: { xs: "none", sm: "block" } }} open>
    <SideMenuList menuItems={props.menuItems} />
  </DrawerWrapper>
);

export default PermanentDrawer;
