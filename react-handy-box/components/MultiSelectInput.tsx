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
import { forwardRef, Ref } from 'react';

type MultiSelectInputProps<T extends BaseOptionShape> = Omit<
  BoxPropsWithoutRef<'label'>,
  'children'
> &
  Omit<
    AbstractMultiSelectInputProps<T, true>,
    'isMultiValue' | 'renderOptions'
  >;

const MultiSelectInput = forwardRef(
  <T extends BaseOptionShape>(
    {
      disabled,
      placeholder = 'Select...',
      ...otherProps
    }: MultiSelectInputProps<T>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => (
    <AbstractMultiSelectInput
      disabled={disabled}
      isMultiValue={true}
      ref={ref}
      renderOptions={({ options }) => {
        const selectedOptions = options.filter((option) => option.isSelected);
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

        return (
          <Box
            styles={{
              rowGap: 'xtight',
            }}
          >
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
                      color: 'text--faded',
                    }}
                  >
                    {placeholder}
                  </Box>

                  <Box styles={{ alignItems: 'center', height: 0 }}>
                    <Button variant="iconOnly">
                      <Icon name="chevron-down" />
                    </Button>
                  </Box>
                </Box>
              )}
            />

            {!disabled && selectedOptions.length > 0 && (
              <Box
                styles={{
                  columnGap: 'xtight',
                  flexWrap: 'wrap',
                  rowGap: 'xtight',
                }}
              >
                {selectedOptions.map((selectedOption) => (
                  <Button
                    key={selectedOption.option.value}
                    variant="pill"
                    onClick={selectedOption.propsForOption.onClick}
                  >
                    <span>{selectedOption.option.label}</span>
                    <Icon name="xmark" />
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        );
      }}
      {...otherProps}
    />
  )
);

MultiSelectInput.displayName = 'MultiSelectInput';

export { MultiSelectInput };
