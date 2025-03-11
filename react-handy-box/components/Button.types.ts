import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { FormFieldClickHandler } from '@/react-handy-box/components/Form.types';
import { ButtonVariantName } from '@/react-handy-box/types';
import { MouseEvent } from 'react';

export type ButtonProps = {
  stopClickPropagation?: boolean;
  variant?: ButtonVariantName;
  onClick?: ((event: MouseEvent) => void) | FormFieldClickHandler;
};

export type ButtonComponentProps<T extends 'a' | 'button'> = Omit<
  BoxPropsWithoutRef<T>,
  keyof ButtonProps
> &
  ButtonProps;
