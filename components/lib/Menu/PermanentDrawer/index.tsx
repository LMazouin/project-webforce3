import { Drawer, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import MenuList from "../MenuList";

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
    <MenuList menuItems={props.menuItems} />
  </DrawerWrapper>
);

export default PermanentDrawer;
