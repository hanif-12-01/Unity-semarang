import { Link } from "react-router-dom";
import { MapPinned, BarChart3, TriangleAlert, MessageSquareWarning, Tag, Building, FileCog, Waves, Hospital, Store, Info, SlidersHorizontal, ArrowUpRight, TrendingUp, ShieldAlert, Award, Presentation } from "lucide-react";
import IndicatorBar from "../components/ui/IndicatorBar";
import PageHeader from "../components/ui/PageHeader";
import PriorityBadge from "../components/ui/PriorityBadge";
import SemarangPriorityMap from "../components/map/SemarangPriorityMap";
import { buttonClasses } from "../components/ui/Button";
import { citySummary, mockRegions } from "../data/mockData";
import { getRankedRegions, getCityScoringStats, INDICATOR_LABELS, getPolicyModeConfig, isIndicatorInvertedForMode } from "../utils";
import { classNames } from "../utils/classNames";
import {
  getReportStats,
  mockCitizenReports,
  getReportsByCategory,
  getReportsByUrgency,
  ReportCategory,
} from "../data/citizenReports";
import { getResolutionStats } from "../data/completionReports";
import type { PriorityCategory } from "../data/mockData";
import type { ScoredRegion } from "../utils";

// Trend and Accountability Analytics Imports
import {
  getRegionTrend,
  getTopImprovingRegions,
  getTopDecliningRegions,
  getMeetingHighlights,
  getAccountabilityTrend,
} from "../utils/trendAnalytics";
import { mockHistoricalMetrics } from "../data/mockHistoricalMetrics";
import LineTrendChart from "../components/charts/LineTrendChart";
import BarComparisonChart from "../components/charts/BarComparisonChart";
import StackedFeedbackChart from "../components/charts/StackedFeedbackChart";
import TrendDeltaBadge from "../components/charts/TrendDeltaBadge";
import RingProgressChart from "../components/charts/RingProgressChart";
import MiniBarChart from "../components/charts/MiniBarChart";



// ─── Helpers ─────────────────────────────────────────────────────────────────

function categoryToLevel(cat: PriorityCategory): "high" | "medium" | "low" {
  if (cat === "Tinggi") return "high";
  if (cat === "Sedang") return "medium";
  return "low";
}

const badgeConfig: Record<"high" | "medium" | "low", { label: string; cls: string; dot: string }> = {
  high:   { label: "Prioritas Tinggi", cls: "border-red-200 bg-red-50 text-red-700",       dot: "bg-red-500" },
  medium: { label: "Prioritas Sedang", cls: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  low:    { label: "Prioritas Rendah", cls: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
};

function PriorityChip({ level }: { level: "high" | "medium" | "low" }) {
  const c = badgeConfig[level];
  return (
    <span className={classNames("inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold", c.cls)}>
      <span className={classNames("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}

function scoreColor(score: number) {
  if (score >= 75) return "text-priority-high";
  if (score >= 50) return "text-priority-medium";
  return "text-priority-low";
}

const dashboardCityImage = "/semarang-hero.jpg";

// ─── Sub-section: Bar Chart Visual ───────────────────────────────────────────

function ScoreBarChart({ regions }: { regions: ScoredRegion[] }) {
  const max = 100;
  return (
    <div className="space-y-3">
      {regions.map((r) => {
        const level = categoryToLevel(r.computedCategory);
        const barColor =
          level === "high" ? "bg-priority-high" :
          level === "medium" ? "bg-priority-medium" : "bg-priority-low";

        return (
          <div key={r.id} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-right text-xs font-medium text-civic-ink">
              {r.name}
            </span>
            <div className="relative flex-1">
              <div className="h-6 w-full overflow-hidden rounded bg-civic-soft">
                <div
                  className={classNames("h-full rounded transition-all duration-700", barColor)}
                  style={{ width: `${(r.computedScore / max) * 100}%` }}
                />
              </div>
            </div>
            <span className={classNames("w-8 shrink-0 text-right text-sm font-bold tabular-nums", scoreColor(r.computedScore))}>
              {r.computedScore}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Sub-section: Region Card ─────────────────────────────────────────────────

function RegionCard({ region, rank }: { region: ScoredRegion; rank: number }) {
  const level = categoryToLevel(region.computedCategory);

  return (
    <article className={classNames(
      "group rounded-xl border bg-civic-surface shadow-sm transition hover:shadow-md",
      level === "high"   ? "border-red-200"    :
      level === "medium" ? "border-amber-200"  : "border-emerald-200"
    )}>
      {/* Card header */}
      <div className={classNames(
        "flex items-start justify-between gap-3 rounded-t-xl border-b px-5 py-4",
        level === "high"   ? "border-red-100 bg-red-50/60"    :
        level === "medium" ? "border-amber-100 bg-amber-50/60" : "border-emerald-100 bg-emerald-50/60"
      )}>
        <div className="flex items-center gap-3">
          <span className={classNames(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white",
            level === "high" ? "bg-priority-high" : level === "medium" ? "bg-priority-medium" : "bg-priority-low"
          )}>
            {rank}
          </span>
          <div>
            <h3 className="font-semibold text-civic-ink">{region.name}</h3>
            <p className="mt-0.5 text-xs text-civic-muted line-clamp-1">{region.description}</p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className={classNames("text-3xl font-bold tabular-nums", scoreColor(region.computedScore))}>
            {region.computedScore}
          </p>
          <p className="text-xs text-civic-muted">/ 100</p>
        </div>
      </div>

      {/* Card body */}
      <div className="space-y-4 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <PriorityChip level={level} />
        </div>

        {/* Masalah dominan */}
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-civic-muted">
            Masalah Dominan
          </p>
          <ul className="space-y-1">
            {region.dominantIssues.slice(0, 2).map((issue) => (
              <li key={issue} className="flex items-start gap-1.5 text-xs text-civic-muted">
                <span className="mt-0.5 text-priority-high">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Indikator mini */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-civic-muted">
            Indikator Utama
          </p>
          {region.dominantIndicators.map((d) => (
            <IndicatorBar
              key={d.key}
              label={d.label}
              value={d.value}
              inverted={isIndicatorInvertedForMode(d.key, "general")}
              colorClass="auto"
            />
          ))}
        </div>

        {/* Rekomendasi singkat */}
        <div className="rounded-lg border border-civic-line bg-civic-soft px-3 py-2.5">
          <p className="text-xs font-semibold text-civic-muted">Rekomendasi</p>
          <p className="mt-1 text-xs leading-relaxed text-civic-ink">
            {region.policyRecommendations[0]}
          </p>
        </div>
      </div>

      {/* Card footer */}
      <div className="border-t border-civic-line px-5 py-3">
        <Link
          to={`/regions/${region.id}`}
          className={classNames(
            buttonClasses("secondary"),
            "w-full justify-center text-xs"
          )}
          id={`detail-btn-${region.id}`}
        >
          Lihat Detail Wilayah →
        </Link>
      </div>
    </article>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────

export default function DashboardPage() {
  const ranked = getRankedRegions(mockRegions, "general");
  const stats  = getCityScoringStats(ranked);

  // -- Citizen Feedback Snapshot Calculations --
  const reportStats = getReportStats();
  const categoryStats = getReportsByCategory();
  const categoryKeys = Object.keys(categoryStats) as ReportCategory[];
  const dominantReportCategory = categoryKeys.length > 0
    ? categoryKeys.reduce((a, b) => categoryStats[a] > categoryStats[b] ? a : b)
    : "Tidak ada data";
  
  const regionCounts = mockCitizenReports.reduce((acc, report) => {
    acc[report.regionName] = (acc[report.regionName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const regionKeys = Object.keys(regionCounts);
  const dominantReportRegion = regionKeys.length > 0
    ? regionKeys.reduce((a, b) => regionCounts[a] > regionCounts[b] ? a : b)
    : "Tidak ada data";

  const urgentReports = [...mockCitizenReports]
    .filter(r => r.urgency === "Kritis" || r.urgency === "Tinggi")
    .slice(0, 3);
  // -------------------------------------------

  // -- Regional Trend & Accountability Intelligence Calculations --
  const years = [2022, 2023, 2024, 2025, 2026];
  
  // 1. Tren Priority Score Kota (Rata-rata)
  const cityPriorityScoreTrend = years.map(y => {
    const yearMetrics = mockHistoricalMetrics.filter(m => m.year === y);
    const avg = Math.round(yearMetrics.reduce((sum, m) => sum + m.priorityScore, 0) / yearMetrics.length);
    return { year: y, value: avg };
  });

  // 2. Perbandingan Aktivitas UMKM Antarwilayah 2026
  const regionsSme2026 = mockRegions.map(r => {
    const metric = mockHistoricalMetrics.find(m => m.regionId === r.id && m.year === 2026);
    return {
      label: r.name,
      value: metric ? metric.smeActivity : 0
    };
  });

  // 3. Komposisi Keluhan/Kritik/Saran/Apresiasi 2026
  const feedbackComposition2026 = mockRegions.map(r => {
    const metric = mockHistoricalMetrics.find(m => m.regionId === r.id && m.year === 2026);
    return {
      label: r.name,
      complaint: metric ? metric.citizenComplaint : 0,
      criticism: metric ? metric.citizenCriticism : 0,
      suggestion: metric ? metric.citizenSuggestion : 0,
      appreciation: metric ? metric.citizenAppreciation : 0,
    };
  });

  // 4. Top cards calculations (from 2024 to 2026)
  const topSmeImproving = getTopImprovingRegions("smeActivity", 2024, 2026)[0];
  const topSmeDeclining = getTopDecliningRegions("smeActivity", 2024, 2026)[0];
  const topComplaintIncreasing = getTopDecliningRegions("citizenComplaint", 2024, 2026)[0];
  const topResolutionImproving = getTopImprovingRegions("validatedResolutionRate", 2024, 2026)[0];

  // City-wide accountability average for 2026 vs 2024
  const avgResolution2024 = Math.round(
    mockHistoricalMetrics.filter(m => m.year === 2024).reduce((sum, m) => sum + m.validatedResolutionRate, 0) / 6
  );
  const avgResolution2026 = Math.round(
    mockHistoricalMetrics.filter(m => m.year === 2026).reduce((sum, m) => sum + m.validatedResolutionRate, 0) / 6
  );
  const deltaAvgResolution = avgResolution2026 - avgResolution2024;

  const meetingHighlights = getMeetingHighlights(2024, 2026);


  const summaryCards = [
    {
      id: "stat-total",
      label: "Total Wilayah",
      value: stats.total.toString(),
      sub: "dalam prototype",
      icon: <MapPinned size={24} className="text-civic-muted" />,
      accent: "border-civic-line",
    },
    {
      id: "stat-high",
      label: "Prioritas Tinggi",
      value: stats.highPriority.toString(),
      sub: "butuh intervensi segera",
      icon: <div className="h-5 w-5 rounded-full bg-red-500" />,
      accent: "border-red-200 bg-red-50/40",
    },
    {
      id: "stat-avg",
      label: "Rata-rata Skor",
      value: stats.averageScore.toString(),
      sub: "dari skala 0–100",
      icon: <BarChart3 size={24} className="text-civic-muted" />,
      accent: "border-civic-line",
    },
    {
      id: "stat-top",
      label: "Wilayah Teratas",
      value: stats.topRegion,
      sub: `skor ${stats.topScore}, prioritas tertinggi`,
      icon: <TriangleAlert size={24} className="text-amber-600" />,
      accent: "border-amber-200 bg-amber-50/40",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          eyebrow="Dashboard Kota"
          title="Ranking Prioritas Wilayah"
          description="Memantau prioritas wilayah berdasarkan indikator sosial, ekonomi, lingkungan, layanan publik, serta laporan dan masukan warga."
        />
        <Link
          to="/simulator"
          className={classNames(buttonClasses("secondary"), "shrink-0 text-sm flex items-center gap-2")}
          id="goto-simulator"
        >
          <SlidersHorizontal size={16} /> Buka Policy Simulator
        </Link>
      </div>

      {/* ── City Visual Context ──────────────────────────────────────────── */}
      <section
        id="city-visual-context"
        className="relative overflow-hidden rounded-xl border border-civic-line bg-civic-dark text-civic-surface shadow-sm"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(42, 33, 28, 0.95) 45%, rgba(42, 33, 28, 0.4) 100%), url(${dashboardCityImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid min-h-[260px] lg:grid-cols-1">
          <div className="relative z-10 flex flex-col justify-between gap-6 p-6 md:p-7">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-civic-gold">
                <Building size={14} /> City Context
              </p>
              <h2 className="mt-2 max-w-2xl text-xl font-bold text-white md:text-2xl">
                CIVICTWIN Semarang Command View
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                Identitas lokal ditampilkan sebagai konteks kota, bukan klaim penggunaan data lokasi tertentu,
                sementara prioritas wilayah tetap dibaca melalui skor, peta,
                laporan warga, dan simulasi kebijakan.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs">
              <span className="rounded-md border border-white/15 bg-white/10 px-3 py-2 font-semibold text-white/80">
                {citySummary.totalRegionsInPrototype} kecamatan prototype
              </span>
              <span className="rounded-md border border-civic-primary/40 bg-civic-primary/20 px-3 py-2 font-semibold text-white/80">
                {stats.highPriority} prioritas tinggi
              </span>
              <a
                href="#priority-map"
                className="rounded-md border border-civic-gold/40 bg-civic-gold/15 px-3 py-2 font-semibold text-civic-gold transition hover:bg-civic-gold/25"
              >
                Lihat peta prioritas →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Quick Policy Brief ─────────────────────────────────────────── */}
      <section className="rounded-xl border border-civic-primary bg-civic-primary/5 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
            Quick Policy Brief
          </p>
          <h2 className="mt-1 text-sm font-semibold text-civic-ink">
            Wilayah Paling Krusial Saat Ini: <span className="text-civic-primary">{ranked[0].name}</span>
          </h2>
          <p className="text-xs text-civic-muted mt-1">
            Skor: {ranked[0].computedScore}/100 ({ranked[0].computedCategory}). Susun draf ringkasan kebijakan berbasis rule-based CivicSense untuk wilayah ini.
          </p>
        </div>
        <Link
          to={`/policy-brief?region=${ranked[0].id}&mode=general`}
          className={classNames(buttonClasses("primary"), "shrink-0 text-xs flex items-center gap-1.5")}
        >
          <FileCog size={16} /> Susun Brief {ranked[0].name}
        </Link>
      </section>

      {/* ── Summary Cards ──────────────────────────────────────────────── */}
      <section id="summary-cards" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((c) => (
          <article
            key={c.id}
            id={c.id}
            className={classNames(
              "rounded-xl border bg-civic-surface p-5 shadow-sm",
              c.accent
            )}
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-civic-muted">{c.label}</p>
              <span className="text-xl">{c.icon}</span>
            </div>
            <p className="mt-3 truncate text-2xl font-bold text-civic-ink">{c.value}</p>
            <p className="mt-1 text-xs text-civic-muted">{c.sub}</p>
          </article>
        ))}
      </section>

      {/* ── Priority Map Semarang ──────────────────────────────────────── */}
      <section id="priority-map" className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
            Spatial Digital Twin
          </p>
          <h2 className="mt-1 text-base font-semibold text-civic-ink">
            Priority Map Semarang
          </h2>
          <p className="text-xs text-civic-muted mt-1">
            Representasi spasial prototype berdasarkan 6 kecamatan prioritas. Warna marker menunjukkan kategori Priority Score.
          </p>
        </div>
        <SemarangPriorityMap regions={ranked} />
      </section>

      {/* ── Citizen Feedback Snapshot ──────────────────────────────────── */}
      <section id="citizen-reports-snapshot" className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-5 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary flex items-center gap-1.5">
              <MessageSquareWarning size={14} /> Intelligence Data
            </p>
            <h2 className="mt-1 text-base font-semibold text-civic-ink">
              Citizen Feedback Snapshot
            </h2>
            <p className="text-xs text-civic-muted mt-1 max-w-2xl">
              Ringkasan laporan dan masukan warga yang dibantu draf awalnya oleh CivicSense AI untuk membantu pemerintah melihat isu kota yang paling mendesak.
            </p>
          </div>
          <Link
            to="/reports"
            className={classNames(buttonClasses("secondary"), "shrink-0 text-xs")}
          >
            Buka Dashboard Masukan Warga &rarr;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="rounded-lg bg-civic-soft p-4 border border-civic-line">
            <p className="text-xs font-medium text-civic-muted">Total Masukan</p>
            <p className="mt-1 text-xl font-bold text-civic-ink">{reportStats.total}</p>
          </div>
          <div className="rounded-lg bg-rose-50 p-4 border border-rose-100">
            <p className="text-xs font-medium text-rose-700">Urgensi Tinggi/Kritis</p>
            <p className="mt-1 text-xl font-bold text-rose-900">{reportStats.critical + (getReportsByUrgency()["Tinggi"] || 0)}</p>
          </div>
          <div className="rounded-lg bg-civic-soft p-4 border border-civic-line">
            <p className="text-xs font-medium text-civic-muted">Kategori Dominan</p>
            <p className="mt-1 text-sm font-bold text-civic-ink leading-tight">{dominantReportCategory}</p>
          </div>
          <div className="rounded-lg bg-civic-soft p-4 border border-civic-line">
            <p className="text-xs font-medium text-civic-muted">Kecamatan Terbanyak</p>
            <p className="mt-1 text-sm font-bold text-civic-ink leading-tight">{dominantReportRegion}</p>
          </div>
        </div>

        <h3 className="text-xs font-bold text-civic-ink uppercase tracking-wider mb-3">3 Masukan Paling Mendesak</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {urgentReports.map(report => (
            <div key={report.id} className="rounded-lg border border-civic-line p-4 flex flex-col hover:shadow-sm transition bg-civic-surface">
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className={classNames(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                  report.urgency === "Kritis" ? "bg-rose-100 text-rose-700 border-rose-200" : "bg-orange-100 text-orange-700 border-orange-200"
                )}>
                  {report.urgency}
                </span>
                <span className="text-[10px] bg-civic-soft px-2 py-0.5 rounded-full font-medium text-civic-muted border border-civic-line">
                  {report.status}
                </span>
              </div>
              <p className="text-sm font-bold text-civic-ink leading-snug line-clamp-2" title={report.title}>{report.title}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-civic-muted flex items-center gap-1.5"><MapPinned size={12} /> {report.locationName}, {report.regionName}</p>
                <p className="text-xs text-civic-muted flex items-center gap-1.5"><Tag size={12} /> {report.category}</p>
                <p className="text-xs font-medium text-civic-ink mt-2 flex items-center gap-1.5"><Building size={12} /> <span><span className="text-civic-muted">OPD:</span> {report.recommendedAgency}</span></p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded border border-amber-200 bg-amber-50 p-3 text-center">
          <p className="text-[10px] font-medium text-amber-700 flex items-start gap-1.5">
            <TriangleAlert size={14} className="shrink-0" /> Data laporan dan masukan warga pada prototype ini adalah simulasi. Pada implementasi nyata, masukan warga harus diverifikasi melalui kanal resmi dan OPD terkait.
          </p>
        </div>
      </section>

      {/* ── Isu Dominan Kota ───────────────────────────────────────────── */}
      <section
        id="city-issues"
        className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
          Isu Dominan Kota
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {citySummary.dominantCityIssues.map((issue) => (
            <span
              key={issue}
              className="rounded-full border border-civic-line bg-civic-soft px-3 py-1 text-xs font-medium text-civic-ink"
            >
              {issue}
            </span>
          ))}
        </div>
      </section>

      {/* ── Spatial Priority Overview ────────────────────────────────────── */}
      <section id="spatial-overview" className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
            Spatial Priority Overview
          </p>
          <h2 className="mt-1 text-base font-semibold text-civic-ink">
            Zonasi Konseptual (Proof of Concept)
          </h2>
          <p className="text-xs text-civic-muted">
            Representasi spasial sederhana tanpa GIS untuk memudahkan pemantauan klaster wilayah. Ini adalah representasi konseptual prototype, bukan peta GIS resmi.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { id: "utara", name: "Zona Pesisir Utara", regions: ["semarang-utara", "genuk", "tugu"], desc: "Kawasan pelabuhan, tambak, & heritage pesisir", color: "border-blue-200 bg-blue-50/30" },
            { id: "tengah", name: "Zona Tengah", regions: ["semarang-tengah", "pedurungan"], desc: "Kawasan pusat kota & permukiman padat", color: "border-amber-200 bg-amber-50/30" },
            { id: "selatan", name: "Zona Selatan", regions: ["banyumanik"], desc: "Kawasan perbukitan & pengembangan baru", color: "border-emerald-200 bg-emerald-50/30" }
          ].map(zone => {
            const zoneRegions = ranked.filter(r => zone.regions.includes(r.id));
            if (zoneRegions.length === 0) return null;
            const avgScore = Math.round(zoneRegions.reduce((a, b) => a + b.computedScore, 0) / zoneRegions.length);
            const topRegion = zoneRegions.reduce((prev, curr) => (prev.computedScore > curr.computedScore) ? prev : curr);
            const topIssues = topRegion.dominantIssues.slice(0, 1);
            return (
              <div key={zone.id} className={classNames("rounded-xl border p-4 shadow-sm flex flex-col justify-between", zone.color)}>
                <div>
                  <h3 className="font-bold text-civic-ink">{zone.name}</h3>
                  <p className="text-xs text-civic-muted mb-3">{zone.desc}</p>
                  <p className="text-sm font-semibold mb-1">
                    Avg Score: <span className={classNames(avgScore >= 75 ? "text-red-600" : avgScore >= 50 ? "text-amber-600" : "text-emerald-600")}>{avgScore}</span>
                  </p>
                  <p className="text-xs text-civic-muted mb-1">Wilayah di zona ini:</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {zoneRegions.map(r => (
                      <span key={r.id} className="text-[10px] bg-civic-surface border border-civic-line rounded px-1.5 py-0.5 text-civic-ink shadow-sm font-medium">
                        {r.name}
                      </span>
                    ))}
                  </div>
                  <div className="bg-white/60 p-2 rounded text-xs mb-3 border border-white">
                    <p className="font-semibold text-civic-ink mb-0.5">Isu Utama Zona:</p>
                    <ul className="list-disc pl-4 text-civic-muted">
                      {topIssues.map(issue => <li key={issue} className="line-clamp-2">{issue}</li>)}
                    </ul>
                  </div>
                </div>
                <Link
                  to={`/regions/${topRegion.id}`}
                  className={classNames(buttonClasses("secondary"), "w-full justify-center text-[10px] py-1.5 bg-civic-surface")}
                >
                  Detail {topRegion.name} (Top Prioritas) →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Visual: Score Bar Chart ─────────────────────────────────────── */}
      <section
        id="score-chart"
        className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Visualisasi Skor
            </p>
            <h2 className="mt-1 text-base font-semibold text-civic-ink">
              Perbandingan Priority Score: Semua Wilayah
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-civic-muted">
            <span className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-priority-high" />Tinggi (≥75)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-priority-medium" />Sedang (50–74)</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-priority-low" />Rendah (&lt;50)</span>
          </div>
        </div>
        <ScoreBarChart regions={ranked} />

        {/* Indikator bobot */}
        <div className="mt-5 border-t border-civic-line pt-4">
          <p className="mb-2 text-xs font-semibold text-civic-muted">
            Bobot Indikator (Mode: General Priority)
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {(
              [
                ["Risiko Banjir/Rob", "25%"],
                ["Kerentanan Sosial", "20%"],
                ["Kepadatan Penduduk", "15%"],
                ["Akses Layanan Publik*", "15%"],
                ["Laporan & Masukan Warga", "15%"],
                ["Aktivitas UMKM", "10%"],
              ] as [string, string][]
            ).map(([name, pct]) => (
              <span key={name} className="text-xs text-civic-muted">
                <span className="font-semibold text-civic-ink">{name}</span> {pct}
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-civic-muted/70">
            * Akses Layanan Publik dan Aktivitas UMKM dibalik logikanya: nilai rendah = prioritas intervensi lebih tinggi.
          </p>
        </div>
      </section>

      {/* ── Regional Trend Intelligence ───────────────────────────────── */}
      <section
        id="regional-trend-intelligence"
        className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm space-y-8 animate-fadeIn"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Trend & Accountability Analytics
            </p>
            <h2 className="mt-1 text-lg font-bold text-civic-ink">
              Regional Trend Intelligence
            </h2>
            <p className="text-xs text-civic-muted mt-1">
              Visualisasi perkembangan kondisi wilayah dan akuntabilitas penanganan laporan warga (periode 2022–2026). Data menggunakan <span className="font-semibold text-civic-ink">data simulasi historis untuk proof of concept</span> dan bukan data resmi final.
            </p>
          </div>
          <span className="shrink-0 bg-civic-soft/50 text-civic-ink border border-civic-line px-3 py-1 rounded text-[11px] font-semibold">
            Bahan Rapat Kebijakan
          </span>
        </div>

        {/* Top Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Rerata Priority Score */}
          <div className="rounded-xl border border-civic-line bg-civic-panel/60 p-5 flex items-center justify-between hover:shadow-sm transition">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-civic-muted block">Rata-rata Priority Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-civic-ink tabular-nums">
                  {cityPriorityScoreTrend[cityPriorityScoreTrend.length - 1].value}
                </span>
                <span className="text-xs text-civic-muted">/100</span>
              </div>
              <span className="text-[10px] text-civic-muted block">Prioritas intervensi kota</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MiniBarChart data={cityPriorityScoreTrend} color="#A33A2C" />
              <span className="text-[9px] text-civic-muted font-semibold font-mono">2022-2026</span>
            </div>
          </div>

          {/* Card 2: Ekonomi Wilayah Meningkat */}
          <div className="rounded-xl border border-civic-line bg-civic-panel/60 p-5 flex items-center justify-between hover:shadow-sm transition">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-civic-muted block">Ekonomi Meningkat</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-civic-ink truncate max-w-[130px] block" title={topSmeImproving.regionName}>
                  {topSmeImproving.regionName}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1 py-0.5">
                  +{topSmeImproving.delta}
                </span>
              </div>
              <span className="text-[10px] text-civic-muted block">Aktivitas UMKM (2024-2026)</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MiniBarChart
                data={getRegionTrend(topSmeImproving.regionId).map(d => ({ year: d.year, value: d.smeActivity }))}
                color="#3F7D5D"
              />
              <span className="text-[9px] text-civic-muted font-semibold font-mono">2022-2026</span>
            </div>
          </div>

          {/* Card 3: Tekanan Kritik/Keluhan Tertinggi */}
          <div className="rounded-xl border border-civic-line bg-civic-panel/60 p-5 flex items-center justify-between hover:shadow-sm transition">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-civic-muted block">Keluhan Naik</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-civic-ink truncate max-w-[130px] block" title={topComplaintIncreasing.regionName}>
                  {topComplaintIncreasing.regionName}
                </span>
                <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-100 rounded px-1 py-0.5">
                  +{topComplaintIncreasing.delta}
                </span>
              </div>
              <span className="text-[10px] text-civic-muted block">Aduan warga (2024-2026)</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MiniBarChart
                data={getRegionTrend(topComplaintIncreasing.regionId).map(d => ({ year: d.year, value: d.citizenComplaint }))}
                color="#A33A2C"
              />
              <span className="text-[9px] text-civic-muted font-semibold font-mono">2022-2026</span>
            </div>
          </div>

          {/* Card 4: Tingkat Selesai Tervalidasi */}
          <div className="rounded-xl border border-civic-line bg-civic-panel/60 p-5 flex items-center justify-between hover:shadow-sm transition">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-civic-muted block">Selesai Tervalidasi</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-civic-ink tabular-nums">
                  {avgResolution2026}%
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1 py-0.5">
                  +{deltaAvgResolution}%
                </span>
              </div>
              <span className="text-[10px] text-civic-muted block">Rerata penyelesaian OPD kota</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <MiniBarChart
                data={years.map(y => {
                  const m = mockHistoricalMetrics.filter(metric => metric.year === y);
                  return { year: y, value: Math.round(m.reduce((sum, metric) => sum + metric.validatedResolutionRate, 0) / m.length) };
                })}
                color="#2F756E"
              />
              <span className="text-[9px] text-civic-muted font-semibold font-mono">2022-2026</span>
            </div>
          </div>
        </div>

        {/* Upgraded Layout: 3 Columns Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Column 1: Akuntabilitas & Rapat (Ring progress + Highlights) */}
          <div className="space-y-6 flex flex-col justify-between h-full">
            {/* Card: Resolution Completion Level (Ring Progress Chart) */}
            <div className="rounded-xl border border-civic-line p-5 bg-civic-panel/30 flex flex-col items-center justify-center text-center space-y-4 flex-1">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-civic-ink">Resolution Completion Level</h3>
                <p className="text-[11px] text-civic-muted mt-1">Rasio aduan tervalidasi selesai dari Completion Report tahun 2026.</p>
              </div>
              <div className="py-2">
                <RingProgressChart
                  percentage={avgResolution2026}
                  label="Tingkat Akuntabilitas Kota"
                  subLabel="Tervalidasi"
                  size={120}
                  color="#2F756E"
                />
              </div>
              <p className="text-[10.5px] text-civic-muted leading-relaxed">
                Tingkat akuntabilitas tindak lanjut meningkat sebesar <strong className="text-civic-ink">+{deltaAvgResolution}%</strong> sejak tahun 2024 (perubahan periode). Evaluasi memerlukan validasi langsung Inspektorat Kota.
              </p>
            </div>

            {/* Card: Bahan Rapat Kebijakan */}
            <div className="rounded-xl border border-civic-primary/20 bg-civic-primary/5 p-5 space-y-3 flex-1">
              <h3 className="text-xs font-bold text-civic-primary uppercase tracking-wider flex items-center gap-1.5 border-b border-civic-primary/10 pb-2">
                <Presentation size={14} className="text-civic-primary" /> Bahan Rapat Kebijakan
              </h3>
              <ul className="space-y-3">
                <li className="text-[11px] text-civic-ink leading-relaxed flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-civic-brick" />
                  <span>Aktivitas UMKM Genuk meningkat 7 poin sejak 2024 (perubahan periode), tetapi keluhan kemacetan masih tinggi dan perlu validasi OPD.</span>
                </li>
                <li className="text-[11px] text-civic-ink leading-relaxed flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-civic-brick" />
                  <span>Semarang Utara masih memiliki tekanan banjir/rob tertinggi (tren indikatif) dan perlu validasi lapangan oleh dinas terkait.</span>
                </li>
                <li className="text-[11px] text-civic-ink leading-relaxed flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-civic-primary" />
                  <span>Wilayah dengan apresiasi meningkat dapat menjadi pembanding praktik baik untuk koordinasi program dinas.</span>
                </li>
                <li className="text-[11px] text-civic-ink leading-relaxed flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-civic-primary" />
                  <span>Tingkat akuntabilitas tindak lanjut secara agregat menunjukkan peningkatan, namun memerlukan validasi OPD lebih lanjut.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Analisis Spasial & Tren Prioritas */}
          <div className="space-y-6">
            {/* Chart: Line Chart - Priority Score */}
            <div className="rounded-xl border border-civic-line p-5 bg-civic-panel/30 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-civic-ink">Tren Rata-rata Priority Score Kota</h3>
                <p className="text-[11px] text-civic-muted mt-0.5">Representasi tahunan. Priority Score tinggi = prioritas intervensi tinggi.</p>
              </div>
              <div className="h-44 flex items-center justify-center bg-civic-surface/80 rounded-lg p-3 border border-civic-line/40">
                <LineTrendChart data={cityPriorityScoreTrend} color="brick" minY={0} maxY={100} />
              </div>
            </div>

            {/* Chart: Bar Chart - Aktivitas UMKM */}
            <div className="rounded-xl border border-civic-line p-5 bg-civic-panel/30 space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-civic-ink">Perbandingan Aktivitas UMKM (Tahun 2026)</h3>
                <p className="text-[11px] text-civic-muted mt-0.5">UMKM tinggi ditampilkan sebagai kondisi ekonomi baik (bukan bahaya/risiko).</p>
              </div>
              <div className="bg-civic-surface/80 rounded-lg p-3 border border-civic-line/40">
                <BarComparisonChart data={regionsSme2026} color="moss" maxValue={100} />
              </div>
            </div>
          </div>

          {/* Column 3: Partisipasi Publik & Komposisi Kritik */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* Chart: Stacked Bar Chart - Feedback Composition */}
            <div className="rounded-xl border border-civic-line p-5 bg-civic-panel/30 space-y-4 flex-1">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-civic-ink">Komposisi Masukan & Keluhan Warga (2026)</h3>
                <p className="text-[11px] text-civic-muted mt-0.5">Keluhan/Kritik = tekanan publik. Saran = aspirasi. Apresiasi = sinyal positif.</p>
              </div>
              <div className="bg-civic-surface/80 rounded-lg p-3 border border-civic-line/40">
                <StackedFeedbackChart data={feedbackComposition2026} />
              </div>
            </div>

            {/* Explanatory Context Footer Card */}
            <div className="rounded-xl border border-civic-line p-5 bg-civic-panel/20 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-civic-ink uppercase">Interpretasi Indikator Tren</h4>
                <p className="text-[11px] text-civic-muted leading-relaxed mt-1">
                  Seluruh tren diolah secara agregat dari data sektoral daerah. Analisis ini bersifat indikatif dan tidak menggambarkan prediksi pasti, melainkan dirancang sebagai pemetaan prioritas untuk penentuan alokasi program lintas OPD.
                </p>
              </div>
              <div className="rounded border border-amber-200 bg-amber-50/50 p-2.5 text-[9.5px] text-amber-800 leading-normal flex items-start gap-1.5">
                <Info size={12} className="shrink-0 mt-0.5 text-amber-700" />
                <span>
                  <strong>Disclaimer:</strong> Grafik ini menggunakan data simulasi historis untuk proof of concept. Hasil analisis perlu dikonfirmasikan ulang kepada OPD pelaksana.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Region Card List ───────────────────────────────────────────── */}
      <section id="region-ranking">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Ranking Wilayah
            </p>
            <h2 className="mt-1 text-base font-semibold text-civic-ink">
              {ranked.length} kecamatan diurutkan berdasarkan Priority Score
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge level="high" />
            <PriorityBadge level="medium" />
            <PriorityBadge level="low" />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {ranked.map((region, i) => (
            <RegionCard key={region.id} region={region} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* ── Policy Simulation Snapshot ─────────────────────────────────── */}
      <section id="policy-simulation-snapshot" className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
            Policy Simulation Snapshot
          </p>
          <h2 className="mt-1 text-base font-semibold text-civic-ink">
            Preview Simulasi Perubahan Fokus Kebijakan
          </h2>
          <p className="text-xs text-civic-muted">
            Ranking wilayah dapat berubah secara dinamis sesuai dengan kebijakan yang diambil.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {(["flood", "publicService", "economy"] as const).map(mode => {
            const simulatedRanked = getRankedRegions(mockRegions, mode);
            const topSim = simulatedRanked[0];
            const modeConfig = getPolicyModeConfig(mode);
            const Icon = mode === "flood" ? Waves : mode === "publicService" ? Hospital : Store;
            return (
              <div key={mode} className="rounded-xl border border-civic-line p-4 bg-civic-soft/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={20} className="text-civic-ink" />
                    <h3 className="font-bold text-civic-ink text-sm">{modeConfig.label}</h3>
                  </div>
                  <p className="text-xs text-civic-muted mb-4 line-clamp-2">{modeConfig.description}</p>
                  
                  <div className="bg-white rounded-lg p-3 border border-civic-line shadow-sm mb-4">
                    <p className="text-[10px] font-bold uppercase text-civic-muted mb-1">Top Prioritas Simulasi</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-civic-ink">{topSim.name}</span>
                      <span className="text-lg font-bold text-red-600">{topSim.computedScore}</span>
                    </div>
                    <p className="text-xs text-civic-muted mt-1 line-clamp-1">{topSim.dominantIssues[0]}</p>
                  </div>
                </div>
                <Link
                  to={`/simulator?mode=${mode}`}
                  className={classNames(buttonClasses("secondary"), "w-full justify-center text-[10px] py-1.5 bg-civic-surface")}
                >
                  Buka Simulator {modeConfig.label} →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Disaster Signal Monitor ────────────────────────────────────────── */}
      <section
        id="disaster-signal-monitor"
        className="rounded-xl border border-red-200 bg-civic-surface p-6 shadow-sm mb-8"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600">
              Disaster Signal Monitor
            </p>
            <h2 className="mt-1 text-base font-semibold text-civic-ink">
              Ranking Emergency Review (Simulasi Proof of Concept)
            </h2>
          </div>
        </div>
        
        <div className="space-y-4">
          {[...ranked]
            .sort((a, b) => b.emergencySignals.emergencyReviewScore - a.emergencySignals.emergencyReviewScore)
            .map((r, i) => (
            <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-red-100 bg-red-50/30 p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-civic-ink">{r.name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-civic-muted">
                    <span>
                      Status: <strong className={classNames("font-bold", r.emergencySignals.emergencyReviewScore >= 60 ? "text-red-600" : "text-amber-600")}>{r.emergencySignals.emergencyStatus}</strong>
                    </span>
                    <span>•</span>
                    <span>Skor: <strong>{r.emergencySignals.emergencyReviewScore}</strong>/100</span>
                    <span>•</span>
                    <span>Water Level: <strong>{r.emergencySignals.waterLevelStatus}</strong></span>
                  </div>
                </div>
              </div>
              <div className="sm:w-1/3 sm:text-right">
                <p className="text-xs font-semibold text-civic-muted">Rekomendasi Cepat</p>
                <p className="mt-0.5 text-xs text-civic-ink leading-relaxed">{r.emergencySignals.recommendedAction}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 flex items-start gap-1.5">
          <TriangleAlert size={16} className="shrink-0" />
          <span><strong>Catatan Simulasi:</strong> Emergency Review Signal adalah data simulasi prototype. Pada skenario riil, skor ini terhubung dengan sensor IoT tata air dan pelaporan BPBD untuk memandu inspeksi darurat.</span>
        </div>
      </section>

      {/* ── Rekomendasi Umum ───────────────────────────────────────────── */}
      <section
        id="general-recommendations"
        className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
          Rekomendasi Umum Kota
        </p>
        <h2 className="mt-1 mb-4 text-base font-semibold text-civic-ink">
          Langkah strategis lintas kecamatan
        </h2>
        <ol className="space-y-3">
          {citySummary.generalRecommendations.map((rec, i) => (
            <li key={rec} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-civic-primary text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-civic-ink">{rec}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Resolution Accountability ──────────────────────────────────── */}
      {(() => {
        const rs = getResolutionStats();
        return (
          <section
            id="resolution-accountability"
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
                  Resolution Accountability
                </p>
                <h2 className="mt-1 text-base font-semibold text-civic-ink">
                  Akuntabilitas Tindak Lanjut
                </h2>
              </div>
              <span className="text-[10px] text-civic-muted bg-civic-soft px-2 py-1 rounded border border-civic-line">Data Simulasi</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="rounded border border-civic-line bg-civic-soft/50 p-3 text-center">
                <p className="text-2xl font-bold text-civic-ink">{rs.total}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Total Laporan</p>
              </div>
              <div className="rounded border border-green-200 bg-green-50 p-3 text-center">
                <p className="text-2xl font-bold text-green-700">{rs.validated}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Tervalidasi</p>
              </div>
              <div className="rounded border border-blue-200 bg-blue-50 p-3 text-center">
                <p className="text-2xl font-bold text-blue-700">{rs.pendingValidation}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Menunggu</p>
              </div>
              <div className="rounded border border-amber-200 bg-amber-50 p-3 text-center">
                <p className="text-2xl font-bold text-amber-700">{rs.needsRevision}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Perlu Revisi</p>
              </div>
              <div className="rounded border border-civic-line bg-civic-soft/50 p-3 text-center">
                <p className="text-2xl font-bold text-civic-ink">{rs.averageResolutionDays}<span className="text-sm"> hari</span></p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Rata-rata</p>
              </div>
              <div className="rounded border border-civic-primary/20 bg-civic-primary/5 p-3 text-center">
                <p className="text-2xl font-bold text-civic-primary">{rs.resolutionRate}%</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Resolution Rate</p>
              </div>
            </div>
            <p className="text-[10px] text-civic-muted mt-3">Laporan penyelesaian merupakan simulasi prototype. Validasi dilakukan oleh petugas/OPD.</p>
          </section>
        );
      })()}

      {/* ── Data Notice ────────────────────────────────────────────────── */}
      <aside
        id="data-notice"
        className="rounded-xl border border-civic-line bg-civic-soft px-6 py-4"
      >
        <div className="flex items-start gap-3">
          <Info size={24} className="text-civic-muted shrink-0" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-muted">
              Catatan Data
            </p>
            <p className="mt-1 text-sm leading-relaxed text-civic-muted">
              Prototype ini menggunakan{" "}
              <strong className="font-semibold text-civic-ink">kombinasi data publik, data olahan, dan simulasi terbatas</strong>{" "}
              untuk keperluan proof of concept. Lihat halaman{" "}
              <a href="/methodology#source-log" className="font-semibold text-civic-primary hover:underline">Metodologi</a>{" "}
              untuk detail status setiap data.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}



