'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select, Value } from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { cn, type NonEmptyArray, options } from '@/lib/utils';
import { type ReactNode, useMemo, useState } from 'react';
import { HiArrowLongDown, HiMagnifyingGlass } from 'react-icons/hi2';

type Id = string | number;
type Data<TCols extends string> = Record<TCols, string> & { id: Id };

type Props<TData extends Data<TCols>, TCols extends string> = Readonly<{
  isLoading: boolean;
  data: TData[];
  cols: NonEmptyArray<TCols>;
  customRender?: Partial<Record<TCols, (data: TData) => ReactNode>>;
  customColumnStyle?: Partial<Record<TCols, string>>;
  actions?: (data: TData) => ReactNode;
}>;

const pageSizeOptions = [6, 12, 20, 30, 50];

export function DataTable<TData extends Data<TCols>, TCols extends string>(
  props: Props<TData, TCols>,
) {
  const [pageSize, setPageSize] = useState(6);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<TCols>(props.cols[0]);

  const totalPages = Math.ceil(props.data.length / pageSize);

  const filteredData = useMemo(() => {
    return props.data.filter((row) => {
      const values = Object.values(row).map((value) =>
        value.toString().toLowerCase(),
      );
      return values.some((value) => value.includes(search.toLowerCase()));
    });
  }, [props.data, search]);

  const orderedData = useMemo(() => {
    return filteredData.toSorted((a, b) => {
      const valueA = a[orderBy].toString();
      const valueB = b[orderBy].toString();
      return order === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const slicedData: (TData | null)[] = orderedData.slice(
      start,
      start + pageSize,
    );
    return slicedData.concat(
      Array.from({ length: pageSize - slicedData.length }).fill(null) as null[],
    );
  }, [orderedData, currentPage, pageSize]);

  function handlePageSizeChange(value: Value) {
    setPageSize(Number(value));
    setCurrentPage(1);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col border-y bg-white lg:rounded-xl lg:border-x">
        <div className="flex w-full flex-col justify-between gap-4 border-b border-slate-100 p-6 lg:flex-row">
          <div className="relative flex lg:grow">
            <Input
              className="w-full min-w-0 pl-9"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <HiMagnifyingGlass className="absolute left-3 top-3" size={16} />
          </div>
          <div className="flex items-center justify-end gap-2 lg:grow">
            {props.isLoading && <Spinner />}
            <p className="text-xs font-medium">
              Informações apresentadas por página:
            </p>
            <Select
              className="w-20"
              options={options(pageSizeOptions, (n) => [n, n.toString()])}
              value={pageSize}
              onChange={handlePageSizeChange}
            />
          </div>
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                {props.cols.map((col) => (
                  <th
                    key={col}
                    className={
                      props.customColumnStyle?.[col]
                        ? props.customColumnStyle[col]
                        : `overflow-auto p-0`
                    }
                  >
                    <Button
                      variant="ghost"
                      className="group flex w-full justify-start gap-2 rounded-none border-none"
                      onClick={() => {
                        if (orderBy === col) {
                          setOrder(order === 'asc' ? 'desc' : 'asc');
                        } else {
                          setOrderBy(col);
                          setOrder('asc');
                        }
                      }}
                    >
                      <p
                        className={cn('truncate text-xs', {
                          'font-semibold text-slate-900': orderBy === col,
                          'font-medium text-slate-500': orderBy !== col,
                        })}
                      >
                        {col}
                      </p>
                      <HiArrowLongDown
                        className={cn('transform transition-transform', {
                          'rotate-180': orderBy === col && order === 'desc',
                          'text-brand-green-400 stroke-2': orderBy === col,
                        })}
                        size={16}
                      />
                    </Button>
                  </th>
                ))}
                {props.actions ? (
                  <th className="table-row-group overflow-auto p-0" colSpan={0}>
                    <p className="flex h-10 items-center truncate p-2 text-left text-xs font-medium text-slate-500">
                      Ações
                    </p>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => (
                <tr
                  key={row?.id ?? 'empty_' + i}
                  className="h-14 border-t border-slate-100 text-slate-500 last:rounded-b-xl odd:bg-slate-50"
                >
                  {props.cols.map((col) => (
                    <td
                      key={col}
                      className="max-w-48 overflow-auto truncate p-4"
                      title={row ? row[col].toString() : ''}
                    >
                      {row
                        ? (props.customRender?.[col]?.(row) ??
                          row[col].toString())
                        : null}
                    </td>
                  ))}
                  {props.actions ? (
                    <td className="px-2">{row && props.actions(row)}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-4 px-4 lg:px-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
