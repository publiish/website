import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  HTMLElementFor,
  StyleProps,
  SupportedTags,
} from '@/react-handy-box/components/Box.types';
import { TextVariantName } from '@/react-handy-box/types';
import { tokens } from '@/tokens';
import { Children, forwardRef, Ref } from 'react';

type TextProps<E extends SupportedTags = 'span'> = Omit<
  BoxPropsWithoutRef<E>,
  'size' | 'style' | 'weight'
> & {
  preventWidows?: boolean;
  size?: StyleProps['fontSize'];
  style?: StyleProps['fontStyle'];
  variant?: TextVariantName;
  weight?: StyleProps['fontWeight'];
};

const Text = forwardRef(
  <E extends SupportedTags = 'span'>(
    {
      children,
      preventWidows = false,
      size,
      style,
      styles,
      variant,
      weight,
      ...otherProps
    }: TextProps<E>,
    ref: Ref<HTMLElementFor<E>>
  ) => {
    const variantStyles = variant ? tokens.textVariants[variant] : {};

    return (
      <Box
        as="span"
        dangerouslySetInnerHTML={
          preventWidows
            ? {
                __html: Children.map(children, (child) => child),
              }
            : undefined
        }
        ref={ref}
        styles={{
          ...variantStyles,
          ...(size ? { fontSize: size } : {}),
          ...(style ? { fontStyle: style } : {}),
          ...(weight ? { fontWeight: weight } : {}),
          ...styles,
        }}
        {...(otherProps as any)}
      >
        {!preventWidows && children}
      </Box>
    );
  }
);

Text.displayName = 'Text';

export { Text };
