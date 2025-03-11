import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Text } from '@/react-handy-box/components/Text';
import { forwardRef, ReactNode, Ref } from 'react';

export type LabeledInputProps = {
  disabled?: boolean;
  errorMessage?: ReactNode;
  isRequired?: boolean;
  label: ReactNode;
  labelLocation?: 'above' | 'left' | 'hidden';
};

type LabeledInputComponentProps = LabeledInputProps &
  BoxPropsWithoutRef<'label'>;

const baseLabelProps: BoxPropsWithoutRef<'label'>['styles'] = {
  display: 'block',
  flexGrow: 1,
  flexShrink: 1,
};

const labelLocationPropMap: {
  [key in 'above' | 'left' | 'hidden']: {
    container?: BoxPropsWithoutRef<'label'>['styles'];
    label?: BoxPropsWithoutRef<'span'>['styles'];
  };
} = {
  above: {
    container: {
      display: 'flex',
      rowGap: 'xtight',
      width: '100%',
    },
  },
  hidden: {
    label: {
      display: 'none',
    },
  },
  left: {
    container: {
      alignItems: 'baseline',
      columnGap: 'tight',
      display: 'flex',
    },
    label: {
      textAlign: 'right',
      whiteSpace: 'nowrap',
    },
  },
};

const LabeledInput = forwardRef(
  (
    {
      children,
      disabled,
      errorMessage,
      isRequired = false,
      label,
      labelLocation = 'above',
      styles,
      ...otherProps
    }: LabeledInputComponentProps,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <Box
      as="label"
      ref={ref}
      styles={{
        ...baseLabelProps,
        ...labelLocationPropMap[labelLocation]?.container,
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : undefined,
        ...styles,
      }}
      tabIndex={0}
      {...otherProps}
    >
      {labelLocation !== 'hidden' && (
        <Text
          styles={labelLocationPropMap[labelLocation]?.label}
          variant="label"
        >
          {label}
          {isRequired && (
            <>
              {' '}
              <Text styles={{ color: 'accent' }}>*</Text>
            </>
          )}
        </Text>
      )}

      {children}

      {errorMessage && (
        <Box
          styles={{
            color: 'danger',
            fontSize: 'small',
          }}
        >
          {errorMessage}
        </Box>
      )}
    </Box>
  )
);

LabeledInput.displayName = 'LabeledInput';

export { LabeledInput };
