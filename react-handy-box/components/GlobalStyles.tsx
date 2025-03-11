import { colorAliasesByTheme, colorPalette } from '@/react-handy-box/colors';
import { stylesToStyleObject } from '@/react-handy-box/components/Box';
import {
  BreakpointName,
  ColorThemeName,
  FontSizeName,
  WhitespaceName,
} from '@/react-handy-box/types';
import { mapKeysToCSSVariables } from '@/react-handy-box/utilities/mapKeysToCSSVariables';
import { tokenNames } from '@/tokenNames';
import { tokens } from '@/tokens';
import { mapValues } from 'lodash';
import merge from 'lodash/merge';
import { createGlobalStyle } from 'styled-components';

const GlobalAnimations = createGlobalStyle`
    ${Object.entries(tokens.animations).map(
      ([animationName, animationDescriptor]) => `
        @keyframes ${animationName} {
          ${animationDescriptor.keyframes}
        }
      `
    )}
`;

const fontSizesByBreakpoint: Partial<
  Record<BreakpointName, Partial<Record<FontSizeName, string>>>
> = {};

const lineHeightsByBreakpoint: Partial<
  Record<BreakpointName, Partial<Record<FontSizeName, string>>>
> = {};

const { fontSizesAndLineHeights } = tokens;

if ('root' in fontSizesAndLineHeights) {
  Object.entries(fontSizesAndLineHeights).forEach(
    ([breakpointName, fontSizeAndLineHeightMap]) => {
      const typedBreakpointName = breakpointName as BreakpointName;

      fontSizesByBreakpoint[typedBreakpointName] = mapValues(
        fontSizeAndLineHeightMap,
        (v) => v![0]
      );

      lineHeightsByBreakpoint[typedBreakpointName] = mapValues(
        fontSizeAndLineHeightMap,
        (v) => v![1]
      );
    }
  );
} else {
  fontSizesByBreakpoint['root'] = mapValues(
    fontSizesAndLineHeights,
    (v) => v![0]
  ) as any;

  lineHeightsByBreakpoint['root'] = mapValues(
    fontSizesAndLineHeights,
    (v) => v![1]
  ) as any;
}

const whitespacesByBreakpoint: Partial<
  Record<BreakpointName, Partial<Record<WhitespaceName, string>>>
> = {};

const { whitespaces } = tokens;

if ('root' in whitespaces) {
  Object.entries(whitespaces).forEach(([breakpointName, value]) => {
    whitespacesByBreakpoint[breakpointName as BreakpointName] = value;
  });
} else {
  whitespacesByBreakpoint.root = whitespaces as any;
}

const GlobalStyles = createGlobalStyle<{
  theme: {
    name: ColorThemeName;
  };
}>(({ theme: { name: colorThemeName } }) =>
  merge(
    {
      '*': {
        backgroundColor: 'transparent',
        border: 'none',
        boxSizing: 'border-box',
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
        listStyleType: 'none',
        margin: 0,
        outline: 'none',
        padding: 0,
        textAlign: 'inherit',
        textDecoration: 'none',
      },
      '::placeholder': stylesToStyleObject({
        styleProps: {
          color: 'text--faded',
          fontStyle: 'italic',
        },
        colorThemeName,
      }),
      '::-webkit-scrollbar': stylesToStyleObject({
        styleProps: tokens.scrollbarStyles,
        colorThemeName,
      }),
      '::-webkit-scrollbar-corner': stylesToStyleObject({
        styleProps: tokens.scrollbarCornerStyles,
        colorThemeName,
      }),
      '::-webkit-scrollbar-thumb': stylesToStyleObject({
        styleProps: tokens.scrollbarThumbStyles,
        colorThemeName,
      }),
      '::-webkit-scrollbar-track': stylesToStyleObject({
        styleProps: tokens.scrollbarTrackStyles,
        colorThemeName,
      }),
      ':root': {
        ...mapKeysToCSSVariables(colorPalette, 'color'),
        ...mapKeysToCSSVariables(
          mapValues(
            colorAliasesByTheme[colorThemeName],
            (colorAlias) => colorPalette[colorAlias]
          ),
          'color'
        ),
        ...stylesToStyleObject({
          styleProps: {
            backgroundColor: 'background',
            color: 'text',
            fontName: 'body',
            fontSize: 'normal',
            scrollPaddingTop: '10vh',
            scrollbarColor:
              'var(--color--primary) var(--color--background--shaded)',
          },
          colorThemeName,
        }),
      },
      'body': stylesToStyleObject({
        styleProps: {
          fontSize: 'normal',
        },
        colorThemeName,
      }),
      ...Object.fromEntries(
        [...tokenNames.breakpoints].reverse().map((breakpointName) => [
          tokens.breakpoints[breakpointName],
          {
            ':root': {
              ...mapKeysToCSSVariables(
                (breakpointName in tokens.borderRadii
                  ? (tokens.borderRadii as any)[breakpointName]
                  : tokens.borderRadii) ?? {},
                'border-radius'
              ),
              ...mapKeysToCSSVariables(
                fontSizesByBreakpoint[breakpointName] ?? {},
                'font-size'
              ),
              ...mapKeysToCSSVariables(
                lineHeightsByBreakpoint[breakpointName] ?? {},
                'line-height'
              ),
              ...mapKeysToCSSVariables(
                whitespacesByBreakpoint[breakpointName] ?? {},
                'white-space'
              ),
            },
          },
        ])
      ),
    } as const,

    mapValues(tokens.globalStyles ?? {}, (styleProps) =>
      stylesToStyleObject({ styleProps, colorThemeName })
    )
  )
);

export { GlobalAnimations, GlobalStyles };
