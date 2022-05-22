import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IUser } from "../../../models/users";

interface UserTableProps {
  users: IUser[];
  isLoading: boolean;
}

const UserTable: React.FC<UserTableProps> = (props: UserTableProps): JSX.Element => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell align="right">Rôle</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.users.length > 0 || !props.isLoading ? (
          props.users.map((user) => (
            <TableRow key={user.email} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.email}
              </TableCell>
              <TableCell align="right">{user.role}</TableCell>
            </TableRow>
          ))
        ) : (
          <CircularProgress sx={{ margin: 3 }} />
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable;
