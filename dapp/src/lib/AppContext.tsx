"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

type State = {
  account: string;
};

type Action = { type: "SET_ACCOUNT"; account: string };

type AppDispatch = Dispatch<Action>;

const AppStateContext = createContext<State | null>(null);
const AppDispatchContext = createContext<AppDispatch | null>(null);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.account,
      };
  }
};

export const useAppState = () => {
  const state = useContext(AppStateContext);

  if (!state) throw new Error("Cannot find AppProvider.");

  return state;
};

export const useAppDispatch = () => {
  const dispatch = useContext(AppDispatchContext);

  if (!dispatch) throw new Error("Cannot find AppProvider.");

  return dispatch;
};

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    account: "",
  });

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppProvider;
