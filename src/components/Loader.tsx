"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/constants";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let done = false;
    const hide = () => {
      if (done) return;
      done = true;
      setHidden(true);
      document.body.style.overflow = "";
      onDone();
    };
    // Timers are throttled in background tabs, so the loader must not depend
    // on them alone: dismiss on tab-visible, first interaction, or timeout —
    // whichever happens first.
    const t1 = setTimeout(hide, 3000);
    const t2 = setTimeout(hide, 6000);
    const onVisible = () => {
      if (document.visibilityState === "visible") setTimeout(hide, 2500);
    };
    if (document.visibilityState === "hidden") document.addEventListener("visibilitychange", onVisible);
    const dismiss = () => hide();
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("touchstart", dismiss, { passive: true });
    window.addEventListener("keydown", dismiss);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="loader" className={hidden ? "hide" : ""}>
      <div className="loader-branch">✿ ✿ ✿</div>
      <div className="loader-script">Betty</div>
      <div className="loader-zh zh">{EVENT.inviteZh}</div>
      <div className="loader-py">{EVENT.invitePinyin}</div>
      <div className="loader-en">{EVENT.inviteEn}</div>
      <div className="loader-seal zh" aria-hidden="true">
        毕业
        <br />
        快乐
      </div>
    </div>
  );
}
