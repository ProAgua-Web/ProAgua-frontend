import { Breadcrumbs } from '../ui/breadcrumbs';

interface Props {
  breadcrumbs: Array<{ route: string; label: string }>;
  children: React.ReactNode;
}

export function CrudLayout({ breadcrumbs, children }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs path={breadcrumbs} />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
