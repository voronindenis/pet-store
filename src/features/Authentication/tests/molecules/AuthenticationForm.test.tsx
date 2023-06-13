import React from 'react';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AuthenticationForm } from '../../molecules';

describe('AuthenticationForm', () => {
  let createUser: jest.Mock;
  let login: jest.Mock;

  beforeEach(() => {
    createUser = jest.fn();
    login = jest.fn();
    render(
      <AuthenticationForm
        createUser={createUser}
        login={login}
      />,
    );
  });

  it('switches between sign up and sign in forms', async () => {
    expect(screen.getByTestId('sign-in-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('first-name-input')).toBeNull();

    fireEvent.click(screen.getByTestId('switch-form-link'));

    await waitFor(() => expect(screen.getByTestId('sign-up-btn')).toBeInTheDocument());
    expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
  });

  it('calls login on sign in form submit', async () => {
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'testPass' } });
    fireEvent.click(screen.getByTestId('sign-in-btn'));

    await waitFor(() => expect(login).toHaveBeenCalledWith('testUser', 'testPass'));
  });

  it('calls createUser on sign up form submit', async () => {
    fireEvent.click(screen.getByTestId('switch-form-link'));

    fireEvent.change(screen.getByTestId('first-name-input'), { target: { value: 'firstName' } });
    fireEvent.change(screen.getByTestId('last-name-input'), { target: { value: 'lastName' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByTestId('phone-input'), { target: { value: '123456789' } });
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'testPass' } });
    fireEvent.click(screen.getByTestId('sign-up-btn'));

    await waitFor(() =>
      expect(createUser).toHaveBeenCalledWith({
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'test@test.com',
        phone: '123456789',
        username: 'testUser',
        password: 'testPass',
      }),
    );
  });
});
