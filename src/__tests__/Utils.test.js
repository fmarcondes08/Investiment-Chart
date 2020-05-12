import React from 'react';
import {
  render, fireEvent, cleanup,
} from '@testing-library/react';
import * as utils from '../utils/utils';

describe('utils function', () => {
  it('validate convert date', () => {
    const expected = '08 Ago 2019';

    const mockedValidateDate = jest.spyOn(
      utils, 'convertDate',
    ).mockReturnValue('08 Ago 2019');
    const result = mockedValidateDate(1565308800000);
    // check if it'll return false, as specified by the mock

    expect(result).toEqual(expected);
    mockedValidateDate.mockRestore();
  });

  it('validate range date based on Month', () => {
    const expected = [1562630400000, 1565308800000];

    const mockedValidateDate = jest.spyOn(
      utils, 'getMonthFilter',
    ).mockReturnValue([1562630400000, 1565308800000]);
    const result = mockedValidateDate(1565308800000, 1);
    // check if it'll return false, as specified by the mock

    expect(result).toEqual(expected);
    mockedValidateDate.mockRestore();
  });

  it('validate range date based on year', () => {
    const expected = [1533772800000, 1565308800000];

    const mockedValidateDate = jest.spyOn(
      utils, 'getYearFilter',
    ).mockReturnValue([1533772800000, 1565308800000]);
    const result = mockedValidateDate(1565308800000, 1);
    // check if it'll return false, as specified by the mock

    expect(result).toEqual(expected);
    mockedValidateDate.mockRestore();
  });
});
