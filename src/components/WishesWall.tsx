"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Wish = { id: string; name: string; message: string; created: number };

const STORAGE_KEY = "betty-graduation-wishes";

// Wishes are stored in the guest's browser (localStorage) for now. To make
// them shared across all guests, swap load()/save() for fetch calls to a
// Supabase `graduation_wishes` table — the UI needs no other changes.
function load(): Wish[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(wishes: Wish[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    /* storage full or blocked — wishes stay in memory for the session */
  }
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setWishes(load());
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) return;
    const wish: Wish = { id: crypto.randomUUID(), name: n.slice(0, 60), message: m.slice(0, 500), created: Date.now() };
    const next = [wish, ...wishes];
    setWishes(next);
    save(next);
    setName("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <section id="wishes">
      <div className="eyebrow">祝福 · Blessings</div>
      <h2 className="center display" style={{ marginTop: 0 }}>
        Leave a Wish for Betty
      </h2>
      <p className="center" style={{ color: "var(--muted)", maxWidth: 480, margin: "10px auto 0", fontStyle: "italic" }}>
        A few warm words to carry her into this new chapter.
      </p>

      <form className="wish-form" onSubmit={submit}>
        <label className="wish-label" htmlFor="wish-name">
          Your name
        </label>
        <input
          id="wish-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          required
          placeholder="e.g. Aunt Meseret"
          autoComplete="name"
        />
        <label className="wish-label" htmlFor="wish-message">
          Your wish
        </label>
        <textarea
          id="wish-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          required
          placeholder="Congratulations Betty! …"
        />
        <button type="submit" className="btn-primary wish-submit">
          {sent ? "✓ Wish added" : "Add My Wish"}
        </button>
        <p className="wish-hint">Wishes are saved on this device and shown below.</p>
      </form>

      {wishes.length > 0 ? (
        <div className="wish-board">
          <AnimatePresence initial={false}>
            {wishes.map((w) => (
              <motion.figure
                className="wish-note"
                key={w.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <blockquote className="msg">{w.message}</blockquote>
                <figcaption className="from">— {w.name}</figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="wish-empty">✿ Be the first to leave Betty a wish ✿</p>
      )}
    </section>
  );
}
