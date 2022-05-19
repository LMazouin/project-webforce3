import { useReducer } from "react";
import { IUser } from "../models/users";

enum UsersActionTypes {
  START,
  END,
}

interface UsersAction {
  type: UsersActionTypes;
  users?: IUser[];
}

interface UsersState {
  isLoading: boolean;
  users: IUser[];
}

interface UsersArgs {
  initialUsers?: IUser[];
  initialFilters?: { [key: string]: any };
}

interface UsersFunctions {
  create: <T>(url: string, body: T) => Promise<boolean>;
}

function getInitialState(initialUsers: IUser[] = []): UsersState {
  return { isLoading: false, users: initialUsers };
}

function reducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case UsersActionTypes.START:
      return { ...state, isLoading: true };
    case UsersActionTypes.END:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export default function useUsers(args: UsersArgs): [UsersState, UsersFunctions] {
  const [state, dispatch] = useReducer(reducer, args.initialUsers, getInitialState);

  async function create<T>(url: string, body: T): Promise<boolean> {
    dispatch({ type: UsersActionTypes.START });
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.error("ERROR");
    }
    dispatch({ type: UsersActionTypes.END });
    return false;
  }

  return [state, { create }];
}
