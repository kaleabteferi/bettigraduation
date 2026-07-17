export default function SectionDivider({ icon }: { icon: string }) {
  return (
    <div className="divider-row">
      <div className="divider-line" />
      <div className="divider-icon">{icon}</div>
      <div className="divider-line" />
    </div>
  );
}
