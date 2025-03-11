import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import last from 'lodash/last';
import sortBy from 'lodash/sortBy';
import { forwardRef, ReactNode, Ref, useEffect, useState } from 'react';

type PhraseCyclerProps = Omit<BoxPropsWithoutRef<'span'>, 'children'> & {
  /** Time in milliseconds to show each phrase; default is `2000` */
  duration?: number;
  phrases: Array<ReactNode>;
};

const PhraseCycler = forwardRef(
  (
    { duration = 2000, phrases, styles, ...otherProps }: PhraseCyclerProps,
    ref: Ref<HTMLSpanElement>
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setActiveIndex((activeIndex + 1) % phrases.length);
      }, duration);

      return () => clearTimeout(timeout);
    }, [activeIndex, duration, phrases.length]);

    const longestPhrase = last(sortBy(phrases, 'length'));

    return (
      <Box
        as="span"
        ref={ref}
        styles={{
          display: 'inline-block',
          position: 'relative',
          whiteSpace: 'nowrap',
          ...styles,
        }}
        {...otherProps}
      >
        {/* Inflate to fit longest phrase */}
        <Box as="span" styles={{ opacity: 0 }}>
          {longestPhrase}
        </Box>

        {phrases.map((phrase, index) => {
          const isActive = activeIndex === index;

          return (
            <Box
              as="span"
              key={index}
              styles={{
                animationFillMode: 'forwards',
                animationName: isActive ? 'dropIn' : 'dropOut',
                left: 0,
                position: 'absolute',
                top: 0,
              }}
            >
              {phrase}
            </Box>
          );
        })}
      </Box>
    );
  }
);

PhraseCycler.displayName = 'PhraseCycler';

export { PhraseCycler };
