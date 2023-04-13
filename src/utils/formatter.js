function formatter(number) {
  const fixNumber = number.toFixed(2);
  const numberFormat = Intl.NumberFormat();
  const formattedNumber = numberFormat.format(fixNumber);
  return formattedNumber;
}
export default formatter;
