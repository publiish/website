import { getAdjustedSwatchName } from '@/react-handy-box/colors';
import {
  StyleProps,
  ThemedStyles,
  validStyleProps,
} from '@/react-handy-box/components/Box.types';
import { BreakpointName, ColorThemeName } from '@/react-handy-box/types';
import { replaceEach } from '@/react-handy-box/utilities/replaceEach';
import { tokenNames } from '@/tokenNames';
import { tokens } from '@/tokens';
import camelCase from 'lodash/camelCase';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import styled, { CSSObject, CSSProperties } from 'styled-components';

const whitespacesAsCSSVariables = Object.fromEntries(
  tokenNames.whitespaces.map((whitespaceName) => [
    whitespaceName,
    `var(--white-space--${whitespaceName})`,
  ])
);

const nestedSelectorPropAliases = {
  stylesForAfterElement: '&:after',
  stylesForBeforeElement: '&:before',
  stylesForFirstElement: '&:first-child',
  stylesOnFocus: '&:focus, &:focus-within',
  stylesOnHover: '&:hover, &:focus, &:focus-within',
  stylesForLastElement: '&:last-child',
};

type PropHandler<K extends keyof StyleProps> = {
  aliases?: Array<keyof CSSProperties | keyof ThemedStyles>;
  setDefaults?: CSSObject;
  options:
    | Record<string, string | number | CSSObject>
    | ((args: {
        stylePropName: K;
        styleProps: StyleProps;
        stylePropValue: NonNullable<StyleProps[K]>;
        colorThemeName: ColorThemeName;
      }) => CSSObject);
};

type PropHandlers = {
  [K in keyof StyleProps]: PropHandler<K>;
};

const propHandlers: PropHandlers = {
  alignItems: {
    aliases: ['justifyContent'],
    setDefaults: {
      display: 'flex',
    },
    options: ({ stylePropName, stylePropValue }) => ({
      [stylePropName]: stylePropValue,
    }),
  },

  animationDuration: {
    options: tokens.animationDurations,
  },

  animationName: {
    options: ({ stylePropValue: animationName, colorThemeName }) => {
      return {
        animationName,
        ...stylesToStyleObject({
          styleProps: tokens.animations[animationName].defaultStyles,
          colorThemeName,
        }),
      };
    },
  },

  borderRadius: {
    aliases: [
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
      'borderTopLeftRadius',
      'borderTopRightRadius',
    ],
    options: ({ stylePropName, stylePropValue }) => ({
      [stylePropName]:
        typeof stylePropValue === 'number'
          ? `${stylePropValue}px`
          : replaceEach(
              String(stylePropValue),
              tokenNames.borderRadii.map(String),
              (borderRadius) =>
                `var(--border-radius--${kebabCase(borderRadius)})`
            ),
    }),
  },

  borderBottomRadius: {
    aliases: ['borderLeftRadius', 'borderRightRadius', 'borderTopRadius'],
    options: ({ stylePropName, stylePropValue, colorThemeName }) => {
      const edgeName = stylePropName.replace(/(border|Radius)/g, '');

      const isLeftOrRight = ['Left', 'Right'].includes(edgeName);

      const propNameA = isLeftOrRight
        ? `borderBottom${edgeName}Radius`
        : `border${edgeName}LeftRadius`;

      const propNameB = isLeftOrRight
        ? `borderTop${edgeName}Radius`
        : `border${edgeName}RightRadius`;

      return stylesToStyleObject({
        styleProps: {
          [propNameA]: stylePropValue,
          [propNameB]: stylePropValue,
        },
        colorThemeName,
      });
    },
  },

  border: {
    aliases: [
      'borderTop',
      'borderRight',
      'borderBottom',
      'borderLeft',
      'borderColor',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
    ],
    options: ({ styleProps, stylePropName, colorThemeName }) => {
      const borderEdgeName = stylePropName.replace('Color', '') as
        | 'border'
        | 'borderBottom'
        | 'borderLeft'
        | 'borderRight'
        | 'borderTop';

      const borderStyleObject =
        tokens.borderStyles[styleProps[borderEdgeName] ?? 'normal'];

      const borderColor = styleProps[`${borderEdgeName}Color`] ?? 'border';

      const adjustedBorderColor = getAdjustedSwatchName(
        borderColor,
        styleProps[`${borderEdgeName}ColorLightness`],
        styleProps[`${borderEdgeName}ColorOpacity`],
        colorThemeName
      );

      return {
        [`${borderEdgeName}Color`]: `var(--color--${adjustedBorderColor})`,
        [`${borderEdgeName}Style`]: get(borderStyleObject, 'borderStyle'),
        [`${borderEdgeName}Width`]: get(borderStyleObject, 'borderWidth'),
      };
    },
  },

  // 20 => 20px
  // 'tight' => 'var(--white-space--tight)'
  // 'calc(tight * 2)' => 'calc(var(--white-space--tight) * 2)'
  bottom: {
    aliases: [
      'height',
      'left',
      'margin',
      'marginBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'maxHeight',
      'maxWidth',
      'minHeight',
      'minWidth',
      'padding',
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'right',
      'top',
      'transform',
      'width',
    ],
    options: ({ stylePropName, stylePropValue }) => ({
      [stylePropName]: isNumber(stylePropValue)
        ? `${stylePropValue}px`
        : replaceEach(
            String(stylePropValue),
            tokenNames.whitespaces.map(String),
            (whitespaceName) =>
              `var(--white-space--${kebabCase(whitespaceName)})`
          ),
    }),
  },

  boxShadow: {
    options: ({ stylePropValue, colorThemeName }) => ({
      boxShadow:
        stylePropValue in tokens.boxShadows
          ? replaceEach(
              String((tokens.boxShadows as any)[stylePropValue]),
              tokenNames.colorAliases.map(String),
              (colorAliasName) => `var(--color--${colorAliasName})`
            )
          : stylePropValue,
    }),
  },

  color: {
    aliases: ['backgroundColor'],
    options: ({
      stylePropName,
      stylePropValue,
      styleProps,
      colorThemeName,
    }) => {
      const typedPropName = stylePropName as 'color' | 'backgroundColor';

      const adjustedSwatchName = getAdjustedSwatchName(
        stylePropValue,
        styleProps[`${typedPropName}Lightness`],
        styleProps[`${typedPropName}Opacity`],
        colorThemeName
      );

      return {
        [stylePropName]: `var(--color--${adjustedSwatchName})`,
      };
    },
  },

  colorLightness: {
    aliases: ['colorOpacity'],
    options: ({ styleProps, colorThemeName }) => {
      const adjustedSwatchName = getAdjustedSwatchName(
        styleProps.color ?? 'text',
        styleProps.colorLightness,
        styleProps.colorOpacity,
        colorThemeName
      );

      return {
        color: `var(--color--${adjustedSwatchName})`,
      };
    },
  },

  columnGap: {
    setDefaults: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
    options: whitespacesAsCSSVariables,
  },

  columns: {
    aliases: ['rows'],
    setDefaults: {
      gridAutoRows: 'auto',
    },
    options: ({ stylePropName, stylePropValue }) => {
      const typedPropName = stylePropName as 'columns' | 'rows';

      let result;

      if (typeof stylePropValue === 'number') {
        result = Array(stylePropValue).fill('1fr').join(' ');
      } else if (Array.isArray(stylePropValue)) {
        result = stylePropValue.join(' ');
      } else {
        result = stylePropValue;
      }

      return {
        display: 'grid',
        [`gridTemplate${upperFirst(typedPropName)}`]: result,
      };
    },
  },

  flexDirection: {
    setDefaults: {
      display: 'flex',
    },
    options: ({ stylePropValue }) => ({
      flexDirection: stylePropValue,
    }),
  },

  flexWrap: {
    setDefaults: {
      display: 'flex',
    },
    options: ({ stylePropValue }) => ({
      flexWrap: stylePropValue,
    }),
  },

  fontName: {
    options: ({ stylePropValue, colorThemeName }) =>
      stylesToStyleObject({
        styleProps: tokens.fontNames[stylePropValue],
        colorThemeName,
      }),
  },

  fontSize: {
    options: ({ styleProps: { fontSize, lineHeight = fontSize } }) => ({
      fontSize: replaceEach(
        String(fontSize),
        tokenNames.fontSizes.map(String),
        (fontSize) => `var(--font-size--${kebabCase(fontSize)})`
      ),
      lineHeight:
        replaceEach(
          String(lineHeight),
          tokenNames.fontSizes.map(String),
          (lineHeight) => `var(--line-height--${kebabCase(lineHeight)})`
        ) || lineHeight,
    }),
  },

  gap: {
    setDefaults: {
      display: 'grid',
    },
    options: whitespacesAsCSSVariables,
  },

  isOnlyForScreenReaders: {
    options: () => ({
      clip: 'rect(0, 0, 0, 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      position: 'absolute',
      whitespace: 'nowrap',
      width: '1px',
    }),
  },

  marginX: {
    aliases: ['marginY', 'paddingX', 'paddingY'],
    options: ({ stylePropName, stylePropValue, colorThemeName }) => {
      const XorY = stylePropName.includes('X') ? 'X' : 'Y';
      const LeftOrBottom = XorY === 'X' ? 'Left' : 'Bottom';
      const RightOrTop = XorY === 'X' ? 'Right' : 'Top';
      const propNameLeftOrBottom = stylePropName.replace(XorY, LeftOrBottom);
      const propNameRightOrTop = stylePropName.replace(XorY, RightOrTop);

      return stylesToStyleObject({
        styleProps: {
          [`${propNameLeftOrBottom}`]: stylePropValue,
          [`${propNameRightOrTop}`]: stylePropValue,
        },
        colorThemeName,
      });
    },
  },

  stylesForAfterElement: {
    aliases: ['stylesForBeforeElement'],
    options: ({ stylePropName, stylePropValue, colorThemeName }) => ({
      [nestedSelectorPropAliases[
        stylePropName as keyof typeof nestedSelectorPropAliases
      ]]: {
        ...stylesToStyleObject({
          styleProps: stylePropValue,
          colorThemeName,
        }),
        content: `"${stylePropValue.content ?? ''}"`,
      },
    }),
  },

  stylesForCustomSelector: {
    options: ({ stylePropValue, colorThemeName }) => {
      return Object.fromEntries(
        Object.entries(stylePropValue).map(([customSelector, styleProps]) => [
          customSelector,
          stylesToStyleObject({ styleProps, colorThemeName }),
        ])
      );
    },
  },

  stylesForRoot: {
    aliases: tokenNames.breakpoints.map(
      (breakpointName) => `stylesFor${upperFirst(breakpointName)}`
    ) as Array<`stylesFor${Capitalize<BreakpointName>}`>,
    options: ({ stylePropName, stylePropValue, colorThemeName }) => {
      const breakpointName = camelCase(
        stylePropName.replace('stylesFor', '')
      ) as BreakpointName;

      const mediaQuery = tokens.breakpoints[breakpointName];

      return {
        [mediaQuery]: stylesToStyleObject({
          styleProps: stylePropValue,
          colorThemeName,
        }),
      };
    },
  },

  stylesOnHover: {
    aliases: ['stylesOnFocus', 'stylesForFirstElement', 'stylesForLastElement'],
    options: ({ stylePropName, stylePropValue, colorThemeName }) => {
      const propSelector =
        nestedSelectorPropAliases[
          stylePropName as keyof typeof nestedSelectorPropAliases
        ];

      return {
        [propSelector!]: stylesToStyleObject({
          styleProps: stylePropValue,
          colorThemeName,
        }),
      };
    },
  },

  rowGap: {
    setDefaults: {
      display: 'flex',
      flexDirection: 'column',
    },
    options: whitespacesAsCSSVariables,
  },

  transitionDuration: {
    aliases: ['transitionProperty', 'transitionTimingFunction'],
    options: ({
      styleProps: {
        transitionDuration,
        transitionProperty,
        transitionTimingFunction,
      },
    }) => ({
      transitionDuration:
        typeof transitionDuration === 'undefined'
          ? tokens.animationDurations['normal']
          : typeof transitionDuration === 'number'
          ? `${transitionDuration}ms`
          : transitionDuration in tokens.animationDurations
          ? (tokens.animationDurations as any)[transitionDuration]
          : transitionDuration,
      transitionProperty: Array.isArray(transitionProperty)
        ? transitionProperty.map(kebabCase).join(', ')
        : transitionProperty
        ? kebabCase(transitionProperty)
        : 'all',
      transitionTimingFunction: transitionTimingFunction ?? 'ease',
    }),
  },

  zIndex: {
    setDefaults: {
      position: 'relative',
    },
    options: tokens.zIndices,
  },
};

Object.entries(propHandlers).forEach(([stylePropName, propHandler]) => {
  propHandler.aliases?.forEach((aliasedPropName) => {
    propHandlers[aliasedPropName] = (propHandlers as any)[stylePropName];
  });
});

const stylesToStyleObject: (args: {
  styleProps: StyleProps;
  colorThemeName: ColorThemeName;
}) => CSSObject = ({
  styleProps = {},
  colorThemeName = tokenNames.colorThemes[0],
}) =>
  Object.keys(styleProps).reduce((currentStyleObject, stylePropName) => {
    const typedPropName = stylePropName as keyof PropHandlers;

    const propHandler = propHandlers[typedPropName] as PropHandler<
      keyof ThemedStyles
    >;

    const stylePropValue = styleProps[typedPropName];

    if (typeof stylePropValue === 'undefined') {
      return currentStyleObject;
    }

    if (!propHandler) {
      if (typedPropName === 'debug') {
        console.log(currentStyleObject);
      }

      return validStyleProps.includes(typedPropName)
        ? {
            ...currentStyleObject,
            [typedPropName]: stylePropValue,
          }
        : currentStyleObject;
    }

    const defaults = propHandler.setDefaults ?? {};

    if (typeof propHandler.options === 'function') {
      return {
        ...defaults,
        ...currentStyleObject,
        ...(propHandler.options as Function)({
          styleProps,
          stylePropName: typedPropName,
          stylePropValue,
          colorThemeName,
        }),
      };
    } else if (typeof propHandler.options === 'object') {
      return {
        ...defaults,
        ...currentStyleObject,
        [typedPropName]:
          propHandler.options[
            stylePropValue as keyof typeof propHandler.options
          ] ?? stylePropValue,
      };
    }

    return currentStyleObject;
  }, {});

const Box = styled.div<{
  styles?: StyleProps;
}>((props) =>
  stylesToStyleObject({
    styleProps: props.styles ?? {},
    colorThemeName: props.theme.name ?? tokenNames.colorThemes[0],
  })
);

export { Box };
export { nestedSelectorPropAliases, stylesToStyleObject };
