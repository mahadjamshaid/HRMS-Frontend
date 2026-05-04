import type { ReactNode } from "react";

export type BaseColumn<T> = {
  header: string;
  className?: string;
  cellClassName?: string;
};

export type AccessorColumn<T> = BaseColumn<T> & {
  accessor: keyof T;
  render?: never;
};

export type RenderColumn<T> = BaseColumn<T> & {
  render: (row: T) => React.ReactNode;
  accessor?: never;
};

export type Column<T> = AccessorColumn<T> | RenderColumn<T>;

export type AttendanceTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  page: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
};
