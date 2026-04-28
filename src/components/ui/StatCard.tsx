interface StatCardProps {
  label: string;
  value: React.ReactNode;
  sub: string;
  accentColor: string;
}

export function StatCard({ label, value, sub, accentColor }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-[18px] transition-all duration-200 hover:border-[rgba(255,255,200,0.14)]"
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="text-[11px] uppercase tracking-[0.09em] mb-2.5"
        style={{ color: "var(--text3)" }}
      >
        {label}
      </div>
      <div
        className="font-serif text-[32px] font-light leading-none"
        style={{ color: accentColor }}
      >
        {value}
      </div>
      <div className="text-xs mt-1.5" style={{ color: "var(--text3)" }}>
        {sub}
      </div>
    </div>
  );
}
