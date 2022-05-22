import { ReducerWithoutAction, useReducer } from "react";
import { usePage } from "../contexts/pageContext";

enum ActionType {
  START,
  END,
  GET,
}

interface Action<T> {
  type: ActionType;
  data?: Array<T>;
}

interface State<T> {
  isLoading: boolean;
  data?: Array<T>;
}

interface Args<T, F> {
  initialData?: Array<T>;
  initialFilters?: F;
}

interface Functions<T, F> {
  getData: (url: string, filters?: F) => Promise<boolean>;
  create: (url: string, body: T) => Promise<boolean>;
}

const getInitialState = <T>(initialData: Array<T> = []): State<T> => {
  return { isLoading: false, data: initialData };
};

const createReducer =
  <T>() =>
  (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case ActionType.START:
        return { ...state, isLoading: true };
      case ActionType.END:
        return { ...state, isLoading: false };
      case ActionType.GET:
        return { ...state, isLoading: false, data: action.data };
      default:
        return state;
    }
  };

const useData = <T, F = {}>(args: Args<T, F>): [State<T>, Functions<T, F>] => {
  const reducer = createReducer<T>();
  const [state, dispatch] = useReducer(reducer, args.initialData, getInitialState);

  const { token } = usePage();

  const getData = async (url: string, filters?: F): Promise<boolean> => {
    dispatch({ type: ActionType.START });
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": token },
      });
      if (response.ok) {
        const { data } = await response.json();
        dispatch({ type: ActionType.GET, data });
        return true;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    dispatch({ type: ActionType.END });
    return false;
  };

  const create = async (url: string, body: T): Promise<boolean> => {
    dispatch({ type: ActionType.START });
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
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    dispatch({ type: ActionType.END });
    return false;
  };

  return [state, { create, getData }];
};

export default useData;
