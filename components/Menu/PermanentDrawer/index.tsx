import { Drawer, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import MenuList from "../MenuList";

interface PermanentDrawerProps {
  menuItems: string[];
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
      <MenuList menuItems={menuItems} />
    </DrawerWrapper>
  );
}
