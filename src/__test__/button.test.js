/* eslint-disable import/extensions */
/* eslint-disable no-restricted-imports */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonLoading from '../components/ButtonLoading';

it('renders okay', () => {
  render(<ButtonLoading text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});

it('shows text when not loading', () => {
  render(<ButtonLoading text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toHaveTextContent('hola');
});

it('doesnt show text when loading', () => {
  render(<ButtonLoading text='hola' loading disabled={false} />);
  expect(screen.getByTestId('button-loading')).not.toHaveTextContent('hola');
});

it('shows loading component when loading', () => {
  render(<ButtonLoading text='hola' loading disabled={false} />);
  expect(screen.getByTestId('loading-in-button')).toBeInTheDocument();
});

it('is disabled when prop is passed', () => {
  render(<ButtonLoading text='hola' loading disabled />);
  expect(screen.getByTestId('button-loading')).toHaveAttribute('disabled');
});

it('is enabled when disabled prop is passed as false', () => {
  render(<ButtonLoading text='hola' loading disabled={false} />);
  expect(screen.getByTestId('button-loading')).not.toHaveAttribute('disabled');
});
