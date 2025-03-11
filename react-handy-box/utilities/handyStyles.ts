import { StyleProps } from '@/react-handy-box/components/Box.types';
import merge from 'lodash/merge';

const handyStyles = (...styleProps: Array<StyleProps>) =>
  merge({}, ...styleProps) as StyleProps;

export { handyStyles };
