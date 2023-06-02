import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { Pets } from '../../organsims';

describe('Pets', () => {
  it('renders Pets and switches tabs', async () => {
    render(<Pets />);

    expect(screen.getByTestId('radio-group')).toBeInTheDocument();

    // Initially the active value should be 'pending'
    await waitFor(() => {
      expect(screen.getByText('Dog')).toBeInTheDocument();
      expect(screen.getByText('Cat')).toBeInTheDocument();
    });

    // Now simulate clicking the 'pending' button
    fireEvent.click(screen.getByTestId('sold-pets-button'));

    // We should see the pending pets now
    await waitFor(() => {
      expect(screen.getByText('Pig')).toBeInTheDocument();
      expect(screen.getByText('Monkey')).toBeInTheDocument();
    });

    // Switch to 'sold' button
    fireEvent.click(screen.getByTestId('pending-pets-button'));

    // We should see the sold pets now
    await waitFor(() => {
      expect(screen.getByText('Dog')).toBeInTheDocument();
      expect(screen.getByText('Cat')).toBeInTheDocument();
    });
  });
});
