'use client';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';
import { HiOutlinePlus } from 'react-icons/hi2';

interface Props {
  breadcrumbs: Array<{ route: string; label: string }>;
  title?: string;
  subtitle?: string;
  subItens?: React.ReactNode;
  navLinks?: Array<{
    label: string;
    route: string;
    target?: HTMLAttributeAnchorTarget;
  }>;
  children: React.ReactNode;
}

export function DataListLayout(props: Props) {
  const { breadcrumbs, title, subtitle, navLinks, children } = props;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs path={breadcrumbs} />
        </div>
        <div className="flex w-full flex-col justify-between gap-4 px-6 py-4 lg:flex-row">
          <div>
            <h1 className="text-2xl font-semibold text-primary-800">{title}</h1>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <div>
            <div className="flex gap-4">
              {props.subItens}
              {navLinks?.map((button, index) => (
                <Button
                  key={index}
                  variant="add"
                  className="h-full w-full lg:w-fit"
                  asChild
                >
                  <Link href={button.route} target={button.target ?? '_self'}>
                    <HiOutlinePlus size={20} />
                    {button.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
