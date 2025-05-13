import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

const PaginationRoot = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('flex select-none', className)}
    {...props}
  />
);
PaginationRoot.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>((props, ref) => <li ref={ref} {...props} />);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'pagination' : 'ghost',
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <a
    className={cn(
      buttonVariants({ variant: 'secondary', size: 'icon' }),
      {
        'cursor-not-allowed opacity-50': props.disabled,
      },
      className,
    )}
    aria-label="Voltar para a página anterior"
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </a>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <a
    className={cn(
      buttonVariants({ variant: 'secondary', size: 'icon' }),
      {
        'cursor-not-allowed opacity-50': props.disabled,
      },
      className,
    )}
    aria-label="Avançar para a próxima página"
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </a>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function calculatePages(totalPages: number, currentPage: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, null, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, null, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, null, currentPage, null, totalPages];
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = calculatePages(totalPages, currentPage);

  return (
    <PaginationRoot aria-label="Pagination">
      <PaginationContent>
        <PaginationPrevious
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        />
        {pages.map((page, i) => {
          if (page === null) {
            return <PaginationEllipsis key={i} />;
          }

          return (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationNext
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={currentPage >= totalPages}
        />
      </PaginationContent>
    </PaginationRoot>
  );
};
