import React from 'react';
import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import Dashboard from '../pages/Dashboard/index';


afterEach(cleanup);

jest.mock('axios');

export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};

jest.mock('react-apexcharts', () => function DummyChart(series, options) {
  return (
    <div data-testid="chart" series={series} options={options} />
  );
});

describe('Dashboard component', () => {
  const options = {
    chart: {
      id: 'investimentChart',
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    title: {
      text: 'Investments Chart',
      align: 'left',
    },
    subtitle: {
      text: 'Application Movement',
      align: 'left',
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      opposite: true,
    },
  };

  const series = [
    {
      name: 'R$',
      data: [],
    },
  ];

  it('should take a snapshot', () => {
    const { asFragment } = render(<Dashboard series={series} options={options} />);

    expect(asFragment(<Dashboard />)).toMatchSnapshot();
  });

  it('Should change select', () => {
    const { getByDisplayValue } = render(<Dashboard series={series} options={options} />);

    const select = getByDisplayValue(/From the beginning/i);
    fireEvent.change(select, { target: { value: '1' } });

    expect(getByDisplayValue(/Last Month/i)).toBeInTheDocument();
  });
});
