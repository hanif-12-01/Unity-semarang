import { Link } from "react-router-dom";
import { Globe2, TriangleAlert, ClipboardList, CheckCircle2, Waves, Hospital, Users, MessageSquareWarning, Store, UsersRound, BookOpenCheck, BarChart3 } from "lucide-react";
import { buttonClasses } from "../components/ui/Button";
import { mockRegions, citySummary } from "../data/mockData";
import { getRankedRegions, generateCitizenSummary, AI_DISCLAIMER } from "../utils";
import { classNames } from "../utils/classNames";
import type { PriorityCategory } from "../data/mockData";
import { getResolutionStats, mockCompletionReports, COMPLETION_REPORT_DISCLAIMER } from "../data/completionReports";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<
  PriorityCategory,
  {
    label: string;
    badge: string;
    border: string;
    bg: string;
    dot: string;
    icon: React.ReactNode;
    statusLabel: string;
  }
> = {
  Tinggi: {
    label: "Prioritas Tinggi",
    badge: "border-red-200 bg-red-50 text-red-700",
    border: "border-red-200",
    bg: "bg-red-50/30",
    dot: "bg-red-500",
    icon: <TriangleAlert size={14} className="shrink-0" />,
    statusLabel: "Perlu Validasi Data & Tindakan Segera",
  },
  Sedang: {
    label: "Prioritas Sedang",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    border: "border-amber-200",
    bg: "bg-amber-50/30",
    dot: "bg-amber-500",
    icon: <ClipboardList size={14} className="shrink-0" />,
    statusLabel: "Dalam Kajian Lintas Dinas",
  },
  Rendah: {
    label: "Prioritas Rendah",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    border: "border-emerald-200",
    bg: "bg-emerald-50/20",
    dot: "bg-emerald-500",
    icon: <CheckCircle2 size={14} className="shrink-0" />,
    statusLabel: "Simulasi Rekomendasi Tersedia",
  },
};

// Reason phrasing built from dominant issues (public-friendly)
function buildPublicReason(dominantIssues: string[]): string {
  const top = dominantIssues[0];
  // Lowercase & trim trailing period
  return top.charAt(0).toLowerCase() + top.slice(1).replace(/\.$/, "");
}

// Simple indicator descriptions for public
const INDICATOR_EXPLAINERS = [
  {
    icon: <Waves size={24} className="text-civic-primary" />,
    title: "Risiko Banjir & Rob",
    desc: "Seberapa sering wilayah ini terkena banjir atau genangan rob dari laut. Makin tinggi, makin butuh perhatian.",
  },
  {
    icon: <Hospital size={24} className="text-civic-primary" />,
    title: "Kebutuhan Layanan Publik",
    desc: "Apakah warga mudah menjangkau fasilitas seperti puskesmas, sekolah, dan transportasi umum.",
  },
  {
    icon: <Users size={24} className="text-civic-primary" />,
    title: "Kondisi Sosial Warga",
    desc: "Proporsi warga yang berada dalam kondisi rentan (perlu perlindungan sosial, bantuan, atau pemberdayaan).",
  },
  {
    icon: <MessageSquareWarning size={24} className="text-civic-primary" />,
    title: "Laporan Warga",
    desc: "Seberapa aktif warga melaporkan masalah di lingkungan mereka kepada pemerintah.",
  },
  {
    icon: <Store size={24} className="text-civic-primary" />,
    title: "Potensi Ekonomi UMKM",
    desc: "Kondisi usaha kecil dan menengah di wilayah. Makin rendah, makin perlu dorongan program ekonomi.",
  },
  {
    icon: <UsersRound size={24} className="text-civic-primary" />,
    title: "Kepadatan Penduduk",
    desc: "Berapa padat wilayah tersebut. Semakin padat, semakin besar tekanan pada layanan dan infrastruktur.",
  },
];

// ─── Region Card (Public version) ────────────────────────────────────────────

function PublicRegionCard({
  region,
  rank,
}: {
  region: ReturnType<typeof getRankedRegions>[number];
  rank: number;
}) {
  const cfg = PRIORITY_CONFIG[region.computedCategory];
  const reason = buildPublicReason(region.dominantIssues);
  const mainRec = region.policyRecommendations[0];

  return (
    <article
      className={classNames(
        "group rounded-2xl border bg-civic-surface shadow-sm transition hover:shadow-md",
        cfg.border
      )}
    >
      {/* Top strip */}
      <div
        className={classNames(
          "flex items-center justify-between gap-3 rounded-t-2xl border-b px-5 py-4",
          cfg.bg,
          cfg.border.replace("border-", "border-b-")
        )}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={classNames(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
              region.computedCategory === "Tinggi"
                ? "bg-red-600"
                : region.computedCategory === "Sedang"
                ? "bg-amber-500"
                : "bg-emerald-600"
            )}
          >
            {rank}
          </span>
          <h3 className="text-base font-bold text-civic-ink">{region.name}</h3>
        </div>
        <span
          className={classNames(
            "rounded-full border px-3 py-1 text-xs font-semibold flex items-center gap-1.5",
            cfg.badge
          )}
        >
          {cfg.icon} {cfg.label}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-4 px-5 py-5">
        {/* Simple score bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-civic-muted">
            <span>Indeks Prioritas</span>
            <span className="font-bold text-civic-ink tabular-nums">
              {region.computedScore} / 100
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-civic-soft">
            <div
              className={classNames(
                "h-full rounded-full transition-all duration-700",
                region.computedCategory === "Tinggi"
                  ? "bg-red-500"
                  : region.computedCategory === "Sedang"
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              )}
              style={{ width: `${region.computedScore}%` }}
            />
          </div>
        </div>

        {/* Reason (plain language) */}
        <div className="rounded-lg border border-civic-line bg-civic-soft/60 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-civic-muted mb-1">
            Mengapa wilayah ini jadi perhatian?
          </p>
          <p className="text-sm leading-relaxed text-civic-ink">
            Wilayah ini memerlukan perhatian karena{" "}
            <span className="font-medium">{reason}</span>.
          </p>
        </div>

        {/* Main recommendation */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-civic-muted mb-1.5">
            Langkah yang direkomendasikan
          </p>
          <p className="text-sm leading-relaxed text-civic-ink">{mainRec}</p>
        </div>

        {/* Status chip */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-civic-line bg-civic-soft px-3 py-1.5 text-xs font-medium text-civic-ink">
            <span className={classNames("h-1.5 w-1.5 rounded-full", cfg.dot)} />
            {cfg.statusLabel}
          </span>
          <Link
            to={`/regions/${region.id}`}
            className="text-xs font-semibold text-civic-primary hover:underline transition-colors"
          >
            Selengkapnya →
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PublicTransparencyPage() {
  const ranked = getRankedRegions(mockRegions, "general");

  const highCount  = ranked.filter((r) => r.computedCategory === "Tinggi").length;
  const medCount   = ranked.filter((r) => r.computedCategory === "Sedang").length;
  const lowCount   = ranked.filter((r) => r.computedCategory === "Rendah").length;

  return (
    <div className="space-y-12 pb-12">

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section
        id="public-hero"
        className="relative overflow-hidden rounded-2xl bg-civic-ink px-8 py-12 text-white shadow-lg md:px-14 md:py-16"
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-civic-primary opacity-15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-civic-secondary opacity-10 blur-2xl" />

        {/* Semarang Landmark Identity */}
        <div
          className="absolute inset-y-0 right-0 w-full md:w-2/3 bg-no-repeat bg-right-bottom opacity-10 pointer-events-none mix-blend-screen"
          style={{ backgroundImage: "url('/semarang-landmark.png')", backgroundSize: "contain" }}
        />

        <div className="relative">
          {/* Public badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
            <Globe2 size={14} /> Halaman Publik · CIVICTWIN Semarang
          </span>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Transparansi Prioritas Wilayah
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/70 leading-relaxed">
            Ringkasan publik mengenai wilayah prioritas dan alasan rekomendasi kebijakan di Kota Semarang, disajikan secara terbuka agar masyarakat dapat memahami dan memantau.
          </p>

          {/* Stat row */}
          <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6">
            {[
              { val: ranked.length, label: "Wilayah Dipantau", sub: "dalam prototype" },
              { val: highCount, label: "Prioritas Tinggi", sub: "butuh perhatian segera", color: "text-red-400" },
              { val: medCount, label: "Prioritas Sedang", sub: "dalam kajian", color: "text-amber-400" },
              { val: lowCount, label: "Prioritas Rendah", sub: "kondisi relatif baik", color: "text-emerald-400" },
            ].map((s) => (
              <div key={s.label} className="min-w-[80px]">
                <p className={classNames("text-2xl font-bold", s.color ?? "text-emerald-400")}>
                  {s.val}
                </p>
                <p className="text-sm font-semibold text-white/90">{s.label}</p>
                <p className="text-xs text-white/40">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Draft Citizen Summary ─────────────────────────────── */}
      <section id="civicsense-citizen" className="overflow-hidden rounded-2xl border border-civic-primary/30 shadow-sm">
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-civic-ink to-slate-800 px-6 py-4">
          <div className="flex items-center gap-2 text-civic-primary">
            <ClipboardList size={20} />
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">CivicSense Policy Assistant</p>
              <p className="text-sm font-semibold text-white">Ringkasan Publik: Kondisi Kota Semarang</p>
            </div>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80">
            Bahasa Warga
          </span>
        </div>
        <div className="bg-white p-6">
          <p className="text-sm leading-relaxed text-civic-ink mb-4">
            Dari {ranked.length} kecamatan yang dianalisis, terdapat 
            <strong>{ranked.filter(r => r.computedCategory === "Tinggi").length} wilayah prioritas tinggi</strong> 
            yang membutuhkan perhatian segera. Berikut adalah gambaran singkat kondisi kota dalam bahasa yang mudah dipahami.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ranked.slice(0, 3).map((region) => {
              const summary = generateCitizenSummary(region);
              return (
                <div key={region.id} className="rounded-xl border border-civic-line bg-civic-soft/50 p-4 space-y-2">
                  <p className="text-sm font-bold text-civic-ink flex items-center gap-1.5">
                    {region.computedCategory === "Tinggi" ? <TriangleAlert size={16} className="text-red-600 shrink-0" /> :
                     region.computedCategory === "Sedang" ? <ClipboardList size={16} className="text-amber-600 shrink-0" /> :
                     <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                    {summary.headline}
                  </p>
                  <p className="text-xs leading-relaxed text-civic-muted">{summary.layman}</p>
                  <p className="text-xs leading-relaxed text-civic-ink">{summary.whatItMeans}</p>
                  <p className="text-xs leading-relaxed text-civic-muted italic">{summary.whatWillHappen}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-civic-muted/60 italic">{AI_DISCLAIMER}</p>
        </div>
      </section>

      {/* ── How Priority is Calculated ─────────────────────────────── */}
      <section id="how-it-works" className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">
            Cara Kerja Sistem
          </p>
          <h2 className="text-2xl font-bold text-civic-ink">
            Bagaimana prioritas dihitung?
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-civic-muted">
            Setiap wilayah dinilai menggunakan{" "}
            <strong className="font-semibold text-civic-ink">6 indikator</strong>{" "}
            yang mencerminkan kondisi nyata kehidupan warga. Nilai akhir menjadi
            dasar rekomendasi kebijakan yang transparan dan dapat diaudit.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDICATOR_EXPLAINERS.map((ind) => (
            <div
              key={ind.title}
              className="flex items-start gap-3 rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm transition hover:border-civic-primary/30 hover:shadow-md"
            >
              <span className="shrink-0 mt-0.5">{ind.icon}</span>
              <div>
                <p className="text-sm font-semibold text-civic-ink">{ind.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-civic-muted">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Priority Legend ─────────────────────────────────────────── */}
      <section
        id="priority-legend"
        className="rounded-2xl border border-civic-line bg-civic-surface p-6 shadow-sm"
      >
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-civic-primary">
          Arti Status Prioritas
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {(["Tinggi", "Sedang", "Rendah"] as PriorityCategory[]).map((cat) => {
            const c = PRIORITY_CONFIG[cat];
            return (
              <div
                key={cat}
                className={classNames(
                  "rounded-xl border p-4 space-y-2",
                  c.border,
                  c.bg
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={classNames("h-3 w-3 rounded-full", c.dot)} />
                  <span className="text-sm font-bold text-civic-ink">
                    {c.icon} {c.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-civic-muted">
                  {cat === "Tinggi"
                    ? "Wilayah ini memiliki indeks risiko dan kebutuhan tinggi. Perlu koordinasi lintas dinas dan intervensi dalam waktu dekat."
                    : cat === "Sedang"
                    ? "Wilayah ini memiliki beberapa permasalahan yang perlu dikaji lebih lanjut dan ditangani secara terencana."
                    : "Kondisi wilayah ini relatif terkendali. Tetap perlu pemantauan rutin agar tidak turun ke level yang lebih kritis."}
                </p>
                <span className="text-xs font-semibold text-civic-muted">
                  Status: {c.statusLabel}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Region Cards ───────────────────────────────────────────── */}
      <section id="region-list" className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">
              Daftar Wilayah
            </p>
            <h2 className="mt-1 text-2xl font-bold text-civic-ink">
              Kondisi {ranked.length} Kecamatan Semarang
            </h2>
            <p className="mt-1 text-sm text-civic-muted">
              Diurutkan dari prioritas tertinggi ke terendah berdasarkan indeks gabungan.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ranked.map((region, i) => (
            <PublicRegionCard key={region.id} region={region} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* ── Dominant City Issues (Public language) ─────────────────── */}
      <section
        id="city-overview"
        className="rounded-2xl border border-civic-line bg-civic-soft p-7 shadow-sm"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-civic-primary mb-2">
          Gambaran Kota
        </p>
        <h2 className="text-xl font-bold text-civic-ink mb-1">
          Isu-isu utama Kota Semarang
        </h2>
        <p className="text-sm text-civic-muted mb-5">
          Berdasarkan analisis agregat dari {citySummary.totalRegionsInPrototype} kecamatan dalam prototype.
        </p>
        <ul className="space-y-3">
          {citySummary.dominantCityIssues.map((issue, i) => (
            <li key={issue} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-civic-ink text-xs font-bold text-white mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-civic-ink">{issue}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Transparansi Tindak Lanjut ──────────────────────────── */}
      {(() => {
        const rs = getResolutionStats();
        const publicReports = mockCompletionReports.filter(r => r.isPublicVisible);
        return (
          <section
            id="resolution-transparency"
            className="rounded-2xl border border-civic-line bg-civic-surface p-8 shadow-sm space-y-6"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
                Transparansi Tindak Lanjut
              </p>
              <h2 className="mt-1 text-xl font-bold text-civic-ink">
                Ringkasan Penyelesaian Laporan Warga
              </h2>
              <p className="mt-2 text-sm text-civic-muted max-w-2xl">
                Informasi agregat penyelesaian tindak lanjut dari OPD terkait. Data merupakan simulasi prototype.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="text-3xl font-bold text-green-700">{rs.validated}</p>
                <p className="text-xs font-semibold text-green-600 mt-1">Selesai Tervalidasi</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
                <p className="text-3xl font-bold text-blue-700">{rs.pendingValidation}</p>
                <p className="text-xs font-semibold text-blue-600 mt-1">Menunggu Validasi</p>
              </div>
              <div className="rounded-xl border border-civic-line bg-civic-soft/50 p-4 text-center">
                <p className="text-3xl font-bold text-civic-ink">{rs.averageResolutionDays} <span className="text-sm">hari</span></p>
                <p className="text-xs font-semibold text-civic-muted mt-1">Rata-rata Penyelesaian</p>
              </div>
              <div className="rounded-xl border border-civic-primary/20 bg-civic-primary/5 p-4 text-center">
                <p className="text-3xl font-bold text-civic-primary">{rs.resolutionRate}%</p>
                <p className="text-xs font-semibold text-civic-muted mt-1">Resolution Rate</p>
              </div>
            </div>

            {publicReports.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-civic-ink mb-3">Ringkasan Publik Penyelesaian</h3>
                <div className="space-y-3">
                  {publicReports.map(cr => (
                    <div key={cr.id} className="rounded-lg border border-civic-line bg-civic-soft/30 p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <p className="text-sm font-semibold text-civic-ink">{cr.publicSummary}</p>
                        <p className="text-xs text-civic-muted mt-1">OPD: {cr.agency} • {cr.validationStatus}</p>
                      </div>
                      <span className="text-[10px] text-civic-muted whitespace-nowrap">
                        {new Date(cr.completedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border border-civic-line bg-civic-soft/30 p-3 text-xs text-civic-muted">
              {COMPLETION_REPORT_DISCLAIMER}
            </div>
          </section>
        );
      })()}

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section
        id="cta-public"
        className="flex flex-col items-center gap-5 rounded-2xl border border-civic-line bg-civic-surface px-8 py-10 text-center shadow-sm"
      >
        <h2 className="text-xl font-bold text-civic-ink max-w-md">
          Ingin mengetahui lebih lanjut?
        </h2>
        <p className="text-sm text-civic-muted max-w-lg leading-relaxed">
          Lihat metodologi penilaian untuk memahami cara data dihitung, atau
          kembali ke dashboard untuk eksplorasi lebih dalam.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/methodology"
            id="cta-methodology"
            className={classNames(buttonClasses("primary"), "gap-2")}
          >
            <BookOpenCheck size={16} /> Lihat Metodologi Data
          </Link>
          <Link
            to="/dashboard"
            id="cta-dashboard-from-public"
            className={classNames(buttonClasses("secondary"), "gap-2")}
          >
            <BarChart3 size={16} /> Kembali ke Dashboard
          </Link>
        </div>
      </section>

      {/* ── Disclaimer ─────────────────────────────────────────────── */}
      <aside
        id="public-disclaimer"
        className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5"
      >
        <div className="flex items-start gap-3">
          <TriangleAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900">
              Catatan Penting untuk Masyarakat
            </p>
            <p className="text-sm leading-relaxed text-amber-800">
              Halaman ini merupakan bagian dari{" "}
              <strong>prototype CIVICTWIN</strong>. Data yang ditampilkan merupakan{" "}
              <strong>kombinasi data publik, data olahan, dan simulasi terbatas</strong>{" "}
              untuk keperluan proof of concept. Pada implementasi nyata, data
              perlu divalidasi oleh pemerintah daerah dan sumber resmi terkait
              sebelum dijadikan dasar kebijakan atau informasi publik resmi.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}



