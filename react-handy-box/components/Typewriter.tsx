import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  HTMLElementFor,
  StyleProps,
  SupportedTags,
} from '@/react-handy-box/components/Box.types';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import merge from 'lodash/merge';
import random from 'lodash/random';
import throttle from 'lodash/throttle';
import { forwardRef, Ref, useEffect, useRef, useState } from 'react';
import { getScrollingParent } from '../utilities/getScrollingParent';

type DefaultTag = 'span';

type TypeWriterProps<TagName extends SupportedTags = DefaultTag> =
  BoxPropsWithoutRef<TagName> & {
    initialDirection?: 1 | -1;
    numCycles?: number;
    values: Array<
      | string
      | {
          styles?: StyleProps;
          value: string;
        }
    >;
  };

const Typewriter: <TagName extends SupportedTags = DefaultTag>(
  props: TypeWriterProps<TagName>
  // eslint-disable-next-line react/display-name
) => JSX.Element = forwardRef(
  <TagName extends SupportedTags = DefaultTag>(
    {
      initialDirection = -1,
      numCycles = Infinity,
      values,
      ...otherProps
    }: TypeWriterProps<TagName>,
    ref: Ref<HTMLElementFor<TagName>>
  ) => {
    const firstValue =
      typeof values[0] === 'object' ? values[0].value : values[0];
    const [isVisible, setIsVisible] = useState(false);
    const [direction, setDirection] = useState(initialDirection);
    const [counter, setCounter] = useState(0);
    const [currentValue, setCurrentValue] = useState(
      initialDirection === 1 ? '' : firstValue
    );
    const innerRef = useRef<HTMLElementFor<TagName>>();
    const refs = useMultipleRefs(ref, innerRef);
    const activeIndex = counter % values.length;
    const valueAtActiveIndex: string =
      typeof values[activeIndex] === 'object'
        ? (values[activeIndex] as { value: string }).value
        : (values[activeIndex] as string);

    useEffect(() => {
      const element = innerRef?.current;

      if (!element) {
        return;
      }

      const scrollingParent = getScrollingParent(element);

      const checkIfVisible = throttle(() => {
        const coords = element.getBoundingClientRect();
        const newIsVisible =
          coords.top >= 100 && coords.top <= scrollingParent.clientHeight;

        setIsVisible(newIsVisible);

        if (!isVisible && newIsVisible) {
          setDirection(initialDirection);
          setCurrentValue(initialDirection === 1 ? '' : firstValue);
          setCounter(0);
        }
      }, 3000);

      scrollingParent.addEventListener('scroll', checkIfVisible);

      return () => {
        scrollingParent.removeEventListener('scroll', checkIfVisible);
      };
    }, [firstValue, initialDirection, isVisible]);

    useEffect(() => {
      let innerTimer: any;

      const step = () => {
        if (!isVisible) {
          return;
        }

        if (direction === -1) {
          if (currentValue.length >= 1) {
            setCurrentValue(currentValue.slice(0, -1));
          } else {
            setDirection(1);
            setCounter((current) => current + 1);
          }
        } else {
          if (currentValue !== valueAtActiveIndex) {
            setCurrentValue(
              valueAtActiveIndex.slice(0, currentValue.length + 1)
            );
          } else {
            if (counter < numCycles) {
              innerTimer = setTimeout(() => {
                setDirection(-1);
              }, 3000);
            }
          }
        }
      };

      const timer = window.setTimeout(step, random(50, 150));

      return () => {
        clearTimeout(timer);
        clearTimeout(innerTimer);
      };
    }, [
      activeIndex,
      counter,
      currentValue,
      direction,
      isVisible,
      numCycles,
      valueAtActiveIndex,
      values,
    ]);

    return (
      <Box
        as="span"
        ref={refs}
        {...merge(
          {
            styles: (values[activeIndex] as any).styles ?? {},
          } as any,
          otherProps
        )}
      >
        {currentValue}
        <Box
          styles={{
            animationName: 'blink',
            backgroundColor: 'accent',
            borderRadius: 'circle',
            display: 'inline-block',
            height: '1em',
            position: 'relative',
            bottom: -8,
            width: 4,
          }}
        />
      </Box>
    );
  }
) as any;

export { Typewriter };
