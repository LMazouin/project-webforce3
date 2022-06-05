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

export default function PermanentDrawer(props: PermanentDrawerProps): JSX.Element {
  const { menuItems } = props;
  return (
    <DrawerWrapper variant="permanent" sx={{ display: { xs: "none", sm: "block" } }} open>
      <SideMenuList menuItems={menuItems} />
    </DrawerWrapper>
  );
}
