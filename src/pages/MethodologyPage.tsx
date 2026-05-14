// =============================================================================
// CIVICTWIN — Methodology & Data Scoring Page
// Untuk presentasi dan menjawab pertanyaan juri Smart City
// =============================================================================

import { Link } from "react-router-dom";
import { BarChart3, Globe2, Building, Waves, Laptop, Home, MessageSquareWarning, Scale, UsersRound, Users, Hospital, Store, Microscope, PlugZap, MapPinned, Bot, TestTube, Map, Database, Radio, BrainCircuit, ClipboardList, Smartphone, TriangleAlert, RefreshCcw, UserCheck, ShieldCheck, Link as LinkIcon, CheckCircle2, XCircle, SlidersHorizontal, Sparkles } from "lucide-react";
import { buttonClasses } from "../components/ui/Button";
import { POLICY_MODES, INDICATOR_LABELS } from "../utils";
import { classNames } from "../utils/classNames";

// ─── Static Data ──────────────────────────────────────────────────────────────

const DATA_SOURCES = [
  { icon: <BarChart3 />, name: "BPS Kota Semarang", desc: "Data kependudukan, kepadatan, dan statistik sosial-ekonomi per kecamatan.", tag: "Implementasi Nyata" },
  { icon: <Globe2 />, name: "Portal Data Pemerintah Daerah", desc: "Open data Kota Semarang dan portal Satu Data Indonesia untuk akses data terpadu.", tag: "Implementasi Nyata" },
  { icon: <Building />, name: "Data OPD Kota Semarang", desc: "Data lintas Dinas: Sosial, Kesehatan, PU, UMKM, Pendidikan, dan Perhubungan.", tag: "Implementasi Nyata" },
  { icon: <Waves />, name: "Data BPBD Kota Semarang", desc: "Peta risiko banjir, rob, dan bencana yang diperbarui berkala dari Badan Penanggulangan Bencana.", tag: "Implementasi Nyata" },
  { icon: <Laptop />, name: "Data Diskominfo", desc: "Infrastruktur digital, kanal aduan warga (LAPOR!), dan data SPBE Kota Semarang.", tag: "Implementasi Nyata" },
  { icon: <Home />, name: "Data Kecamatan / Kelurahan", desc: "Profil wilayah, laporan rutin, dan monografi kecamatan sebagai data granular.", tag: "Implementasi Nyata" },
  { icon: <MessageSquareWarning />, name: "Laporan & Aduan Warga", desc: "Agregat laporan dari kanal LAPOR!, aplikasi pengaduan, dan forum warga.", tag: "Implementasi Nyata" },
  { icon: <Scale />, name: "Regulasi SPBE & Satu Data", desc: "Perpres No. 39/2019 tentang Satu Data dan Perpres No. 95/2018 tentang SPBE sebagai kerangka tata kelola.", tag: "Regulasi Acuan" },
];

const SOURCE_LOG = [
  { indicator: "Risiko Banjir/Rob", data: "Peta genangan historis & kejadian bencana", year: "2022–2023", source: "Laporan BPBD Semarang dan literatur pesisir", status: "Olahan" as const, usage: "Rujukan publik diolah menjadi indeks relatif 0–100" },
  { indicator: "Kepadatan Penduduk", data: "Rujukan kepadatan penduduk per kecamatan", year: "2023", source: "BPS Kota Semarang / Kecamatan Dalam Angka", status: "Resmi" as const, usage: "Acuan resmi yang dinormalisasi menjadi indeks 0–100" },
  { indicator: "Kerentanan Sosial", data: "Proxy warga rentan dan penerima bantuan", year: "2023", source: "Literatur DTKS dan konteks sosial wilayah", status: "Simulasi" as const, usage: "Estimasi terbatas untuk proof of concept, belum validasi OPD" },
  { indicator: "Akses Layanan Publik", data: "Kedekatan ke faskes, sekolah, dan transportasi", year: "2023", source: "Mapping literatur dan observasi awal", status: "Simulasi" as const, usage: "Indeks gabungan akses layanan dasar, perlu data geospasial resmi" },
  { indicator: "Laporan Warga", data: "Volume aduan warga aktif", year: "2023", source: "Pola umum kanal aduan kota", status: "Simulasi" as const, usage: "Proxy partisipasi warga sampai ada integrasi kanal resmi" },
  { indicator: "Aktivitas UMKM", data: "Rujukan aktivitas usaha mikro per wilayah", year: "2023", source: "Publikasi ekonomi daerah dan Dinas UMKM", status: "Olahan" as const, usage: "Data publik disederhanakan menjadi indeks ketahanan ekonomi lokal" },
];

const STATUS_BADGE: Record<string, string> = {
  Resmi: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Olahan: "border-blue-200 bg-blue-50 text-blue-700",
  Simulasi: "border-amber-200 bg-amber-50 text-amber-700",
};

const INDICATORS = [
  {
    key: "floodRisk",
    icon: <Waves />,
    name: "Risiko Banjir / Rob",
    desc: "Mengukur seberapa tinggi ancaman banjir musiman dan rob terhadap permukiman dan infrastruktur wilayah. Nilai tinggi = risiko besar = perlu intervensi.",
    source: "BPBD, peta genangan, data historis kejadian bencana",
    weight: "25%",
    inverted: false,
  },
  {
    key: "populationDensity",
    icon: <UsersRound />,
    name: "Kepadatan Penduduk",
    desc: "Mengukur tekanan jumlah penduduk terhadap layanan dan infrastruktur. Kepadatan tinggi meningkatkan kerentanan dan kebutuhan intervensi.",
    source: "BPS, data kependudukan kecamatan",
    weight: "15%",
    inverted: false,
  },
  {
    key: "socialVulnerability",
    icon: <Users />,
    name: "Kerentanan Sosial",
    desc: "Proporsi warga yang berada dalam kondisi rentan: penerima bansos, warga miskin, lansia tanpa pendamping, dan penyandang disabilitas.",
    source: "Dinas Sosial, DTKS (Data Terpadu Kesejahteraan Sosial)",
    weight: "20%",
    inverted: false,
  },
  {
    key: "publicServiceAccess",
    icon: <Hospital />,
    name: "Akses Layanan Publik",
    desc: "Mengukur kemudahan warga menjangkau fasilitas dasar: puskesmas, sekolah, transportasi umum, dan kantor pemerintah.",
    source: "Dinas Kesehatan, Dinas Pendidikan, Dishub",
    weight: "15%",
    inverted: true,
  },
  {
    key: "citizenReports",
    icon: <MessageSquareWarning />,
    name: "Laporan Warga",
    desc: "Volume dan frekuensi laporan atau pengaduan warga ke pemerintah. Nilai tinggi = banyak keluhan aktif = kebutuhan respons tinggi.",
    source: "Diskominfo, kanal LAPOR!, aplikasi aduan daerah",
    weight: "15%",
    inverted: false,
  },
  {
    key: "smeActivity",
    icon: <Store />,
    name: "Aktivitas UMKM",
    desc: "Daya hidup usaha kecil dan menengah sebagai cerminan ketahanan ekonomi lokal. Nilai rendah = kerentanan ekonomi = perlu stimulus.",
    source: "Dinas UMKM, Dinas Perindustrian, survei lapangan",
    weight: "10%",
    inverted: true,
  },
];

const LIMITATIONS = [
  { icon: <Microscope />, text: "Data prototype menggabungkan rujukan publik, data olahan, dan simulasi terbatas; beberapa indikator belum tervalidasi sebagai data resmi." },
  { icon: <PlugZap />, text: "Belum terhubung ke API atau database pemerintah manapun." },
  { icon: <MapPinned />, text: "Belum melalui validasi lapangan bersama OPD Kota Semarang." },
  { icon: <Bot />, text: "CivicSense AI menggunakan rule-based template, bukan model AI/ML sungguhan." },
  { icon: <TestTube />, text: "Tahap proof of concept, belum diuji pada skala operasional." },
  { icon: <Map />, text: "Belum terintegrasi visualisasi geospasial / peta interaktif." },
];

const FUTURE_DEV = [
  { icon: <Database />, title: "Integrasi Data Resmi", desc: "Koneksi ke Open Data Semarang, BPS API, dan Data OPD secara real-time melalui middleware data." },
  { icon: <Users />, title: "Validasi Bersama OPD", desc: "Workshop bersama Bappeda, Diskominfo, dan dinas teknis untuk memvalidasi indikator dan bobot scoring." },
  { icon: <Radio />, title: "Dashboard Real-Time", desc: "Pembaruan data otomatis berbasis IoT, sensor kota, dan integrasi kanal aduan warga." },
  { icon: <BrainCircuit />, title: "AI Policy Recommendation", desc: "Integrasi LLM untuk menghasilkan narasi kebijakan yang lebih kontekstual dan adaptif." },
  { icon: <ClipboardList />, title: "Audit Trail Keputusan", desc: "Pencatatan historis setiap perubahan bobot dan prioritas untuk akuntabilitas pengambilan keputusan." },
  { icon: <Smartphone />, title: "Integrasi Kanal Aduan Warga", desc: "Sinkronisasi dengan LAPOR!, SP4N, dan aplikasi aduan lokal untuk memperkaya indikator laporan warga." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MethodSection({
  id, eyebrow, title, children,
}: {
  id?: string; eyebrow: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4">
      <div className="space-y-0.5">
        <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">{eyebrow}</p>
        <h2 className="text-xl font-bold text-civic-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MethodologyPage() {
  return (
    <div className="space-y-14 pb-14">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">Metodologi</p>
          <h1 className="text-3xl font-bold text-civic-ink">Data &amp; Priority Scoring</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-civic-muted">
            Penjelasan lengkap mengenai sumber data, indikator, formula scoring, dan batasan prototype CIVICTWIN Semarang.
            Halaman ini dirancang untuk mendukung presentasi dan menjawab pertanyaan teknis dari juri.
          </p>
        </div>
        <Link to="/dashboard" className={classNames(buttonClasses("secondary"), "shrink-0 text-sm")}>
          ← Dashboard
        </Link>
      </div>

      {/* ── 1. Prototype Data Notice ─────────────────────────────────── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
        <div className="flex items-start gap-3">
          <TriangleAlert size={28} className="text-amber-600 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900">Catatan Data Prototype</p>
            <p className="text-sm leading-relaxed text-amber-800">
              Prototype CIVICTWIN menggunakan{" "}
              <strong>kombinasi data publik, data olahan dari sumber literatur, dan data simulasi terbatas</strong>{" "}
              untuk keperluan proof of concept. Beberapa indikator menggunakan estimasi berbasis laporan
              resmi yang disederhanakan, lihat tabel <strong>Source Log & Status Data</strong> di bawah
              untuk mengetahui status setiap data secara transparan.
            </p>
          </div>
        </div>
      </div>

      {/* ── CIVICTWIN as Civic Intelligence Layer ────────────────────── */}
      <MethodSection id="civic-intelligence-layer" eyebrow="Positioning" title="CIVICTWIN as Civic Intelligence Layer">
        <p className="text-sm leading-relaxed text-civic-muted">
          Pada fase proof of concept ini, CIVICTWIN diposisikan secara realistis sebagai <strong className="text-civic-ink font-semibold">Civic Intelligence Layer</strong> dan pijakan awal (stepping stone) menuju ekosistem kota cerdas yang terpadu.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-civic-muted">
          <li className="flex items-start gap-2">
            <span className="text-civic-primary mt-0.5">•</span>
            <span>CIVICTWIN saat ini bertindak sebagai lapisan analisis cerdas di atas data yang disimulasikan, dan belum diklaim sebagai spatial digital twin yang beroperasi penuh.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-civic-primary mt-0.5">•</span>
            <span>Prototype ini belum menggunakan GIS boundary resmi dari pemerintah, belum terhubung dengan sensor IoT real-time, dan belum menarik data secara langsung dari instansi/OPD terkait.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-civic-primary mt-0.5">•</span>
            <span>Sistem ini dirancang dengan arsitektur yang siap diintegrasikan kelak, menjadikannya fondasi kokoh menuju spatial digital twin pada tahap implementasi lanjutan.</span>
          </li>
        </ul>
      </MethodSection>

      {/* ── 2. Data Sources ──────────────────────────────────────────── */}
      <MethodSection id="data-sources" eyebrow="Sumber Data" title="Sumber Data pada Implementasi Nyata">
        <p className="text-sm leading-relaxed text-civic-muted">
          Pada implementasi penuh, CIVICTWIN dirancang untuk mengagregasi data dari berbagai sumber resmi berikut:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DATA_SOURCES.map((src) => (
            <div
              key={src.name}
              className="rounded-xl border border-civic-line bg-civic-surface p-4 shadow-sm space-y-2 hover:border-civic-primary/30 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-civic-primary shrink-0 [&>svg]:w-6 [&>svg]:h-6">{src.icon}</span>
                <span className="rounded-full border border-civic-line bg-civic-soft px-2 py-0.5 text-xs font-medium text-civic-muted">
                  {src.tag}
                </span>
              </div>
              <p className="text-sm font-semibold text-civic-ink">{src.name}</p>
              <p className="text-xs leading-relaxed text-civic-muted">{src.desc}</p>
            </div>
          ))}
        </div>
      </MethodSection>

      {/* ── 2b. Source Log & Data Status ──────────────────────────────── */}
      <MethodSection id="source-log" eyebrow="Source Log" title="Source Log & Data Status">
        <p className="text-sm leading-relaxed text-civic-muted">
          Tabel berikut menjelaskan secara transparan data apa yang digunakan untuk setiap indikator,
          beserta tahun acuan, sumber, dan status validasinya. Status data dibagi menjadi tiga kategori:
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className={classNames("rounded-md border px-2.5 py-1 text-xs font-semibold", STATUS_BADGE["Olahan"])}>
            Olahan: data publik yang diolah/disederhanakan
          </span>
          <span className={classNames("rounded-md border px-2.5 py-1 text-xs font-semibold", STATUS_BADGE["Simulasi"])}>
            Simulasi: estimasi untuk keperluan prototype
          </span>
          <span className={classNames("rounded-md border px-2.5 py-1 text-xs font-semibold", STATUS_BADGE["Resmi"])}>
            Resmi: rujukan langsung dari instansi pemerintah
          </span>
        </div>
        <div className="rounded-xl border border-civic-line bg-civic-surface shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-civic-line bg-civic-soft text-left">
                <th className="py-3 px-4 font-semibold text-civic-muted text-xs uppercase">Indikator</th>
                <th className="py-3 px-4 font-semibold text-civic-muted text-xs uppercase">Data yang Digunakan</th>
                <th className="py-3 px-4 font-semibold text-civic-muted text-xs uppercase">Tahun</th>
                <th className="py-3 px-4 font-semibold text-civic-muted text-xs uppercase">Sumber</th>
                <th className="py-3 px-4 font-semibold text-civic-muted text-xs uppercase text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-civic-muted text-xs uppercase">Penggunaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-civic-line">
              {SOURCE_LOG.map((row) => (
                <tr key={row.indicator} className="hover:bg-civic-soft/60 transition">
                  <td className="py-3 px-4 font-medium text-civic-ink whitespace-nowrap">{row.indicator}</td>
                  <td className="py-3 px-4 text-civic-muted">{row.data}</td>
                  <td className="py-3 px-4 text-civic-muted tabular-nums whitespace-nowrap">{row.year}</td>
                  <td className="py-3 px-4 text-civic-muted">{row.source}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={classNames("rounded-md border px-2 py-0.5 text-xs font-semibold", STATUS_BADGE[row.status] ?? STATUS_BADGE["Simulasi"])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-civic-muted text-xs">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-civic-muted/70 italic pt-2">
          Status "Resmi" berarti rujukan sumbernya resmi; nilai indeks prototype tetap dinormalisasi untuk demo. Pada implementasi nyata, seluruh indikator ditargetkan tervalidasi melalui integrasi data pemerintah.
        </p>
      </MethodSection>

      {/* ── 3. Indicators ────────────────────────────────────────────── */}
      <MethodSection id="indicators" eyebrow="Indikator" title="6 Indikator Priority Score">
        <p className="text-sm leading-relaxed text-civic-muted">
          Setiap wilayah dinilai menggunakan enam indikator. Masing-masing memiliki bobot default
          dalam mode <strong className="text-civic-ink">General Priority</strong> yang dapat disesuaikan
          melalui Policy Simulator.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDICATORS.map((ind) => (
            <div
              key={ind.key}
              className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-civic-primary shrink-0 [&>svg]:w-6 [&>svg]:h-6">{ind.icon}</span>
                <div>
                  <p className="text-sm font-bold text-civic-ink">{ind.name}</p>
                  <span className="text-xs font-semibold text-civic-primary">
                    Bobot default: {ind.weight}
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-civic-muted">{ind.desc}</p>
              <div className="rounded-lg bg-civic-soft px-3 py-2 text-xs text-civic-muted">
                <span className="font-semibold text-civic-ink">Sumber: </span>{ind.source}
              </div>
              {ind.inverted && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  <RefreshCcw size={12} /> Logika Terbalik
                </div>
              )}
            </div>
          ))}
        </div>
      </MethodSection>

      {/* ── 4. Scoring Formula ───────────────────────────────────────── */}
      <MethodSection id="scoring-formula" eyebrow="Formula" title="Formula Priority Score">
        {/* Formula box */}
        <div className="rounded-2xl border border-civic-line bg-civic-ink p-6 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Formula Konseptual</p>
          <div className="font-mono text-sm leading-loose space-y-1">
            <p className="text-white/90">
              <span className="text-civic-secondary font-bold">Priority Score</span> = Σ (nilai_indikator<sub>i</sub> × bobot<sub>i</sub>)
            </p>
            <p className="text-white/50 text-xs mt-2">di mana nilai_indikator ∈ [0, 100] dan Σ bobot = 1.0</p>
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-amber-300 text-xs font-semibold">Catatan Inversi:</p>
              <p className="text-white/80 text-xs mt-1">
                Akses Layanan Publik dan Aktivitas UMKM menggunakan logika inversi: nilai rendah berarti kebutuhan intervensi lebih tinggi.
              </p>
              <p className="text-white/80 text-xs mt-1">
                Khusus Aktivitas UMKM, nilai tinggi menunjukkan ekonomi lokal aktif sehingga prioritas intervensi lebih rendah. Nilai rendah menunjukkan kebutuhan penguatan ekonomi lebih tinggi.
              </p>
            </div>
          </div>
        </div>

        {/* Category thresholds */}
        <div className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-civic-muted mb-4">Kategori Prioritas</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { range: "75 – 100", cat: "Prioritas Tinggi", color: "border-red-200 bg-red-50", badge: "text-red-700", bar: "bg-red-500", dot: "bg-red-500", desc: "Memerlukan intervensi segera lintas OPD." },
              { range: "50 – 74", cat: "Prioritas Sedang", color: "border-amber-200 bg-amber-50", badge: "text-amber-700", bar: "bg-amber-500", dot: "bg-amber-500", desc: "Perlu rencana intervensi terstruktur." },
              { range: "0 – 49", cat: "Prioritas Rendah", color: "border-emerald-200 bg-emerald-50", badge: "text-emerald-700", bar: "bg-emerald-500", dot: "bg-emerald-500", desc: "Pemantauan rutin dan program preventif." },
            ].map((c) => (
              <div key={c.cat} className={classNames("rounded-xl border p-4 space-y-2", c.color)}>
                <div className="flex items-center gap-2">
                  <span className={classNames("h-2.5 w-2.5 rounded-full", c.dot)} />
                  <span className={classNames("text-sm font-bold", c.badge)}>{c.cat}</span>
                </div>
                <p className="font-mono text-lg font-bold text-civic-ink">{c.range}</p>
                <p className="text-xs text-civic-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* General mode weights table */}
        <div className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm overflow-x-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-civic-muted mb-4">
            Distribusi Bobot: Mode General Priority
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-civic-line text-left">
                <th className="pb-2 font-semibold text-civic-muted text-xs uppercase">Indikator</th>
                <th className="pb-2 font-semibold text-civic-muted text-xs uppercase text-right">Bobot</th>
                <th className="pb-2 font-semibold text-civic-muted text-xs uppercase text-center">Logika</th>
                <th className="pb-2 pl-4 font-semibold text-civic-muted text-xs uppercase">Visualisasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-civic-line">
              {[
                { label: "Risiko Banjir/Rob", w: 0.25, inv: false },
                { label: "Kerentanan Sosial", w: 0.20, inv: false },
                { label: "Kepadatan Penduduk", w: 0.15, inv: false },
                { label: "Akses Layanan Publik", w: 0.15, inv: true },
                { label: "Laporan Warga", w: 0.15, inv: false },
                { label: "Aktivitas UMKM", w: 0.10, inv: true },
              ].map((row) => (
                <tr key={row.label} className="py-2">
                  <td className="py-2.5 font-medium text-civic-ink">{row.label}</td>
                  <td className="py-2.5 text-right font-mono font-bold text-civic-primary">
                    {Math.round(row.w * 100)}%
                  </td>
                  <td className="py-2.5 text-center">
                    {row.inv ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        <RefreshCcw size={12} /> Terbalik
                      </span>
                    ) : (
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 pl-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-32 rounded-full bg-civic-soft overflow-hidden">
                        <div
                          className="h-full rounded-full bg-civic-primary transition-all"
                          style={{ width: `${row.w * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MethodSection>

      {/* ── Metric Clarification: Priority, Emergency, and Report Urgency ── */}
      <MethodSection id="metric-clarification" eyebrow="Metric Clarification" title="Priority, Emergency, and Report Urgency">
        <p className="text-sm leading-relaxed text-civic-muted">
          CIVICTWIN mengadopsi pendekatan berlapis (multi-layer approach) untuk perencanaan kebijakan dan respons kejadian di lapangan. Terdapat tiga metrik utama yang saling berkaitan namun memiliki fungsi yang berbeda:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-civic-ink flex items-center gap-1.5"><BarChart3 size={18} /> Priority Score</h3>
            <p className="text-sm text-civic-muted"><strong>Skala:</strong> 0 – 100</p>
            <p className="text-sm text-civic-muted"><strong>Melekat pada:</strong> Kecamatan / Wilayah</p>
            <p className="text-sm text-civic-muted leading-relaxed"><strong>Fungsi:</strong> Digunakan untuk perencanaan kebijakan dan alokasi prioritas intervensi jangka menengah secara lintas OPD.</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-red-700 flex items-center gap-1.5"><TriangleAlert size={18} /> Emergency Review Score</h3>
            <p className="text-sm text-civic-muted"><strong>Skala:</strong> 0 – 100</p>
            <p className="text-sm text-civic-muted"><strong>Melekat pada:</strong> Kecamatan / Wilayah</p>
            <p className="text-sm text-civic-muted leading-relaxed"><strong>Fungsi:</strong> Digunakan untuk prioritas tinjauan cepat saat ada indikasi atau sinyal bencana (darurat lapangan).</p>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-orange-700 flex items-center gap-1.5"><MessageSquareWarning size={18} /> Report Urgency</h3>
            <p className="text-sm text-civic-muted"><strong>Kategori:</strong> Rendah / Sedang / Tinggi / Kritis</p>
            <p className="text-sm text-civic-muted"><strong>Melekat pada:</strong> Laporan Warga Individual</p>
            <p className="text-sm text-civic-muted leading-relaxed"><strong>Fungsi:</strong> Digunakan untuk triage (pemilahan) urgensi laporan masyarakat sebelum divalidasi dan ditindaklanjuti secara teknis oleh OPD.</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-red-100 bg-civic-surface p-6 shadow-sm overflow-x-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-4">
            Formula Emergency Review Score (Taktis)
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-civic-line text-left">
                <th className="pb-2 font-semibold text-civic-muted text-xs uppercase">Parameter Emergency</th>
                <th className="pb-2 font-semibold text-civic-muted text-xs uppercase text-right">Bobot</th>
                <th className="pb-2 pl-4 font-semibold text-civic-muted text-xs uppercase">Alasan Prioritas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-civic-line">
              {[
                { label: "Water Level Status (Aman/Waspada/Siaga/Awas)", w: 0.30, desc: "Indikator fisik utama dari sensor tata air." },
                { label: "Verified Reports (Laporan Darurat Warga)", w: 0.20, desc: "Validasi crowdsourcing adanya genangan riil." },
                { label: "Historical Disaster Risk", w: 0.15, desc: "Kerentanan historis kawasan terhadap rob/banjir." },
                { label: "Population Exposure (Kepadatan Terdampak)", w: 0.15, desc: "Estimasi jumlah jiwa di area terdampak." },
                { label: "Critical Facilities Exposure", w: 0.10, desc: "RS, Gardu Induk, Pusat Logistik di zona bahaya." },
                { label: "Social Vulnerability (Kerentanan Sosial)", w: 0.10, desc: "Keberadaan lansia/difabel yang butuh evakuasi khusus." },
              ].map((row) => (
                <tr key={row.label} className="py-2">
                  <td className="py-2.5 font-medium text-civic-ink">{row.label}</td>
                  <td className="py-2.5 text-right font-mono font-bold text-red-600">
                    {Math.round(row.w * 100)}%
                  </td>
                  <td className="py-2.5 pl-4 text-xs text-civic-muted">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-civic-ink">Threshold Status:</span>
            <span className="rounded bg-red-100 px-2 py-1 text-red-700 font-medium">≥80 Darurat</span>
            <span className="rounded bg-orange-100 px-2 py-1 text-orange-700 font-medium">≥60 Prioritas Tanggap</span>
            <span className="rounded bg-amber-100 px-2 py-1 text-amber-700 font-medium">≥40 Perlu Tinjauan</span>
            <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-700 font-medium">≥20 Waspada</span>
          </div>
          <p className="mt-3 text-xs italic text-civic-muted">
            * Batasan Data: Seluruh nilai parameter Emergency saat ini adalah murni <strong className="font-bold text-civic-ink">simulasi (Proof of Concept)</strong>. Tidak terhubung dengan sensor fisik (misal AWLR) maupun laporan BPBD riil.
          </p>
        </div>
      </MethodSection>

      {/* ── 6. Policy Simulator Explanation ─────────────────────────── */}
      <MethodSection id="policy-simulator" eyebrow="Policy Simulator" title="Simulasi Perubahan Bobot Kebijakan">
        <p className="text-sm leading-relaxed text-civic-muted">
          CIVICTWIN memungkinkan pemerintah mengubah bobot indikator sesuai fokus kebijakan aktif.
          Saat bobot berubah, Priority Score setiap wilayah dihitung ulang secara instan dan ranking wilayah diperbarui.
          Ini menunjukkan bahwa prioritas wilayah adalah <strong className="text-civic-ink">relatif terhadap perspektif kebijakan</strong>,
          bukan nilai absolut.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {POLICY_MODES.map((mode) => {
            const topEntry = Object.entries(mode.weights).sort((a, b) => b[1] - a[1])[0];
            const topLabel = INDICATOR_LABELS[topEntry[0] as keyof typeof INDICATOR_LABELS];
            const topPct = Math.round(topEntry[1] * 100);
            return (
              <div key={mode.id} className="rounded-xl border border-civic-line bg-civic-surface p-4 shadow-sm space-y-2">
                <p className="text-sm font-bold text-civic-ink">{mode.label}</p>
                <p className="text-xs leading-relaxed text-civic-muted">{mode.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="h-1.5 flex-1 rounded-full bg-civic-soft overflow-hidden">
                    <div
                      className="h-full rounded-full bg-civic-primary"
                      style={{ width: `${topPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-civic-primary tabular-nums w-8 text-right">{topPct}%</span>
                </div>
                <p className="text-xs text-civic-muted">
                  Indikator dominan: <span className="font-semibold text-civic-ink">{topLabel}</span>
                </p>
              </div>
            );
          })}
        </div>
      </MethodSection>

      {/* ── 7. Limitations ──────────────────────────────────────────── */}
      <MethodSection id="limitations" eyebrow="Batasan" title="Batasan Prototype">
        <p className="text-sm leading-relaxed text-civic-muted">
          Sebagai proof of concept untuk kompetisi Smart City, CIVICTWIN memiliki batasan-batasan berikut
          yang perlu diperhatikan sebelum implementasi nyata:
        </p>
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-6 space-y-3">
          {LIMITATIONS.map((lim) => (
            <div key={lim.text} className="flex items-start gap-3">
              <span className="text-lg shrink-0 mt-0.5">{lim.icon}</span>
              <p className="text-sm leading-relaxed text-civic-ink">{lim.text}</p>
            </div>
          ))}
        </div>
      </MethodSection>

      {/* ── 8. AI Governance & Legal Compliance Guardrail ────────────── */}
      <MethodSection id="ai-governance" eyebrow="Compliance" title="AI Governance & Legal Compliance Guardrail">
        <p className="text-sm leading-relaxed text-civic-muted">
          CIVICTWIN menggunakan CivicSense AI sebagai policy/report assistant. AI bertugas membantu klasifikasi, peringkasan, penentuan prioritas awal, dan pembuatan draf rekomendasi. AI <strong>bukan pengambil keputusan final</strong>, tidak menggantikan validasi manusia/OPD, wajib menggunakan data anonim, dan hasil AI harus diperlakukan sebagai draf analisis awal.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mt-5">
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-civic-ink flex items-center gap-2">
              <span className="text-civic-primary shrink-0"><UserCheck size={20} /></span> Human-in-the-loop Validation
            </h3>
            <p className="text-xs leading-relaxed text-civic-muted">
              Setiap rekomendasi kebijakan atau status laporan dari AI harus divalidasi oleh manusia/OPD terkait sebelum tindakan nyata dilakukan.
            </p>
          </div>
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-civic-ink flex items-center gap-2">
              <span className="text-civic-primary shrink-0"><ShieldCheck size={20} /></span> Personal Data Protection
            </h3>
            <p className="text-xs leading-relaxed text-civic-muted">
              Data pribadi pelapor (nama, NIK, alamat presisi) harus disamarkan (anonymized) sebelum diproses oleh sistem analisis publik.
            </p>
          </div>
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-civic-ink flex items-center gap-2">
              <span className="text-civic-primary shrink-0"><Building size={20} /></span> Public Complaint Procedure
            </h3>
            <p className="text-xs leading-relaxed text-civic-muted">
              Integrasi nyata wajib mengikuti kanal resmi pengaduan pemerintah (SP4N-LAPOR) dan prosedur operasional standar pemerintah kota.
            </p>
          </div>
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-civic-ink flex items-center gap-2">
              <span className="text-civic-primary shrink-0"><LinkIcon size={20} /></span> SPBE & Satu Data Alignment
            </h3>
            <p className="text-xs leading-relaxed text-civic-muted">
              Sistem mendukung interoperabilitas dan tata kelola data pemerintahan digital sesuai prinsip SPBE dan Satu Data Indonesia.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-civic-ink mb-3">Batasan Otoritas AI (AI Output Limitation)</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={16} /> AI Boleh (Diizinkan)
              </p>
              <ul className="space-y-1.5 text-xs text-green-900">
                <li>• Mengklasifikasi kategori laporan</li>
                <li>• Menyarankan OPD terkait</li>
                <li>• Memberikan ringkasan permasalahan</li>
                <li>• Memberikan label prioritas awal</li>
                <li>• Membuat draft policy brief</li>
                <li>• Membuat ringkasan transparan (citizen summary)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <XCircle size={16} /> AI TIDAK Boleh (Dilarang Keras)
              </p>
              <ul className="space-y-1.5 text-xs text-red-900">
                <li>• Mengambil keputusan final pemerintahan</li>
                <li>• Membocorkan/menampilkan data pribadi warga</li>
                <li>• Menolak laporan tanpa validasi manusia</li>
                <li>• Mengklaim data sebagai rilis resmi pemerintah</li>
                <li>• Mengeluarkan perintah dinas resmi (SP/SK)</li>
                <li>• Menggantikan peran strategis OPD</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-civic-line bg-civic-soft p-4">
          <p className="text-xs text-civic-muted italic">
            <strong>Catatan Legal:</strong> Rujukan konseptual ini didasarkan pada prinsip perlindungan data pribadi, pedoman SPBE, kerangka Satu Data Indonesia, dan regulasi pengelolaan pengaduan pelayanan publik nasional. Detail implementasi nyata perlu dikaji lebih lanjut bersama otoritas daerah dan ahli hukum terkait.
          </p>
        </div>
      </MethodSection>

      {/* ── 9. Future Development ────────────────────────────────────── */}
      <MethodSection id="future-development" eyebrow="Roadmap" title="Pengembangan Berikutnya">
        <p className="text-sm leading-relaxed text-civic-muted">
          Jika prototype ini dilanjutkan ke tahap produksi, berikut adalah prioritas pengembangan
          yang direkomendasikan untuk meningkatkan nilai dan akurasi sistem:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_DEV.map((item, i) => (
            <div
              key={item.title}
              className="relative rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-2 overflow-hidden"
            >
              <div aria-hidden className="absolute top-0 right-0 opacity-5 leading-none pr-3 pt-2 [&>svg]:w-12 [&>svg]:h-12">
                {item.icon}
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-civic-primary text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm font-bold text-civic-ink">{item.title}</p>
              </div>
              <p className="text-xs leading-relaxed text-civic-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </MethodSection>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-civic-line bg-civic-surface p-6 shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <p className="text-sm font-bold text-civic-ink">Siap untuk eksplorasi lebih lanjut?</p>
          <p className="text-xs text-civic-muted mt-0.5">Gunakan Dashboard, Simulator, atau Policy Brief untuk menjelajahi sistem.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/dashboard" className={classNames(buttonClasses("primary"), "gap-2")}><BarChart3 size={16} /> Dashboard Kota</Link>
          <Link to="/simulator" className={classNames(buttonClasses("secondary"), "gap-2")}><SlidersHorizontal size={16} /> Policy Simulator</Link>
          <Link to="/policy-brief" className={classNames(buttonClasses("secondary"), "gap-2")}><Sparkles size={16} /> AI Policy Brief</Link>
          <Link to="/public" className={classNames(buttonClasses("secondary"), "gap-2")}><Globe2 size={16} /> Transparansi Publik</Link>
        </div>
      </section>
    </div>
  );
}



