import { Box } from '@/react-handy-box/components/Box';
import { IconProps } from '@/react-handy-box/components/Icon.types';
import merge from 'lodash/merge';
import { forwardRef, Ref } from 'react';

const Icon = forwardRef(
  (
    { name = 'face-sad-sweat', variant = 'regular', ...otherProps }: IconProps,
    ref: Ref<HTMLSpanElement>
  ) => (
    <Box
      as="span"
      {...merge({ styles: { display: 'inline-block' } }, otherProps)}
    >
      <Box
        as="span"
        className={`fa-${variant} fa-${name} fa-1x fa-fw`}
        key={`${name}-${variant}`}
        ref={ref}
        styles={{
          display: 'inline-block',
        }}
      />
    </Box>
  )
);

Icon.displayName = 'Icon';

export { Icon };
