import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Fragment } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi2';

interface Props {
  path: { route: string; label: string }[];
}

export function Breadcrumbs({ path }: Props) {
  return (
    <div className="flex flex-row items-center gap-1 underline-offset-2">
      <Link
        href="/admin/pontos"
        className="text-xs font-bold text-primary-500 hover:text-primary-300 hover:underline"
      >
        Home
      </Link>
      {path.map((segment, i) => (
        <Fragment key={i}>
          <HiOutlineChevronRight
            size={12}
            className="text-slate-500"
            strokeWidth={2.5}
          />
          <Link
            href={segment.route}
            className={cn(
              'text-xs font-bold text-primary-500 hover:text-primary-300 hover:underline',
              i === path.length - 1 ? 'text-primary-700' : 'text-primary-500',
            )}
          >
            {segment.label}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
