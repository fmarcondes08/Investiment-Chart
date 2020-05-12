function convertDate(timeStamp) {
  // Months array
  const monthsArr = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago',
    'Set', 'Ocut', 'Nov', 'Dez'];

  // Convert timestamp to date
  const date = new Date(timeStamp);

  // Year
  const year = date.getFullYear();

  // Month
  const month = monthsArr[date.getMonth()];

  // Day
  const day = date.getDate();

  // Display date time in dd MM yyyy format
  const formattedTime = `${day} ${month} ${year}`;

  return formattedTime;
}

exports.convertDate = convertDate;

function getMonthFilter(lastMonth, numberOfMonths) {
  // Convert timestamp to date
  const date = new Date(lastMonth);
  const dateRange = [];

  dateRange.push(date.setMonth(date.getMonth() - numberOfMonths));
  dateRange.push(lastMonth);

  return dateRange;
}

exports.getMonthFilter = getMonthFilter;

function getYearFilter(lastMonth, numberOfYears) {
  const date = new Date(lastMonth);
  const dateRange = [];

  dateRange.push(date.setFullYear(date.getFullYear() - numberOfYears));
  dateRange.push(new Date().getTime());

  return dateRange;
}

exports.getYearFilter = getYearFilter;
