import {
  BoxPropsWithRef,
  StyleProps,
} from '@/react-handy-box/components/Box.types';
import { FormProps } from '@/react-handy-box/components/Form.types';
import { variantStylesMap } from '@/react-handy-box/components/ModalWindow';
import { ModalLayerVariantName } from '@/react-handy-box/types';
import { MouseEvent, MutableRefObject, ReactNode, Ref, RefObject } from 'react';

export type ModalLayerStackEntry = {
  element: HTMLElement;
  setIsOpen: (isOpen: boolean) => void;
  type: ModalLayerVariantName;
};

export type ModalLayerStack = Array<ModalLayerStackEntry>;

export type ModalLayerContextObject = {
  modalLayerStack: MutableRefObject<ModalLayerStack>;
};

export type ModalLayerEventHandler = (
  renderProps?: ModalLayerRenderProps
) => void;

export type ModalLayerRenderFunction = (
  renderProps: ModalLayerRenderProps
) => JSX.Element | ReactNode;

export type ModalLayerRenderProps = {
  closeModal: () => void;
  isOpen: boolean;
  modalLayerElementRef?: RefObject<HTMLDivElement>;
  setIsOpen: (newIsOpen: boolean) => void;
  triggerElementRef?: RefObject<HTMLButtonElement>;
  propsForTrigger: {
    ref: Ref<HTMLButtonElement>;
    onClick: (event: MouseEvent) => void;
  };
};

type BasicModalLayerProps = Omit<BoxPropsWithRef, 'children' | 'type'> & {
  children: ReactNode | ModalLayerRenderFunction;
  disableBackdropClickToClose?: boolean;
  disableFocusTrap?: boolean;
  stylesForBackdrop?: StyleProps;
  stylesForBackdropOnClose?: StyleProps;
  stylesForBackdropOnOpen?: StyleProps;
  stylesOnClose?: StyleProps;
  stylesOnOpen?: StyleProps;
  type: ModalLayerVariantName;
  onBeforeClose?: ModalLayerEventHandler;
  onBeforeOpen?: ModalLayerEventHandler;
  onClose?: ModalLayerEventHandler;
  onOpen?: ModalLayerEventHandler;
};

type RemoteControlledModalLayerProps = {
  initialIsOpen?: never;
  isOpen: boolean;
  renderTrigger?: never;
};

type TriggerControlledModalLayerProps = {
  initialIsOpen?: boolean;
  isOpen?: never;
  renderTrigger?: ModalLayerRenderFunction;
};

export type ModalLayerProps = BasicModalLayerProps &
  (RemoteControlledModalLayerProps | TriggerControlledModalLayerProps);

export type ModalWindowProps = Omit<ModalLayerProps, 'type'> & {
  propsForForm?:
    | Omit<FormProps, 'children'>
    | ((renderProps: ModalLayerRenderProps) => Omit<FormProps, 'children'>);
  renderFooter?: ModalLayerRenderFunction;
  renderHeader?: ModalLayerRenderFunction;
  type?: ModalLayerVariantName;
  variant?: keyof typeof variantStylesMap;
};
