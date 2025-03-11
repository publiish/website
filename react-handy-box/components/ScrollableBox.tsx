import { Box } from '@/react-handy-box/components/Box';
import {
  BoxPropsWithoutRef,
  HTMLElementFor,
  SupportedTags,
  WhiteSpaceNameOrLength,
} from '@/react-handy-box/components/Box.types';
import { useGlobalInterval } from '@/react-handy-box/hooks/useGlobalInterval';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { forwardRef, ReactNode, Ref, useEffect, useRef, useState } from 'react';

const OverflowIndicator = forwardRef(
  ({ styles, ...otherProps }: BoxPropsWithoutRef, ref: Ref<HTMLDivElement>) => (
    <Box
      ref={ref}
      styles={{
        height: 10,
        left: 0,
        marginTop: -10,
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'sticky',
        right: 0,
        transitionProperty: 'opacity',
        zIndex: '1--stickyElements',
        ...styles,
      }}
      {...otherProps}
    >
      <Box
        styles={{
          borderRadius: '100%',
          boxShadow: 'normal',
          height: 10,
          transform: 'translateY(-100%)',
          width: '100%',
        }}
      />
    </Box>
  )
);

OverflowIndicator.displayName = 'OverflowIndicator';

type ScrollableBoxProps<TagName extends SupportedTags = 'div'> = Omit<
  BoxPropsWithoutRef<TagName>,
  'children'
> & {
  children: ReactNode;
  offsetBottomOverflowIndicator?: WhiteSpaceNameOrLength;
  offsetTopOverflowIndicator?: WhiteSpaceNameOrLength;
};

const ScrollableBox = forwardRef(
  <TagName extends SupportedTags = 'div'>(
    {
      as = 'div',
      children,
      offsetBottomOverflowIndicator,
      offsetTopOverflowIndicator,
      styles,
      ...otherProps
    }: ScrollableBoxProps<TagName>,
    ref: Ref<HTMLElementFor<TagName>>
  ) => {
    const { setGlobalInterval, clearGlobalInterval } = useGlobalInterval();
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [isScrolledToTop, setIsScrolledToTop] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const scrollingElementRef = useRef<HTMLElementFor<TagName>>(null);
    const multipleRefs = useMultipleRefs(ref, scrollingElementRef);

    useEffect(() => {
      const scrollingElement = scrollingElementRef.current;

      if (scrollingElement) {
        const updateScrollInfo = () => {
          const originalOverflowY = scrollingElement.style.overflowY;

          scrollingElement.style.overflowY = 'auto';

          const elementHeight = scrollingElement.clientHeight;
          const scrollHeight = scrollingElement.scrollHeight;
          const scrollTop = scrollingElement.scrollTop;
          const newIsOverflowing = scrollHeight > elementHeight;
          const scrollProgress =
            ((scrollTop + elementHeight) / scrollHeight) * 100;
          const newIsScrolledToBottom = scrollProgress >= 99;
          const newIsScrolledToTop = scrollTop === 0;

          scrollingElement.style.overflowY = originalOverflowY;

          if (newIsScrolledToBottom !== isScrolledToBottom) {
            setIsScrolledToBottom(newIsScrolledToBottom);
          }

          if (newIsScrolledToTop !== isScrolledToTop) {
            setIsScrolledToTop(newIsScrolledToTop);
          }

          if (newIsOverflowing !== isOverflowing) {
            setIsOverflowing(newIsOverflowing);
          }
        };

        updateScrollInfo();

        scrollingElement.addEventListener('scroll', updateScrollInfo);
        scrollingElement.addEventListener('transitionend', updateScrollInfo);

        setGlobalInterval(updateScrollInfo, 250);

        return () => {
          scrollingElement.removeEventListener('scroll', updateScrollInfo);
          scrollingElement.removeEventListener(
            'transitionend',
            updateScrollInfo
          );
          clearGlobalInterval(updateScrollInfo, 250);
        };
      }
    });

    return (
      <Box
        as={as}
        ref={multipleRefs}
        styles={{
          overflowX: 'hidden',
          overflowY: isOverflowing ? 'auto' : undefined,
          position: 'relative',
          width: '100%', // scrollbar
          ...styles,
        }}
        {...otherProps}
      >
        <OverflowIndicator
          styles={{
            opacity: isScrolledToTop ? 0 : 1,
            top: offsetTopOverflowIndicator ?? 0,
          }}
        />

        {children}

        <OverflowIndicator
          styles={{
            bottom: offsetBottomOverflowIndicator ?? 0,
            opacity: isScrolledToBottom ? 0 : 1,
            transform: 'rotate(180deg)',
          }}
        />
      </Box>
    );
  }
);

ScrollableBox.displayName = 'ScrollableBox';

export { ScrollableBox };
