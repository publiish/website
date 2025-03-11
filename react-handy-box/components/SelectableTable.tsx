import {
  AbstractMultiSelectInput,
  AbstractMultiSelectInputProps,
  BaseOptionShape,
} from '@/react-handy-box/components/AbstractMultiSelectInput';
import { BoxPropsWithoutRef } from '@/react-handy-box/components/Box.types';
import { Button } from '@/react-handy-box/components/Button';
import { Checkbox, Radio } from '@/react-handy-box/components/CheckboxesInput';
import { Table } from '@/react-handy-box/components/Table';
import {
  BaseRowShape,
  BaseTableProps,
  ColumnDescriptor,
} from '@/react-handy-box/components/Table.types';
import { forwardRef, MouseEvent, Ref, RefObject, useMemo } from 'react';

type SelectableRowShape = BaseRowShape & {
  control?: JSX.Element;
  value: string | number;
};

type SelectableTableProps<
  OptionShape extends BaseOptionShape,
  IsMultiValue extends boolean,
  RowShape extends SelectableRowShape,
  K extends keyof RowShape
> = Omit<BoxPropsWithoutRef<'label'>, 'children'> &
  Omit<
    AbstractMultiSelectInputProps<OptionShape, IsMultiValue>,
    'options' | 'renderOptions'
  > &
  BaseTableProps<RowShape, K>;

// eslint-disable-next-line react/display-name
const SelectableTable = forwardRef(
  <
    OptionShape extends BaseOptionShape,
    IsMultiValue extends boolean,
    RowShape extends SelectableRowShape,
    K extends keyof RowShape
  >(
    {
      isMultiValue,
      labelLocation = 'hidden',
      rowObjects,
      columnDescriptors,
      ...otherProps
    }: SelectableTableProps<OptionShape, IsMultiValue, RowShape, K>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const rowObjectsAsOptions = useMemo<Array<OptionShape>>(
      () =>
        rowObjects.map(
          (rowObject) =>
            ({
              key: rowObject.key,
              label: rowObject.key,
              value: rowObject.value,
            } as OptionShape)
        ),
      [rowObjects]
    );

    const rowObjectsByKey = Object.fromEntries(
      rowObjects.map((rowObject) => [rowObject.key, rowObject])
    );

    const InputComponent = isMultiValue ? Checkbox : Radio;

    return (
      <AbstractMultiSelectInput
        isMultiValue={isMultiValue}
        labelLocation={labelLocation}
        options={rowObjectsAsOptions}
        ref={ref}
        renderOptions={({ options }) => {
          const areAllSelected = options.every((option) => option.isSelected);

          const isIndeterminate =
            !areAllSelected && options.some((option) => option.isSelected)
              ? 'indeterminate'
              : undefined;

          const handleClickSelectAll = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            options.forEach((option) => {
              const optionElement = (
                option.propsForOption?.ref as RefObject<HTMLButtonElement>
              )?.current;

              return !option.isSelected || areAllSelected
                ? optionElement?.click()
                : false;
            });
          };

          const modifiedColumnDescriptors = [
            {
              key: 'control',
              label: isMultiValue ? (
                <Button
                  styles={{
                    columnGap: 'tight',
                    fontSize: 'normal',
                    lineHeight: 0,
                  }}
                  variant="unstyled"
                  onClick={handleClickSelectAll}
                >
                  <InputComponent
                    isSelected={isIndeterminate || areAllSelected}
                  />
                </Button>
              ) : (
                <>&nbsp;</>
              ),
              isSortable: false,
              propsForCells: {
                styles: {
                  width: 1,
                  whiteSpace: 'nowrap',
                },
              } as BoxPropsWithoutRef<'td'>,
            } as ColumnDescriptor<RowShape, K>,
            ...columnDescriptors,
          ];

          const modifiedRowObjects = options.map(
            ({ isSelected, option, propsForOption }) => {
              const rowObject = rowObjectsByKey[option.key];

              return {
                control: (
                  <Button variant="unstyled" {...propsForOption}>
                    <InputComponent
                      isSelected={isSelected}
                      styles={{
                        color: isSelected ? 'text--selected' : undefined,
                      }}
                    />
                  </Button>
                ),
                ...rowObject,
                propsForContainer: {
                  styles: {
                    backgroundColor: isSelected
                      ? 'background--selected'
                      : undefined,
                    cursor: 'pointer',
                    stylesOnHover: {
                      backgroundColor: 'background--highlighted',
                      backgroundColorOpacity: isSelected ? '+20' : undefined,
                    },
                  },
                  onClick: propsForOption.onClick,
                },
              };
            }
          );

          return (
            <Table
              columnDescriptors={modifiedColumnDescriptors}
              rowObjects={modifiedRowObjects}
            />
          );
        }}
        {...otherProps}
      />
    );
  }
) as <
  OptionShape extends BaseOptionShape,
  IsMultiValue extends boolean,
  RowShape extends SelectableRowShape,
  K extends keyof RowShape
>(
  props: SelectableTableProps<OptionShape, IsMultiValue, RowShape, K>,
  ref: Ref<HTMLLabelElement>
) => JSX.Element;

(SelectableTable as any).displayName = 'SelectableTable';

export { SelectableTable };
