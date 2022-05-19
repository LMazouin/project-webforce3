import { Drawer, styled } from "@mui/material";
import { DRAWER_WIDTH } from "../constants";
import MenuList from "../MenuList";

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

export default function TemporaryDrawer(props: TemporaryDrawerProps): JSX.Element {
  const { open, handleMenuToggle, menuItems } = props;
  return (
    <DrawerWrapper
      variant="temporary"
      open={open}
      onClose={handleMenuToggle}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: "block", sm: "none" } }}
    >
      <MenuList menuItems={menuItems} />
    </DrawerWrapper>
  );
}
