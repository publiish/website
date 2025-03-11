import { HandyTokens } from '@/react-handy-box/types';

export const tokens: HandyTokens = {
  animationDurations: {
    short: '0.125s',
    normal: '0.35s',
    long: '1s',
  },

  animations: {
    backdropEntry: {
      keyframes: `
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.25s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    backdropExit: {
      keyframes: `
        from { opacity: 1; }
        to { opacity: 0; }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.125s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    blink: {
      keyframes: `
        0%, 40% {
          opacity: 1;
        }
        60%, 100% {
          opacity: 0;
        }
      `,
      defaultStyles: {
        animationDirection: 'alternate',
        animationDuration: '0.4s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
      },
    },

    dropIn: {
      keyframes: `
        0% {
          opacity: 0;
          transform: translateY(-50%);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '1s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    dropOut: {
      keyframes: `
        0% {
          opacity: 1;
          transform: translateY(0%);
        }
        100% {
          opacity: 0;
          transform: translateY(50%);
        }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '1s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    modalLayerEntry: {
      keyframes: `
        from { opacity: 0; }
        to { opacity: 1; }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.125s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    modalLayerExit: {
      keyframes: `
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.25s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    modalWindowEntry: {
      keyframes: `
        from {
          filter: blur(4px);
          opacity: 0;
          transform: translate(-50%, -70%) scale(0.5);
        }
        to {
          filter: blur(0);
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.25s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },

    modalWindowExit: {
      keyframes: `
        from {
          filter: blur(0);
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        to {
          filter: blur(4px);
          opacity: 0;
          transform: translate(-50%, 20%) scale(1.5);
        }
      `,
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.25s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },
  },

  borderRadii: {
    small: '12px',
    normal: '24px',
    circle: '5000px',
  },

  borderStyles: {
    dashed: {
      borderStyle: 'dashed',
      borderWidth: '2px',
    },
    hairline: {
      borderStyle: 'solid',
      borderWidth: '1px',
    },
    none: {
      borderStyle: 'none',
      borderWidth: 0,
    },
    normal: {
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    thick: {
      borderStyle: 'solid',
      borderWidth: '4px',
    },
  },

  boxShadows: {
    focusRing: `0 0 0 2px white, 0 0 0 4px primary`,
    inset: `2px 2px 0 0 shadow inset`,
    normal: `0 5px 10px 0 shadow`,
  },

  breakpoints: {
    bigDesktopOrLarger: '@media screen and (min-width: 1600px)',
    desktopOrLarger: '@media screen and (min-width: 1200px)',
    tabletOrLarger: '@media screen and (min-width: 501px)',
    phoneOrTablet: '@media screen and (max-width: 1199px)',
    tabletOnly: '@media screen and (min-width: 501px) and (max-width: 1199px)',
    phoneOnly: '@media screen and (max-width: 500px)',
    root: '@media screen',
  },

  buttonVariants: {
    'caution': {
      extends: ['unstyled', 'primary'],
      styles: {
        backgroundColor: 'transparent',
        borderColor: 'danger',
        color: 'danger',
        stylesOnHover: {
          backgroundColor: 'danger',
          borderColor: 'danger',
        },
      },
    },

    'createNew': {
      extends: ['unstyled', 'primary'],
      styles: {
        backgroundColor: 'transparent',
        border: 'dashed',
        borderRadius: 'normal',
        color: 'text--faded',
        paddingX: 'loose',
        paddingY: 'normal',
        stylesOnHover: {
          backgroundColor: 'background',
          borderColor: 'primary',
          color: 'primary',
        },
      },
    },

    'danger': {
      extends: ['unstyled', 'primary'],
      styles: {
        backgroundColor: 'danger',
        borderColor: 'transparent',
        color: 'white',
        stylesOnHover: {
          backgroundColor: 'danger',
          borderColor: 'danger',
        },
      },
    },

    'iconOnly': {
      extends: ['unstyled'],
      styles: {
        paddingX: 'xtight',
        paddingY: 'xxtight',
        stylesOnHover: {
          color: 'primary',
        },
      },
    },

    'link': {
      extends: ['unstyled'],
      styles: {
        color: 'text--link',
        fontWeight: 'bold',
        stylesOnHover: {
          color: 'text--link--hovered',
        },
        textDecoration: 'underline',
        whiteSpace: 'normal',
      },
    },

    'link--inverted': {
      extends: ['unstyled'],
      styles: {
        color: 'white',
        fontWeight: 'bold',
        stylesOnHover: {
          color: 'text--link--hovered',
        },
        textDecoration: 'underline',
        whiteSpace: 'normal',
      },
    },

    'pill': {
      extends: ['unstyled'],
      styles: {
        alignItems: 'center',
        backgroundColor: 'background--selected',
        borderRadius: 'circle',
        columnGap: 'xtight',
        cursor: 'pointer',
        display: 'flex',
        paddingX: 'tight',
        paddingY: 'xxtight',
        stylesOnHover: {
          backgroundColor: 'background--selected',
          backgroundColorLightness: '+100',
        },
      },
    },

    'primary': {
      extends: ['unstyled'],
      styles: {
        backgroundColor: 'white',
        borderRadius: 'small',
        boxSizing: 'content-box',
        color: 'black',
        paddingX: 'tight',
        paddingY: 'xtight',
        transform: 'scale(1)',
        transitionProperty: ['transform'],
        stylesOnHover: {
          transform: 'scale(1.05)',
        },
      },
    },

    'unstyled': {
      styles: {
        cursor: 'pointer',
        display: 'inline-block',
        stylesForCustomSelector: {
          ':disabled': {
            opacity: 0.6,
            pointerEvents: 'none',
          },
        },
        stylesOnFocus: {
          boxShadow: 'focusRing',
          position: 'relative',
          zIndex: '1--stickyElements',
        },
        width: 'fit-content',
        whiteSpace: 'nowrap',
      },
    },
  },

  colorAliases: {
    'accent': 'orange--400',
    'background': 'black',
    'background--highlighted': 'yellow--400--20',
    'background--selected': 'purple--400',
    'background--shaded': 'purple--300--10',
    'border': 'purple--300--20',
    'primary': 'blue--300',
    'danger': 'red--400',
    'shadow': 'purple--600--80',
    'text': 'white',
    'text--faded': 'white--60',
    'text--link': 'blue--400',
    'text--link--hovered': 'purple--200',
    'text--selected': 'white',
  },

  colorLightnessScale: {
    100: -0.925,
    200: -0.775,
    300: -0.6,
    400: 0,
    500: 0.33,
    600: 0.66,
    700: 0.95,
  },

  colorsCore: {
    blue: '#0C2D7C',
    orange: '#FF5C00',
    purple: '#A37AEA',
    red: '#FF002E',
    yellow: '#FFC700',
  },

  colorsUtility: {
    'black': 'rgba(0, 0, 0, 1)',
    'transparent': 'transparent',
    'white': 'rgba(255, 255, 255, 1)',
    'white--10': 'rgba(255, 255, 255, 0.1)',
    'white--20': 'rgba(255, 255, 255, 0.2)',
    'white--30': 'rgba(255, 255, 255, 0.3)',
    'white--40': 'rgba(255, 255, 255, 0.4)',
    'white--50': 'rgba(255, 255, 255, 0.5)',
    'white--60': 'rgba(255, 255, 255, 0.6)',
    'white--70': 'rgba(255, 255, 255, 0.7)',
    'white--80': 'rgba(255, 255, 255, 0.8)',
    'white--90': 'rgba(255, 255, 255, 0.9)',
  },

  fontNames: {
    body: {
      fontFamily: `Inter, sans-serif`,
      fontWeight: 400,
    },
    display: {
      fontFamily: `'Darker Grotesque', sans-serif`,
      fontWeight: 400,
    },
  },

  fontSizesAndLineHeights: {
    phoneOnly: {
      normal: ['min(4vh, 4vw)', '1.4rem'],
    },
    root: {
      xxlarge: ['4rem', '4rem'],
      xlarge: ['2rem', '2.5rem'],
      large: ['1.5rem', '2rem'],
      normal: ['min(3vh, 3vw)', '1.4rem'],
      small: ['0.833rem', '1.2rem'],
      xsmall: ['0.588rem', '1rem'],
    },
  },

  globalStyles: {
    body: {
      overflow: 'hidden',
    },
  },

  inputStyles: {
    backgroundColor: 'background',
    border: 'normal',
    borderRadius: 'small',
    display: 'block',
    flexGrow: 1,
    flexShrink: 1,
    paddingX: 'tight',
    paddingY: 'xtight',
    stylesOnFocus: {
      boxShadow: 'focusRing',
    },
    resize: 'none',
    width: '100%',
  },

  modalBackdropStyles: {
    animationDirection: 'normal',
    animationFillMode: 'forwards',
    animationName: 'backdropEntry',
    backgroundColor: 'shadow',
  },

  modalLayerVariants: {
    menu: {
      // Extends `popover` below
      borderRadius: 'small',
      flexDirection: 'column',
      maxHeight: `calc(100vh - normal * 2)`,
      maxWidth: `calc(100vw - normal * 2)`,
      minWidth: 150,
      overflowY: 'auto',
      padding: 'xtight',
      transitionDuration: 'short',
      transitionProperty: 'opacity',
    },
    popover: {
      backgroundColor: 'background',
      border: 'normal',
      borderRadius: 'normal',
      boxShadow: 'normal',
      padding: 'tight',
    },
    tooltip: {
      backgroundColor: 'text',
      border: undefined,
      borderRadius: 'small',
      color: 'background',
      maxWidth: '20vw',
      paddingX: 'tight',
      paddingY: 'xtight',
    },
    window: {
      animationName: 'modalWindowEntry',
      backgroundColor: 'background',
      border: 'normal',
      borderRadius: 'normal',
      boxShadow: 'normal',
      display: 'flex',
      left: '50%',
      maxHeight: `calc(100vh - normal * 2)`,
      maxWidth: `calc(100vw - normal * 2)`,
      opacity: 0,
      position: 'fixed',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transitionProperty: ['margin-left', 'margin-top', 'opacity', 'transform'],
    },
  },

  scrollbarStyles: {
    height: 10,
    width: 10,
  },

  scrollbarCornerStyles: {},

  scrollbarThumbStyles: {
    backgroundColor: 'primary',
    border: 'hairline',
    borderColor: 'background',
    borderRadius: 'circle',
  },

  scrollbarTrackStyles: {},

  textVariants: {
    'code': { color: 'primary', fontFamily: 'monospace' },
    'heading--1': { fontSize: 'xxlarge', fontWeight: 900 },
    'heading--2': { fontSize: 'xlarge', fontWeight: 'bold' },
    'heading--3': { fontSize: 'large', fontWeight: 'bold' },
    'label': { color: 'text--faded', fontSize: 'small' },
  },

  whitespaces: {
    xxloose: '15vh',
    xloose: '5rem',
    loose: '3rem',
    normal: '2rem',
    tight: '0.9rem',
    xtight: '0.5rem',
    xxtight: '0.25rem',
  },

  zIndices: {
    '1000--maximum': 1000,
    '100--popoversAndTooltips': 100,
    '10--modalWindows': 10,
    '1--stickyElements': 1,
  },
};
