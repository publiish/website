import {
  AbstractMultiSelectInput,
  AbstractMultiSelectInputProps,
  BaseOptionShape,
} from '@/react-handy-box/components/AbstractMultiSelectInput';
import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Icon } from '@/react-handy-box/components/Icon';
import { Menu } from '@/react-handy-box/components/Menu';
import { MenuItem } from '@/react-handy-box/components/Menu.types';
import { tokens } from '@/tokens';
import { forwardRef, MouseEvent, Ref } from 'react';

type SingleSelectInputProps<T extends BaseOptionShape> = Omit<
  BoxPropsWithoutRef<'div'>,
  'children' | 'onChange'
> &
  Omit<
    AbstractMultiSelectInputProps<T, false>,
    'isMultiValue' | 'renderOptions'
  >;

// eslint-disable-next-line react/display-name
const SingleSelectInput = forwardRef(
  <T extends BaseOptionShape>(
    { placeholder = 'Select...', ...otherProps }: SingleSelectInputProps<T>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <AbstractMultiSelectInput
      isMultiValue={false}
      ref={ref}
      renderOptions={({ options }) => {
        const selectedOption = options.find((option) => option.isSelected);
        const unselectedOptions = options.filter(
          (option) => !option.isSelected
        );

        const optionsAsMenuItems = unselectedOptions.map(
          ({ option, propsForOption }) =>
            ({
              label: option.label,
              type: 'menu-item',
              onClick: propsForOption.onClick,
            } as MenuItem)
        );

        const handleClickClearSelection = (event: MouseEvent) => {
          event.stopPropagation();
          event.preventDefault();

          selectedOption?.propsForOption.onClick?.(event);
        };

        return (
          <Box styles={{ rowGap: 'xtight' }}>
            <Menu
              options={optionsAsMenuItems}
              renderTrigger={({ propsForTrigger }) => (
                <Box
                  ref={propsForTrigger.ref as Ref<HTMLDivElement>}
                  styles={{
                    ...tokens.inputStyles,
                    alignItems: 'center',
                    columnGap: 'tight',
                    display: 'flex',
                    justifyContent: 'space-between',
                    whiteSpace: 'nowrap',
                  }}
                  tabIndex={0}
                  onClick={propsForTrigger.onClick}
                >
                  <Box
                    styles={{
                      color: !selectedOption ? 'text--faded' : undefined,
                    }}
                  >
                    {selectedOption?.option.label ?? placeholder}
                  </Box>

                  <Box
                    styles={{
                      columnGap: 'xtight',
                      height: 0,
                    }}
                  >
                    {selectedOption && (
                      <Button
                        variant="iconOnly"
                        onClick={handleClickClearSelection}
                      >
                        <Icon name="xmark" />
                      </Button>
                    )}

                    <Button variant="iconOnly">
                      <Icon name="chevron-down" />
                    </Button>
                  </Box>
                </Box>
              )}
            />
          </Box>
        );
      }}
      {...otherProps}
    />
  )
) as <T extends BaseOptionShape>(
  props: SingleSelectInputProps<T>,
  ref: Ref<HTMLLabelElement>
) => JSX.Element;

(SingleSelectInput as any).displayName = 'SingleSelectInput';

export { SingleSelectInput };
