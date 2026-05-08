import { Link } from "react-router-dom";
import { Database, Search, Link as LinkIcon, MapPinned, BarChart3, SlidersHorizontal, Sparkles, Globe2, Presentation, ClipboardList, Info } from "lucide-react";
import { buttonClasses } from "../components/ui/Button";
import { citySummary, mockRegions } from "../data/mockData";
import { classNames, getCityScoringStats, getRankedRegions } from "../utils";

// ─── Data konten ─────────────────────────────────────────────────────────────

const problems = [
  {
    icon: <Database />,
    title: "Data Kota Masih Tersebar",
    body: "Informasi wilayah tersimpan di banyak sumber berbeda — laporan dinas, survei lapangan, pengaduan warga — tanpa satu titik integrasi yang mudah diakses.",
  },
  {
    icon: <Search />,
    title: "Prioritas Kebijakan Sulit Dijelaskan",
    body: "Keputusan alokasi anggaran dan intervensi wilayah sering tidak disertai dasar numerik yang transparan, sehingga sulit dipertanggungjawabkan kepada publik.",
  },
  {
    icon: <LinkIcon />,
    title: "Koordinasi Lintas Dinas Belum Optimal",
    body: "Setiap OPD bekerja dalam silo data masing-masing. Tanpa platform bersama, kolaborasi lintas sektor untuk menangani masalah kota yang kompleks menjadi lambat.",
  },
];

const solutions = [
  {
    icon: <MapPinned />,
    label: "Digital Twin Wilayah",
    desc: "Representasi digital setiap kecamatan dengan 6 indikator kunci — dari risiko banjir hingga aktivitas UMKM — dalam satu tampilan terpadu.",
  },
  {
    icon: <BarChart3 />,
    label: "Priority Score Engine",
    desc: "Algoritma berbasis bobot yang menghitung skor prioritas setiap wilayah secara transparan dan dapat diaudit oleh siapa pun.",
  },
  {
    icon: <SlidersHorizontal />,
    label: "Policy Simulator",
    desc: "Ubah fokus kebijakan — banjir, layanan publik, kerentanan sosial, UMKM — dan lihat bagaimana peringkat wilayah berubah secara real-time.",
  },
  {
    icon: <Sparkles />,
    label: "CivicSense AI Assistant",
    desc: "Asisten analisis kebijakan berbasis data wilayah — menghasilkan narasi, penjelasan prioritas, dan policy brief otomatis tanpa API eksternal.",
  },
  {
    icon: <Globe2 />,
    label: "Public Transparency Portal",
    desc: "Halaman terbuka untuk warga dan pemangku kepentingan agar dapat memantau kondisi dan prioritas kota tanpa perlu login.",
  },
];

const values = [
  { label: "Cepat", detail: "Insight wilayah dalam hitungan detik" },
  { label: "Transparan", detail: "Metodologi terbuka & dapat diaudit" },
  { label: "Berbasis Data", detail: "Keputusan didukung indikator kuantitatif" },
  { label: "Lintas Dinas", detail: "Satu platform untuk semua OPD" },
  { label: "Smart Governance", detail: "Mendukung agenda tata kelola cerdas" },
];

// ─── Sub-komponen kecil ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-civic-line" />;
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const cityStats = getCityScoringStats(getRankedRegions(mockRegions, "general"));

  return (
    <article className="space-y-16 pb-12">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-civic-dark to-civic-ink px-8 py-14 text-white shadow-xl md:px-14 md:py-20"
      >
        {/* Subtle batik-stripes pattern */}
        <div className="absolute inset-0 bg-batik-stripes opacity-10 pointer-events-none" />

        {/* Semarang Landmark Identity */}
        <div
          className="absolute inset-y-0 right-0 w-2/3 bg-no-repeat bg-right-bottom opacity-[0.08] pointer-events-none mix-blend-screen"
          style={{ backgroundImage: "url('/semarang-landmark.png')", backgroundSize: "contain" }}
        />

        {/* Decorative blobs — coastal teal + terracotta for Semarang identity */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-civic-primary opacity-15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-civic-brick opacity-10 blur-2xl"
        />

        {/* Badge */}
        <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-civic-gold/30 bg-civic-gold/10 px-3 py-1 text-xs font-semibold text-civic-surface backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-civic-gold" />
          Data Prototype POC · CIVICTWIN 2026
        </span>

        <h1 className="relative z-10 mt-5 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-civic-surface md:text-4xl lg:text-5xl">
          CIVICTWIN{" "}
          <span className="text-civic-primary">Semarang</span>
        </h1>

        <p className="relative z-10 mt-3 max-w-xl text-base font-medium text-white/70 md:text-lg">
          Digital Twin Wilayah untuk Prioritas Kebijakan Kota yang{" "}
          <span className="text-civic-surface">Transparan</span> dan{" "}
          <span className="text-civic-surface">Berbasis Data</span>
        </p>

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60">
          CIVICTWIN membantu pemerintah kota membaca kondisi wilayah, menghitung
          priority score, mensimulasikan fokus kebijakan, dan menghasilkan
          policy brief berbasis data — dalam satu platform terintegrasi.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            id="cta-login"
            to="/login"
            className={classNames(
              buttonClasses("primary"),
              "bg-civic-primary border-civic-primary hover:bg-teal-700 hover:border-teal-700 text-white px-6 py-2.5"
            )}
          >
            Masuk Mode Demo →
          </Link>
          <Link
            id="cta-public"
            to="/public"
            className={classNames(
              buttonClasses("secondary"),
              "border-civic-line bg-civic-surface text-civic-ink hover:bg-civic-soft hover:border-civic-primary px-6 py-2.5"
            )}
          >
            Lihat Transparansi Publik
          </Link>
        </div>

        {/* Quick stats */}
        <div className="relative z-10 mt-10 flex flex-wrap gap-6 border-t border-civic-gold/20 pt-6">
          {[
            { val: citySummary.totalRegionsInPrototype, unit: "Kecamatan", sub: "dalam prototype" },
            { val: cityStats.highPriority, unit: "Prioritas Tinggi", sub: "butuh intervensi segera" },
            { val: `${cityStats.averageScore}`, unit: "Rata-rata Skor", sub: "dari skala 100" },
            { val: "6", unit: "Indikator", sub: "kunci per wilayah" },
          ].map((s) => (
            <div key={s.unit} className="min-w-[90px]">
              <p className="text-2xl font-bold text-civic-primary">{s.val}</p>
              <p className="text-sm font-semibold text-civic-surface/90">{s.unit}</p>
              <p className="text-xs text-civic-surface/50">{s.sub}</p>
            </div>
          ))}
        </div>
        
        {/* Decorative subtle border at the bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-civic-dark via-civic-gold/30 to-civic-dark" />
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section id="problem" className="space-y-8">
        <div className="space-y-2">
          <SectionLabel>Tantangan</SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink">
            Mengapa kota membutuhkan sistem seperti ini?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-civic-muted">
            Pemerintah kota menghadapi tantangan nyata dalam mengintegrasikan
            data dan menyusun prioritas kebijakan secara transparan.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="group relative rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm transition hover:border-civic-primary hover:shadow-md"
            >
              <span className="text-3xl text-civic-primary">{p.icon}</span>
              <div className="mt-1 text-xs font-bold text-civic-muted/60">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-semibold text-civic-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-civic-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section id="solution" className="space-y-8">
        <div className="space-y-2">
          <SectionLabel>Solusi</SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink">
            Empat pilar CIVICTWIN
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-civic-muted">
            Dari representasi digital wilayah hingga simulasi kebijakan —
            setiap fitur dirancang untuk mendukung pengambilan keputusan
            yang cepat dan dapat dipertanggungjawabkan.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {solutions.map((s, i) => (
            <div
              key={s.label}
              className={classNames(
                "flex gap-4 rounded-xl border bg-civic-surface p-6 shadow-sm transition hover:shadow-md",
                i === 0
                  ? "border-civic-primary/30 bg-civic-primary/5"
                  : "border-civic-line"
              )}
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-civic-soft text-xl">
                {s.icon}
              </span>
              <div>
                <h3 className="font-semibold text-civic-ink">{s.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-civic-muted">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── VALUE PROPOSITION ────────────────────────────────────────────── */}
      <section id="value" className="space-y-6">
        <div className="space-y-2">
          <SectionLabel>Nilai Utama</SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink">
            Dibangun untuk Smart Governance
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {values.map((v) => (
            <div
              key={v.label}
              className="group flex flex-col gap-1 rounded-xl border border-civic-line bg-civic-surface px-5 py-4 shadow-sm transition hover:border-civic-primary hover:bg-civic-soft"
            >
              <span className="text-sm font-bold text-civic-primary group-hover:text-civic-primary">
                ✓ {v.label}
              </span>
              <span className="text-xs text-civic-muted">{v.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── DEMO FLOW ───────────────────────────────────────────────────── */}
      <section id="demo-flow" className="space-y-6">
        <div className="space-y-2">
          <SectionLabel><span className="flex items-center gap-1.5"><Presentation size={14} /> Demo Flow</span></SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink">Panduan Eksplorasi Prototype</h2>
          <p className="max-w-xl text-sm leading-relaxed text-civic-muted">
            Ikuti urutan berikut untuk demo yang paling optimal kepada juri. Setiap tahap menampilkan fitur berbeda.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { step: 1, label: "Dashboard Kota",       to: "/dashboard",                  icon: <BarChart3 size={16} />, hint: "Lihat ranking prioritas 6 wilayah" },
            { step: 2, label: "Detail Wilayah",       to: "/regions/genuk",              icon: <Search size={16} />, hint: "Eksplorasi digital twin Genuk" },
            { step: 3, label: "Policy Simulator",     to: "/simulator",                  icon: <SlidersHorizontal size={16} />, hint: "Ubah fokus ke Banjir/Rob" },
            { step: 4, label: "AI Policy Brief",      to: "/policy-brief?region=genuk",  icon: <Sparkles size={16} />, hint: "Draft brief dengan CivicSense Policy Assistant" },
            { step: 5, label: "Transparansi Publik",  to: "/public",                     icon: <Globe2 size={16} />, hint: "Portal warga berbasis data" },
            { step: 6, label: "Metodologi",           to: "/methodology",                icon: <ClipboardList size={16} />, hint: "Jawab pertanyaan teknis juri" },
          ].map((d) => (
            <Link
              key={d.step}
              to={d.to}
              className="flex gap-3 rounded-xl border border-civic-line bg-civic-surface p-4 shadow-sm transition hover:border-civic-primary hover:shadow-md group"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-civic-ink text-sm font-bold text-white group-hover:bg-civic-primary transition">
                {d.step}
              </span>
              <div>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-civic-ink">
                  <span>{d.icon}</span> {d.label}
                </p>
                <p className="mt-0.5 text-xs text-civic-muted">{d.hint}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── CTA BOTTOM ───────────────────────────────────────────────────── */}
      <section
        id="cta"
        className="flex flex-col items-center gap-5 rounded-2xl border border-civic-line bg-civic-soft px-8 py-12 text-center shadow-sm"
      >
        <span className="rounded-full bg-civic-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-civic-primary">
          Mulai Eksplorasi
        </span>
        <h2 className="max-w-lg text-2xl font-bold text-civic-ink">
          Siap melihat CIVICTWIN bekerja?
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-civic-muted">
          Jelajahi dashboard wilayah, jalankan simulasi kebijakan, dan lihat
          bagaimana data menggerakkan keputusan.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            id="cta-bottom-dashboard"
            to="/dashboard"
            className={buttonClasses("primary")}
          >
            Masuk Dashboard
          </Link>
          <Link
            id="cta-bottom-simulator"
            to="/simulator"
            className={buttonClasses("secondary")}
          >
            Coba Policy Simulator
          </Link>
          <Link
            id="cta-bottom-public"
            to="/public"
            className={buttonClasses("secondary")}
          >
            Lihat Transparansi Publik
          </Link>
        </div>
        <p className="mt-2 text-xs text-civic-muted/60 flex justify-center items-center gap-1.5">
          <Info size={14} /> {citySummary.dataLabel}
        </p>
      </section>
    </article>
  );
}



