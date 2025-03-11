import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { forwardRef, ReactNode, Ref } from 'react';

export type LoadableBoxProps = BoxPropsWithoutRef & {
  isLoading: boolean;
  loadingMessage?: ReactNode;
  unmountWhileLoading?: boolean;
};

const loadingProps = {
  alignItems: 'center',
  height: '100%',
  justifyContent: 'center',
  opacity: 0.5,
  width: '100%',
} as const;

const LoadableBox = forwardRef(
  (
    {
      children,
      isLoading,
      loadingMessage = 'Loading...',
      styles,
      unmountWhileLoading = true,
      ...otherProps
    }: LoadableBoxProps,
    ref: Ref<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      styles={{
        opacity: isLoading ? loadingProps.opacity : 1,
        position: 'relative',
        transitionDuration: 'long',
        transitionProperty: 'opacity',
        ...styles,
      }}
      {...(isLoading ? loadingProps : {})}
      {...otherProps}
    >
      {isLoading && (
        <Box
          styles={{
            alignItems: 'center',
            backgroundColor: 'background--shaded',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: '1000--maximum',
          }}
        >
          {loadingMessage}
        </Box>
      )}
      {unmountWhileLoading && isLoading ? '.' : children}
    </Box>
  )
);

LoadableBox.displayName = 'LoadableBox';

export { LoadableBox };
