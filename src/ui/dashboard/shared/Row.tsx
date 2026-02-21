

export function Row(props: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-muted-foreground">{props.label}</div>
      <div className="font-medium tabular-nums">{props.value}</div>
    </div>
  );
}