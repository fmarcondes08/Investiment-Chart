import React from 'react';
import Chart from 'react-apexcharts';

function chart(options, series) {
  return (
    <Chart options={options} series={series} type="area" width="1000" height="500" />
  );
}
export default chart;
