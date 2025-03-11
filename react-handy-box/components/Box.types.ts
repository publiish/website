import {
  AnimationDurationName,
  AnimationName,
  BorderRadiusName,
  BorderVariantName,
  BoxShadowVariantName,
  BreakpointName,
  ColorLightnessAdjustmentValue,
  ColorOpacityAdjustmentValue,
  ColorThemeAliases,
  ColorValue,
  FontName,
  FontSizeName,
  WhitespaceName,
  ZIndexName,
} from '@/react-handy-box/types';
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from 'react';

export type BorderRadius = BorderRadiusName | Length | number;

export type ColumnsOrRows = number | Array<number | string>;

export type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type FontSize = FontSizeName | Length;

export type WhiteSpaceNameOrLength =
  | WhitespaceName
  | Length
  | number
  | 'none'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset'
  | 'fit-content'
  | 'max-content'
  | 'min-content';

export type Length = 0 | `${number}${LengthUnit}` | 'auto' | `calc(${string})`;

export type TimeUnit = 's' | 'ms';

export type TransitionDuration =
  | AnimationDurationName
  | number
  | `${number}${'s' | 'ms'}`;

export type LengthUnit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw';

export type ZIndex = ZIndexName | number;

export const validStyleProps = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'alignmentBaseline',
  'all',
  'animation',
  'animationDelay',
  'animationDirection',
  'animationDuration',
  'animationFillMode',
  'animationIterationCount',
  'animationName',
  'animationPlayState',
  'animationTimingFunction',
  'appearance',
  'backdropFilter',
  'backfaceVisibility',
  'background',
  'backgroundAttachment',
  'backgroundBlendMode',
  'backgroundClip',
  'backgroundColor',
  'backgroundImage',
  'backgroundOrigin',
  'backgroundPosition',
  'backgroundPositionX',
  'backgroundPositionY',
  'backgroundRepeat',
  'backgroundRepeatX',
  'backgroundRepeatY',
  'backgroundSize',
  'baselineShift',
  'blockSize',
  'border',
  'borderBlockEnd',
  'borderBlockEndColor',
  'borderBlockEndStyle',
  'borderBlockEndWidth',
  'borderBlockStart',
  'borderBlockStartColor',
  'borderBlockStartStyle',
  'borderBlockStartWidth',
  'borderBottom',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderCollapse',
  'borderColor',
  'borderImage',
  'borderImageOutset',
  'borderImageRepeat',
  'borderImageSlice',
  'borderImageSource',
  'borderImageWidth',
  'borderInlineEnd',
  'borderInlineEndColor',
  'borderInlineEndStyle',
  'borderInlineEndWidth',
  'borderInlineStart',
  'borderInlineStartColor',
  'borderInlineStartStyle',
  'borderInlineStartWidth',
  'borderLeft',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRight',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderSpacing',
  'borderStyle',
  'borderTop',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'boxSizing',
  'breakAfter',
  'breakBefore',
  'breakInside',
  'bufferedRendering',
  'captionSide',
  'caretColor',
  'clear',
  'clip',
  'clipPath',
  'clipRule',
  'color',
  'colorInterpolation',
  'colorInterpolationFilters',
  'colorRendering',
  'columnCount',
  'columnFill',
  'columnGap',
  'columnRule',
  'columnRuleColor',
  'columnRuleStyle',
  'columnRuleWidth',
  'columnSpan',
  'columnWidth',
  'columns',
  'contain',
  'content',
  'counterIncrement',
  'counterReset',
  'cursor',
  'cx',
  'cy',
  'd',
  'direction',
  'display',
  'dominantBaseline',
  'emptyCells',
  'fill',
  'fillOpacity',
  'fillRule',
  'filter',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexFlow',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'float',
  'floodColor',
  'floodOpacity',
  'font',
  'fontDisplay',
  'fontFamily',
  'fontFeatureSettings',
  'fontKerning',
  'fontSize',
  'fontStretch',
  'fontStyle',
  'fontVariant',
  'fontVariantCaps',
  'fontVariantEastAsian',
  'fontVariantLigatures',
  'fontVariantNumeric',
  'fontVariationSettings',
  'fontWeight',
  'gap',
  'grid',
  'gridArea',
  'gridAutoColumns',
  'gridAutoFlow',
  'gridAutoRows',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnGap',
  'gridColumnStart',
  'gridGap',
  'gridRow',
  'gridRowEnd',
  'gridRowGap',
  'gridRowStart',
  'gridTemplate',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'height',
  'hyphens',
  'imageRendering',
  'inlineSize',
  'isolation',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'left',
  'letterSpacing',
  'lightingColor',
  'lineBreak',
  'lineHeight',
  'listStyle',
  'listStyleImage',
  'listStylePosition',
  'listStyleType',
  'margin',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marker',
  'markerEnd',
  'markerMid',
  'markerStart',
  'mask',
  'maskType',
  'maxBlockSize',
  'maxHeight',
  'maxInlineSize',
  'maxWidth',
  'maxZoom',
  'minBlockSize',
  'minHeight',
  'minInlineSize',
  'minWidth',
  'minZoom',
  'mixBlendMode',
  'objectFit',
  'objectPosition',
  'offset',
  'offsetDistance',
  'offsetPath',
  'offsetRotate',
  'opacity',
  'order',
  'orientation',
  'orphans',
  'outline',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'overflow',
  'overflowAnchor',
  'overflowWrap',
  'overflowX',
  'overflowY',
  'overscrollBehavior',
  'overscrollBehaviorBlock',
  'overscrollBehaviorInline',
  'overscrollBehaviorX',
  'overscrollBehaviorY',
  'padding',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'page',
  'pageBreakAfter',
  'pageBreakBefore',
  'pageBreakInside',
  'paintOrder',
  'perspective',
  'perspectiveOrigin',
  'placeContent',
  'placeItems',
  'placeSelf',
  'pointerEvents',
  'position',
  'quotes',
  'r',
  'resize',
  'right',
  'rowGap',
  'rx',
  'ry',
  'scrollBehavior',
  'scrollMargin',
  'scrollMarginBlock',
  'scrollMarginBlockEnd',
  'scrollMarginBlockStart',
  'scrollMarginBottom',
  'scrollMarginInline',
  'scrollMarginInlineEnd',
  'scrollMarginInlineStart',
  'scrollMarginLeft',
  'scrollMarginRight',
  'scrollMarginTop',
  'scrollPadding',
  'scrollPaddingBlock',
  'scrollPaddingBlockEnd',
  'scrollPaddingBlockStart',
  'scrollPaddingBottom',
  'scrollPaddingInline',
  'scrollPaddingInlineEnd',
  'scrollPaddingInlineStart',
  'scrollPaddingLeft',
  'scrollPaddingRight',
  'scrollPaddingTop',
  'scrollSnapAlign',
  'scrollSnapStop',
  'scrollSnapType',
  'shapeImageThreshold',
  'shapeMargin',
  'shapeOutside',
  'shapeRendering',
  'size',
  'speak',
  'src',
  'stopColor',
  'stopOpacity',
  'stroke',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'tabSize',
  'tableLayout',
  'textAlign',
  'textAlignLast',
  'textAnchor',
  'textCombineUpright',
  'textDecoration',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationSkipInk',
  'textDecorationStyle',
  'textFillColor',
  'textIndent',
  'textOrientation',
  'textOverflow',
  'textRendering',
  'textShadow',
  'textSizeAdjust',
  'textTransform',
  'textUnderlinePosition',
  'top',
  'touchAction',
  'transform',
  'transformBox',
  'transformOrigin',
  'transformStyle',
  'transition',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'unicodeBidi',
  'unicodeRange',
  'userSelect',
  'userZoom',
  'vectorEffect',
  'verticalAlign',
  'visibility',
  'whiteSpace',
  'widows',
  'width',
  'willChange',
  'wordBreak',
  'wordSpacing',
  'wordWrap',
  'writingMode',
  'x',
  'y',
  'zIndex',
  'zoom',
  'WebkitBackgroundClip',
  'WebkitTextFillColor',
];

export type ThemedStyles = {
  animationDuration?: AnimationDurationName | `${number}${TimeUnit}`;
  animationName?: AnimationName;
  backgroundColor?: ColorValue;
  backgroundColorOpacity?: ColorOpacityAdjustmentValue;
  backgroundColorLightness?: ColorLightnessAdjustmentValue;
  border?: BorderVariantName;
  borderBottom?: BorderVariantName;
  borderBottomLeftRadius?: BorderRadius;
  borderBottomRadius?: BorderRadius;
  borderBottomRightRadius?: BorderRadius;
  borderColor?: ColorValue;
  borderColorOpacity?: ColorOpacityAdjustmentValue;
  borderColorLightness?: ColorLightnessAdjustmentValue;
  borderBottomColor?: ColorValue;
  borderBottomColorOpacity?: ColorOpacityAdjustmentValue;
  borderBottomColorLightness?: ColorLightnessAdjustmentValue;
  borderLeftColor?: ColorValue;
  borderLeftColorOpacity?: ColorOpacityAdjustmentValue;
  borderLeftColorLightness?: ColorLightnessAdjustmentValue;
  borderRightColor?: ColorValue;
  borderRightColorOpacity?: ColorOpacityAdjustmentValue;
  borderRightColorLightness?: ColorLightnessAdjustmentValue;
  borderTopColor?: ColorValue;
  borderTopColorOpacity?: ColorOpacityAdjustmentValue;
  borderTopColorLightness?: ColorLightnessAdjustmentValue;
  borderLeft?: BorderVariantName;
  borderLeftRadius?: BorderRadius;
  borderRadius?: BorderRadius;
  borderRight?: BorderVariantName;
  borderRightRadius?: BorderRadius;
  borderTop?: BorderVariantName;
  borderTopLeftRadius?: BorderRadius;
  borderTopRadius?: BorderRadius;
  borderTopRightRadius?: BorderRadius;
  bottom?: WhiteSpaceNameOrLength;
  /**
   * One of the boxShadow tokens, or a string matching the
   * usual CSS format:
   *
   * ```
   * X Y Blur Color
   * X Y Blur Spread Color
   * ```
   */
  boxShadow?:
    | BoxShadowVariantName
    | `${string} ${string} ${string} ${string}`
    | `${string} ${string} ${string} ${string} ${string}`;
  children?: ReactNode;
  color?: ColorValue;
  colorOpacity?: ColorOpacityAdjustmentValue;
  colorLightness?: ColorLightnessAdjustmentValue;
  columnGap?: WhiteSpaceNameOrLength;
  columns?: ColumnsOrRows;
  debug?: boolean;
  fontName?: FontName;
  fontSize?: FontSize;
  gap?: WhiteSpaceNameOrLength;
  height?: WhiteSpaceNameOrLength;
  isOnlyForScreenReaders?: boolean;
  left?: WhiteSpaceNameOrLength;
  lineHeight?: FontSize;
  margin?: WhiteSpaceNameOrLength;
  marginBottom?: WhiteSpaceNameOrLength;
  marginLeft?: WhiteSpaceNameOrLength;
  marginRight?: WhiteSpaceNameOrLength;
  marginTop?: WhiteSpaceNameOrLength;
  /** Sets both `marginLeft` and `marginRight` */
  marginX?: WhiteSpaceNameOrLength;
  /** Sets both `marginTop` and `marginBottom` */
  marginY?: WhiteSpaceNameOrLength;
  maxHeight?: WhiteSpaceNameOrLength;
  maxWidth?: WhiteSpaceNameOrLength;
  minHeight?: WhiteSpaceNameOrLength;
  minWidth?: WhiteSpaceNameOrLength;
  padding?: WhiteSpaceNameOrLength;
  paddingBottom?: WhiteSpaceNameOrLength;
  paddingLeft?: WhiteSpaceNameOrLength;
  paddingRight?: WhiteSpaceNameOrLength;
  paddingTop?: WhiteSpaceNameOrLength;
  /** Sets both `paddingLeft` and `paddingRight` */
  paddingX?: WhiteSpaceNameOrLength;
  /** Sets both `paddingTop` and `paddingBottom` */
  paddingY?: WhiteSpaceNameOrLength;
} & {
  /** Applies styles only when media query matches */
  [K in `stylesFor${Capitalize<BreakpointName>}`]?: StyleProps;
} & {
  /** Styles to be applied to the `::after` psuedo element.
   * `content` is set to `""` automatically. */
  stylesForAfterElement?: StyleProps;
  /** Styles to be applied to the `::before` psuedo element.
   * `content` is set to `""` automatically. */
  stylesForBeforeElement?: StyleProps;
  stylesForCustomSelector?: {
    [selector: string]: StyleProps;
  };
  stylesForFirstElement?: StyleProps;
  stylesForLastElement?: StyleProps;
  /** Styles to be applied on `:focus` and `:focus-within`.
   *
   * Example:
   * ```
   * <Box
   *   stylesOnFocus={{
   *     outline: '1px 1px 5px blue',
   *   }}
   * >
   *   My background turns red on hover.
   * </Box>
   * ```
   */
  stylesOnFocus?: StyleProps;
  /** Styles to be applied on `:hover` or `:focus`.
   *
   * Example:
   * ```
   * <Box
   *   stylesOnHover={{
   *     backgroundColor: 'danger',
   *   }}
   * >
   *   My background turns red on hover.
   * </Box>
   * ```
   */
  stylesOnHover?: StyleProps;
  pointerEvents?: 'all' | 'auto' | 'none';
  right?: WhiteSpaceNameOrLength;
  rowGap?: WhiteSpaceNameOrLength;
  rows?: ColumnsOrRows;
  top?: WhiteSpaceNameOrLength;
  transitionDuration?: TransitionDuration;
  transitionProperty?: string | Array<string>;
  width?: WhiteSpaceNameOrLength;
  zIndex?: ZIndex;
};

export type StyleProps<T = ThemedStyles> = Omit<CSSProperties, keyof T> & T;

export type BoxPropsWithRef<E extends SupportedTags = 'div'> = Omit<
  ComponentPropsWithRef<E>,
  'onClick'
> & {
  as?: E;
  styles?: StyleProps;
  theme?: ColorThemeAliases;
  onClick?: (event: MouseEvent) => void;
};

export type BoxPropsWithoutRef<E extends SupportedTags = 'div'> = Omit<
  ComponentPropsWithoutRef<E>,
  'onClick'
> & {
  as?: E;
  styles?: StyleProps;
  theme?: ColorThemeAliases;
  onClick?: (event: MouseEvent) => void;
};

export type SupportedTags = keyof JSX.IntrinsicElements &
  keyof HTMLElementTagNameMap;

export type HTMLElementFor<T extends SupportedTags> = HTMLElementTagNameMap[T];

export type TokensByBreakpoint<
  TokenShape extends unknown,
  TokenNames extends string
> = Partial<Record<BreakpointName, Record<TokenNames[number], TokenShape>>>;
