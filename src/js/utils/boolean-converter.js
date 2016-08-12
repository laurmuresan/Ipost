export const booleanConverter = (value) => {
  const booleanMap = {
    'true': true,
    'false': false
  };

  if (typeof value === 'string') {
    value = value.toLowerCase();
  }

  return booleanMap[value];
};
