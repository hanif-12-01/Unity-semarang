import { Link } from "react-router-dom";
import {
  Database,
  Search,
  Link as LinkIcon,
  MapPinned,
  BarChart3,
  SlidersHorizontal,
  Sparkles,
  Globe2,
  Presentation,
  ClipboardList,
  Info,
  ShieldCheck,
  Brain,
  UserCheck,
  CheckSquare,
  Map,
  MessageSquareWarning,
  FileCheck2,
  Building,
  HelpCircle,
  Eye,
  FileText
} from "lucide-react";
import { buttonClasses } from "../components/ui/Button";
import { citySummary, mockRegions } from "../data/mockData";
import { classNames, getCityScoringStats, getRankedRegions } from "../utils";

// ─── Data Konten ─────────────────────────────────────────────────────────────

const valueProps = [
  {
    icon: <Database className="text-civic-primary h-5 w-5" />,
    title: "Data Wilayah Terhubung",
    desc: "Konsolidasi indikator spasial dan sektoral tingkat kecamatan dalam satu model data terpadu.",
  },
  {
    icon: <MessageSquareWarning className="text-civic-primary h-5 w-5" />,
    title: "Feedback Warga Terklasifikasi",
    desc: "Triage pengaduan sipil berbasis geografi untuk mengidentifikasi tingkat kerawanan isu lokal.",
  },
  {
    icon: <BarChart3 className="text-civic-primary h-5 w-5" />,
    title: "Prioritas Kebijakan Terukur",
    desc: "Perhitungan priority score intervensi pembangunan kota berbasis rumusan objektif dan transparan.",
  },
  {
    icon: <FileCheck2 className="text-civic-primary h-5 w-5" />,
    title: "Tindak Lanjut Tervalidasi",
    desc: "Pencatatan akuntabilitas respon dinas teknis yang dilengkapi bukti visual lapangan.",
  },
  {
    icon: <Globe2 className="text-civic-primary h-5 w-5" />,
    title: "Transparansi Publik Aman",
    desc: "Penyajian ringkasan keterbukaan informasi berbasis data agregat yang melestarikan privasi sipil.",
  },
];

const needs = [
  {
    title: "Satu Kerangka Kerja Lintas OPD",
    desc: "Data pemerintah daerah seringkali tersebar di berbagai dinas. CIVICTWIN mengkonsolidasikan data indikator sektoral tersebut agar dapat dibaca dalam satu kesatuan analisis wilayah.",
  },
  {
    title: "Kontekstualisasi Aduan & Kritik Warga",
    desc: "Laporan aduan warga tidak boleh dibaca sebagai tiket terisolasi. Sistem memadukan pengaduan tersebut dengan konteks kerawanan sosial dan bencana di wilayah setempat.",
  },
  {
    title: "Akuntabilitas Prioritas Kebijakan",
    desc: "Setiap keputusan alokasi anggaran pembangunan daerah harus dapat dijelaskan metodologinya secara matematis dan objektif kepada publik.",
  },
  {
    title: "Pelacakan Tindak Lanjut Dinas",
    desc: "Setiap disposisi penanganan isu perkotaan oleh OPD pelaksana wajib tercatat, terpantau progresnya, dan tervalidasi hasil kerjanya di lapangan.",
  },
  {
    title: "Portal Keterbukaan Informasi Aman",
    desc: "Masyarakat berhak mendapatkan transparansi pembangunan kota yang akurat dengan pembatasan keamanan informasi yang tetap terlindungi.",
  },
];

const features = [
  {
    icon: <BarChart3 className="text-civic-primary h-6 w-6" />,
    title: "Command Center Dashboard",
    desc: "Pusat komando eksekutif untuk melihat peringkat prioritas kecamatan, status intervensi dinas, dan ringkasan performa kota.",
  },
  {
    icon: <Map className="text-civic-primary h-6 w-6" />,
    title: "Priority Map Semarang",
    desc: "Pemetaan spasial interaktif untuk mengidentifikasi hotspot prioritas intervensi berdasarkan bobot indikator.",
  },
  {
    icon: <MessageSquareWarning className="text-civic-primary h-6 w-6" />,
    title: "Citizen Feedback Intelligence",
    desc: "Triage pengaduan dan masukan warga yang terintegrasi secara kontekstual dengan data wilayah.",
  },
  {
    icon: <SlidersHorizontal className="text-civic-primary h-6 w-6" />,
    title: "Policy Simulator",
    desc: "Simulasi bobot kebijakan kota untuk melihat perubahan prioritas penanganan wilayah secara langsung.",
  },
  {
    icon: <Sparkles className="text-civic-primary h-6 w-6" />,
    title: "CivicSense Policy Brief",
    desc: "Penyusunan rekomendasi kebijakan otomatis berbasis aturan untuk mempercepat keputusan strategis.",
  },
  {
    icon: <FileCheck2 className="text-civic-primary h-6 w-6" />,
    title: "Resolution Accountability Center",
    desc: "Pemantauan proses penyelesaian laporan dan verifikasi hasil kerja lapangan oleh OPD.",
  },
  {
    icon: <Globe2 className="text-civic-primary h-6 w-6" />,
    title: "Public Transparency Page",
    desc: "Portal publik yang menyajikan informasi prioritas pembangunan kota tanpa otentikasi login.",
  },
];

const govValues = [
  {
    title: "Membantu membaca prioritas wilayah",
    desc: "Mengidentifikasi wilayah yang paling mendesak membutuhkan intervensi menggunakan formulasi kuantitatif yang objektif.",
  },
  {
    title: "Mempercepat triage laporan dan masukan warga",
    desc: "Menghubungkan pengaduan masyarakat langsung dengan profil statistik setempat untuk mempermudah prioritisasi penanganan.",
  },
  {
    title: "Memperkuat akuntabilitas tindak lanjut OPD",
    desc: "Setiap laporan penyelesaian dilampiri dengan bukti visual lapangan dan terekam secara historis dalam alur kerja sistem.",
  },
  {
    title: "Mendukung transparansi publik berbasis data agregat",
    desc: "Menyediakan basis informasi data teragregasi yang siap disajikan untuk membangun kepercayaan publik terhadap kebijakan daerah.",
  },
  {
    title: "Menjaga keputusan tetap divalidasi manusia",
    desc: "Teknologi berperan sebagai penyaji rekomendasi kebijakan, sementara wewenang keputusan akhir sepenuhnya berada pada pejabat terkait.",
  },
];

// ─── Sub-komponen ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="border-t border-civic-line/60" />;
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  const cityStats = getCityScoringStats(getRankedRegions(mockRegions, "general"));

  return (
    <article className="space-y-24 pb-20 pt-4">

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-civic-dark to-[#241d18] text-white shadow-xl min-h-[500px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(31, 26, 23, 0.95) 40%, rgba(47, 117, 110, 0.6) 100%), url('/semarang-hero.jpg'), url('/public/semarang-hero.jpg'), linear-gradient(135deg, #1F1A17 0%, #2F756E 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Subtle city grid overlay */}
        <div className="absolute inset-0 bg-batik-stripes opacity-10 pointer-events-none" />

        <div className="relative z-10 px-6 py-16 md:px-12 lg:px-16 w-full max-w-4xl space-y-6">
          {/* Badge Disclaimer */}
          <div className="inline-flex items-center gap-2 rounded-full border border-civic-gold/40 bg-civic-dark/80 px-3.5 py-1.5 text-xs font-semibold text-civic-surface backdrop-blur-sm shadow-sm">
            <span className="h-2 w-2 rounded-full bg-civic-gold animate-pulse" />
            Prototype POC — Smart Government
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-civic-surface md:text-6xl">
              CIVICTWIN Semarang
            </h1>
            <h2 className="text-lg font-medium text-white/95 md:text-xl leading-relaxed max-w-3xl border-l-4 border-civic-primary pl-4">
              Civic Intelligence Layer untuk Smart Governance yang Transparan dan Berbasis Data
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            Membantu pemerintah menghubungkan data wilayah, masukan warga, prioritas kebijakan, tindak lanjut OPD, dan transparansi publik dalam satu siklus akuntabilitas.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              id="cta-login"
              to="/login"
              className={classNames(
                buttonClasses("primary"),
                "bg-civic-primary border-civic-primary hover:bg-teal-700 hover:border-teal-700 text-white px-8 py-3.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-teal-900/25 transition-all"
              )}
            >
              Masuk ke Dashboard
            </Link>
            <Link
              id="cta-public"
              to="/public"
              className={classNames(
                buttonClasses("secondary"),
                "border-white/20 bg-civic-dark/40 text-white hover:bg-white/10 hover:border-white/40 px-8 py-3.5 text-sm font-semibold rounded-lg backdrop-blur-sm transition-all"
              )}
            >
              Lihat Transparansi Publik
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION CARDS (BELOW HERO) ─────────────────────────── */}
      <section id="value-props" className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {valueProps.map((vp) => (
            <div
              key={vp.title}
              className="rounded-xl border border-civic-line/60 bg-civic-surface p-5 shadow-sm hover:border-civic-primary/50 hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-civic-soft/50 text-civic-primary">
                  {vp.icon}
                </div>
                <h3 className="text-xs font-bold text-civic-ink leading-snug">{vp.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-civic-muted">
                  {vp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── MENGAPA PEMERINTAH MEMBUTUHKAN CIVICTWIN? ───────────────────────── */}
      <section id="why-civictwin" className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left title side */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          <SectionLabel>Urgensi Platform</SectionLabel>
          <h2 className="text-3xl font-extrabold text-civic-ink leading-tight">
            Mengapa Pemerintah Membutuhkan CIVICTWIN?
          </h2>
          <p className="text-sm leading-relaxed text-civic-muted">
            Tata kelola kota modern menuntut pengambilan keputusan yang berbasis bukti, terintegrasi antardinas, serta transparan bagi publik secara aman.
          </p>
          <div className="rounded-lg bg-civic-soft/40 p-4 border border-civic-line/40 text-xs text-civic-muted leading-relaxed">
            Sistem dirancang sebagai media koordinasi internal dan transparansi eksternal (proof of concept prototype).
          </div>
        </div>

        {/* Right card-list side */}
        <div className="lg:col-span-8 space-y-4">
          {needs.map((need, index) => (
            <div
              key={need.title}
              className="rounded-xl border border-civic-line/50 bg-civic-surface p-5 shadow-sm flex items-start gap-4 hover:border-civic-primary/30 transition duration-200"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-civic-primary/10 text-xs font-bold text-civic-primary">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold text-civic-ink leading-none">{need.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-civic-muted">
                  {need.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── FEATURE PREVIEW ─────────────────────────────────────────────── */}
      <section id="features" className="space-y-8">
        <div className="space-y-3">
          <SectionLabel>Komponen Utama</SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink md:text-3xl">
            Ringkasan Fitur Utama Platform
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-civic-muted">
            Berbagai modul penunjang keputusan dirancang terintegrasi guna memberikan analisis wilayah yang kredibel bagi pimpinan daerah.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-xl border border-civic-line/60 bg-civic-surface p-6 shadow-sm transition hover:border-civic-primary/40 hover:shadow-md"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-civic-soft/50 text-civic-primary">
                {f.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-civic-ink text-sm leading-snug">{f.title}</h3>
                <p className="text-xs leading-relaxed text-civic-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── GOVERNMENT VALUE PROPOSITION ───────────────────────────────── */}
      <section id="value-proposition" className="space-y-10">
        <div className="space-y-3">
          <SectionLabel>Value Proposition</SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink md:text-3xl">
            Nilai untuk Pemerintah Daerah
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-civic-muted">
            Bagaimana penerapan CIVICTWIN mendukung peningkatan akuntabilitas dan efisiensi birokrasi pemerintahan daerah.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Text content side */}
          <div className="lg:col-span-7 space-y-4">
            {govValues.map((vp, index) => (
              <div
                key={vp.title}
                className="flex items-start gap-4 rounded-xl border border-civic-line/40 bg-civic-surface p-4 shadow-sm transition hover:border-civic-primary/30"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-civic-primary/10 text-xs font-bold text-civic-primary">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-civic-ink text-xs leading-none">{vp.title}</h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-civic-muted">
                    {vp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Graphical side-panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-civic-primary/10 to-civic-primary/5 rounded-2xl border border-civic-primary/15 p-6 space-y-6">
            <h3 className="text-sm font-bold text-civic-ink">Fokus Tata Kelola Cerdas</h3>
            <p className="text-xs leading-relaxed text-civic-muted">
              CIVICTWIN dirancang selaras dengan arah kebijakan transformasi digital nasional, mengedepankan efektivitas layanan publik melalui perbaikan sistem pemrosesan data internal pemerintah.
            </p>

            <div className="border-t border-civic-line/60 pt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-civic-muted">Akuntabilitas Data</span>
                <span className="font-bold text-civic-primary">Tinggi</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-civic-muted">Validasi Manual</span>
                <span className="font-bold text-civic-primary">Dipertahankan</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-civic-muted">Keamanan Akses</span>
                <span className="font-bold text-civic-primary">Role-Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── DEMO FLOW (Jury Presentation) ────────────────────────────────── */}
      <section id="demo-flow" className="space-y-8">
        <div className="space-y-3">
          <SectionLabel>
            <span className="flex items-center gap-1.5">
              <Presentation size={14} /> Panduan Presentasi
            </span>
          </SectionLabel>
          <h2 className="text-2xl font-bold text-civic-ink md:text-3xl">
            Panduan Eksplorasi Prototype
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-civic-muted">
            Ikuti urutan skenario berikut untuk mendemonstrasikan kapabilitas koordinasi antardinas dan pemodelan kebijakan kota secara terstruktur.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { step: 1, label: "Dashboard Kota",       to: "/dashboard",                  icon: <BarChart3 size={16} />, hint: "Tampilan agregat prioritas penanganan wilayah" },
            { step: 2, label: "Detail Wilayah",       to: "/regions/genuk",              icon: <Search size={16} />, hint: "Analisis spasial detail kecamatan pencontohan Genuk" },
            { step: 3, label: "Policy Simulator",     to: "/simulator",                  icon: <SlidersHorizontal size={16} />, hint: "Simulasi perubahan bobot fokus pembangunan" },
            { step: 4, label: "AI Policy Brief",      to: "/policy-brief?region=genuk",  icon: <Sparkles size={16} />, hint: "Penyusunan draf rekomendasi kebijakan" },
            { step: 5, label: "Transparansi Publik",  to: "/public",                     icon: <Globe2 size={16} />, hint: "Portal agregat kinerja untuk masyarakat umum" },
            { step: 6, label: "Metodologi",           to: "/methodology",                icon: <ClipboardList size={16} />, hint: "Dokumentasi formula scoring dan model data" },
          ].map((d) => (
            <Link
              key={d.step}
              to={d.to}
              className="flex gap-4 rounded-xl border border-civic-line/60 bg-civic-surface p-4 shadow-sm transition hover:border-civic-primary hover:shadow-md group"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-civic-ink text-xs font-bold text-white group-hover:bg-civic-primary transition">
                {d.step}
              </span>
              <div>
                <p className="flex items-center gap-1.5 text-xs font-bold text-civic-ink group-hover:text-civic-primary transition-colors">
                  <span>{d.icon}</span> {d.label}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-civic-muted">{d.hint}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA SECTION ───────────────────────────────────────────── */}
      <section
        id="cta"
        className="flex flex-col items-center gap-6 rounded-2xl border border-civic-line/60 bg-civic-soft/30 px-8 py-14 text-center shadow-sm max-w-4xl mx-auto"
      >
        <span className="rounded-full bg-civic-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-civic-primary border border-civic-primary/20">
          Uji Coba Konsep
        </span>
        <h2 className="max-w-lg text-2xl font-bold text-civic-ink md:text-3xl">
          Eksplorasi Lapisan Intelijen Sipil Semarang
        </h2>
        <p className="max-w-md text-xs leading-relaxed text-civic-muted">
          Masuk ke area dasbor simulasi, jalankan visualisasi pemodelan bobot indikator prioritas, dan verifikasi alur kerja akuntabilitas daerah.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            id="cta-bottom-dashboard"
            to="/login"
            className={classNames(buttonClasses("primary"), "px-6 py-2.5")}
          >
            Masuk ke Dashboard
          </Link>
          <Link
            id="cta-bottom-simulator"
            to="/simulator"
            className={classNames(buttonClasses("secondary"), "px-6 py-2.5")}
          >
            Coba Policy Simulator
          </Link>
          <Link
            id="cta-bottom-public"
            to="/public"
            className={classNames(buttonClasses("secondary"), "px-6 py-2.5")}
          >
            Lihat Transparansi Publik
          </Link>
        </div>

        <p className="mt-4 text-[10.5px] text-civic-muted/80 flex justify-center items-center gap-1.5 max-w-lg">
          <Info size={14} className="shrink-0 text-civic-primary" /> {citySummary.dataLabel}
        </p>
      </section>
    </article>
  );
}
