import {
  ModalLayerProps,
  ModalLayerRenderProps,
} from '@/react-handy-box/components/ModalLayer.types';
import { ModalLayerVariantName } from '@/react-handy-box/types';
import { Options } from '@popperjs/core';
import { ReactNode } from 'react';

export type PopoverContextType = {
  stack: Array<{
    element: HTMLElement;
    isFocusTrapped: boolean;
    onClose: () => void;
  }>;
};

export type PopoverEventHandler = (renderProps?: PopoverRenderProps) => void;

export type PopoverRenderFunction = (
  renderProps: PopoverRenderProps
) => JSX.Element | ReactNode;

export type PopoverRenderProps = ModalLayerRenderProps & {
  updatePopper: () => void;
};

type PopoverExclusiveProps = {
  children: ReactNode | PopoverRenderFunction;
  disabled?: boolean;
  popperOptions?: Partial<Options>;
  popperPlacementOrder?: Array<Options['placement']>;
  renderTrigger: PopoverRenderFunction;
  type?: ModalLayerVariantName;
  onBeforeClose?: PopoverEventHandler;
  onBeforeOpen?: PopoverEventHandler;
  onClose?: PopoverEventHandler;
  onOpen?: PopoverEventHandler;
};

export type PopoverProps = Omit<ModalLayerProps, keyof PopoverExclusiveProps> &
  PopoverExclusiveProps;
