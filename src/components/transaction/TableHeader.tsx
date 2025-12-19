type TableHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export function TableHeader({
  title,
  subtitle,
  actions,
}: TableHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-ad-dark">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
