import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { ReactNode } from 'react';

type GradientTextProps = BoxPropsWithoutRef<'span'> & {
  children: ReactNode;
};

function GradientText({ children }: GradientTextProps) {
  return (
    <Box
      as="span"
      styles={{
        backgroundImage: 'linear-gradient(160deg, #0E65FD 20%, #78F0C5 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </Box>
  );
}

export { GradientText };
