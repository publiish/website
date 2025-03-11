const pluralize = (
  count: number = 0,
  ifSingular: string,
  ifPlural: string = ifSingular + 's',
  inclusive: boolean = true
) => {
  const label = count === 1 ? ifSingular : ifPlural;

  return `${inclusive ? `${count} ` : ''}${label}`;
};

export { pluralize };
