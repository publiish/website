import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { FocusTrap } from '@/react-handy-box/components/FocusTrap';
import {
  ModalLayerContextObject,
  ModalLayerProps,
  ModalLayerRenderProps,
  ModalLayerStack,
} from '@/react-handy-box/components/ModalLayer.types';
import {
  KeyMap,
  useKeyboardShortcuts,
} from '@/react-handy-box/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { tokens } from '@/tokens';
import last from 'lodash/last';
import merge from 'lodash/merge';
import { ExtendedKeyboardEvent } from 'mousetrap';
import {
  createContext,
  forwardRef,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export const ModalLayerContext = createContext<ModalLayerContextObject>({
  modalLayerStack: { current: [] },
});

const ModalLayerProvider = ({ children }: { children: ReactNode }) => {
  const modalLayerStack = useRef<ModalLayerStack>([]);

  const memoizedKeyMap = useMemo<KeyMap>(() => {
    const keysToListenFor = ['escape'];

    const handler = (event: ExtendedKeyboardEvent, combo: string) => {
      if (!modalLayerStack.current.length) {
        return;
      }

      switch (combo) {
        case 'escape':
          event.preventDefault();
          event.stopPropagation();
          last(modalLayerStack.current)?.setIsOpen(false);
          break;
      }

      return false;
    };

    return Object.fromEntries(
      keysToListenFor.map((key) => [key, handler])
    ) as KeyMap;
  }, []);

  useKeyboardShortcuts(memoizedKeyMap);

  const modalLayerContext = useMemo(
    () => ({
      modalLayerStack,
    }),
    []
  );

  return (
    <ModalLayerContext.Provider value={modalLayerContext}>
      {children}
    </ModalLayerContext.Provider>
  );
};

const BackdroppedBox = forwardRef(
  (
    { children, styles, ...otherProps }: BoxPropsWithoutRef,
    ref: Ref<HTMLDivElement>
  ) => (
    <>
      <Box
        ref={ref}
        styles={{
          height: '100vh',
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100vw',
          ...styles,
        }}
        {...otherProps}
      />

      {children}
    </>
  )
);

BackdroppedBox.displayName = 'BackdroppedBox';

const ModalLayer = forwardRef(
  (
    {
      children,
      disableBackdropClickToClose = false,
      disableFocusTrap = false,
      initialIsOpen = false,
      isOpen = initialIsOpen,
      renderTrigger,
      styles,
      stylesForBackdrop,
      stylesForBackdropOnClose,
      stylesForBackdropOnOpen,
      stylesOnClose,
      stylesOnOpen,
      type,
      onBeforeClose,
      onBeforeOpen,
      onClose,
      onOpen,
      ...otherProps
    }: ModalLayerProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [desiredOpenState, setDesiredOpenState] = useState(isOpen);

    const [internalOpenState, setInternalOpenState] = useState<
      'opening' | 'open' | 'closing' | 'closed'
    >('closed');

    const layerIsOpening = internalOpenState === 'opening';
    const layerIsClosing = internalOpenState === 'closing';
    const layerIsClosed = internalOpenState === 'closed';
    const layerIsOpen = internalOpenState === 'open';
    const layerIsClosedOrClosing = layerIsClosed || layerIsClosing;
    const layerIsOpenOrOpening = layerIsOpen || layerIsOpening;
    const layerIsOpeningOrClosing = layerIsOpening || layerIsClosing;

    const [modalLayerElement, setModalLayerElement] =
      useState<HTMLElement | null>(null);

    const triggerElementRef = useRef<HTMLButtonElement | null>(null);

    const multipleRefs = useMultipleRefs(ref, setModalLayerElement);

    const { modalLayerStack } = useContext(ModalLayerContext);

    const modalLayerStackIndex = Math.max(
      0,
      modalLayerStack.current.findIndex((modalLayer) =>
        modalLayerElement
          ? modalLayer.element.isSameNode(modalLayerElement)
          : false
      )
    );

    const renderProps = useMemo<ModalLayerRenderProps>(
      () =>
        ({
          closeModal: () => {
            setDesiredOpenState(false);
          },
          isOpen: desiredOpenState,
          modalLayerElementRef: {
            current: modalLayerElement,
          },
          propsForTrigger: {
            ref: triggerElementRef,
            onClick: (event: MouseEvent) => {
              event.preventDefault();
              event.stopPropagation();

              setDesiredOpenState(!desiredOpenState);
            },
          },
          setIsOpen: setDesiredOpenState,
          triggerElementRef,
        } as ModalLayerRenderProps),
      [desiredOpenState, modalLayerElement]
    );

    useEffect(() => {
      if (typeof isOpen === 'boolean') {
        setDesiredOpenState(isOpen);
      }
    }, [isOpen]);

    useEffect(() => {
      if (!modalLayerElement) {
        return;
      }

      modalLayerStack.current.push({
        element: modalLayerElement,
        setIsOpen: setDesiredOpenState,
        type,
      });

      return () => {
        modalLayerStack.current = modalLayerStack.current.filter(
          (modalLayer) =>
            modalLayer.element.isSameNode(modalLayerElement) === false
        );
      };
    }, [modalLayerElement, modalLayerStack, type]);

    useEffect(() => {
      if (
        (desiredOpenState === false && layerIsClosedOrClosing) ||
        (desiredOpenState === true && layerIsOpenOrOpening)
      ) {
        return;
      }

      const nextInternalOpenState =
        desiredOpenState === true ? 'opening' : 'closing';

      const eventHandler =
        desiredOpenState === true ? onBeforeOpen : onBeforeClose;

      setInternalOpenState(nextInternalOpenState);

      eventHandler?.(renderProps);
    }, [
      desiredOpenState,
      layerIsClosedOrClosing,
      layerIsOpenOrOpening,
      onBeforeClose,
      onBeforeOpen,
      renderProps,
    ]);

    const handleAnimationEnd = useCallback(() => {
      if (!layerIsOpeningOrClosing) {
        return;
      }

      const nextInternalOpenState =
        internalOpenState === 'closing' ? 'closed' : 'open';

      const eventHandler = internalOpenState === 'closing' ? onClose : onOpen;

      setInternalOpenState(nextInternalOpenState);

      eventHandler?.(renderProps);
    }, [
      internalOpenState,
      layerIsOpeningOrClosing,
      onClose,
      onOpen,
      renderProps,
    ]);

    const handleClickBackdrop = (event: MouseEvent) => {
      if (!disableBackdropClickToClose) {
        event.preventDefault();
        event.stopPropagation();

        renderProps.closeModal();
      }
    };

    const zIndex = tokens.zIndices['10--modalWindows'] + modalLayerStackIndex;

    return (
      <>
        {renderTrigger?.(renderProps)}
        {internalOpenState !== 'closed' &&
          createPortal(
            <BackdroppedBox
              styles={merge(
                {
                  cursor: 'default',
                  pointerEvents: disableBackdropClickToClose ? 'none' : 'all',
                  zIndex: zIndex - 1,
                },
                stylesForBackdrop,
                layerIsOpenOrOpening
                  ? stylesForBackdropOnOpen
                  : stylesForBackdropOnClose
              )}
              onClick={handleClickBackdrop}
            >
              <FocusTrap
                data-modal-layer-type={type}
                disabled={disableFocusTrap || layerIsClosedOrClosing}
                ref={multipleRefs}
                role="dialog"
                tabIndex={0}
                styles={merge(
                  {
                    animationFillMode: 'both',
                    animationName: layerIsOpenOrOpening
                      ? 'modalLayerEntry'
                      : 'modalLayerExit',
                    zIndex,
                  },
                  styles,
                  layerIsOpenOrOpening ? stylesOnOpen : stylesOnClose
                )}
                onAnimationEnd={handleAnimationEnd}
                {...otherProps}
              >
                {typeof children === 'function'
                  ? children(renderProps)
                  : children}
              </FocusTrap>
            </BackdroppedBox>,
            document.body
          )}
      </>
    );
  }
);

ModalLayer.displayName = 'ModalLayer';

export { ModalLayer, ModalLayerProvider };
