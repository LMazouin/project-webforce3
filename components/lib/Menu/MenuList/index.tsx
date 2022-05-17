import { List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";

interface MenuListProps {
  menuItems: string[];
}

export default function MenuList(props: MenuListProps): JSX.Element {
  const { menuItems } = props;
  return (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item: string) => (
          <ListItem key={item}>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
