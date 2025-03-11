import sortBy from 'lodash/sortBy';

const replaceEach = (
  string: string,
  keywords: Array<string>,
  replaceFunction: (keyword: string) => string
) => {
  const sortedKeywords = sortBy(keywords, 'length').reverse();

  const pattern = new RegExp(sortedKeywords.join('|'), 'gi');

  return string.replace(pattern, replaceFunction);
};

export { replaceEach };
