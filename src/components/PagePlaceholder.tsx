import ChartPlaceholder from "./ui/ChartPlaceholder";
import EmptyState from "./ui/EmptyState";
import InfoPanel from "./ui/InfoPanel";
import PageHeader from "./ui/PageHeader";
import PriorityBadge from "./ui/PriorityBadge";
import SectionTitle from "./ui/SectionTitle";
import StatCard from "./ui/StatCard";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  checklist: string[];
};

export default function PagePlaceholder({
  eyebrow,
  title,
  description,
  checklist,
}: PagePlaceholderProps) {
  return (
    <section className="space-y-6">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Status Halaman"
          value="Draft"
          description="Struktur sudah siap untuk diisi data dan logika pada tahap berikutnya."
        />
        <StatCard
          label="Cakupan MVP"
          value={`${checklist.length}`}
          description="Elemen utama halaman yang akan dikembangkan secara bertahap."
        />
        <div className="rounded-lg border border-civic-line bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-civic-muted">Contoh Status</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PriorityBadge level="high" />
            <PriorityBadge level="medium" />
            <PriorityBadge level="low" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <SectionTitle
            title="Area Konten"
            description="Placeholder ini menjaga struktur visual tetap konsisten sebelum data tahap berikutnya masuk."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-civic-line bg-white px-4 py-3 text-sm leading-6 text-civic-ink shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
          <ChartPlaceholder
            title="Placeholder Chart"
            description="Ruang ini akan digunakan untuk visualisasi tren, ranking, atau distribusi indikator."
          />
        </div>

        <div className="space-y-4">
          <InfoPanel
            title="Catatan Prototype"
            description="Seluruh angka dan indikator pada tahap awal adalah data simulasi untuk demo, bukan data resmi pemerintah."
          />
          <EmptyState
            title="Belum ada data operasional"
            description="Data kompleks, kalkulasi final, dan insight wilayah akan ditambahkan setelah fondasi UI stabil."
          />
        </div>
      </div>
    </section>
  );
}
