import {
  ColorAliasName,
  ColorLightnessAdjustmentValue,
  ColorOpacityAdjustmentValue,
  ColorSwatchName,
  ColorThemeAliases,
  ColorThemeName,
  ColorThemeToAliasMap,
  ColorValue,
  UtilityColorName,
} from '@/react-handy-box/types';
import { tokenNames } from '@/tokenNames';
import { tokens } from '@/tokens';
import { clamp } from 'lodash';
import { parseToHsl, rgba, setLightness } from 'polished';

export const colorAliasesByTheme: ColorThemeToAliasMap =
  tokenNames.colorThemes.reduce(
    (themeObject, themeName, themeIndex) => ({
      ...themeObject,
      [themeName]: tokenNames.colorAliases.reduce(
        (colorAliasToSwatchNameMap, colorAliasName) => {
          const colorAliasValue = tokens.colorAliases[colorAliasName];

          return {
            ...colorAliasToSwatchNameMap,
            [colorAliasName]: Array.isArray(colorAliasValue)
              ? colorAliasValue[themeIndex]
              : colorAliasValue,
          };
        },
        {} as ColorThemeAliases
      ),
    }),
    {} as ColorThemeToAliasMap
  );

export const colorPalette = {
  ...tokenNames.colorsCore.reduce((acc, coreColorName) => {
    const { lightness } = parseToHsl(tokens.colorsCore[coreColorName]);

    return {
      ...acc,
      ...tokenNames.colorLightnesses.reduce(
        (lightnessSwatches, colorLightness) => {
          const lightnessAdjustment: number =
            tokens.colorLightnessScale[colorLightness];

          const lightnessTarget =
            lightnessAdjustment < 0
              ? lightness + (1 - lightness) * lightnessAdjustment * -1
              : lightness - lightness * lightnessAdjustment;

          const lightnessAdjustedColorCode: string = setLightness(
            lightnessTarget,
            tokens.colorsCore[coreColorName]
          );

          return {
            ...lightnessSwatches,
            ...tokenNames.colorOpacities.reduce(
              (opacitySwatches, colorOpacity) => {
                return {
                  ...opacitySwatches,
                  [`${coreColorName}--${colorLightness}--${colorOpacity}`]:
                    rgba(lightnessAdjustedColorCode, colorOpacity / 100),
                };
              },
              {}
            ),
            [`${coreColorName}--${colorLightness}`]: lightnessAdjustedColorCode,
            [`${coreColorName}--${colorLightness}--100`]:
              lightnessAdjustedColorCode,
          };
        },
        {}
      ),
    };
  }, {}),
  ...tokens.colorsCore,
  ...tokens.colorsUtility,
} as Record<ColorSwatchName, string>;

function adjustWithinLimits(
  currentValue: string | number,
  adjustmentValue: string | number | undefined,
  minValue: number,
  maxValue: number
) {
  return adjustmentValue === undefined
    ? currentValue
    : clamp(
        Number.isInteger(adjustmentValue)
          ? Number(adjustmentValue)
          : Number(currentValue) + Number(adjustmentValue),
        minValue,
        maxValue
      );
}

export function getAdjustedSwatchName(
  color: ColorValue,
  lightnessAdjustment: ColorLightnessAdjustmentValue | undefined = undefined,
  opacityAdjustment: ColorOpacityAdjustmentValue | undefined = undefined,
  colorThemeName: ColorThemeName = tokenNames.colorThemes[0]
): ColorSwatchName {
  const colorResolvedToSwatchName = tokenNames.colorAliases.includes(
    color as ColorAliasName
  )
    ? colorAliasesByTheme[colorThemeName][color as ColorAliasName]
    : color;

  if (
    tokenNames.colorsUtility.includes(
      colorResolvedToSwatchName as UtilityColorName
    )
  ) {
    return colorResolvedToSwatchName as ColorSwatchName;
  }

  const [baseColorName, lightnessValue = 400, opacityValue = 100] =
    colorResolvedToSwatchName.split('--');

  const newLightnessValue = adjustWithinLimits(
    lightnessValue,
    lightnessAdjustment,
    tokenNames.colorLightnesses[0],
    tokenNames.colorLightnesses.slice(-1)[0]
  );

  const newOpacityValue = adjustWithinLimits(
    opacityValue,
    opacityAdjustment,
    tokenNames.colorOpacities[0],
    100
  );

  return `${baseColorName}--${newLightnessValue}--${newOpacityValue}` as ColorSwatchName;
}
