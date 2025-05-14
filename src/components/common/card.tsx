import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { DestructiveAlert } from '../alert-dialog';
import { Button } from '../ui/button';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

type CardImageProps = {
  src: string;
  alt: string;
  link?: string;
  className?: string;
};

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

type CardSubtitleProps = {
  children: React.ReactNode;
  className?: string;
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
  expandable?: boolean;
  isPublic?: boolean;
};

type CardActionsProps = {
  children: React.ReactNode;
  className?: string;
};

type CardActionProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'ghost' | 'link';
  className?: string;
};

// Componente principal Card
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'group relative flex min-h-64 w-full grow flex-col items-center justify-between rounded-md bg-white text-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

// Componente de imagem do Card
Card.Image = function CardImage({ src, alt, link, className }: CardImageProps) {
  if (link) {
    return (
      <Link href={link}>
        <Image
          width={256}
          height={256}
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full select-none object-cover transition-all duration-300 ease-in-out group-hover:grayscale-[50%]',
            className,
          )}
        />
      </Link>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'w-full select-none object-cover transition-all duration-300 ease-in-out group-hover:grayscale-[50%]',
        className,
      )}
    />
  );
};

// Componente de conteúdo principal do Card
Card.Content = function CardContent({
  children,
  className,
  expandable = true,
  isPublic = false,
}: CardContentProps) {
  return (
    <div
      className={cn(
        'absolute bottom-0 h-28 w-full overflow-hidden rounded-sm bg-slate-100 shadow lg:h-16',
        expandable &&
          'transition-all duration-300 ease-in-out group-hover:h-28',
        isPublic && 'h-16 group-hover:h-16',
        className,
      )}
    >
      {children}
    </div>
  );
};

// Componente de cabeçalho do Card
Card.Header = function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('flex w-full flex-col items-center p-2', className)}>
      {children}
    </div>
  );
};

// Componente de título do Card
Card.Title = function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h2
      className={cn(
        'text-md max-h-64 w-full overflow-hidden truncate text-ellipsis whitespace-nowrap p-2 font-semibold text-primary-800',

        className,
      )}
    >
      {children}
    </h2>
  );
};

// Componente de subtítulo do Card
Card.Subtitle = function CardSubtitle({
  children,
  className,
}: CardSubtitleProps) {
  return (
    <span className={cn('text-xs text-slate-500', className)}>{children}</span>
  );
};

// Componente de ações do Card
Card.Actions = function CardActions({ children, className }: CardActionsProps) {
  return (
    <div
      className={cn(
        'flex-gap flex justify-center gap-4 lg:hidden lg:group-hover:flex',
        className,
      )}
    >
      {children}
    </div>
  );
};

// Componente de ação individual do Card
Card.Action = function CardAction({
  children,
  href,
  onClick,
  variant = 'ghost',
  className,
}: CardActionProps) {
  if (href) {
    return (
      <Button variant={variant} asChild className={className}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

// Componente de ação destrutiva (exclusão)
Card.DestructiveAction = function CardDestructiveAction({
  children,
  onConfirm,
  className,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  className?: string;
}) {
  return (
    <DestructiveAlert onConfirm={onConfirm}>
      <Button variant="table-delete" className={className}>
        {children}
      </Button>
    </DestructiveAlert>
  );
};
