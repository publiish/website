import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Icon } from '@/react-handy-box/components/Icon';
import {
  DividingLine,
  GroupLabel,
  MenuItem,
  MenuItemWithChildren,
  MenuProps,
} from '@/react-handy-box/components/Menu.types';
import { Popover } from '@/react-handy-box/components/Popover';
import {
  PopoverEventHandler,
  PopoverRenderFunction,
  PopoverRenderProps,
} from '@/react-handy-box/components/Popover.types';
import {
  KeyMap,
  useKeyboardShortcuts,
} from '@/react-handy-box/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { tokens } from '@/tokens';
import merge from 'lodash/merge';
import {
  forwardRef,
  MouseEvent,
  Ref,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

const Menu = forwardRef(
  (
    { options, renderOptions, styles, onBeforeOpen, ...otherProps }: MenuProps,
    ref: Ref<HTMLDivElement>
  ): JSX.Element => {
    const hoistedPopoverRenderPropsRef = useRef<PopoverRenderProps | null>(
      null
    );
    ``;
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const [menuElementRef, setMenuElementRef] = useState<HTMLElement | null>(
      null
    );
    const multipleRefs = useMultipleRefs(ref, setMenuElementRef);

    const memoizedKeyMap = useMemo<KeyMap>(
      () => ({
        left: () => {
          hoistedPopoverRenderPropsRef.current?.closeModal();
        },
        right: () => {
          (document.activeElement as HTMLElement).click?.();
        },
      }),
      []
    );

    useKeyboardShortcuts(memoizedKeyMap, menuElementRef);

    const menuOptionRenderer: PopoverRenderFunction = (popoverRenderProps) => {
      const hasIcons = options.some(
        (option) => option.type === 'menu-item' && !!option.iconName
      );

      hoistedPopoverRenderPropsRef.current = popoverRenderProps;

      return options.length === 0 ? (
        <Box
          styles={{
            color: 'text--faded',
            fontSize: 'small',
            textAlign: 'center',
          }}
          onClick={popoverRenderProps.closeModal}
        >
          No options
        </Box>
      ) : (
        options.map((option, optionIndex) => {
          switch (option.type) {
            case 'menu-item': {
              const {
                iconName,
                iconVariant,
                label,
                type,
                onClick,
                ...otherOptionProps
              } = option as MenuItem;

              return (
                <MenuItem
                  {...otherOptionProps}
                  hasIcons={hasIcons}
                  iconName={iconName}
                  iconVariant={iconVariant}
                  key={optionIndex}
                  label={label}
                  onClick={(event: MouseEvent) => {
                    onClick?.(event);
                    popoverRenderProps.closeModal();
                  }}
                />
              );
            }

            case 'child-menu': {
              const {
                iconName,
                iconVariant,
                label,
                options,
                type,
                ...otherOptionProps
              } = option as MenuItemWithChildren;

              const childMenuOptions = options.map((subOption) =>
                subOption.type === 'menu-item'
                  ? {
                      ...subOption,
                      onClick: (event: MouseEvent) => {
                        subOption.onClick?.(event);
                        popoverRenderProps.closeModal(); // <- close entire menu
                      },
                    }
                  : subOption
              );

              return (
                <Menu
                  key={optionIndex}
                  options={childMenuOptions}
                  popperPlacementOrder={['right-start', 'left-start']}
                  renderTrigger={({ propsForTrigger }) => (
                    <MenuItem
                      {...otherOptionProps}
                      hasIcons={hasIcons}
                      iconName={iconName}
                      iconVariant={iconVariant}
                      label={
                        <Box
                          styles={{
                            alignItems: 'center',
                            columnGap: 'tight',
                            justifyContent: 'space-between',
                          }}
                        >
                          {label}
                          <Icon
                            name="caret-right"
                            variant={iconVariant ?? 'solid'}
                          />
                        </Box>
                      }
                      {...propsForTrigger}
                    />
                  )}
                />
              );
            }

            case 'group-label': {
              const { label, type, ...otherOptionProps } = option as GroupLabel;

              return (
                <GroupLabel
                  {...otherOptionProps}
                  key={optionIndex}
                  label={label}
                />
              );
            }

            case 'dividing-line': {
              const { type, ...otherOptionProps } = option as DividingLine;

              return <DividingLine {...otherOptionProps} key={optionIndex} />;
            }
          }
        })
      );
    };

    const sizeMenuToTriggerElement: PopoverEventHandler = useCallback(
      (renderProps) => {
        const triggerElement = renderProps?.triggerElementRef?.current;
        const currentTriggerWidth = triggerElement?.clientWidth ?? 0;

        if (triggerElement && currentTriggerWidth !== triggerWidth) {
          setTriggerWidth(currentTriggerWidth);
        }
      },
      [triggerWidth]
    );

    return (
      <Popover
        ref={multipleRefs}
        role="menu"
        styles={merge(
          {},
          tokens.modalLayerVariants.menu,
          { width: triggerWidth <= 200 ? undefined : triggerWidth },
          styles
        )}
        type="menu"
        onBeforeOpen={(renderProps) => {
          sizeMenuToTriggerElement(renderProps);
          onBeforeOpen?.(renderProps);
        }}
        {...otherProps}
      >
        {(popoverRenderProps) =>
          renderOptions?.({
            renderedOptions: menuOptionRenderer(popoverRenderProps),
            menuRenderProps: popoverRenderProps,
          }) ?? menuOptionRenderer(popoverRenderProps)
        }
      </Popover>
    );
  }
);

Menu.displayName = 'Menu';

type DividingLineComponentProps = BoxPropsWithoutRef;

const DividingLine = forwardRef(
  (
    { styles, ...otherProps }: DividingLineComponentProps,
    ref: Ref<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      styles={{
        borderBottom: 'hairline',
        marginY: 'xtight',
        ...styles,
      }}
      {...otherProps}
    />
  )
);

DividingLine.displayName = 'DividingLine';

type GroupLabelComponentProps = BoxPropsWithoutRef & Omit<GroupLabel, 'type'>;

const GroupLabel = forwardRef(
  (
    { label, styles, ...otherProps }: GroupLabelComponentProps,
    ref: Ref<HTMLDivElement>
  ) => (
    <Box
      ref={ref}
      styles={{
        color: 'text--faded',
        fontSize: 'small',
        paddingBottom: 'xtight',
        paddingTop: 'tight',
        paddingX: 'xtight',
        stylesForCustomSelector: {
          ':nth-child(2)': {
            paddingTop: 'xtight',
          },
        },
        textTransform: 'uppercase',
        ...styles,
      }}
      {...otherProps}
    >
      {label}
    </Box>
  )
);

GroupLabel.displayName = 'GroupLabel';

type MenuItemComponentProps = Omit<MenuItem, 'type'> & {
  hasIcons?: boolean;
};

const MenuItem = forwardRef(
  (
    {
      hasIcons,
      iconName,
      iconVariant,
      label,
      styles,
      ...otherProps
    }: MenuItemComponentProps,
    ref: Ref<HTMLButtonElement>
  ): JSX.Element => (
    <Box
      as="button"
      ref={ref}
      styles={merge(
        {
          alignItems: 'center',
          borderRadius: 'small',
          columnGap: 'tight',
          cursor: 'pointer',
          padding: 'xtight',
          stylesOnFocus: {
            boxShadow: 'focusRing',
            zIndex: '1--stickyElements',
          },
          stylesOnHover: {
            backgroundColor: 'background--selected',
          },
          whiteSpace: 'nowrap',
        },
        styles
      )}
      {...otherProps}
    >
      {hasIcons && (
        <Icon
          name={iconName ?? 'arrow-right'}
          styles={{
            visibility: iconName ? 'visible' : 'hidden',
          }}
          variant={iconVariant}
        />
      )}
      {label}
    </Box>
  )
);

MenuItem.displayName = 'MenuItem';

export { Menu };
