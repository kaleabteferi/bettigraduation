import Reveal from "./Reveal";
import { WORKS } from "@/lib/constants";

export default function WorksDone() {
  return (
    <Reveal id="works">
      <div className="eyebrow">Beyond the Books</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        Works Done
      </h2>
      <div className="works-grid">
        {WORKS.map((w) => (
          <a className="work-card" key={w.url} href={w.url} target="_blank" rel="noopener noreferrer">
            <div className="work-role">{w.role}</div>
            <div className="work-title display">{w.title}</div>
            <div className="work-link">Visit Site ↗</div>
          </a>
        ))}
      </div>
    </Reveal>
  );
}
