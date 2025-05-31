import { cn } from '@/lib/utils';

type PointProps = {
  children: React.ReactNode;
  isActive?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Point({
  children,
  isActive = false,
  className,
  ...props
}: PointProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-md shadow-md',
        {
          'bg-primary text-white': isActive,
          'border border-primary text-primary': !isActive,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
