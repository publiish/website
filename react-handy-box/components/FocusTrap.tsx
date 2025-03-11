import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  HTMLElementFor,
  SupportedTags,
} from '@/react-handy-box/components/Box.types';
import {
  KeyMap,
  useKeyboardShortcuts,
} from '@/react-handy-box/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { getFocusableElements } from '@/react-handy-box/utilities/getFocusableElements';
import { isOrContainsFocusedElement } from '@/react-handy-box/utilities/isOrContainsFocusedElement';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';
import { ExtendedKeyboardEvent } from 'mousetrap';
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useRef,
} from 'react';

type FocusTrappedElements = { current: Array<HTMLElement> };

const getRealFocusTrappedElements = (element?: HTMLElement) =>
  !element
    ? []
    : sortBy(
        getFocusableElements(element).filter(
          (el) => !el.matches('[data-is-focus-trap]')
        ),
        'tabIndex'
      );

const focusTrappedElements: FocusTrappedElements = { current: [] };

const focusTrapElement = (element: HTMLElement) => {
  const alreadyTracked = focusTrappedElements.current.find(
    (el) => el === element
  );

  if (!alreadyTracked) {
    focusTrappedElements.current.push(element);
  }

  // First one? Start enforcing
  if (focusTrappedElements.current.length === 1) {
    setIsEnforcingFocusTraps(true);
  }

  enforceFocusTraps();
};

const releaseElementFromFocusTrap = (element: HTMLElement) => {
  focusTrappedElements.current = focusTrappedElements.current.filter(
    (el) => el !== element
  );

  // Last one? Stop enforcing
  if (focusTrappedElements.current.length === 0) {
    setIsEnforcingFocusTraps(false);
  }

  enforceFocusTraps();
};

const enforceFocusTraps = (event?: FocusEvent) => {
  event?.preventDefault();

  const mostRecentFocusTrappedElement = last(focusTrappedElements.current);

  if (!mostRecentFocusTrappedElement) {
    return;
  }

  if (!isOrContainsFocusedElement(mostRecentFocusTrappedElement)) {
    const focusableElements = getRealFocusTrappedElements(
      mostRecentFocusTrappedElement
    );

    focusableElements[0]?.focus({ preventScroll: true });
  }
};

const setIsEnforcingFocusTraps = (newIsEnforcingFocusTraps: boolean) => {
  const addOrRemove = newIsEnforcingFocusTraps ? 'add' : 'remove';

  window[`${addOrRemove}EventListener`]('focusin', enforceFocusTraps as any);
};

const stylesForHiddenFocusableInput = {
  pointerEvents: 'none',
  position: 'absolute',
  width: '1px',
  height: '1px',
  opacity: 0.01,
} as CSSProperties;

type FocusTrapProps<E extends SupportedTags = 'div'> = Omit<
  BoxPropsWithoutRef<E>,
  'disabled'
> & {
  disabled?: boolean;
  enforceOnBlur?: boolean;
};

const FocusTrap = forwardRef(
  <E extends SupportedTags = 'div'>(
    {
      as = 'div',
      children,
      disabled,
      enforceOnBlur = true,
      styles,
      ...otherProps
    }: FocusTrapProps<E>,
    ref: Ref<HTMLElementFor<E>>
  ) => {
    const focusTrappedElementRef = useRef<HTMLElementFor<E>>();

    const multipleRefs = useMultipleRefs(ref, focusTrappedElementRef);

    const memoizedKeyMap = useMemo<KeyMap>(() => {
      const keysToListenFor = ['up', 'down'];

      const handler = (event: ExtendedKeyboardEvent, combo: string) => {
        const focusTrappedElement = focusTrappedElementRef.current;

        if (
          ['input', 'select', 'textarea'].includes(
            (event.target as HTMLElement).tagName.toLowerCase()
          ) ||
          (event.target as HTMLElement).isContentEditable === true ||
          !focusTrappedElement ||
          !isOrContainsFocusedElement(focusTrappedElement)
        ) {
          return;
        }

        const activeElement = document.activeElement as HTMLElement;

        const focusableElements = getFocusableElements(focusTrappedElement);

        const maxIndex = focusableElements.length - 1;

        const indexOfActiveElement = focusableElements.indexOf(activeElement);

        switch (combo) {
          case 'down':
            focusableElements[
              Math.min(maxIndex, indexOfActiveElement + 1)
            ]?.focus();
            break;

          case 'up':
            focusableElements[Math.max(0, indexOfActiveElement - 1)]?.focus();
            break;
        }

        return false;
      };

      return Object.fromEntries(
        keysToListenFor.map((key) => [key, handler])
      ) as KeyMap;
    }, []);

    useKeyboardShortcuts(memoizedKeyMap, focusTrappedElementRef.current);

    useEffect(() => {
      const focusTrappedElement = focusTrappedElementRef.current;

      if (!focusTrappedElement) {
        return;
      }

      if (!disabled && enforceOnBlur) {
        focusTrapElement(focusTrappedElement);
      } else {
        releaseElementFromFocusTrap(focusTrappedElement);
      }

      return () => {
        releaseElementFromFocusTrap(focusTrappedElement);
      };
    }, [disabled, enforceOnBlur]);

    useEffect(() => {
      enforceFocusTraps();
    }, [children]);

    return (
      <Box
        as={as}
        ref={multipleRefs}
        styles={{
          position: 'relative',
          ...styles,
        }}
        {...otherProps}
      >
        <input
          data-is-focus-trap="true"
          type="text"
          style={stylesForHiddenFocusableInput}
          onFocus={() => {
            const focusableElements = getRealFocusTrappedElements(
              focusTrappedElementRef.current
            );

            last(focusableElements)?.focus({
              preventScroll: true,
            });
          }}
        />

        {children}

        <input
          data-is-focus-trap="true"
          type="text"
          style={stylesForHiddenFocusableInput}
          onFocus={() => {
            const focusableElements = getRealFocusTrappedElements(
              focusTrappedElementRef.current
            );

            focusableElements[0]?.focus({ preventScroll: true });
          }}
        />
      </Box>
    );
  }
);

FocusTrap.displayName = 'FocusTrap';

export { FocusTrap };
