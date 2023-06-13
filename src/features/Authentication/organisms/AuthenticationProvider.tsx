import * as React from 'react';

import { getApi, IUser } from '~/api';
import { useAxiosRequest } from '~/hooks/useAxiosRequest';

import { AuthenticationForm } from '../molecules';

interface IAuthenticationContext {
  error: string | null;
  isAuthorized: boolean;
  logout: () => void;
}

export interface IAuthenticationProvider {
  children?: React.ReactNode | undefined;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>({
  error: null,
  isAuthorized: false,
  logout: () => void 0,
});

export const useAuthenticationContext = () => React.useContext(AuthenticationContext);

export const AuthenticationProvider: React.FC<IAuthenticationProvider> = (props) => {
  const { children } = props;

  const [isAuthorized, setAuthorizedStatus] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [loginUser, loginUserRp] = useAxiosRequest(getApi, 'loginUser', '');
  const [logoutUser, logoutUserRp] = useAxiosRequest(getApi, 'logoutUser', null);
  const [$createUser, createUserRp] = useAxiosRequest(getApi, 'createUser', null);

  const login = React.useCallback(
    (username: string, password: string) => {
      loginUser([{ username, password }]);
    },
    [loginUser],
  );

  const logout = React.useCallback(() => {
    logoutUser([]);
  }, [logoutUser]);

  const createUser = React.useCallback(
    (user: IUser) => {
      $createUser([user]);
    },
    [$createUser],
  );

  React.useEffect(() => {
    if (loginUserRp.data !== '') {
      setAuthorizedStatus(true);
    }
    if (loginUserRp.error) {
      setError(loginUserRp.error.message);
    }
    if (createUserRp.data) {
      setAuthorizedStatus(true);
    }
    if (createUserRp.error) {
      setError(createUserRp.error.message);
    }
    if (logoutUserRp.data) {
      setAuthorizedStatus(false);
    }
  }, [createUserRp.data, createUserRp.error, loginUserRp.data, loginUserRp.error, logoutUserRp.data]);

  return isAuthorized ? (
    <AuthenticationContext.Provider value={{ error, isAuthorized, logout }}>{children}</AuthenticationContext.Provider>
  ) : (
    <AuthenticationForm
      createUser={createUser}
      login={login}
    />
  );
};
