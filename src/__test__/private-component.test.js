/* eslint-disable no-undef */
import React from 'react';
import PrivateComponent from 'components/PrivateComponent';
import { render, screen } from '@testing-library/react';
import { UserContext } from 'context/userContext';

it('renders the children if the user role is in the roleList', () => {
  render(
    <UserContext.Provider value={{ userData: { rol: 'Administrador' } }}>
      <PrivateComponent roleList={['Administrador']}>
        <div data-testid='children'>Este es el children</div>
      </PrivateComponent>
    </UserContext.Provider>
  );
  expect(screen.getByTestId('children')).toBeInTheDocument();
});
