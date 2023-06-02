import React from 'react';

import { getApi, IUser } from '~/api';
import { AuthenticationForm } from '~/features/Authentication/molecules';
import { useAxiosRequest } from '~/hooks/useAxiosRequest';

interface IAuthContext {
  error: string | null;
  isAuthorized: boolean;
  logout: () => void;
}

const AuthenticationContext = React.createContext<IAuthContext>({
  error: null,
  isAuthorized: false,
  logout: () => void 0,
});

export const useAuthenticationContext = () => React.useContext(AuthenticationContext);

export const AuthenticationProvider: React.FC<{ children?: React.ReactNode | undefined }> = (props) => {
  const { children } = props;

  const [isAuthorized, setAuthorizedStatus] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [loginUser, loginUserRp] = useAxiosRequest(getApi, 'loginUser', '');
  const [logoutUser, logoutUserRp] = useAxiosRequest(getApi, 'logoutUser', null);
  const [$createUser, createUserRp] = useAxiosRequest(getApi, 'createUser', null);

  const login = React.useCallback(
    (username?: string, password?: string) => {
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
  }, [createUserRp, loginUserRp]);

  React.useEffect(() => {
    if (logoutUserRp.data) {
      setAuthorizedStatus(false);
    }
  }, [logoutUserRp]);

  return isAuthorized ? (
    <AuthenticationContext.Provider value={{ error, isAuthorized, logout }}>{children}</AuthenticationContext.Provider>
  ) : (
    <AuthenticationForm
      createUser={createUser}
      login={login}
    />
  );
};
