import Reveal from "./Reveal";
import { EVENT } from "@/lib/constants";

export default function Closing() {
  return (
    <Reveal id="closing">
      <div className="blossom-corner" aria-hidden="true">
        ✿
      </div>
      <div className="inner">
        <div className="seal-ring">囍</div>
        <div className="eyebrow">One Last Word</div>
        <h2 className="display">You&apos;re Invited to Celebrate</h2>
        <p>Your presence will be the greatest gift as we celebrate this unforgettable milestone together.</p>
        <a className="btn-outline" href={EVENT.mapsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
      </div>
    </Reveal>
  );
}
