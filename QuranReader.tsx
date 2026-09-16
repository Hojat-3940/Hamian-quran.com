"use client";

import { Bookmark, Check, Headphones, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Verse = { numberInSurah: number; arabic: string; translation: string; audio?: string };

export default function QuranReader({ verses }: { verses: Verse[] }) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [saved, setSaved] = useState<number[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem("hamian-saved") || "[]")); } catch {}
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSave = (n: number) => {
    const next = saved.includes(n) ? saved.filter(x => x !== n) : [...saved, n];
    setSaved(next); localStorage.setItem("hamian-saved", JSON.stringify(next));
  };

  const play = (verse: Verse) => {
    if (!verse.audio) return;
    if (playing === verse.numberInSurah) { audioRef.current?.pause(); setPlaying(null); return; }
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(verse.audio);
    audioRef.current = audio;
    audio.onended = () => setPlaying(null);
    audio.onerror = () => setPlaying(null);
    audio.play().then(() => setPlaying(verse.numberInSurah)).catch(() => setPlaying(null));
  };

  const share = async (verse: Verse) => {
    const text = `${verse.arabic}\n\n${verse.translation}`;
    try {
      if (navigator.share) await navigator.share({ title: `آیه ${verse.numberInSurah}`, text });
      else { await navigator.clipboard.writeText(text); setCopied(verse.numberInSurah); setTimeout(() => setCopied(null), 1600); }
    } catch {}
  };

  return <div className="space-y-4">
    {verses.map(verse => <article key={verse.numberInSurah} id={`ayah-${verse.numberInSurah}`} className="card p-5 md:p-7">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-[#bd8e35]">آیه {verse.numberInSurah}</span>
        <div className="flex gap-1">
          <button onClick={() => toggleSave(verse.numberInSurah)} className="rounded-lg p-2 hover:bg-black/5" title="نشان‌گذاری">
            <Bookmark size={18} fill={saved.includes(verse.numberInSurah) ? "currentColor" : "none"} />
          </button>
          <button onClick={() => share(verse)} className="rounded-lg p-2 hover:bg-black/5" title="اشتراک‌گذاری">
            {copied === verse.numberInSurah ? <Check size={18} /> : <Share2 size={18} />}
          </button>
        </div>
      </div>
      <p className="font-arabic text-right text-[29px] leading-[2.35] md:text-[35px]">{verse.arabic} <span className="text-lg text-[#bd8e35]">﴿{verse.numberInSurah}﴾</span></p>
      <div className="mt-6 border-t pt-5 text-[15px] leading-8 text-muted" style={{ borderColor: "var(--border)" }}>{verse.translation}</div>
      {verse.audio && <button onClick={() => play(verse)} className="mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:border-primary" style={{ borderColor: "var(--border)" }}>
        {playing === verse.numberInSurah ? <Pause size={17} /> : <Play size={17} />} {playing === verse.numberInSurah ? "توقف" : "پخش آیه"}
      </button>}
    </article>)}
  </div>;
}
