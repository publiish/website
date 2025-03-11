import { ReactNode } from 'react';
import { BoxPropsWithoutRef, BoxPropsWithRef } from './Box.types';

type TableContextObject<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  rowObjects: Array<RowShape>;
  sortDirection?: SortDirection;
  sortedColumnDescriptor?: ColumnDescriptor<RowShape, K>;
};

type BaseRowShape = {
  key: string | number;
  propsForContainer?: BoxPropsWithoutRef<'tr'>;
} & Record<string, ReactNode>;

type SortDirection = 'ASC' | 'DESC';

type BaseTableProps<RowShape extends BaseRowShape, K extends keyof RowShape> = {
  columnDescriptors: Array<ColumnDescriptor<RowShape, K>>;
  initialSortedColumnKey?: K;
  renderCells?: Record<K, TableCellRenderFunction<RowShape, K>>;
  renderHeaderCells?: Record<K, TableHeaderCellRenderFunction<RowShape, K>>;
  renderHeaderRow?: TableHeaderRowRenderFunction<RowShape, K>;
  renderRow?: TableRowRenderFunction<RowShape, K>;
  rowObjects: Array<RowShape>;
};

type TableProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'table'> & BaseTableProps<RowShape, K>;

type ColumnDescriptor<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  key: K;
  customSortFunction?: (args?: {
    rowObjects?: Array<RowShape>;
    sortDirection?: SortDirection;
  }) => Array<RowShape>;
  initialSortDirection?: SortDirection;
  isSortable?: boolean;
  label: ReactNode;
  propsForCells?: BoxPropsWithRef<'td'>;
};

type TableCellRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  cellContents: ReactNode;
  columnDescriptor: ColumnDescriptor<RowShape, K>;
  rowObject: RowShape;
  tableContext: TableContextObject<RowShape, K>;
};

type TableCellRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableCellRenderProps<RowShape, K>) => JSX.Element;

type TableHeaderCellRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  cellContents: ReactNode;
  columnDescriptor: ColumnDescriptor<RowShape, K>;
  propsForCellContentsWrapper: BoxPropsWithRef<'button' | 'div'>;
  tableContext: TableContextObject<RowShape, K>;
};

type TableHeaderCellRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableHeaderCellRenderProps<RowShape, K>) => JSX.Element;

type TableRowRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  rowContents: ReactNode;
  rowObject: RowShape;
  tableContext: TableContextObject<RowShape, K>;
};

type TableRowRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableRowRenderProps<RowShape, K>) => JSX.Element;

type TableHeaderRowRenderProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = {
  rowContents: ReactNode;
  tableContext: TableContextObject<RowShape, K>;
};

type TableHeaderRowRenderFunction<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = (args: TableHeaderRowRenderProps<RowShape, K>) => JSX.Element;

type TableHeaderRowProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'tr'> & TableHeaderRowRenderProps<RowShape, K>;

type TableHeaderCellProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'td'> & TableHeaderCellRenderProps<RowShape, K>;

type TableRowProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'tr'> & TableRowRenderProps<RowShape, K>;

type TableCellProps<
  RowShape extends BaseRowShape,
  K extends keyof RowShape
> = BoxPropsWithoutRef<'td'> & TableCellRenderProps<RowShape, K>;

export type {
  BaseRowShape,
  BaseTableProps,
  ColumnDescriptor,
  SortDirection,
  TableCellProps,
  TableCellRenderFunction,
  TableCellRenderProps,
  TableContextObject,
  TableHeaderCellProps,
  TableHeaderCellRenderFunction,
  TableHeaderCellRenderProps,
  TableHeaderRowProps,
  TableHeaderRowRenderFunction,
  TableHeaderRowRenderProps,
  TableProps,
  TableRowProps,
  TableRowRenderFunction,
  TableRowRenderProps,
};
