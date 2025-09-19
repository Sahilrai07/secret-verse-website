const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | null;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground mt-1">{icon}</div>
      <div>
        <p className="text-xs uppercase text-muted-foreground mb-1">{label}</p>
        <p className="font-medium">
          {value ?? <span className="italic text-muted-foreground">Not Provided</span>}
        </p>
      </div>
    </div>
  );
};

export default InfoRow