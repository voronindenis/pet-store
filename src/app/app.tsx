import { AuthenticationProvider } from '~/features/Authentication';
import { Pets } from '~/features/Pets';

export const App = () => {
  return (
    <AuthenticationProvider>
      <Pets />
    </AuthenticationProvider>
  );
};
