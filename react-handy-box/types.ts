import { StyleProps } from '@/react-handy-box/components/Box.types';
import { tokenNames } from '@/tokenNames';

export type AnimationDurationName =
  typeof tokenNames.animationDurations[number];

export type AnimationName = typeof tokenNames.animationNames[number];

export type BorderRadiusName = typeof tokenNames.borderRadii[number];

export type BorderVariantName = typeof tokenNames.borderStyles[number];

export type BoxShadowVariantName = typeof tokenNames.boxShadows[number];

export type BreakpointName = typeof tokenNames.breakpoints[number];

export type ButtonVariantName = typeof tokenNames.buttonVariants[number];

export type ColorAliasName = typeof tokenNames.colorAliases[number];

export type ColorLightnessValue = typeof tokenNames.colorLightnesses[number];

export type ColorOpacityValue = typeof tokenNames.colorOpacities[number];

export type ColorLightnessAdjustmentValue =
  | ColorLightnessValue
  | `+${ColorLightnessValue}`
  | `-${ColorLightnessValue}`;

export type ColorOpacityAdjustmentValue =
  | 100
  | ColorOpacityValue
  | `+${ColorOpacityValue}`
  | `-${ColorOpacityValue}`;

export type ColorSwatchName =
  | CoreColorName
  | UtilityColorName
  | `${CoreColorName}--${ColorLightnessValue}`
  | `${CoreColorName}--${ColorLightnessValue}--${ColorOpacityValue | 100}`;

export type ColorThemeAliases = Record<ColorAliasName, ColorSwatchName>;

export type ColorThemeName = typeof tokenNames.colorThemes[number];

export type ColorThemeToAliasMap = Record<ColorThemeName, ColorThemeAliases>;

export type ColorValue = ColorAliasName | ColorSwatchName;

export type CoreColorName = typeof tokenNames.colorsCore[number];

export type UtilityColorName = typeof tokenNames.colorsUtility[number];

export type FontSizeName = typeof tokenNames.fontSizes[number];

export type FontName = typeof tokenNames.fontNames[number];

export type ModalLayerVariantName =
  typeof tokenNames.modalLayerVariants[number];

export type TextVariantName = typeof tokenNames.textVariants[number];

export type WhitespaceName = typeof tokenNames.whitespaces[number];

export type ZIndexName = typeof tokenNames.zIndices[number];

export type HandyTokens = {
  animationDurations: Record<AnimationDurationName, `${number}${'s' | 'ms'}`>;

  animations: Record<
    AnimationName,
    {
      keyframes: string;
      defaultStyles: StyleProps;
    }
  >;

  /*
    TODO: The breakpoint-keyed map must include a complete 'root',
    and then any other breakpoint can include partial radii definitions

    {
      // Must include each definition for each borders.radii
      root: { small: '6px', normal: '12px', large: '24px' },

      // Can include any or all definitions
      phoneOnly: { normal: '8px' },
    }
  */
  borderRadii:
    | Record<BorderRadiusName, string | number>
    | Partial<
        Record<
          BreakpointName,
          Partial<Record<BorderRadiusName, string | number>>
        >
      >;

  borderStyles: Record<BorderVariantName, StyleProps>;

  boxShadows: Record<BoxShadowVariantName, string>;

  breakpoints: Record<BreakpointName, string>;

  buttonVariants: Record<
    ButtonVariantName,
    {
      extends?: Array<ButtonVariantName>;
      styles: StyleProps;
    }
  >;

  colorAliases: Record<
    ColorAliasName,
    ColorSwatchName | Array<ColorSwatchName>
  >;

  colorLightnessScale: Record<ColorLightnessValue, number>;

  colorsCore: Record<CoreColorName, string>;

  colorsUtility: Record<UtilityColorName, string>;

  fontNames: Record<FontName, StyleProps>;

  fontSizesAndLineHeights:
    | Record<FontSizeName, [string, string]>
    | Partial<
        Record<BreakpointName, Partial<Record<FontSizeName, [string, string]>>>
      >;

  /**
   * An object of StyleProps, keyed by CSS selectors
   *
   * Example:
   * ```
   * globalStyles: {
   *   body: {
   *     backgroundColor: 'background',
   *     fontSize: 'normal',
   *   }
   * }
   * ```
   */
  globalStyles?: Record<string, StyleProps>;

  inputStyles: StyleProps;

  modalBackdropStyles: StyleProps;

  modalLayerVariants: Record<ModalLayerVariantName, StyleProps>;

  scrollbarCornerStyles: StyleProps;

  scrollbarStyles: StyleProps;

  scrollbarThumbStyles: StyleProps;

  scrollbarTrackStyles: StyleProps;

  textVariants: Record<TextVariantName, StyleProps>;

  whitespaces:
    | Record<WhitespaceName, string>
    | Partial<Record<BreakpointName, Partial<Record<WhitespaceName, string>>>>;

  zIndices: Record<ZIndexName, number>;
};
