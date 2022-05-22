import { Drawer } from "@mui/material";
import { styled } from "@mui/system";
import { DRAWER_WIDTH } from "../constants";
import SideMenuList from "../SideMenuList";

interface TemporaryDrawerProps {
  open: boolean;
  handleMenuToggle: () => void;
  menuItems: IMenuItem[];
}

const DrawerWrapper = styled(Drawer)({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    with: DRAWER_WIDTH,
  },
});

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = (props: TemporaryDrawerProps): JSX.Element => {
  const { open, handleMenuToggle, menuItems } = props;
  return (
    <DrawerWrapper
      variant="temporary"
      open={open}
      onClose={handleMenuToggle}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      <SideMenuList menuItems={menuItems} />
    </DrawerWrapper>
  );
};

export default TemporaryDrawer;
