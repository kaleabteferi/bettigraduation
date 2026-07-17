import Reveal from "./Reveal";

export default function HostedBy() {
  return (
    <Reveal id="hosted">
      <div className="hosted-card">
        <div className="eyebrow">Hosted By</div>
        <div className="host-names">
          Dr. Abera
          <br />
          Betelhem Abera
          <br />
          &amp; Family
        </div>
        <p className="note">
          With heartfelt gratitude, we thank you for celebrating this important milestone with us.
        </p>
        <div className="family-spot">✿</div>
      </div>
    </Reveal>
  );
}
