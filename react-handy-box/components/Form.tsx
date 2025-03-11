import { Box } from '@/react-handy-box/components/Box';
import {
  FormContextObject,
  FormFieldDescriptor,
  FormFieldRegistry,
  FormFieldRegistryEntry,
  FormProps,
} from '@/react-handy-box/components/Form.types';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import mapValues from 'lodash/mapValues';
import {
  ChangeEvent,
  createContext,
  FormEvent,
  forwardRef,
  ReactNode,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const emptyFormContext: FormContextObject = {
  getFieldValues: () => ({}),
  registerFormField: () => null,
  resetField: () => null,
  resetForm: () => null,
  setFieldValue: () => null,
  setIsDirty: () => null,
  submitForm: () => null,
};

const FormContext = createContext<FormContextObject>(emptyFormContext);

const useFormField = <IsMultiValue extends boolean>(
  fieldDescriptor: FormFieldDescriptor<IsMultiValue>
) => {
  const formContext = useContext(FormContext);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ReactNode>();

  useEffect(
    () => () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    },
    []
  );

  const getFieldValue = () => {
    const fieldValues = formContext.getFieldValues();
    return fieldValues[fieldDescriptor.name];
  };

  const defaultValue = (fieldDescriptor.defaultValue ??
    (fieldDescriptor.isMultiValue ? [] : '')) as IsMultiValue extends true
    ? Array<string>
    : string;

  const formFieldRegistryEntry: FormFieldRegistryEntry<IsMultiValue> = {
    defaultValue,
    disabled: fieldDescriptor.disabled ?? false,
    isMultiValue: (fieldDescriptor.isMultiValue ?? false) as IsMultiValue,
    isRequired: fieldDescriptor.isRequired ?? false,
    name: fieldDescriptor.name,
    ref: fieldDescriptor.ref ?? null,

    onBlur: () => {
      formFieldRegistryEntry.onValidate(getFieldValue());
      setTouched(true);
    },

    onChange: (event?: ChangeEvent) => {
      // Allow the field to re-render before validating
      timer.current = setTimeout(() => {
        fieldDescriptor.onChange?.(event, formContext);

        if (touched) {
          formContext.setIsDirty(true);
          formFieldRegistryEntry.onValidate(getFieldValue());
        }
      }, 1);
    },

    onRead: (
      fieldValue: IsMultiValue extends true
        ? Array<FormDataEntryValue>
        : FormDataEntryValue
    ) => fieldDescriptor.onRead?.(fieldValue, formContext) ?? fieldValue,

    onReset: () => {
      setTouched(false);

      setErrorMessage(null);

      formContext.setFieldValue(fieldDescriptor.name, defaultValue);

      fieldDescriptor.onReset?.(formContext);
    },

    onValidate: (valueOrValues: unknown | Array<unknown>) => {
      if (
        fieldDescriptor.isRequired &&
        ((fieldDescriptor.isMultiValue &&
          !(valueOrValues as Array<unknown>).length) ||
          !valueOrValues)
      ) {
        const newErrorMessage = 'Oops. This field is required!';

        setErrorMessage(newErrorMessage);

        return newErrorMessage;
      }

      const validationResult =
        fieldDescriptor.onValidate?.(valueOrValues, formContext) ?? true;

      setErrorMessage(validationResult !== true ? validationResult : undefined);

      return validationResult;
    },

    onWrite: (newValue) => {
      fieldDescriptor.onWrite?.(newValue, formContext);
      fieldDescriptor.onChange?.(new Event('change') as any, formContext);
    },
  };

  formContext.registerFormField(formFieldRegistryEntry);

  return {
    propsForInput: {
      defaultValue: formFieldRegistryEntry.defaultValue,
      disabled: formFieldRegistryEntry.disabled,
      name: formFieldRegistryEntry.name,
      onBlur: formFieldRegistryEntry.onBlur,
      onChange: formFieldRegistryEntry.onChange,
    },
    propsForLabel: {
      disabled: formFieldRegistryEntry.disabled,
      errorMessage,
      isRequired: formFieldRegistryEntry.isRequired,
    },
    touched,
  };
};

const Form = forwardRef(
  (
    {
      children,
      styles,
      onDirtyStateChange,
      onSubmit,
      ...otherProps
    }: FormProps,
    ref: Ref<HTMLFormElement>
  ): JSX.Element => {
    const [isDirty, setIsDirty] = useState(false);
    const formElementRef = useRef<HTMLFormElement>();
    const multipleRefs = useMultipleRefs(formElementRef, ref);
    const formFieldRegistryRef = useRef<FormFieldRegistry>({});

    useEffect(() => {
      onDirtyStateChange?.(isDirty);
    }, [isDirty, onDirtyStateChange]);

    const getFieldValues: () => Record<string, unknown> = () => {
      const formElement = formElementRef.current;
      const formFieldRegistry = formFieldRegistryRef.current;

      if (!formElement) {
        return {};
      }

      const formData = new FormData(formElement);

      const transformedData = mapValues(
        formFieldRegistry,
        (fieldDescriptor, fieldName) => {
          const fieldValueOrValues = fieldDescriptor.isMultiValue
            ? ((formData.getAll(fieldName) ?? []) as Array<FormDataEntryValue>)
            : ((formData.get(fieldName) ?? '') as FormDataEntryValue);

          return (
            fieldDescriptor.onRead(fieldValueOrValues) ?? fieldValueOrValues
          );
        }
      );

      return transformedData;
    };

    const setFieldValue = (
      fieldName: keyof typeof formFieldRegistryRef.current,
      newValue: string | number | Array<string | number> = ''
    ) => {
      const formElement = formElementRef.current;

      if (!formElement) {
        throw new Error('Cannot set value of field with no <Form> parent');
      }

      const formData = new FormData(formElement);

      if (Array.isArray(newValue)) {
        formData.set(fieldName, '');
        newValue.forEach((v) => formData.append(fieldName, String(v)));
      } else {
        formData.set(fieldName, String(newValue));
      }

      formFieldRegistryRef.current[fieldName].onWrite(newValue, formContext);
    };

    const registerFormField = <IsMultiValue extends boolean>(
      formFieldRegistryEntry: FormFieldRegistryEntry<IsMultiValue>
    ) => {
      if (formFieldRegistryEntry.name) {
        formFieldRegistryRef.current[formFieldRegistryEntry.name] =
          formFieldRegistryEntry;
      }
    };

    const handleReset = () => {
      const formElement = formElementRef.current;

      if (!formElement) {
        return;
      }

      const formFieldRegistry = formFieldRegistryRef.current;

      Object.keys(formFieldRegistry).forEach((fieldName) => {
        formFieldRegistry[fieldName].onReset();
      });

      setIsDirty(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const fieldValues = getFieldValues();

      const formFieldRegistry = formFieldRegistryRef.current;

      let allFieldsPassValidation = true;

      Object.keys(formFieldRegistry).forEach((fieldName) => {
        const formFieldRegistryEntry = formFieldRegistry[fieldName];

        const validationResult = formFieldRegistryEntry.onValidate(
          fieldValues[fieldName],
          formContext
        );

        if (validationResult !== true) {
          allFieldsPassValidation = false;
        }
      });

      if (allFieldsPassValidation) {
        onSubmit?.(event, formContext);
        handleReset();
      }
    };

    const resetField = (
      fieldName: keyof typeof formFieldRegistryRef.current
    ) => {
      formFieldRegistryRef.current[fieldName].onReset(formContext);
    };

    const formContext: FormContextObject = {
      getFieldValues,
      registerFormField,
      resetField,
      resetForm: handleReset,
      setFieldValue,
      setIsDirty,
      submitForm: handleSubmit,
    };

    return (
      <FormContext.Provider value={formContext}>
        <Box
          as="form"
          ref={multipleRefs}
          styles={{ width: '100%', ...styles }}
          onReset={handleReset}
          onSubmit={handleSubmit}
          {...otherProps}
        >
          {children}
        </Box>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

export { Form, FormContext, useFormField };
