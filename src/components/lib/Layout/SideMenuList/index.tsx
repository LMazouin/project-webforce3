import { List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface SideMenuListProps {
  menuItems: IMenuItem[];
}

const SideMenuList: React.FC<SideMenuListProps> = (props: SideMenuListProps): JSX.Element => {
  const router = useRouter();
  const { data } = useSession();
  const role = (data && data.token?.role) || "visitor";

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

export default SideMenuList;
