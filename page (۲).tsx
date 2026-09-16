import Header from "@/components/Header";
import Link from "next/link";
import { ArrowRight, Headphones } from "lucide-react";
import QuranReader from "@/components/QuranReader";
import { notFound } from "next/navigation";

type Ayah = {
  numberInSurah: number;
  text: string;
  audio?: string;
};

type EditionResponse = {
  data: {
    number: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
    ayahs: Ayah[];
  };
};

async function getSurah(id: string) {
  const number = Number(id);
  if (!Number.isInteger(number) || number < 1 || number > 114) notFound();
  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${encodeURIComponent(id)}/editions/quran-uthmani,fa.makarem,ar.alafasy`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error("خطا در دریافت سوره");
  const json = await res.json();
  const arabic = json.data?.[0];
  const persian = json.data?.[1];
  const audioEdition = json.data?.[2];
  if (!arabic) notFound();
  return {
    number: arabic.number, name: arabic.name, englishName: arabic.englishName,
    numberOfAyahs: arabic.numberOfAyahs,
    ayahs: arabic.ayahs.map((a: Ayah, i: number) => ({
      numberInSurah: a.numberInSurah, arabic: a.text, translation: persian?.ayahs?.[i]?.text ?? "", audio: audioEdition?.ayahs?.[i]?.audio
    }))
  };
}


export default async function SurahPage({ params }: { params: { id: string } }) {
  const surah = await getSurah(params.id);

  return (
    <>
      <Header />

      <main className="container py-6 pb-20">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary">
            <ArrowRight size={18} />
            فهرست سوره‌ها
          </Link>


        </div>

        <section className="card mb-5 p-6 text-center">
          <p className="text-sm text-muted">{surah.englishName}</p>
          <h1 className="mt-2 text-3xl font-bold text-primary">{surah.name}</h1>
          <p className="mt-2 text-sm text-muted">{surah.numberOfAyahs} آیه</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-muted" style={{ borderColor: "var(--border)" }}>
            <Headphones size={18} />
            برای پخش، دکمه «پخش آیه» را بزنید
          </p>
        </section>

        <QuranReader verses={surah.ayahs} />
      </main>
    </>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `سوره ${params.id} | همین قرآن` };
}
