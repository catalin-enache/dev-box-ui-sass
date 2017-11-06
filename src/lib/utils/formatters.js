/**
 *
 * @param value String
 * @returns String
 */
function forceFloat(value) {
  let valueToUse = value;
  const indexOfPoint = valueToUse.indexOf('.');
  const lastIndexOfPoint = valueToUse.lastIndexOf('.');
  const hasMoreThanOnePoint = indexOfPoint !== lastIndexOfPoint;

  if (hasMoreThanOnePoint) {
    valueToUse = `${valueToUse.replace(/\./g, '')}.`;
  }

  let firstChar = valueToUse[0] || '';
  let lastChar = (valueToUse.length > 1 ? valueToUse[valueToUse.length - 1] : '') || '';
  let middleChars = valueToUse.substr(1, valueToUse.length - 2) || '';

  if (!firstChar.match(/[\d+-]/)) {
    firstChar = '';
  }

  middleChars = middleChars.replace(/[^\d.]/g, '');

  if (!lastChar.match(/[\d.KkMm]/)) {
    lastChar = '';
  } else if (lastChar.match(/[KkMm]/)) {
    if (middleChars === '.') {
      middleChars = '';
    } else if (middleChars === '' && ['+', '-'].includes(firstChar)) {
      lastChar = '';
    }
  } else if (lastChar === '.' && middleChars === '' && ['+', '-'].includes(firstChar)) {
    lastChar = '';
  }

  valueToUse = [firstChar, middleChars, lastChar].join('');

  if (lastChar.match(/[KkMm]/)) {
    valueToUse = (Number(`${firstChar}${middleChars}`) * (lastChar.match(/[Kk]/) ? 1000 : 1000000)).toString();
  }

  return valueToUse;
}

/* eslint prefer-const: 0 */
const numberFormatter = ({ decPoint = '.', thousandsSeparator = ',' } = {}) => value => {
  let firstChar = value[0] || '';
  firstChar = ['+', '-'].includes(firstChar) ? firstChar : '';
  const isFloatingPoint = value.indexOf(decPoint) !== -1;
  let [integerPart = '', decimals = ''] = value.split(decPoint);
  integerPart = integerPart.replace(/[+-]/g, '');
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  const ret = `${firstChar}${integerPart}${isFloatingPoint ? decPoint : ''}${decimals}`;
  return ret;
};

export default {
  forceFloat,
  numberFormatter
};

