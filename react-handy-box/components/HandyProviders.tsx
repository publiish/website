import {
  GlobalAnimations,
  GlobalStyles,
} from '@/react-handy-box/components/GlobalStyles';
import { ModalLayerProvider } from '@/react-handy-box/components/ModalLayer';
import { GlobalIntervalProvider } from '@/react-handy-box/hooks/useGlobalInterval';
import { ColorThemeName } from '@/react-handy-box/types';
import { tokenNames } from '@/tokenNames';
import { ReactNode } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

export type HandyProviderRenderProps = {
  activeThemeName: ColorThemeName;
  setThemeName: (newActiveThemeName: ColorThemeName) => void;
};

const HandyProviders = ({
  activeThemeName = tokenNames.colorThemes[0],
  children,
  disableVendorPrefixesInDevMode = true,
}: {
  activeThemeName?: ColorThemeName;
  children: ReactNode;
  disableVendorPrefixesInDevMode?: boolean;
}) => {
  return (
    <StyleSheetManager
      disableVendorPrefixes={
        disableVendorPrefixesInDevMode
          ? process.env.NODE_ENV === 'development'
          : undefined
      }
    >
      <ThemeProvider theme={{ name: activeThemeName }}>
        <GlobalIntervalProvider>
          <GlobalAnimations />
          <GlobalStyles />
          <ModalLayerProvider>{children}</ModalLayerProvider>
        </GlobalIntervalProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export { HandyProviders };
