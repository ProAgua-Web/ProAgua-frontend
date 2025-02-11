import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Fragment } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi2';

interface Props {
  path: { route: string; label: string }[];
}

export function Breadcrumbs({ path }: Props) {
  return (
    <div className="flex flex-row items-center gap-1 underline-offset-2 lg:pt-12">
      <Link
        href="/home"
        className="text-xs font-bold text-white hover:text-brand-green-200"
      >
        Home
      </Link>
      {path.map((segment, i) => (
        <Fragment key={i}>
          <HiOutlineChevronRight
            size={12}
            className="text-white"
            strokeWidth={2.5}
          />
          <Link
            href={segment.route}
            className={cn(
              'text-xs font-bold text-white hover:text-brand-green-200',
              {
                underline: i === path.length - 1,
              },
            )}
          >
            {segment.label}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
