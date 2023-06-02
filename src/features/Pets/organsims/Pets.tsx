import React from 'react';

import { Row, Col, Radio, RadioChangeEvent, Divider } from 'antd';

import { getApi } from '~/api';
import { useAxiosRequest } from '~/hooks/useAxiosRequest';

import { PetCards } from '../molecules';

export const Pets: React.FC = () => {
  const [value, setValue] = React.useState<string>('pending');

  const [findPetsByStatus, { isLoading, data = [] }] = useAxiosRequest(getApi, 'findPetsByStatus', []);

  const onRadioButtonChange = React.useCallback((e: RadioChangeEvent) => {
    setValue(e.target.value);
  }, []);

  React.useEffect(() => {
    findPetsByStatus([{ status: value as 'pending' | 'sold' }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Row
      justify='center'
      align='middle'
      style={{ minHeight: '100vh' }}
    >
      <Col span={12}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Radio.Group
            data-testid='radio-group'
            value={value}
            size='large'
            onChange={onRadioButtonChange}
          >
            <Radio.Button
              data-testid='pending-pets-button'
              value='pending'
            >
              Pending
            </Radio.Button>
            <Radio.Button
              data-testid='sold-pets-button'
              value='sold'
            >
              Sold
            </Radio.Button>
          </Radio.Group>
        </div>
        <Divider />
        <PetCards
          data={data}
          isLoading={isLoading}
        />
      </Col>
    </Row>
  );
};
