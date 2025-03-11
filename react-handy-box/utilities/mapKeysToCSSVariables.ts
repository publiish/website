import mapKeys from 'lodash/mapKeys';

const mapKeysToCSSVariables = (
  originalObject: Record<string, string>,
  variableName: string
) => mapKeys(originalObject, (value, key) => `--${variableName}--${key}`);

export { mapKeysToCSSVariables };
