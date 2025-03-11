import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { useFormField } from '@/react-handy-box/components/Form';
import { CommonFormInputProps } from '@/react-handy-box/components/Form.types';
import { LabeledInput } from '@/react-handy-box/components/LabeledInput';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { tokens } from '@/tokens';
import { FocusEventHandler, forwardRef, Ref, useRef } from 'react';

export type SupportedInputTypes =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'email'
  | 'password'
  | 'phone';

export type TagNameForInputType<InputType extends SupportedInputTypes> =
  InputType extends 'textarea' ? 'textarea' : 'input';

export type TextInputProps<InputType extends SupportedInputTypes = 'text'> =
  Omit<
    BoxPropsWithoutRef<TagNameForInputType<InputType>>,
    'type' | 'defaultValue' | 'onChange'
  > & {
    type?: InputType;
  } & CommonFormInputProps<false>;

// eslint-disable-next-line react/display-name
const TextInput = forwardRef(
  <InputType extends SupportedInputTypes = 'text'>(
    {
      defaultValue,
      disabled,
      isRequired,
      label,
      labelLocation,
      name,
      styles,
      type = 'text' as InputType,
      onChange,
      onRead,
      onReset,
      onValidate,
      ...otherProps
    }: TextInputProps<InputType>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const inputElementRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const { propsForInput, propsForLabel } = useFormField({
      defaultValue,
      disabled,
      isRequired,
      name,
      ref: inputElementRef,
      onChange,
      onRead,
      onReset,
      onValidate,
    });

    const handleFocus: FocusEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
      event.target.select();
    };

    return (
      <LabeledInput
        label={label}
        labelLocation={labelLocation}
        ref={ref}
        {...propsForLabel}
      >
        <Box
          as={type === 'textarea' ? 'textarea' : 'input'}
          ref={inputElementRef}
          styles={tokens.inputStyles}
          type={type === 'textarea' ? undefined : type}
          onFocus={handleFocus}
          {...propsForInput}
          {...(otherProps as any)}
        />
      </LabeledInput>
    );
  }
) as <InputType extends SupportedInputTypes = 'text'>(
  props: TextInputProps<InputType> & { ref?: Ref<HTMLLabelElement> }
) => JSX.Element;

(TextInput as any).displayName = 'TextInput';

export { TextInput };
