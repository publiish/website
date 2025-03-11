import { GradientText } from '@/components/GradientText';
import { Box } from '@/react-handy-box/components/Box';
import { AnchorButton, Button } from '@/react-handy-box/components/Button';
import { Icon } from '@/react-handy-box/components/Icon';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Box
        styles={{
          alignItems: 'center',
          backgroundColor: 'black',
          height: '100vh',
          justifyContent: 'space-between',
          overflow: 'hidden',
          paddingX: 'normal',
          paddingY: 'loose',
          rowGap: 0,
          stylesForDesktopOrLarger: {
            paddingY: 'normal',
          },
          textAlign: 'center',
          width: '100vw',
        }}
      >
        {/* Header */}
        <Box
          as="header"
          styles={{
            alignItems: 'center',
            position: 'relative',
            rowGap: 'loose',
            zIndex: '1--stickyElements',
          }}
        >
          <Box
            styles={{
              height: 70,
              maxWidth: '55vw',
              position: 'relative',
              stylesForDesktopOrLarger: {
                position: 'fixed',
                top: 'normal',
                left: 'normal',
              },
              width: 88,
            }}
          >
            {/* <Image alt="Publiish Logo" src="/logo.svg" fill={true} /> */}
          </Box>

          {/* Hero and button */}
          <Box
            styles={{
              alignItems: 'center',
              rowGap: 'normal',
              stylesForDesktopOrLarger: {
                marginTop: 'xxloose',
              },
            }}
          >
            {/* Headline and Subtitle */}
            <Box styles={{ alignItems: 'center', rowGap: 'tight' }}>
              <Box
                styles={{
                  fontName: 'display',
                  fontSize: 'xxlarge',
                  fontWeight: 'bold',
                }}
              >
                <GradientText>Sync</GradientText> with{' '}
                <GradientText>Publiish</GradientText>
              </Box>

              <Box
                styles={{
                  fontName: 'display',
                  fontSize: 'xlarge',
                }}
              >
                Kademlia Backed Storage (IPFS) with UCAN Authorization
              </Box>
            </Box>

            <AnchorButton href="https://docs.pantherstorage.io/" target="_blank">
              View Docs
            </AnchorButton>
          </Box>
        </Box>

        {/* Social Links */}
        <Box
          styles={{
            columnGap: 'tight',
            fontSize: 'xlarge',
            stylesForDesktopOrLarger: {
              columnGap: 'xtight',
              fontSize: 'large',
              position: 'fixed',
              top: 'normal',
              right: 'normal',
              zIndex: '2',
            },
          }}
        >
          <Box
            as="a"
            href="https://github.com/publiish"
            target="_blank"
          >
            <Icon name="github" variant="brands" />
          </Box>

          <Box as="a" href="https://t.me/pantherstorage" target="_blank">
            <Icon name="telegram" variant="brands" />
          </Box>

          <Box as="a" href="https://twitter.com/pantherstorage" target="_blank">
            <Icon name="twitter" variant="brands" />
          </Box>

          <Box as="a" href="https://discord.gg/ueqsM5q9aG" target="_blank">
            <Icon name="discord" variant="brands" />
          </Box>
        </Box>

        {/* Footer */}
        <Box styles={{ fontSize: 'small', rowGap: 'xtight' }}>
          <Box>Powered By</Box>
          <Box
            styles={{
              height: 80,
              width: 200, 
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AnchorButton href="https://automatedpros.io/" target="_blank" variant="unstyled">
              <Image
                alt="AutomatedPros"
                src="/automatedpros-logo.svg"
                width={180} 
                height={60} 
                style={{ objectFit: 'contain' }}
              />
            </AnchorButton>
          </Box>

        </Box>
      </Box>

      {/* Decorative Elements */}
      <Box
        styles={{
          pointerEvents: 'none',
        }}
      >
        {/* Orb: Top Left */}
        <Box
          styles={{
            height: '200vw',
            left: 0,
            position: 'fixed',
            stylesForDesktopOrLarger: {
              height: '60vw',
              transform: 'translate(0, 0)',
              width: '60vw',
            },
            top: 0,
            transform: 'translate(-30%, 0)',
            width: '200vw',
          }}
        >
          <Image alt="Decorative Element" src="/orb-top-left.svg" fill={true} />
        </Box>

        {/* Orb: Bottom Right */}
        <Box
          styles={{
            bottom: 0,
            height: '200vw',
            position: 'fixed',
            right: 0,
            stylesForDesktopOrLarger: {
              height: '60vw',
              transform: 'translate(5%, 0) rotate(180deg)',
              width: '60vw',
            },
            transform: 'translate(30%, 0) rotate(180deg)',
            width: '200vw',
          }}
        >
          <Image alt="Decorative Element" src="/orb-top-left.svg" fill={true} />
        </Box>

        {/* Outline: Top Right */}
        <Box
          styles={{
            height: '60vw',
            position: 'fixed',
            right: 0,
            stylesForDesktopOrLarger: {
              height: '35vw',
              width: '35vw',
            },
            top: 0,
            transform: 'translate(25%, -25%)',
            width: '60vw',
          }}
        >
          <Image alt="Decorative Element" src="/logo-outline.svg" fill={true} />
        </Box>

        {/* Outline: Bottom Left */}
        <Box
          styles={{
            bottom: 0,
            height: '60vw',
            left: 0,
            position: 'fixed',
            stylesForDesktopOrLarger: {
              height: '35vw',
              width: '35vw',
            },
            transform: 'translate(-25%, 25%) rotate(180deg)',
            width: '60vw',
          }}
        >
        </Box>
      </Box>
    </>
  );
}
