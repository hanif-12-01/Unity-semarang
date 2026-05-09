import React, { useState, useMemo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Scale, Waves, Hospital, Users, Store, MessageSquareWarning, Bot, Lightbulb, FileText, BarChart3, Info } from "lucide-react";
import { buttonClasses } from "../components/ui/Button";
import IndicatorBar from "../components/ui/IndicatorBar";
import PageHeader from "../components/ui/PageHeader";
import { mockRegions } from "../data/mockData";
import {
  POLICY_MODES,
  INDICATOR_LABELS,
  getRankedRegions,
  getPolicyModeConfig,
  getWeightsForMode,
  generateSimulatorNarration,
  AI_DISCLAIMER,
  isIndicatorInvertedForMode,
} from "../utils";
import { classNames } from "../utils/classNames";
import type { PolicyMode, ScoredRegion } from "../utils";
import type { RegionIndicator } from "../data/mockData";

// ─── Constants ────────────────────────────────────────────────────────────────

const MODE_ICONS: Record<PolicyMode, ReactNode> = {
  general: <Scale />,
  flood: <Waves />,
  publicService: <Hospital />,
  socialVulnerability: <Users />,
  economy: <Store />,
  citizenReports: <MessageSquareWarning />,
};

const MODE_ACCENT: Record<PolicyMode, { bg: string; border: string; text: string; pill: string }> = {
  general:             { bg: "bg-civic-soft",  border: "border-civic-line",  text: "text-civic-ink",   pill: "bg-civic-soft text-civic-ink"   },
  flood:               { bg: "bg-blue-50",    border: "border-blue-300",   text: "text-blue-700",   pill: "bg-blue-100 text-blue-700"    },
  publicService:       { bg: "bg-purple-50",  border: "border-purple-300", text: "text-purple-700", pill: "bg-purple-100 text-purple-700" },
  socialVulnerability: { bg: "bg-orange-50",  border: "border-orange-300", text: "text-orange-700", pill: "bg-orange-100 text-orange-700" },
  economy:             { bg: "bg-emerald-50", border: "border-emerald-300",text: "text-emerald-700",pill: "bg-emerald-100 text-emerald-700"},
  citizenReports:      { bg: "bg-rose-50",    border: "border-rose-300",   text: "text-rose-700",   pill: "bg-rose-100 text-rose-700"    },
};

// Mode-specific recommendations
const MODE_RECOMMENDATIONS: Record<PolicyMode, string[]> = {
  general: [
    "Terapkan pendekatan menyeluruh dengan alokasi anggaran proporsional per indikator",
    "Prioritaskan wilayah skor tertinggi untuk program multi-sektor lintas dinas",
    "Gunakan dashboard ini sebagai bahan Musrenbang dan penyusunan APBD",
    "Lakukan evaluasi ulang setiap kuartal untuk memantau perubahan skor",
  ],
  flood: [
    "Percepat pembangunan tanggul & sistem drainase terintegrasi di wilayah skor tertinggi",
    "Pasang sensor rob dan sistem peringatan dini berbasis IoT di seluruh pesisir utara",
    "Koordinasikan respons lintas dinas: BPBD, PU, dan Kecamatan pesisir",
    "Rehabilitasi ekosistem mangrove sebagai solusi berbasis alam (nature-based solution)",
    "Siapkan rencana relokasi bertahap untuk hunian di zona rob kronis",
  ],
  publicService: [
    "Kirim unit layanan bergerak (mobile service) ke kecamatan dengan akses terendah",
    "Percepat pembangunan Puskesmas, sekolah, dan fasilitas sanitasi di wilayah prioritas",
    "Integrasikan rute Trans Semarang ke kecamatan yang belum terjangkau",
    "Digitalisasi layanan administrasi kependudukan untuk memperpendek jarak layanan",
    "Evaluasi ketercapaian SPM (Standar Pelayanan Minimal) per wilayah",
  ],
  socialVulnerability: [
    "Perkuat program perlindungan sosial (bansos, PKH) di wilayah kerentanan tertinggi",
    "Berdayakan komunitas lokal melalui program Padat Karya dan pelatihan keterampilan",
    "Koordinasikan Dinas Sosial dan Kecamatan untuk pemetaan warga rentan",
    "Integrasikan data DTKS dengan sistem prioritas wilayah untuk ketepatan sasaran",
    "Tingkatkan kapasitas Posyandu dan Pusat Kesehatan Komunitas di wilayah rawan",
  ],
  economy: [
    "Buka program kredit mikro dan modal usaha bagi UMKM di wilayah skor rendah",
    "Bangun pasar desa dan ruang UMKM terintegrasi di kecamatan prioritas",
    "Fasilitasi pendampingan digitalisasi UMKM: marketplace, pembayaran digital, branding",
    "Sambungkan UMKM lokal dengan program pengadaan barang/jasa pemerintah kota",
    "Gelar festival ekonomi dan pameran produk lokal untuk mendorong permintaan",
  ],
  citizenReports: [
    "Tingkatkan kapasitas respons OPD terhadap laporan warga dari sistem digital",
    "Buka kanal pengaduan warga yang terintegrasi (aplikasi, WhatsApp, media sosial)",
    "Tetapkan SLA (Service Level Agreement) respons laporan per kategori isu",
    "Libatkan warga dalam verifikasi data dan pemantauan pelaksanaan program",
    "Gunakan pola laporan warga untuk mengidentifikasi hotspot masalah baru",
  ],
};

// ─── Helper: rank change badge ─────────────────────────────────────────────────

function RankChangeBadge({ delta }: { delta: number }) {
  if (delta === 0)
    return <span className="text-xs font-semibold text-civic-muted">—</span>;
  if (delta < 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-priority-high">
        ▲ {Math.abs(delta)}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-priority-low">
      ▼ {delta}
    </span>
  );
}

function scoreColor(score: number) {
  if (score >= 75) return "text-priority-high";
  if (score >= 50) return "text-priority-medium";
  return "text-priority-low";
}

function categoryDot(cat: string) {
  if (cat === "Tinggi") return "bg-priority-high";
  if (cat === "Sedang") return "bg-priority-medium";
  return "bg-priority-low";
}

// ─── Mode Selector Tab ────────────────────────────────────────────────────────

function ModeTab({
  mode,
  activeMode,
  onClick,
}: {
  mode: typeof POLICY_MODES[number];
  activeMode: PolicyMode;
  onClick: (id: PolicyMode) => void;
}) {
  const isActive = mode.id === activeMode;
  const acc = MODE_ACCENT[mode.id];
  return (
    <button
      id={`mode-tab-${mode.id}`}
      onClick={() => onClick(mode.id)}
      className={classNames(
        "flex flex-col items-start gap-1 rounded-xl border px-4 py-3 text-left transition",
        isActive
          ? classNames(acc.bg, acc.border, "shadow-sm")
          : "border-civic-line bg-civic-surface hover:border-civic-primary/40 hover:bg-civic-soft"
      )}
    >
      <span className="shrink-0 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6">{MODE_ICONS[mode.id]}</span>
      <span
        className={classNames(
          "text-sm font-semibold",
          isActive ? acc.text : "text-civic-ink"
        )}
      >
        {mode.label}
      </span>
    </button>
  );
}

// ─── Weight Bar Row ───────────────────────────────────────────────────────────

function WeightRow({
  label,
  weight,
  inverted,
  isHighlighted,
}: {
  label: string;
  weight: number;
  inverted: boolean;
  isHighlighted: boolean;
}) {
  const pct = Math.round(weight * 100);
  return (
    <div
      className={classNames(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition",
        isHighlighted ? "bg-civic-primary/8 ring-1 ring-civic-primary/20" : ""
      )}
    >
      <span
        className={classNames(
          "w-36 shrink-0 text-xs",
          isHighlighted ? "font-bold text-civic-primary" : "text-civic-muted"
        )}
      >
        {label}
        {inverted && (
          <span className="ml-1 text-civic-muted/60 font-normal">*</span>
        )}
      </span>
      <div className="flex-1 h-2 overflow-hidden rounded-full bg-civic-line">
        <div
          className={classNames(
            "h-full rounded-full transition-all duration-500",
            isHighlighted ? "bg-civic-primary" : "bg-civic-muted/40"
          )}
          style={{ width: `${pct * 2}%` }}
        />
      </div>
      <span
        className={classNames(
          "w-8 text-right text-xs tabular-nums",
          isHighlighted ? "font-bold text-civic-primary" : "text-civic-muted"
        )}
      >
        {pct}%
      </span>
    </div>
  );
}

// ─── Comparison Row ───────────────────────────────────────────────────────────

function ComparisonRow({
  region,
  generalRank,
  simulatedRank,
  isTop,
}: {
  region: ScoredRegion;
  generalRank: number;
  simulatedRank: number;
  isTop: boolean;
}) {
  const delta = generalRank - simulatedRank; // positive = moved up

  return (
    <tr
      className={classNames(
        "border-b border-civic-line transition",
        isTop ? "bg-civic-primary/5" : "hover:bg-civic-soft/60"
      )}
    >
      {/* Simulated rank */}
      <td className="py-3 pl-4 pr-2 text-center">
        <span
          className={classNames(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white mx-auto",
            simulatedRank <= 2
              ? "bg-priority-high"
              : simulatedRank <= 4
              ? "bg-priority-medium"
              : "bg-priority-low"
          )}
        >
          {simulatedRank}
        </span>
      </td>
      {/* Name */}
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <span className={classNames("h-2 w-2 rounded-full shrink-0", categoryDot(region.computedCategory))} />
          <Link
            to={`/regions/${region.id}`}
            className="text-sm font-semibold text-civic-ink hover:text-civic-primary hover:underline transition-colors"
          >
            {region.name}
          </Link>
        </div>
        <p className="mt-0.5 pl-4 text-xs text-civic-muted line-clamp-1">
          {region.computedCategory}
        </p>
      </td>
      {/* Simulated score */}
      <td className="py-3 px-3 text-center">
        <span className={classNames("text-lg font-bold tabular-nums", scoreColor(region.computedScore))}>
          {region.computedScore}
        </span>
      </td>
      {/* General rank (baseline) */}
      <td className="py-3 px-3 text-center text-sm text-civic-muted tabular-nums">
        #{generalRank}
      </td>
      {/* Delta */}
      <td className="py-3 pr-4 text-center">
        <RankChangeBadge delta={delta} />
      </td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PolicySimulatorPage() {
  const [activeMode, setActiveMode] = useState<PolicyMode>("general");

  // Always compute general ranking as baseline
  const generalRanked = useMemo(
    () => getRankedRegions(mockRegions, "general"),
    []
  );

  // Recompute when mode changes
  const simulatedRanked = useMemo(
    () => getRankedRegions(mockRegions, activeMode),
    [activeMode]
  );

  const modeConfig = getPolicyModeConfig(activeMode);
  const weights = getWeightsForMode(activeMode);
  const acc = MODE_ACCENT[activeMode];

  // Map regionId → general rank for delta computation
  const generalRankMap = useMemo(() => {
    const m: Record<string, number> = {};
    generalRanked.forEach((r, i) => { m[r.id] = i + 1; });
    return m;
  }, [generalRanked]);

  // Top-moved regions (rose in ranking vs general)
  const movedUp = simulatedRanked
    .map((r: ScoredRegion, i: number) => ({ region: r, simRank: i + 1, genRank: generalRankMap[r.id] }))
    .filter((x: { region: ScoredRegion; simRank: number; genRank: number }) => x.simRank < x.genRank)
    .sort((a: { region: ScoredRegion; simRank: number; genRank: number }, b: { region: ScoredRegion; simRank: number; genRank: number }) => (a.genRank - a.simRank) - (b.genRank - b.simRank));

  // Highest-weight indicator key for this mode
  const topWeightKey = (Object.entries(weights) as [keyof RegionIndicator, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  return (
    <div className="space-y-8 pb-12">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          eyebrow="Policy Simulator"
          title="Simulasi Fokus Kebijakan"
          description="Pilih fokus kebijakan untuk melihat bagaimana prioritas wilayah berubah berdasarkan bobot indikator yang berbeda."
        />
        <Link
          to="/dashboard"
          className={classNames(buttonClasses("secondary"), "shrink-0 text-sm")}
          id="goto-dashboard-from-sim"
        >
          ← Kembali ke Dashboard
        </Link>
      </div>

      {/* ── Mode Selector ──────────────────────────────────────────────── */}
      <section id="mode-selector">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-civic-primary">
          Pilih Fokus Kebijakan
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {POLICY_MODES.map((mode) => (
            <ModeTab
              key={mode.id}
              mode={mode}
              activeMode={activeMode}
              onClick={setActiveMode}
            />
          ))}
        </div>
      </section>

      {/* ── Mode Explanation + Weight Panel ────────────────────────────── */}
      <section
        id="mode-explanation"
        className={classNames(
          "rounded-2xl border p-6 shadow-sm",
          acc.bg, acc.border
        )}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* Left: description */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="shrink-0 flex items-center justify-center [&>svg]:w-7 [&>svg]:h-7">{MODE_ICONS[activeMode]}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-civic-muted">
                  Mode Aktif
                </p>
                <h2 className={classNames("text-lg font-bold", acc.text)}>
                  {modeConfig.label}
                </h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-civic-ink">
              {modeConfig.description}
            </p>
            <div className={classNames("inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold", acc.pill)}>
              Indikator utama: {INDICATOR_LABELS[topWeightKey]}
              {" "}({Math.round(weights[topWeightKey] * 100)}% bobot)
            </div>
          </div>

          {/* Right: weight breakdown */}
          <div className="w-full lg:w-72 space-y-1">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-civic-muted">
              Distribusi Bobot Indikator
            </p>
            {(Object.entries(weights) as [keyof RegionIndicator, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([key, w]) => (
                <WeightRow
                  key={key}
                  label={INDICATOR_LABELS[key]}
                  weight={w}
                  inverted={isIndicatorInvertedForMode(key as keyof RegionIndicator, activeMode)}
                  isHighlighted={w === Math.max(...Object.values(weights))}
                />
              ))}
            {Object.keys(weights).some((key) => isIndicatorInvertedForMode(key as keyof RegionIndicator, activeMode)) && (
              <p className="pt-1 text-xs text-civic-muted/70 italic">
                * Indikator bertanda ini dibalik: nilai rendah = kebutuhan intervensi lebih tinggi
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CivicSense AI Narration ─────────────────────────────────────── */}
      {(() => {
        const narration = generateSimulatorNarration(activeMode, simulatedRanked, generalRanked);
        return (
          <section id="civicsense-narration" className="overflow-hidden rounded-xl border border-civic-primary/30 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-civic-ink to-slate-800 px-5 py-4">
              <div className="flex items-center gap-2 text-civic-primary">
                <Bot size={20} />
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/50">CivicSense AI</p>
                  <p className="text-sm font-semibold text-white">
                    Narasi Simulasi — {narration.modeLabel}
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80">
                Rule-based · Prototype
              </span>
            </div>
            {/* Body */}
            <div className="bg-white px-5 py-4 space-y-3">
              <p className="text-sm leading-relaxed text-civic-ink">{narration.summary}</p>
              <p className="text-sm leading-relaxed text-civic-muted">{narration.whyChanged}</p>
              <div className="rounded-lg border border-civic-primary/20 bg-civic-primary/5 px-4 py-3">
                <p className="text-xs font-bold text-civic-primary mb-1 flex items-center gap-1.5"><Lightbulb size={14} /> Implikasi Kebijakan</p>
                <p className="text-sm leading-relaxed text-civic-ink">{narration.policyImplication}</p>
              </div>
              <p className="text-xs text-civic-muted/60 italic pt-1">{AI_DISCLAIMER}</p>
            </div>
          </section>
        );
      })()}

      {/* ── Results Grid ───────────────────────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">

        {/* ── Left: Ranking Table ────────────────────────────────────── */}
        <section id="simulation-results">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
                Hasil Simulasi
              </p>
              <h2 className="mt-0.5 text-base font-semibold text-civic-ink">
                Ranking wilayah — {modeConfig.label}
              </h2>
            </div>
            <span className={classNames("rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 [&>svg]:w-4 [&>svg]:h-4", acc.pill)}>
              {MODE_ICONS[activeMode]} {modeConfig.label}
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-civic-line bg-civic-surface shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-civic-line bg-civic-soft text-xs font-bold uppercase tracking-wider text-civic-muted">
                  <th className="py-3 pl-4 pr-2 text-center w-12">Rank</th>
                  <th className="py-3 px-3 text-left">Wilayah</th>
                  <th className="py-3 px-3 text-center w-20">Skor</th>
                  <th className="py-3 px-3 text-center w-20">Rank Umum</th>
                  <th className="py-3 pr-4 text-center w-20">Perubahan</th>
                </tr>
              </thead>
              <tbody>
                {simulatedRanked.map((region, i) => (
                  <ComparisonRow
                    key={region.id}
                    region={region}
                    generalRank={generalRankMap[region.id]}
                    simulatedRank={i + 1}
                    isTop={i === 0}
                  />
                ))}
              </tbody>
            </table>

            {/* Table footer note */}
            <div className="border-t border-civic-line bg-civic-soft px-4 py-3">
              <p className="text-xs text-civic-muted">
                ▲ = naik peringkat dibanding General Priority &nbsp;·&nbsp;
                ▼ = turun peringkat &nbsp;·&nbsp;
                Rank Umum = posisi di mode General Priority
              </p>
            </div>
          </div>

          {/* Per-region indicator mini bars for active mode */}
          <div className="mt-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Detail Indikator — Urutan Simulasi
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {simulatedRanked.map((region, i) => (
                <div
                  key={region.id}
                  className="rounded-xl border border-civic-line bg-civic-surface p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={classNames(
                        "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white shrink-0",
                        i <= 1 ? "bg-priority-high" : i <= 3 ? "bg-priority-medium" : "bg-priority-low"
                      )}>
                        {i + 1}
                      </span>
                      <Link
                        to={`/regions/${region.id}`}
                        className="text-sm font-semibold text-civic-ink hover:text-civic-primary transition-colors"
                      >
                        {region.name}
                      </Link>
                    </div>
                    <span className={classNames("text-base font-bold tabular-nums", scoreColor(region.computedScore))}>
                      {region.computedScore}
                    </span>
                  </div>
                  <IndicatorBar
                    label={INDICATOR_LABELS[topWeightKey]}
                    value={region.indicators[topWeightKey]}
                    inverted={isIndicatorInvertedForMode(topWeightKey, activeMode)}
                    colorClass="auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Right Sidebar ────────────────────────────────────────────── */}
        <aside className="space-y-5">

          {/* Wilayah yang naik prioritas */}
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Wilayah yang Naik Prioritas
            </p>
            {movedUp.length === 0 ? (
              <p className="text-xs text-civic-muted">
                Tidak ada perubahan ranking dari General Priority.
              </p>
            ) : (
              <ul className="space-y-2">
                {movedUp.map(({ region, simRank, genRank }) => (
                  <li
                    key={region.id}
                    className="flex items-center justify-between rounded-lg border border-civic-line bg-civic-soft/60 px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-civic-ink">{region.name}</p>
                      <p className="text-xs text-civic-muted">
                        #{genRank} → #{simRank}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-priority-high">
                      ▲ {genRank - simRank}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Mode Recommendations */}
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Rekomendasi — {modeConfig.label}
            </p>
            <ol className="space-y-2.5">
              {MODE_RECOMMENDATIONS[activeMode].map((rec: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-civic-primary text-xs font-bold text-white mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-civic-ink">{rec}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Quick action buttons */}
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Tindak Lanjut
            </p>
            <Link
              to={`/policy-brief?region=${simulatedRanked[0]?.id ?? "genuk"}&mode=${activeMode}`}
              id="sim-goto-policybrief"
              className={classNames(buttonClasses("primary"), "w-full justify-center text-sm gap-2")}
            >
              <FileText size={16} /> Susun Policy Brief
            </Link>
            <Link
              to="/dashboard"
              className={classNames(buttonClasses("secondary"), "w-full justify-center text-sm gap-2")}
            >
              <BarChart3 size={16} /> Kembali ke Dashboard
            </Link>
          </div>

          {/* Simulation note */}
          <div className="rounded-xl border border-civic-line bg-civic-soft p-4 text-xs leading-relaxed text-civic-muted space-y-1">
            <p className="font-semibold text-civic-ink flex items-center gap-1.5"><Info size={16} /> Catatan Simulasi</p>
            <p>
              Perubahan ranking mencerminkan penerapan bobot berbeda pada indikator yang sama. Tidak ada data baru yang ditambahkan — hanya perspektif analisis yang berubah sesuai fokus kebijakan yang dipilih.
            </p>
            <p className="mt-1">
              Data prototype menggunakan <strong className="text-civic-ink">kombinasi data publik, data olahan, dan simulasi terbatas</strong> untuk proof of concept.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}



