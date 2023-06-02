import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { IPet } from '~/api';

import { PetCards } from '../../molecules';

describe('PetCards', () => {
  test('renders loading state correctly', () => {
    render(
      <PetCards
        isLoading={true}
        data={[]}
        data-testid='test-key'
      />,
    );

    const spinElement = screen.getByTestId('spin');
    expect(spinElement).toBeInTheDocument();
  });

  test('renders pet data correctly', () => {
    const mockData = [
      { id: 1, name: 'Dog', status: 'available', category: { id: 1, name: 'Animals' }, photoUrls: [] },
      { id: 2, name: 'Cat', status: 'sold', category: { id: 2, name: 'Animals' }, photoUrls: [] },
    ];

    render(
      <PetCards
        data-testid='test-id'
        isLoading={false}
        data={mockData as IPet[]}
      />,
    );

    const petCardElements = screen.getAllByTestId('pet-card');
    expect(petCardElements.length).toEqual(mockData.length);

    const petStatusElements = screen.getAllByTestId('pet-status');
    petStatusElements.forEach((petStatusElement, index) => {
      expect(petStatusElement).toHaveTextContent(mockData[index].status);
    });

    const petCategoryElements = screen.getAllByTestId('pet-category');
    petCategoryElements.forEach((petCategoryElement, index) => {
      expect(petCategoryElement).toHaveTextContent(mockData[index].category.name);
    });
  });
});
