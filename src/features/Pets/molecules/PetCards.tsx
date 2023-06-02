import React from 'react';

import { Card, Space, Spin, Typography } from 'antd';

import { IPet } from '~/api';

export interface IPetCards {
  isLoading: boolean;
  data: IPet[];
}

export const PetCards: React.FC<IPetCards> = ({ isLoading, data }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {isLoading ? (
      <Spin data-testid='spin' />
    ) : (
      <Space>
        {data.map((pet) => (
          <Card
            data-testid='pet-card'
            key={pet.id}
            title={pet.name}
          >
            <Typography.Text data-testid='pet-status'>{pet.status}</Typography.Text>
            <Typography.Text data-testid='pet-category'>{pet.category?.name}</Typography.Text>
          </Card>
        ))}
      </Space>
    )}
  </div>
);
