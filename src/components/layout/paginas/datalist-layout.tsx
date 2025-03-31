'use client';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi2';

interface Props {
  breadcrumbs: Array<{ route: string; label: string }>;
  title: string;
  subtitle: string;
  newItemButton: { label: string; link: string };
  children: React.ReactNode;
}

export default function DataListPage(props: Props) {
  const {
    breadcrumbs,
    title,
    subtitle,
    newItemButton: createButton,
    children,
  } = props;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs path={breadcrumbs} />
        </div>
        <div className="flex w-full flex-row justify-between px-6 py-4">
          <div>
            <h1 className="text-primary-800 text-2xl font-semibold">{title}</h1>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <div>
            <Link href={createButton.link}>
              <Button variant="add" className="h-full" asChild>
                <HiOutlinePlus size={20} />
                {createButton.label}
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
