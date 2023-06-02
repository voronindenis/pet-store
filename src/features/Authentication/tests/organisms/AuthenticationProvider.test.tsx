import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { AuthenticationProvider } from '../../organisms';

describe('AuthenticationProvider', () => {
  it('renders AuthenticationForm when isAuthorized is false', () => {
    render(<AuthenticationProvider />);
    expect(screen.getByTestId('authentication-form')).toBeInTheDocument();
  });

  it('renders children when isAuthorized is true after form submission', async () => {
    render(
      <AuthenticationProvider>
        <div data-testid='child-component'>Child</div>
      </AuthenticationProvider>,
    );

    // Fill the form
    fireEvent.input(screen.getByTestId('username-input'), { target: { value: 'admin' } });
    fireEvent.input(screen.getByTestId('password-input'), { target: { value: 'password' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));

    // Wait for children to be in the document
    await waitFor(() => expect(screen.getByTestId('child-component')).toBeInTheDocument());
  });

  it('does not render children when isAuthorized is true after failed form submission', async () => {
    render(
      <AuthenticationProvider>
        <div data-testid='child-component'>Child</div>
      </AuthenticationProvider>,
    );

    // Fill the form
    fireEvent.input(screen.getByTestId('username-input'), { target: { value: 'wrong_user' } });
    fireEvent.input(screen.getByTestId('password-input'), { target: { value: 'wrong_password' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));

    // Wait for children to be in the document
    await waitFor(() => expect(screen.queryByTestId('child-component')).not.toBeInTheDocument());
  });

  it('should show children after signing up', async () => {
    render(
      <AuthenticationProvider>
        <div data-testid='child-component'>Child</div>
      </AuthenticationProvider>,
    );

    // Click the form toggle button to switch to sign up
    fireEvent.click(screen.getByTestId('toggle-form-button'));

    // Fill out the form
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'john' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password' } });

    // Click submit
    fireEvent.click(screen.getByTestId('submit-button'));

    // Check that children are rendered
    await waitFor(() => expect(screen.getByTestId('child-component')).toBeInTheDocument());
  });
});
