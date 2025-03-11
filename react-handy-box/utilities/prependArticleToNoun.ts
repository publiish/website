const prependArticleToNoun = (noun: string, inclusive: boolean = true) => {
  const article = 'aeiouAEIOU'.includes(noun[0]) ? 'an' : 'a';

  return `${article}${inclusive ? ` ${noun}` : ''}`;
};

export { prependArticleToNoun };
