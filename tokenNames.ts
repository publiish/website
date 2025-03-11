export const tokenNames = {
  animationDurations: ['short', 'normal', 'long'],

  animationNames: [
    'backdropEntry',
    'backdropExit',
    'blink',
    'dropIn',
    'dropOut',
    'modalLayerEntry',
    'modalLayerExit',
    'modalWindowEntry',
    'modalWindowExit',
  ],

  borderRadii: ['small', 'normal', 'circle'],

  borderStyles: ['dashed', 'hairline', 'none', 'normal', 'thick'],

  boxShadows: ['focusRing', 'inset', 'normal'],

  breakpoints: [
    'bigDesktopOrLarger',
    'desktopOrLarger',
    'tabletOrLarger',
    'phoneOrTablet',
    'tabletOnly',
    'phoneOnly',
    'root',
  ],

  buttonVariants: [
    'caution',
    'createNew',
    'danger',
    'iconOnly',
    'link',
    'link--inverted',
    'pill',
    'primary',
    'unstyled',
  ],

  colorAliases: [
    'accent',
    'background',
    'background--highlighted',
    'background--selected',
    'background--shaded',
    'border',
    'primary',
    'danger',
    'shadow',
    'text',
    'text--faded',
    'text--link--hovered',
    'text--link',
    'text--selected',
  ],

  colorLightnesses: [100, 200, 300, 400, 500, 600, 700],

  colorOpacities: [10, 20, 30, 40, 50, 60, 70, 80, 90],

  colorsCore: ['blue', 'orange', 'purple', 'red', 'yellow'],

  colorsUtility: [
    'black',
    'transparent',
    'white',
    'white--10',
    'white--20',
    'white--30',
    'white--40',
    'white--50',
    'white--60',
    'white--70',
    'white--80',
    'white--90',
  ],

  colorThemes: ['dark'],

  fontNames: ['body', 'display'],

  fontSizes: ['xxlarge', 'xlarge', 'large', 'normal', 'small', 'xsmall'],

  modalLayerVariants: ['menu', 'popover', 'tooltip', 'window'],

  textVariants: ['code', 'heading--1', 'heading--2', 'heading--3', 'label'],

  whitespaces: [
    'xxloose',
    'xloose',
    'loose',
    'normal',
    'tight',
    'xtight',
    'xxtight',
  ],

  zIndices: [
    '1000--maximum',
    '100--popoversAndTooltips',
    '10--modalWindows',
    '1--stickyElements',
  ],
} as const;
