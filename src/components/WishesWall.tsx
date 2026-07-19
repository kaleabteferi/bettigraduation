"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Wish = { id: string; name: string; message: string; created: number };

// Shared wishes live in Supabase (table: graduation_wishes, RLS: anon may
// read + insert only). The anon key is public by design — row-level security
// is what protects the data. localStorage is kept as an offline fallback.
const SUPABASE_URL = "https://sjxkmynbbmqnfxjajgkp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeGtteW5iYm1xbmZ4amFqZ2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMzE0NDAsImV4cCI6MjA5NzkwNzQ0MH0.zBJB02dkqHXthWg0Q4BsHdZW9xT8WhNgHX2NPEl8Fkk";
const WISHES_ENDPOINT = `${SUPABASE_URL}/rest/v1/graduation_wishes`;
const HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

const STORAGE_KEY = "betty-graduation-wishes";

function loadLocal(): Wish[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(wishes: Wish[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  } catch {
    /* storage full or blocked — wishes stay in memory for the session */
  }
}

async function fetchShared(): Promise<Wish[] | null> {
  try {
    const res = await fetch(
      `${WISHES_ENDPOINT}?select=id,name,message,created_at&order=created_at.desc&limit=200`,
      { headers: HEADERS }
    );
    if (!res.ok) return null;
    const rows: { id: string; name: string; message: string; created_at: string }[] = await res.json();
    return rows.map((r) => ({ id: r.id, name: r.name, message: r.message, created: Date.parse(r.created_at) }));
  } catch {
    return null;
  }
}

async function insertShared(name: string, message: string): Promise<Wish | null> {
  try {
    const res = await fetch(WISHES_ENDPOINT, {
      method: "POST",
      headers: { ...HEADERS, Prefer: "return=representation" },
      body: JSON.stringify({ name, message }),
    });
    if (!res.ok) return null;
    const [row] = await res.json();
    return { id: row.id, name: row.name, message: row.message, created: Date.parse(row.created_at) };
  } catch {
    return null;
  }
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [shared, setShared] = useState(false); // true once the DB has answered
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setWishes(loadLocal());
    fetchShared().then((remote) => {
      if (remote) {
        setWishes(remote);
        setShared(true);
      }
    });
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const n = name.trim().slice(0, 60);
    const m = message.trim().slice(0, 500);
    if (!n || !m || busy) return;
    setBusy(true);

    const saved = await insertShared(n, m);
    const wish: Wish = saved ?? { id: crypto.randomUUID(), name: n, message: m, created: Date.now() };
    setWishes((prev) => {
      const next = [wish, ...prev];
      if (!saved) saveLocal(next);
      return next;
    });

    setName("");
    setMessage("");
    setBusy(false);
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
        <button type="submit" className="btn-primary wish-submit" disabled={busy}>
          {sent ? "✓ Wish added" : busy ? "Sending…" : "Add My Wish"}
        </button>
        <p className="wish-hint">
          {shared
            ? "Wishes are shared — Betty and every guest can read them below."
            : "Wishes are saved on this device and shown below."}
        </p>
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
