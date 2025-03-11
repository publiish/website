import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { AnchorButton } from '@/react-handy-box/components/Button';
import { Text } from '@/react-handy-box/components/Text';
import merge from 'lodash/merge';
import { ComponentProps, forwardRef, ReactNode, Ref } from 'react';
import ReactMarkdown from 'react-markdown';
import { HeadingComponent } from 'react-markdown/lib/ast-to-react';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingRenderer = (props: { level: HeadingLevel }) => ReactNode;

type MarkdownProps = Omit<BoxPropsWithoutRef<'div'>, 'children'> & {
  children: string;
  headingRenderer?: HeadingRenderer;
  propsForReactMarkdown?: Omit<
    ComponentProps<typeof ReactMarkdown>,
    'children'
  >;
  startingHeadingLevel?: HeadingLevel;
};

const defaultHeadingRenderer: HeadingRenderer = ({ level, ...otherProps }) => (
  <Text
    as={`h${level}`}
    variant={`heading--${level}`}
    {...(otherProps as any)}
  />
);

const Markdown = forwardRef(
  (
    {
      children,
      headingRenderer = defaultHeadingRenderer,
      propsForReactMarkdown,
      startingHeadingLevel = 1,
      ...otherProps
    }: MarkdownProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const renderHeading: HeadingComponent = ({
      node,
      className,
      level,
      ...props
    }) => {
      const headingLevel = Math.min(
        level + (startingHeadingLevel - 1),
        6
      ) as HeadingLevel;

      return headingRenderer({ level: headingLevel, ...props }) as any;
    };

    return (
      <Box
        ref={ref}
        {...merge(
          {
            styles: {
              rowGap: 'normal',
            },
          },
          otherProps
        )}
      >
        <ReactMarkdown
          {...merge(
            {
              components: {
                a: ({ href, node, className, ...props }) => (
                  <AnchorButton
                    {...merge(
                      {
                        href,
                        styles: {
                          wordBreak: 'break-word',
                        },
                        target: href?.startsWith('http') ? '_blank' : undefined,
                        variant: 'link',
                      },
                      props as any
                    )}
                  />
                ),
                code: ({ node, inline, className, ...props }) => (
                  <Text
                    as={inline ? 'code' : 'pre'}
                    variant="code"
                    {...(props as any)}
                  />
                ),
                em: ({ node, className, ...props }) => (
                  <Text as="em" style="italic" {...(props as any)} />
                ),
                h1: renderHeading,
                h2: renderHeading,
                h3: renderHeading,
                h4: renderHeading,
                h5: renderHeading,
                h6: renderHeading,
                strong: ({ node, className, ...props }) => (
                  <Text as="strong" weight="bold" {...(props as any)} />
                ),
              },
              rehypePlugins: [rehypeRaw],
              remarkPlugins: [remarkGfm],
            } as ReactMarkdownOptions,
            propsForReactMarkdown
          )}
        >
          {children}
        </ReactMarkdown>
      </Box>
    );
  }
);

Markdown.displayName = 'Markdown';

export { Markdown };
