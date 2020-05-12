import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import './styles.css';
import api from '../../services/api';
import { convertDate, getMonthFilter, getYearFilter } from '../../utils/utils';

function Dashboard() {
  const [investiment, setInvestiment] = useState([]);
  const [inputError, setInputError] = useState('');

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
      categories: investiment.map((x) => convertDate(x[0])),
    },
    yaxis: {
      opposite: true,
    },
  };

  const series = [
    {
      name: 'R$',
      data: investiment.map((x) => x[1]),
    },
  ];

  const fetchData = useCallback(
    async () => {
      try {
        const result = await api.get();
        setInvestiment(result.data);
        localStorage.setItem(
          '@InvestmentChart:investiments', JSON.stringify(result.data),
        );
      } catch (err) {
        // eslint-disable-next-line no-alert
        setInputError('Erro ao obter os dados, tente novamente.');
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleFilterInvestment(e) {
    const storageInvestiments = localStorage.getItem('@InvestmentChart:investiments')
      ? JSON.parse(localStorage.getItem('@InvestmentChart:investiments')) : '';

    if (!storageInvestiments) {
      setInputError('Erro ao obter os dados, tente novamente.');
      return '';
    }

    const lastMonth = storageInvestiments[storageInvestiments.length - 1];

    setInvestiment(() => {
      switch (e) {
        case '1': {
          const days = getMonthFilter(lastMonth[0], 1);
          const filter = storageInvestiments.filter((d) => d[0] >= days[0] && d[0] <= days[1]);
          return filter;
        }
        case '2': {
          const days = getMonthFilter(lastMonth[0], 3);
          const filter = storageInvestiments.filter((d) => d[0] >= days[0] && d[0] <= days[1]);
          return filter;
        }
        case '3': {
          const days = getYearFilter(lastMonth[0], 1);
          const filter = storageInvestiments.filter((d) => d[0] >= days[0] && d[0] <= days[1]);
          return filter;
        }
        case '4': {
          const days = getYearFilter(lastMonth[0], 2);
          const filter = storageInvestiments.filter((d) => d[0] >= days[0] && d[0] <= days[1]);
          return filter;
        }
        default: {
          return storageInvestiments;
        }
      }
    });

    return '';
  }

  return (
    <div className="container">
      {inputError && <span className="error">{inputError}</span>}
      <div className="filter">
        <select
          id="filterInvestiment"
          className="filterInvestiment"
          autoFocus
          onChange={(e) => handleFilterInvestment(e.target.value)}
        >
          <option value="0">From the beginning</option>
          <option value="1">Last Month</option>
          <option value="2">3 Months</option>
          <option value="3">1 Year</option>
          <option value="4">2 Years</option>
        </select>
      </div>
      <div id="chart" className="chart">
        <Chart options={options} series={series} type="area" width="1000" height="500" />
      </div>
    </div>
  );
}

export default Dashboard;
