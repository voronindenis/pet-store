import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { AuthenticationProvider } from '../../organisms';

describe('AuthenticationProvider', () => {
  it('should call login function on submit with login form', async () => {
    render(
      <AuthenticationProvider>
        <div data-testid='child-component'>Child</div>
      </AuthenticationProvider>,
    );

    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('sign-in-btn'));

    // Wait for children to be in the document
    await waitFor(() => expect(screen.getByTestId('child-component')).toBeInTheDocument());
  });

  it('should call createUser function on submit with register form', async () => {
    render(
      <AuthenticationProvider>
        <div data-testid='child-component'>Child</div>
      </AuthenticationProvider>,
    );

    fireEvent.click(screen.getByTestId('switch-form-link'));

    fireEvent.change(screen.getByTestId('first-name-input'), { target: { value: 'testfirst' } });
    fireEvent.change(screen.getByTestId('last-name-input'), { target: { value: 'testlast' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'testemail@test.com' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'testpass' } });
    fireEvent.click(screen.getByTestId('sign-up-btn'));

    // Wait for children to be in the document
    await waitFor(() => expect(screen.getByTestId('child-component')).toBeInTheDocument());
  });
});
