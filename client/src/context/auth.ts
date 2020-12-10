import React, { createContext, useReducer, useContext } from 'react';

export const AuthStateContext = createContext({});
export const AuthDispatchContext = createContext({});

type Props = {
  children: React.ReactNode;
};

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthDispatchContext.Provider
      value={dispatch}
    ></AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
