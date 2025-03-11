import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  BoxPropsWithRef,
} from '@/react-handy-box/components/Box.types';
import { useFormField } from '@/react-handy-box/components/Form';
import { CommonFormInputProps } from '@/react-handy-box/components/Form.types';
import { LabeledInput } from '@/react-handy-box/components/LabeledInput';
import {
  createRef,
  forwardRef,
  MouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type BaseOptionShape = {
  key: string;
  label: ReactNode;
  value: string;
};

export type AbstractMultiSelectInputRenderProps<
  OptionShape extends BaseOptionShape
> = {
  options: Array<{
    isSelected: boolean;
    option: OptionShape;
    propsForOption: BoxPropsWithRef<'button'>;
  }>;
  selectedOptions: Array<OptionShape>;
};

export type AbstractMultiSelectInputProps<
  OptionShape extends BaseOptionShape,
  IsMultiValue extends boolean
> = {
  defaultValue?: IsMultiValue extends true ? Array<string> : string;
  isMultiValue: IsMultiValue;
  name: string;
  options: Array<OptionShape>;
  renderOptions: (
    props: AbstractMultiSelectInputRenderProps<OptionShape>
  ) => JSX.Element | Array<JSX.Element>;
} & CommonFormInputProps<IsMultiValue> &
  Omit<BoxPropsWithoutRef<'div'>, 'children' | 'onChange'>;

// eslint-disable-next-line react/display-name
const AbstractMultiSelectInput = forwardRef(
  <OptionShape extends BaseOptionShape, IsMultiValue extends boolean>(
    {
      defaultValue,
      disabled,
      id,
      isMultiValue,
      isRequired,
      label,
      labelLocation,
      name,
      options,
      renderOptions,
      onChange,
      onRead,
      onReset,
      onWrite,
      onValidate,
      ...otherProps
    }: AbstractMultiSelectInputProps<OptionShape, IsMultiValue>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const [selectedOptions, setSelectedOptions] = useState<Array<OptionShape>>(
      []
    );

    const setFieldValue = useCallback(
      (
        newFieldValue?: IsMultiValue extends true
          ? Array<string | number>
          : string | number
      ) => {
        if (!newFieldValue) {
          setSelectedOptions([]);
          return;
        }

        if (
          (isMultiValue && !Array.isArray(newFieldValue)) ||
          (!isMultiValue && Array.isArray(newFieldValue))
        ) {
          throw new Error(
            `\`defaultValue\` type is incompatible with \`isMultiValue={${String(
              isMultiValue
            )}}\``
          );
        }

        const newSelectedOptions = options.filter((option) =>
          isMultiValue === true
            ? (newFieldValue as Array<string | number>).includes(option.value)
            : option.value === newFieldValue
        );

        setSelectedOptions(newSelectedOptions);
      },
      [isMultiValue, options]
    );

    const { propsForInput, propsForLabel, touched } =
      useFormField<IsMultiValue>({
        defaultValue,
        disabled,
        isMultiValue,
        isRequired,
        name,
        onChange,
        onRead,
        onValidate,
        onWrite: setFieldValue,
      });

    useEffect(() => {
      setFieldValue(defaultValue);
    }, [defaultValue, setFieldValue]);

    const handleClickOption = (option: OptionShape, event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (selectedOptions.includes(option)) {
        setSelectedOptions((currentSelectedOptions) =>
          currentSelectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        );
      } else if (isMultiValue) {
        setSelectedOptions((currentSelectedOptions) =>
          currentSelectedOptions.concat(option)
        );
      } else {
        setSelectedOptions([option]);
      }

      propsForInput.onChange();
    };

    useEffect(() => {
      if (touched) {
        propsForInput.onBlur();
      }
    }, [propsForInput, selectedOptions, touched]);

    return (
      <LabeledInput
        label={label}
        labelLocation={labelLocation}
        ref={ref}
        {...propsForLabel}
      >
        <Box {...otherProps}>
          {renderOptions({
            options: options.map((option) => ({
              isSelected: selectedOptions.includes(option),
              option,
              propsForOption: {
                key: option.key,
                ref: createRef(),
                styles: {
                  cursor: 'pointer',
                },
                tabIndex: 0,
                onBlur: propsForInput.onBlur,
                onClick: handleClickOption.bind(null, option),
              },
            })),
            selectedOptions,
          })}

          {selectedOptions.map((selectedOption) => (
            <input
              key={selectedOption.key}
              type="hidden"
              name={name}
              value={selectedOption.value}
            />
          ))}
        </Box>
      </LabeledInput>
    );
  }
) as <OptionShape extends BaseOptionShape, IsMultiValue extends boolean>(
  props: AbstractMultiSelectInputProps<OptionShape, IsMultiValue> & {
    ref?: Ref<HTMLLabelElement>;
  }
) => JSX.Element;

(AbstractMultiSelectInput as any).displayName = 'AbstractMultiSelectInput';

export { AbstractMultiSelectInput };
