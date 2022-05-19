import { useSession } from "next-auth/react";
import { List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useRouter } from "next/router";

interface MenuListProps {
  menuItems: IMenuItem[];
}

const MenuList: React.FC<MenuListProps> = (props: MenuListProps): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const role = data ? data.role : "";

  return (
    <div>
      <Toolbar />
      <List>
        {props.menuItems
          .filter((item) => item.authorizations.includes(role))
          .map((item) => (
            <ListItem key={item.label}>
              <ListItemButton
                onClick={() => {
                  router.push({ pathname: item.path });
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
};
export default MenuList;
