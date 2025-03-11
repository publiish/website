import { Box } from '@/react-handy-box/components/Box';
import {
  TextInput,
  TextInputProps,
} from '@/react-handy-box/components/TextInput';
import { useGlobalInterval } from '@/react-handy-box/hooks/useGlobalInterval';
import { useKeyboardShortcuts } from '@/react-handy-box/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { tokens } from '@/tokens';
import { forwardRef, Ref, useCallback, useEffect, useRef } from 'react';

const ElasticTextInput = forwardRef(
  (
    { styles, ...otherProps }: Omit<TextInputProps<'textarea'>, 'type'>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const ghostElementRef = useRef<HTMLDivElement>(null);
    const labelElementRef = useRef<HTMLLabelElement>(null);
    const multipleRefs = useMultipleRefs(ref, labelElementRef);

    useKeyboardShortcuts(
      {
        enter: (event) => {
          event.preventDefault();
          (event.target as HTMLTextAreaElement).form?.dispatchEvent(
            new Event('submit', { bubbles: true })
          );
        },
      },
      labelElementRef
    );

    const resizeTextareaElement = useCallback(() => {
      const ghostElement = ghostElementRef.current;

      const textareaElement =
        labelElementRef.current?.querySelector('textarea');

      if (!textareaElement || !ghostElement) {
        return;
      }

      const typedText = textareaElement.value;

      ghostElement.innerText = `${typedText}.`;

      const { width: ghostElementWidth, height: ghostElementHeight } =
        ghostElement.getBoundingClientRect();

      textareaElement.style.width = `${Math.ceil(ghostElementWidth)}px`;
      textareaElement.style.height = `${Math.ceil(ghostElementHeight)}px`;
    }, []);

    useGlobalInterval(resizeTextareaElement, 250);

    return (
      <Box
        styles={{
          position: 'relative',
          width: '100%',
        }}
      >
        <TextInput
          ref={multipleRefs}
          rows={1}
          styles={{
            overflow: 'hidden',
            width: '100%',
            ...styles,
          }}
          type="textarea"
          onChange={resizeTextareaElement}
          onKeyUp={resizeTextareaElement}
          onReset={resizeTextareaElement}
          {...otherProps}
        />
        <Box
          as="div"
          ref={ghostElementRef}
          styles={{
            ...tokens.inputStyles,
            ...styles,
            opacity: 0,
            pointerEvents: 'none',
            position: 'absolute',
            whiteSpace: 'pre-wrap',
          }}
        />
      </Box>
    );
  }
);

ElasticTextInput.displayName = 'ElasticTextInput';

export { ElasticTextInput };
