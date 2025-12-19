type TransactionHeaderProps = {
  title: string;
  subtitle?: string;
};

export function TransactionHeader({ title, subtitle }: TransactionHeaderProps) {
  return (
    <div className="space-y-1 mb-6">
      <h1 className="text-2xl font-semibold text-ad-dark">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
