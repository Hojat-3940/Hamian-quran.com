import Header from "@/components/Header";
import SurahList, { Surah } from "@/components/SurahList";

async function getSurahs(): Promise<Surah[]> {
  const res = await fetch("https://api.alquran.cloud/v1/surah", { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("خطا در دریافت فهرست سوره‌ها");
  const json = await res.json();
  return json.data;
}

export default async function HomePage() {
  const surahs = await getSurahs();

  return (
    <>
      <Header />

      <main>
        <section className="container py-8 md:py-12">
          <div className="gradient overflow-hidden rounded-[28px] px-5 py-12 text-center text-white shadow-lg md:px-10">
            <p className="mb-4 text-sm opacity-90">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h1 className="text-4xl font-bold md:text-6xl">همین قرآن</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 opacity-90 md:text-base">
              قرآن کریم را ساده، سریع و آرام بخوانید؛ با ترجمه فارسی و تجربه‌ای مناسب موبایل.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="#surahs" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#087f5b]">
                شروع مطالعه قرآن
              </a>
              <a href="/about" className="rounded-xl border border-white/30 px-6 py-3 text-sm">
                درباره همین قرآن
              </a>
            </div>
          </div>
        </section>

        <div id="surahs">
          <SurahList surahs={surahs} />
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted" style={{ borderColor: "var(--border)" }}>
        © {new Date().getFullYear()} HaminQuran.com — همین قرآن
      </footer>
    </>
  );
}
