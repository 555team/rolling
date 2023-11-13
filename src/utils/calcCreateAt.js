import moment from 'moment';

const changeDateFormat = (dateBefore, dateAfter) => {
  const date = moment(dateBefore);
  return date.format(dateAfter);
};

export default changeDateFormat;
