import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { forwardRef, MouseEvent, Ref } from 'react';

type PropagationStopperProps = BoxPropsWithoutRef & {
  disabled?: boolean;
};

const PropagationStopper = forwardRef(
  (
    { children, disabled, ...otherProps }: PropagationStopperProps,
    ref: Ref<HTMLDivElement>
  ): JSX.Element => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Box
        ref={ref}
        onClick={!disabled ? handleClick : undefined}
        {...otherProps}
      >
        {children}
      </Box>
    );
  }
);

PropagationStopper.displayName = 'PropagationStopper';

export { PropagationStopper };
