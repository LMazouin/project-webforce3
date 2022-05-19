import { List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";

interface MenuListProps {
  menuItems: IMenuItem[];
}

const MenuList: React.FC<MenuListProps> = (props: MenuListProps): JSX.Element => (
  <div>
    <Toolbar />
    <List>
      {props.menuItems.map((item: IMenuItem) => (
        <ListItem key={item.label}>
          <ListItemButton onClick={item.onClick}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
);

export default MenuList;
