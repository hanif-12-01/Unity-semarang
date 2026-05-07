import { Link } from "react-router-dom";
import IndicatorBar from "../components/ui/IndicatorBar";
import PageHeader from "../components/ui/PageHeader";
import PriorityBadge from "../components/ui/PriorityBadge";
import { buttonClasses } from "../components/ui/Button";
import { citySummary, mockRegions } from "../data/mockData";
import { getRankedRegions, getCityScoringStats, INDICATOR_LABELS } from "../utils";
import { classNames } from "../utils/classNames";
import type { PriorityCategory } from "../data/mockData";
import type { ScoredRegion } from "../utils";

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
      "group rounded-xl border bg-white shadow-sm transition hover:shadow-md",
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
              inverted={d.key === "publicServiceAccess"}
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

  const summaryCards = [
    {
      id: "stat-total",
      label: "Total Wilayah",
      value: stats.total.toString(),
      sub: "dalam prototype",
      icon: "🏘️",
      accent: "border-civic-line",
    },
    {
      id: "stat-high",
      label: "Prioritas Tinggi",
      value: stats.highPriority.toString(),
      sub: "butuh intervensi segera",
      icon: "🔴",
      accent: "border-red-200 bg-red-50/40",
    },
    {
      id: "stat-avg",
      label: "Rata-rata Skor",
      value: stats.averageScore.toString(),
      sub: "dari skala 0–100",
      icon: "📊",
      accent: "border-civic-line",
    },
    {
      id: "stat-top",
      label: "Wilayah Teratas",
      value: stats.topRegion,
      sub: `skor ${stats.topScore} — prioritas tertinggi`,
      icon: "⚠️",
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
          description="Memantau prioritas wilayah berdasarkan indikator sosial, ekonomi, lingkungan, layanan publik, dan laporan warga."
        />
        <Link
          to="/simulator"
          className={classNames(buttonClasses("secondary"), "shrink-0 text-sm")}
          id="goto-simulator"
        >
          🎛️ Buka Policy Simulator
        </Link>
      </div>

      {/* ── Summary Cards ──────────────────────────────────────────────── */}
      <section id="summary-cards" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((c) => (
          <article
            key={c.id}
            id={c.id}
            className={classNames(
              "rounded-xl border bg-white p-5 shadow-sm",
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

      {/* ── Isu Dominan Kota ───────────────────────────────────────────── */}
      <section
        id="city-issues"
        className="rounded-xl border border-civic-line bg-white p-5 shadow-sm"
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

      {/* ── Visual: Score Bar Chart ─────────────────────────────────────── */}
      <section
        id="score-chart"
        className="rounded-xl border border-civic-line bg-white p-6 shadow-sm"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Visualisasi Skor
            </p>
            <h2 className="mt-1 text-base font-semibold text-civic-ink">
              Perbandingan Priority Score — Semua Wilayah
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
                ["Laporan Warga", "15%"],
                ["Aktivitas UMKM", "10%"],
              ] as [string, string][]
            ).map(([name, pct]) => (
              <span key={name} className="text-xs text-civic-muted">
                <span className="font-semibold text-civic-ink">{name}</span> {pct}
              </span>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-civic-muted/70">
            * Akses Layanan Publik dibalik logikanya — nilai rendah = prioritas tinggi
          </p>
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

      {/* ── Rekomendasi Umum ───────────────────────────────────────────── */}
      <section
        id="general-recommendations"
        className="rounded-xl border border-civic-line bg-white p-6 shadow-sm"
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

      {/* ── Data Notice ────────────────────────────────────────────────── */}
      <aside
        id="data-notice"
        className="rounded-xl border border-civic-line bg-civic-soft px-6 py-4"
      >
        <div className="flex items-start gap-3">
          <span className="text-lg">ℹ️</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-muted">
              Catatan Data
            </p>
            <p className="mt-1 text-sm leading-relaxed text-civic-muted">
              Data yang digunakan pada prototype ini merupakan{" "}
              <strong className="font-semibold text-civic-ink">data simulasi</strong>{" "}
              untuk kebutuhan demonstrasi awal. Pada implementasi nyata, data
              dapat diintegrasikan dengan sumber resmi pemerintah daerah dan
              portal data publik.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
