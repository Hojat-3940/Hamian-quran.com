"use client";

import Link from "next/link";
import { Moon, Sun, BookOpen } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient text-white">
            <BookOpen size={21} />
          </span>
          <span>
            <span className="block text-lg font-bold text-primary">همین قرآن</span>
            <span className="block text-[10px] tracking-widest text-muted" dir="ltr">HAMINQURAN.COM</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/" className="hover:text-primary">خانه</Link>
          <Link href="/quran" className="hover:text-primary">قرآن</Link>
          <Link href="/about" className="hover:text-primary">درباره</Link>
        </nav>

        <button
          onClick={toggle}
          aria-label="تغییر حالت شب"
          className="rounded-xl border p-2.5 transition hover:border-primary"
          style={{ borderColor: "var(--border)" }}
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>
    </header>
  );
}
