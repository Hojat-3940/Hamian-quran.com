import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container py-10">
        <section className="card mx-auto max-w-3xl p-7 md:p-10">
          <h1 className="text-3xl font-bold text-primary">درباره همین قرآن</h1>
          <p className="mt-6 leading-9 text-muted">
            HaminQuran.com یک پروژه ساده و مینیمال برای دسترسی آسان به قرآن کریم است.
            هدف این سایت فراهم کردن محیطی آرام، سریع و مناسب برای مطالعه قرآن در موبایل و دسکتاپ است.
          </p>

          <div className="mt-8 rounded-2xl p-5" style={{ background: "rgba(8,127,91,.08)" }}>
            <h2 className="font-bold">امکانات نسخه اولیه</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
              <li>فهرست ۱۱۴ سوره</li>
              <li>متن عربی قرآن</li>
              <li>ترجمه فارسی</li>
              <li>حالت تاریک</li>
              <li>طراحی واکنش‌گرا</li>
              <li>صفحه اختصاصی هر سوره</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
