import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { LabeledInputProps } from '@/react-handy-box/components/LabeledInput';
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  RefObject,
} from 'react';

export type CommonFormInputProps<IsMultiValue extends boolean> = {
  defaultValue?: IsMultiValue extends true
    ? Array<string | number>
    : string | number;
  description?: ReactNode;
  disabled?: boolean;
  isMultiValue?: IsMultiValue;
  isRequired?: boolean;
  label: ReactNode;
  labelLocation?: 'above' | 'left' | 'hidden';
  propsForLabel?: Partial<LabeledInputProps>;
  name: string;
  onChange?: FormFieldChangeHandler;
  onFocus?: FormFieldFocusHandler;
  onRead?: FormFieldReadHandler<IsMultiValue>;
  onReset?: FormFieldResetHandler;
  onValidate?: FormFieldValidationHandler;
  onWrite?: FormFieldWriteHandler<IsMultiValue>;
};

export type FormContextObject = {
  getFieldValues: () => Record<string, unknown>;
  registerFormField: <IsMultiValue extends boolean>(
    fieldRegistryEntry: FormFieldRegistryEntry<IsMultiValue>
  ) => void;
  resetField: (fieldName: string) => void;
  resetForm: () => void;
  setFieldValue: (
    fieldName: string,
    value: string | number | Array<string | number>
  ) => void;
  setIsDirty: (newIsDirty: boolean) => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
};

export type FormFieldBlurHandler = (
  event?: FormEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldChangeHandler = (
  event?: ChangeEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldClickHandler = (
  event: MouseEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldDescriptor<IsMultiValue extends boolean> = {
  defaultValue?: IsMultiValue extends true
    ? Array<string | number>
    : string | number;
  disabled?: boolean;
  isMultiValue?: IsMultiValue;
  isRequired?: boolean;
  ref?: RefObject<unknown> | null;
  name: string;
  onBlur?: FormFieldBlurHandler;
  onChange?: FormFieldChangeHandler;
  onRead?: FormFieldReadHandler<IsMultiValue>;
  onReset?: FormFieldResetHandler;
  onValidate?: FormFieldValidationHandler;
  onWrite?: FormFieldWriteHandler<IsMultiValue>;
};

export type FormFieldFocusHandler = (
  event?: FocusEvent,
  formContext?: FormContextObject
) => void;

export type FormFieldReadHandler<IsMultiValue extends boolean> = (
  valueOrValues: IsMultiValue extends true
    ? Array<FormDataEntryValue>
    : FormDataEntryValue,
  formContext?: FormContextObject
) => unknown | Array<unknown>;

export type FormFieldRegistry = Record<string, FormFieldRegistryEntry<boolean>>;

export type FormFieldRegistryEntry<IsMultiValue extends boolean> = Required<
  FormFieldDescriptor<IsMultiValue>
>;

export type FormFieldResetHandler = (formContext?: FormContextObject) => void;

export type FormFieldValidationHandler = (
  valueOrValues: unknown | Array<unknown>,
  formContext?: FormContextObject
) => true | ReactNode;

export type FormFieldWriteHandler<IsMultiValue extends boolean> = (
  newValue?: IsMultiValue extends true
    ? Array<string | number>
    : string | number,
  formContext?: FormContextObject
) => void;

export type FormProps = Omit<BoxPropsWithoutRef<'form'>, 'onSubmit'> & {
  onDirtyStateChange?: (isStateDirty: boolean) => void;
  onSubmit?: (
    event: FormEvent<HTMLFormElement>,
    formContext?: FormContextObject
  ) => void | Promise<void>;
  onValidate?: FormFieldValidationHandler;
};
