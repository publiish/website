import { BoxPropsWithRef } from '@/react-handy-box/components/Box.types';
import { IconName, IconVariant } from '@/react-handy-box/components/Icon.types';
import {
  PopoverProps,
  PopoverRenderProps,
} from '@/react-handy-box/components/Popover.types';
import { ReactNode } from 'react';

export type DividingLine = BoxPropsWithRef & {
  type: 'dividing-line';
};

export type GroupLabel = BoxPropsWithRef & {
  type: 'group-label';
  label: ReactNode;
};

export type MenuItem = Omit<BoxPropsWithRef<'button'>, 'type'> & {
  iconName?: IconName;
  iconVariant?: IconVariant;
  label: ReactNode;
  type: 'menu-item';
};

export type MenuItemWithChildren = Omit<BoxPropsWithRef<'button'>, 'type'> & {
  iconName?: IconName;
  iconVariant?: IconVariant;
  label: ReactNode;
  options: Array<AnyMenuItem>;
  type: 'child-menu';
};

export type AnyMenuItem =
  | DividingLine
  | GroupLabel
  | MenuItem
  | MenuItemWithChildren;

export type MenuProps = Omit<PopoverProps, 'children' | 'options' | 'type'> & {
  options: Array<AnyMenuItem>;
  renderOptions?: (args: {
    renderedOptions: ReactNode;
    menuRenderProps: PopoverRenderProps;
  }) => ReactNode;
};
