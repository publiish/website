import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Form } from '@/react-handy-box/components/Form';
import { Icon } from '@/react-handy-box/components/Icon';
import {
  ModalLayer,
  ModalLayerContext,
} from '@/react-handy-box/components/ModalLayer';
import { ModalWindowProps } from '@/react-handy-box/components/ModalLayer.types';
import { ScrollableBox } from '@/react-handy-box/components/ScrollableBox';
import { Tooltip } from '@/react-handy-box/components/Tooltip';
import { useGlobalInterval } from '@/react-handy-box/hooks/useGlobalInterval';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { tokens } from '@/tokens';
import merge from 'lodash/merge';
import {
  forwardRef,
  MouseEvent,
  Ref,
  useContext,
  useEffect,
  useRef,
} from 'react';

export const variantStylesMap = {
  small: {
    width: 300,
  },
  normal: {
    width: 550,
  },
  large: {
    width: 800,
  },
  fullscreen: {
    height: '100vh',
    width: '100vw',
  },
} as const;

const ModalWindow = forwardRef(
  (
    {
      children,
      disableBackdropClickToClose,
      propsForForm,
      renderFooter,
      renderHeader,
      styles,
      stylesForBackdrop,
      stylesForBackdropOnClose,
      stylesForBackdropOnOpen,
      type = 'window',
      variant = 'normal',
      ...otherProps
    }: ModalWindowProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const { modalLayerStack } = useContext(ModalLayerContext);

    const innerRef = useRef<HTMLElement>(null);

    const multipleRefs = useMultipleRefs(ref, innerRef);

    const { setGlobalInterval, clearGlobalInterval } = useGlobalInterval();

    const modalWindowsInStack = modalLayerStack.current.filter(
      (layer) => layer.type === 'window'
    );

    const isLowestModalWindowInStack =
      modalWindowsInStack.length === 0 ||
      modalWindowsInStack[0].element.isSameNode(innerRef.current);

    useEffect(() => {
      if (isLowestModalWindowInStack) {
        const positionMultipleWindows = () => {
          modalWindowsInStack.reverse().forEach((modalLayer, windowIndex) => {
            const offset = `calc(var(--white-space--normal) * -${windowIndex})`;

            modalLayer.element.style.marginLeft = offset;
            modalLayer.element.style.marginTop = offset;
          });
        };

        setGlobalInterval(positionMultipleWindows, 250);

        return () => {
          clearGlobalInterval(positionMultipleWindows, 250);
        };
      }
    }, [
      clearGlobalInterval,
      isLowestModalWindowInStack,
      modalWindowsInStack,
      setGlobalInterval,
    ]);

    const WrapperComponent = propsForForm ? Form : Box;

    return (
      <>
        <ModalLayer
          aria-describedby="modalWindowContent"
          aria-labelledby="modalWindowTitle"
          ref={multipleRefs}
          styles={merge(
            {},
            tokens.modalLayerVariants.window,
            variantStylesMap[variant],
            styles
          )}
          stylesForBackdrop={merge(
            isLowestModalWindowInStack
              ? {
                  ...tokens.modalBackdropStyles,
                  ...stylesForBackdrop,
                }
              : {},
            disableBackdropClickToClose === true
              ? { pointerEvents: 'none' }
              : {}
          )}
          stylesForBackdropOnClose={{
            animationName: 'backdropExit',
          }}
          stylesForBackdropOnOpen={{
            animationName: 'backdropEntry',
          }}
          stylesOnClose={{
            animationName: 'modalWindowExit',
          }}
          stylesOnOpen={{
            animationName: 'modalWindowEntry',
          }}
          type={type}
          {...(otherProps as any)}
        >
          {(renderProps) => {
            const resolvedPropsForForm =
              (typeof propsForForm === 'function'
                ? propsForForm(renderProps)
                : propsForForm) ?? {};

            return (
              <WrapperComponent
                styles={{
                  alignItems: 'stretch',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'stretch',
                  width: '100%',
                  ...resolvedPropsForForm.styles,
                }}
                {...resolvedPropsForForm}
              >
                <Box
                  styles={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    right: 'tight',
                    top: 'tight',
                    zIndex: '1--stickyElements',
                  }}
                >
                  <Tooltip content="Close Window">
                    <Button
                      aria-label="Close Window"
                      variant="iconOnly"
                      onClick={(event: MouseEvent) => {
                        event.preventDefault();
                        event.stopPropagation();
                        renderProps.closeModal();
                      }}
                    >
                      <Icon name="xmark" />
                    </Button>
                  </Tooltip>
                </Box>

                {renderHeader && (
                  <Box
                    as="header"
                    styles={
                      !renderHeader
                        ? {
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 'normal',
                          }
                        : {}
                    }
                  >
                    {renderHeader(renderProps)}
                  </Box>
                )}

                <ScrollableBox
                  as="main"
                  className="js-modal-window-scrolling-element"
                  id="modalWindowContent"
                  styles={{
                    flexGrow: 1,
                    flexShrink: 1,
                    marginBottom: renderFooter ? undefined : 'normal',
                    marginTop: renderHeader ? undefined : 'normal',
                    paddingX: 'normal',
                    width: '100%',
                  }}
                >
                  {typeof children === 'function'
                    ? children(renderProps)
                    : children}
                </ScrollableBox>

                {renderFooter && (
                  <Box
                    as="footer"
                    styles={
                      !renderFooter
                        ? {
                            paddingX: 'normal',
                            paddingY: 'tight',
                          }
                        : {}
                    }
                  >
                    {renderFooter(renderProps)}
                  </Box>
                )}
              </WrapperComponent>
            );
          }}
        </ModalLayer>
      </>
    );
  }
);

ModalWindow.displayName = 'ModalWindow';

export { ModalWindow };
