import { Icon } from '@/react-handy-box/components//Icon';
import { Box } from '@/react-handy-box/components/Box';
import { BoxPropsWithRef } from '@/react-handy-box/components/Box.types';
import {
  BaseRowShape,
  ColumnDescriptor,
  SortDirection,
  TableCellProps,
  TableHeaderCellProps,
  TableHeaderRowProps,
  TableProps,
  TableRowProps,
} from '@/react-handy-box/components/Table.types';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import sortBy from 'lodash/sortBy';
import {
  createContext,
  forwardRef,
  MouseEvent,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button } from './Button';

const TableContext = createContext<any>({});

// eslint-disable-next-line react/display-name
const Table = forwardRef(
  <RowShape extends BaseRowShape, K extends keyof RowShape>(
    {
      columnDescriptors,
      initialSortedColumnKey,
      renderCells,
      renderHeaderCells,
      renderHeaderRow,
      renderRow,
      rowObjects,
      styles,
      ...otherProps
    }: TableProps<RowShape, K>,
    ref: Ref<HTMLTableElement>
  ) => {
    const initiallySortedColumnDescriptor = useMemo(
      () =>
        columnDescriptors.find(
          (columnDescriptor) => columnDescriptor.key === initialSortedColumnKey
        ),
      [columnDescriptors, initialSortedColumnKey]
    );

    const [sortDirection, setSortDirection] = useState<SortDirection>(
      initiallySortedColumnDescriptor?.initialSortDirection ?? 'ASC'
    );

    const [sortedColumnDescriptor, setSortedColumnDescriptor] = useState<
      ColumnDescriptor<RowShape, K> | undefined
    >(initiallySortedColumnDescriptor);

    const [sortedAndFilteredRowObjects, setSortedAndFilteredRowObjects] =
      useState<Array<RowShape>>(rowObjects);

    const tableContext = useMemo(
      () => ({
        columnDescriptors,
        rowObjects: sortedAndFilteredRowObjects,
        sortDirection,
        sortedColumnDescriptor,
      }),
      [
        columnDescriptors,
        sortDirection,
        sortedAndFilteredRowObjects,
        sortedColumnDescriptor,
      ]
    );

    useEffect(() => {
      if (!sortedColumnDescriptor) {
        setSortedAndFilteredRowObjects(rowObjects);
        return;
      }

      const defaultSortFunction = (rowObjects: Array<RowShape>) =>
        sortBy(rowObjects, sortedColumnDescriptor.key);

      const sortFunction =
        sortedColumnDescriptor?.customSortFunction ?? defaultSortFunction;

      const sortedRowObjects = sortFunction(rowObjects);

      if (sortDirection === 'DESC') {
        sortedRowObjects.reverse();
      }

      setSortedAndFilteredRowObjects(sortedRowObjects);
    }, [rowObjects, sortDirection, sortedColumnDescriptor]);

    const handleClickColumnHeading = useCallback(
      (columnDescriptor: ColumnDescriptor<RowShape, K>, event: MouseEvent) => {
        event.preventDefault();

        setSortedColumnDescriptor((currentSortedColumnDescriptor) => {
          if (
            currentSortedColumnDescriptor &&
            columnDescriptor.key === currentSortedColumnDescriptor.key
          ) {
            setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
          } else {
            setSortDirection(columnDescriptor.initialSortDirection || 'ASC');
          }

          return columnDescriptor;
        });
      },
      [sortDirection]
    );

    const renderedRows = useMemo(() => {
      return sortedAndFilteredRowObjects.map((rowObject, rowObjectIndex) => {
        const customRowRenderer = renderRow;

        const rowContents = columnDescriptors.map((columnDescriptor) => {
          const cellContents = rowObject[columnDescriptor.key];

          const customCellRenderer = renderCells?.[columnDescriptor.key];

          const tableCellRenderProps = {
            cellContents,
            columnDescriptor,
            key: String(columnDescriptor.key),
            rowObject,
            tableContext,
          };

          return (
            customCellRenderer?.(tableCellRenderProps) ?? (
              <TableCell {...tableCellRenderProps} />
            )
          );
        });

        const tableRowRenderProps = {
          key: rowObject.key,
          rowContents,
          rowObject,
          tableContext,
        } as const;

        return (
          customRowRenderer?.(tableRowRenderProps) ?? (
            <TableRow {...tableRowRenderProps} />
          )
        );
      });
    }, [
      columnDescriptors,
      renderCells,
      renderRow,
      sortedAndFilteredRowObjects,
      tableContext,
    ]);

    const renderedHeaderCells = useMemo(
      () =>
        columnDescriptors.map((columnDescriptor) => {
          const isSortable = columnDescriptor.isSortable ?? true;

          const customHeaderCellRenderer =
            renderHeaderCells?.[columnDescriptor.key];

          const tableHeaderCellRenderProps = {
            cellContents: columnDescriptor.label,
            columnDescriptor,
            key: String(columnDescriptor.key),
            propsForCellContentsWrapper: {},
            tableContext,
          };

          if (isSortable) {
            const handleClickToSort = (event: MouseEvent) => {
              event.preventDefault();
              handleClickColumnHeading(columnDescriptor, event);
            };

            const propsForCellContentsWrapperAsButton = {
              onClick: handleClickToSort,
            };

            tableHeaderCellRenderProps.propsForCellContentsWrapper = merge(
              {},
              tableHeaderCellRenderProps.propsForCellContentsWrapper,
              propsForCellContentsWrapperAsButton
            );
          }

          return (
            customHeaderCellRenderer?.(tableHeaderCellRenderProps) ?? (
              <TableHeaderCell {...tableHeaderCellRenderProps} />
            )
          );
        }),
      [
        columnDescriptors,
        handleClickColumnHeading,
        renderHeaderCells,
        tableContext,
      ]
    );

    const renderedHeaderRow = useMemo(() => {
      const tableHeaderRowRenderProps = {
        propsForTableRowElement: {
          styles: {
            color: 'text--faded',
            fontSize: 'small',
          },
        },
        rowContents: renderedHeaderCells,
        tableContext,
      } as const;

      return (
        renderHeaderRow?.(tableHeaderRowRenderProps) ?? (
          <TableHeaderRow {...tableHeaderRowRenderProps} />
        )
      );
    }, [renderHeaderRow, renderedHeaderCells, tableContext]);

    return (
      <Box
        as="table"
        ref={ref}
        styles={{
          backgroundColor: 'background',
          borderCollapse: 'collapse',
          borderRadius: 'small',
          stylesForAfterElement: {
            border: 'normal',
            borderRadius: 'small',
            bottom: 0,
            boxSizing: 'content-box',
            height: '100%',
            left: 0,
            marginLeft: -2,
            marginTop: -2,
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
          },
          position: 'relative',
          width: '100%',
          ...styles,
        }}
        {...otherProps}
      >
        <Box as="thead">{renderedHeaderRow}</Box>
        <Box as="tbody">{renderedRows}</Box>
      </Box>
    );
  }
) as <RowShape extends BaseRowShape, K extends keyof RowShape>(
  props: TableProps<RowShape, K>
) => JSX.Element;

(Table as any).displayName = 'Table';

// eslint-disable-next-line react/display-name
const TableHeaderRow = forwardRef(
  <RowShape extends BaseRowShape, K extends keyof RowShape>(
    { rowContents, ...otherProps }: TableHeaderRowProps<RowShape, K>,
    ref: Ref<HTMLTableRowElement>
  ): JSX.Element => {
    return (
      <Box as="tr" ref={ref} {...otherProps}>
        {rowContents}
      </Box>
    );
  }
) as <RowShape extends BaseRowShape, K extends keyof RowShape>(
  props: TableHeaderRowProps<RowShape, K>
) => JSX.Element;

(TableHeaderRow as any).displayName = 'TableHeaderRow';

// eslint-disable-next-line react/display-name
const TableHeaderCell = forwardRef(
  <RowShape extends BaseRowShape, K extends keyof RowShape>(
    {
      cellContents,
      columnDescriptor,
      propsForCellContentsWrapper,
      tableContext,
      ...otherProps
    }: TableHeaderCellProps<RowShape, K>,
    ref: Ref<HTMLTableCellElement>
  ): JSX.Element => {
    const { columnDescriptors, sortDirection, sortedColumnDescriptor } =
      tableContext;

    const isFirstColumn = columnDescriptors[0].key === columnDescriptor.key;

    const isLastColumn =
      columnDescriptors[columnDescriptors.length - 1].key ===
      columnDescriptor.key;

    const isSortable = columnDescriptor.isSortable ?? true;

    const isSorted = sortedColumnDescriptor?.key === columnDescriptor.key;

    const Component = isSortable ? Button : Box;

    const textAlign = propsForCellContentsWrapper?.styles?.textAlign;

    const innerPropsForCellContentsWrapper = merge(
      {
        styles: {
          backgroundColor: isSorted ? 'background--shaded' : undefined,
          borderBottom: 'normal',
          borderTopLeftRadius: isFirstColumn ? `calc(small - 1px)` : undefined,
          borderTopRightRadius: isLastColumn ? `calc(small - 1px)` : undefined,
          color: 'text--faded',
          fontSize: 'small',
          paddingX: 'tight',
          paddingY: 'xtight',
          textAlign: 'left',
          width: '100%',
        },
      },
      isSortable
        ? {
            styles: {
              alignItems: 'center',
              columnGap: 'xtight',
              justifyContent:
                textAlign === 'left'
                  ? 'flex-start'
                  : textAlign === 'right'
                  ? 'flex-end'
                  : 'center',
            },
            tabIndex: 1,
            variant: isSortable ? 'unstyled' : undefined,
          }
        : {}
    );

    return (
      <Box
        as="th"
        ref={ref}
        {...merge(
          {
            styles: {
              borderTopLeftRadius:
                columnDescriptor.key === columnDescriptors[0].key
                  ? 'small'
                  : undefined,
              borderTopRightRadius:
                columnDescriptor.key ===
                columnDescriptors[columnDescriptors.length - 1].key
                  ? 'small'
                  : undefined,
            },
          },
          otherProps
        )}
      >
        <Component
          {...(merge(
            {},
            innerPropsForCellContentsWrapper,
            propsForCellContentsWrapper,
            omit(columnDescriptor.propsForCells, 'styles.width')
          ) as BoxPropsWithRef<'button'>)}
        >
          {cellContents}
          {isSortable && (
            <Icon
              name={'caret-up'}
              styles={{
                opacity: isSorted ? 1 : 0,
                transform: `rotate(${sortDirection === 'ASC' ? 0 : 180}deg)`,
                transitionProperty: ['opacity', 'transform'],
              }}
              variant="solid"
            />
          )}
        </Component>
      </Box>
    );
  }
) as <RowShape extends BaseRowShape, K extends keyof RowShape>(
  props: TableHeaderCellProps<RowShape, K>
) => JSX.Element;

(TableHeaderCell as any).displayName = 'TableHeaderCell';

// eslint-disable-next-line react/display-name
const TableRow = forwardRef(
  <RowShape extends BaseRowShape, K extends keyof RowShape>(
    {
      rowContents,
      rowObject,
      tableContext,
      ...otherProps
    }: TableRowProps<RowShape, K>,
    ref: Ref<HTMLTableRowElement>
  ): JSX.Element => {
    const { rowObjects } = tableContext;

    const rowIndex = rowObjects.indexOf(rowObject);

    return (
      <Box
        as="tr"
        ref={ref}
        {...merge(
          {
            key: `${rowObject.key}-${rowIndex}`,
            styles: {
              borderRadius: 'small',
              backgroundColor:
                rowIndex % 2 === 0 ? 'background--shaded' : undefined,
            },
          },
          rowObject.propsForContainer,
          otherProps
        )}
      >
        {rowContents}
      </Box>
    );
  }
) as <RowShape extends BaseRowShape, K extends keyof RowShape>(
  props: TableRowProps<RowShape, K>
) => JSX.Element;

(TableRow as any).displayName = 'TableRow';

// eslint-disable-next-line react/display-name
const TableCell = forwardRef(
  <RowShape extends BaseRowShape, K extends keyof RowShape>(
    {
      cellContents,
      columnDescriptor,
      rowObject,
      styles,
      tableContext,
      ...otherProps
    }: TableCellProps<RowShape, K>,
    ref: Ref<HTMLTableCellElement>
  ): JSX.Element => {
    const { columnDescriptors, rowObjects, sortedColumnDescriptor } =
      tableContext;

    const isColumnSorted =
      columnDescriptors.length >= 2 &&
      columnDescriptor.key === sortedColumnDescriptor?.key;

    const isFirstColumn = columnDescriptors[0].key === columnDescriptor.key;

    const isLastColumn =
      columnDescriptors[columnDescriptors.length - 1].key ===
      columnDescriptor.key;

    const isLastRow = rowObjects.indexOf(rowObject) === rowObjects.length - 1;

    return (
      <Box
        as="td"
        ref={ref}
        {...merge(
          {
            styles: {
              backgroundColor: isColumnSorted
                ? 'background--shaded'
                : undefined,
              borderBottomLeftRadius:
                isLastRow && isFirstColumn ? 'small' : undefined,
              borderBottomRightRadius:
                isLastRow && isLastColumn ? 'small' : undefined,
              paddingX: 'tight',
              paddingY: 'tight',
            },
          } as const,
          styles,
          columnDescriptor.propsForCells,
          otherProps
        )}
      >
        {cellContents}
      </Box>
    );
  }
) as <RowShape extends BaseRowShape, K extends keyof RowShape>(
  props: TableCellProps<RowShape, K>
) => JSX.Element;

(TableCell as any).displayName = 'TableCell';

export { Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow };
