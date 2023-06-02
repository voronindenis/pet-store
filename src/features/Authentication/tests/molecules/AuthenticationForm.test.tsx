import React from 'react';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { AuthenticationForm } from '../../molecules';

describe('<AuthenticationForm />', () => {
  const mockLogin = jest.fn();
  const mockCreateUser = jest.fn();

  beforeEach(() => {
    render(
      <AuthenticationForm
        login={mockLogin}
        createUser={mockCreateUser}
      />,
    );
  });

  it('renders title', () => {
    expect(screen.getByTestId('authentication-title').textContent).toBe('Pet Store');
  });

  it('renders form and switches between Sign In and Sign Up', () => {
    const signInButton = screen.getByTestId('submit-button');
    const toggleButton = screen.getByTestId('toggle-form-button');

    expect(screen.getByTestId('authentication-form')).toBeInTheDocument();
    expect(signInButton.textContent).toBe('Sign In');
    expect(toggleButton.textContent).toBe("Don't have an account? Sign Up");

    fireEvent.click(toggleButton);

    expect(signInButton.textContent).toBe('Sign Up');
    expect(toggleButton.textContent).toBe('Already have an account? Sign In');
  });

  it('should call the login callback with the correct values when sign in button is clicked', async () => {
    fireEvent.input(screen.getByTestId('username-input'), { target: { value: 'testuser' } });
    fireEvent.input(screen.getByTestId('password-input'), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpassword'));
  });

  it('should call the createUser callback with the correct values when sign up button is clicked', async () => {
    fireEvent.click(screen.getByTestId('toggle-form-button'));

    fireEvent.input(screen.getByTestId('firstName-input'), { target: { value: 'John' } });
    fireEvent.input(screen.getByTestId('lastName-input'), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByTestId('email-input'), { target: { value: 'johndoe@email.com' } });
    fireEvent.input(screen.getByTestId('phone-input'), { target: { value: '1234567890' } });
    fireEvent.input(screen.getByTestId('username-input'), { target: { value: 'johndoe' } });
    fireEvent.input(screen.getByTestId('password-input'), { target: { value: 'password' } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() =>
      expect(mockCreateUser).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        phone: '1234567890',
        username: 'johndoe',
        password: 'password',
      }),
    );
  });
});
