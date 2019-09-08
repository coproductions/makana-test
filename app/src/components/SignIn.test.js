import React from 'react';
import { fireEvent, getByRole } from '@testing-library/react';
import SignIn from './SignIn';
import { renderWithRouter } from '../utils/test.utils';

const mockFoo = jest.fn();
jest.mock('../hooks', () => {
  return {
    useAuthMutation: () => [mockFoo, false],
  };
});

describe('Signin.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login form works as expected', async () => {
    const { container } = renderWithRouter(<SignIn isSignUp={false} />);

    const name = container.querySelector('#name');
    const email = container.querySelector('#email');
    const password = container.querySelector('#password');
    fireEvent.change(email, { target: { value: 'chuck@chuck.com' } });
    fireEvent.change(password, { target: { value: 'norris' } });

    expect(name).toBe(null);

    fireEvent.click(getByRole(container, 'button'));

    expect(mockFoo).toHaveBeenCalledWith({
      variables: { email: 'chuck@chuck.com', password: 'norris', name: '' },
    });
  });

  test('signin form works as expected', async () => {
    const { container } = renderWithRouter(<SignIn isSignUp={true} />);

    const name = container.querySelector('#name');
    const email = container.querySelector('#email');
    const password = container.querySelector('#password');
    fireEvent.change(name, { target: { value: 'chuck' } });
    fireEvent.change(email, { target: { value: 'chuck@chuck.com' } });
    fireEvent.change(password, { target: { value: 'norris' } });

    expect(name).not.toBe(null);

    fireEvent.click(getByRole(container, 'button'));

    expect(mockFoo).toHaveBeenCalledWith({
      variables: { email: 'chuck@chuck.com', password: 'norris', name: 'chuck' },
    });
  });
});
