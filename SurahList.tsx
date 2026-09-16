"use client";

import Link from "next/link";
import { Search, ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";

export type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

export default function SurahList({ surahs }: { surahs: Surah[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter(s =>
      s.name.includes(q) ||
      s.englishName.toLowerCase().includes(q) ||
      String(s.number) === q
    );
  }, [query, surahs]);

  return (
    <section className="container pb-16">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">سوره‌های قرآن</h2>
          <p className="mt-1 text-sm text-muted">{filtered.length} سوره</p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute right-3 top-3.5 text-muted" size={18} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="جستجوی سوره..."
            className="w-full rounded-xl border py-3 pr-10 pl-3 outline-none focus:border-primary"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(surah => (
          <Link
            key={surah.number}
            href={`/quran/${surah.number}`}
            className="card group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-primary"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary"
              style={{ background: "rgba(8,127,91,.10)" }}>
              {surah.number}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block font-bold">{surah.name}</span>
              <span className="mt-1 block text-xs text-muted">
                {surah.numberOfAyahs} آیه • {surah.revelationType === "Meccan" ? "مکی" : "مدنی"}
              </span>
            </span>

            <ChevronLeft size={18} className="text-muted transition group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </section>
  );
}
