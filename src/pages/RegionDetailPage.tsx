import { Link, useParams, useNavigate } from "react-router-dom";
import { buttonClasses } from "../components/ui/Button";
import IndicatorBar from "../components/ui/IndicatorBar";
import CivicSenseInsightCard from "../components/ui/CivicSenseInsightCard";
import { getRegionById } from "../data/mockData";
import {
  scoreRegion,
  getDominantIndicators,
  INDICATOR_LABELS,
  generateRegionInsight,
} from "../utils";
import { classNames } from "../utils/classNames";
import type { PriorityCategory } from "../data/mockData";
import type { RegionIndicator } from "../data/mockData";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function categoryLevel(cat: PriorityCategory): "high" | "medium" | "low" {
  if (cat === "Tinggi") return "high";
  if (cat === "Sedang") return "medium";
  return "low";
}

const levelStyle = {
  high: {
    badge: "border-red-200 bg-red-50 text-red-700",
    ring: "ring-red-200",
    score: "text-priority-high",
    heroBg: "from-red-900 via-red-800 to-rose-900",
    dot: "bg-red-400",
    accent: "bg-priority-high",
  },
  medium: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    ring: "ring-amber-200",
    score: "text-priority-medium",
    heroBg: "from-amber-900 via-amber-800 to-orange-900",
    dot: "bg-amber-400",
    accent: "bg-priority-medium",
  },
  low: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    ring: "ring-emerald-200",
    score: "text-priority-low",
    heroBg: "from-emerald-900 via-teal-800 to-emerald-900",
    dot: "bg-emerald-400",
    accent: "bg-priority-low",
  },
};

const INVERTED_KEYS = new Set<keyof RegionIndicator>(["publicServiceAccess"]);

const INDICATOR_ORDER: (keyof RegionIndicator)[] = [
  "floodRisk",
  "populationDensity",
  "socialVulnerability",
  "publicServiceAccess",
  "citizenReports",
  "smeActivity",
];

const INDICATOR_ICONS: Record<keyof RegionIndicator, string> = {
  floodRisk: "🌊",
  populationDensity: "👥",
  socialVulnerability: "🤝",
  publicServiceAccess: "🏥",
  citizenReports: "📣",
  smeActivity: "🏪",
};

const INDICATOR_NOTE: Partial<Record<keyof RegionIndicator, string>> = {
  publicServiceAccess: "Nilai rendah = akses buruk = prioritas tinggi",
  smeActivity: "Nilai tinggi = ekonomi aktif",
  floodRisk: "Nilai tinggi = risiko besar",
};

// ─── Severity label for each indicator value ──────────────────────────────────

function severityOf(val: number, inverted: boolean) {
  const eff = inverted ? 100 - val : val;
  if (eff >= 80) return { label: "Kritis", cls: "text-priority-high font-semibold" };
  if (eff >= 60) return { label: "Tinggi", cls: "text-priority-medium font-semibold" };
  if (eff >= 40) return { label: "Sedang", cls: "text-civic-muted" };
  return { label: "Rendah", cls: "text-priority-low" };
}

// ─── Not Found Fallback ───────────────────────────────────────────────────────

function RegionNotFound({ regionId }: { regionId?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 rounded-2xl border border-civic-line bg-white p-12 text-center shadow-sm">
      <span className="text-5xl">🗺️</span>
      <div>
        <h2 className="text-xl font-bold text-civic-ink">Wilayah tidak ditemukan</h2>
        <p className="mt-2 text-sm text-civic-muted">
          ID wilayah{" "}
          {regionId && (
            <code className="rounded bg-civic-soft px-1.5 py-0.5 text-xs font-mono text-civic-ink">
              {regionId}
            </code>
          )}{" "}
          tidak ada dalam dataset prototype.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to="/dashboard" className={buttonClasses("primary")}>
          ← Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RegionDetailPage() {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();

  const raw = regionId ? getRegionById(regionId) : undefined;
  if (!raw) return <RegionNotFound regionId={regionId} />;

  const region = scoreRegion(raw, "general");
  const level = categoryLevel(region.computedCategory);
  const style = levelStyle[level];
  const dominant = getDominantIndicators(region.indicators, "general", 3);

  return (
    <div className="space-y-6 pb-12">

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-xs text-civic-muted" aria-label="Breadcrumb">
        <Link to="/dashboard" className="hover:text-civic-primary transition-colors">
          Dashboard Kota
        </Link>
        <span>/</span>
        <span className="font-medium text-civic-ink">{region.name}</span>
      </nav>

      {/* ── Hero Header ──────────────────────────────────────────────────── */}
      <header
        className={classNames(
          "relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white shadow-lg md:p-10",
          style.heroBg
        )}
      >
        {/* Decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white opacity-5 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-12 left-0 h-48 w-48 rounded-full bg-white opacity-5 blur-2xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left — meta */}
          <div className="space-y-3">
            {/* Badge kategori */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <span className={classNames("h-1.5 w-1.5 rounded-full", style.dot)} />
              {region.computedCategory === "Tinggi"
                ? "Prioritas Tinggi — Butuh intervensi segera"
                : region.computedCategory === "Sedang"
                ? "Prioritas Sedang — Perlu perhatian"
                : "Prioritas Rendah — Kondisi relatif baik"}
            </span>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {region.name}
            </h1>

            <p className="max-w-lg text-sm leading-relaxed text-white/70">
              {region.description}
            </p>

            {/* Dominant indicators summary */}
            <div className="flex flex-wrap gap-2 pt-1">
              {dominant.map((d) => (
                <span
                  key={d.key}
                  className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                >
                  {INDICATOR_ICONS[d.key]} {d.label}: {d.value}{" "}
                  <span className="opacity-70">[{d.severity}]</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right — score */}
          <div className="shrink-0 rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Priority Score
            </p>
            <p className="mt-1 text-6xl font-bold tabular-nums leading-none">
              {region.computedScore}
            </p>
            <p className="mt-1 text-sm text-white/50">dari skala 100</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className={classNames("h-full rounded-full", style.accent)}
                style={{ width: `${region.computedScore}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-semibold text-white/80">
              {region.computedCategory === "Tinggi"
                ? "⚠️ Prioritas Tinggi"
                : region.computedCategory === "Sedang"
                ? "📋 Prioritas Sedang"
                : "✅ Prioritas Rendah"}
            </p>
          </div>
        </div>
      </header>

      {/* ── Main Grid ────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

        {/* ── Left Column ──────────────────────────────────────────────── */}
        <div className="space-y-6">

          {/* Indicator Panel */}
          <section
            id="indicator-panel"
            className="rounded-xl border border-civic-line bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Panel Indikator
            </p>
            <h2 className="mt-1 mb-5 text-base font-semibold text-civic-ink">
              6 Indikator Kunci Wilayah
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {INDICATOR_ORDER.map((key) => {
                const val = region.indicators[key];
                const inverted = INVERTED_KEYS.has(key);
                const sev = severityOf(val, inverted);
                const fill = inverted ? 100 - val : val;
                const barColor =
                  fill >= 75
                    ? "bg-priority-high"
                    : fill >= 50
                    ? "bg-priority-medium"
                    : "bg-priority-low";

                return (
                  <div
                    key={key}
                    className="rounded-lg border border-civic-line bg-civic-soft/50 p-4 space-y-3"
                  >
                    {/* Icon + label */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{INDICATOR_ICONS[key]}</span>
                        <span className="text-sm font-semibold text-civic-ink">
                          {INDICATOR_LABELS[key]}
                        </span>
                      </div>
                      <span className={classNames("text-xs", sev.cls)}>
                        {sev.label}
                      </span>
                    </div>

                    {/* Numeric display */}
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold tabular-nums text-civic-ink">
                        {val}
                      </span>
                      <span className="mb-1 text-xs text-civic-muted">/ 100</span>
                    </div>

                    {/* Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-civic-line">
                      <div
                        className={classNames(
                          "h-full rounded-full transition-all duration-700",
                          barColor
                        )}
                        style={{ width: `${fill}%` }}
                      />
                    </div>

                    {/* Note */}
                    {INDICATOR_NOTE[key] && (
                      <p className="text-xs text-civic-muted/70 italic">
                        {INDICATOR_NOTE[key]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── CivicSense AI Insight ─────────────────────────────────────── */}
          <section id="civicsense-insight">
            <CivicSenseInsightCard
              getInsight={() => generateRegionInsight(raw, "general")}
              triggerLabel="Explain Priority with CivicSense AI"
            />
          </section>

          {/* Dominant Issues */}
          <section
            id="dominant-issues"
            className="rounded-xl border border-civic-line bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Masalah Dominan
            </p>
            <h2 className="mt-1 mb-4 text-base font-semibold text-civic-ink">
              Isu utama yang perlu ditangani
            </h2>
            <ol className="space-y-3">
              {region.dominantIssues.map((issue, i) => (
                <li key={issue} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-civic-ink text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-civic-ink">{issue}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Policy Recommendations */}
          <section
            id="policy-recommendations"
            className="rounded-xl border border-civic-line bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Rekomendasi Kebijakan
            </p>
            <h2 className="mt-1 mb-4 text-base font-semibold text-civic-ink">
              Langkah intervensi yang disarankan
            </h2>
            <ul className="space-y-3">
              {region.policyRecommendations.map((rec, i) => (
                <li
                  key={rec}
                  className="flex items-start gap-3 rounded-lg border border-civic-line bg-civic-soft/60 px-4 py-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-civic-primary text-xs font-bold text-white mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-civic-ink">{rec}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Estimated Impact */}
          <section
            id="estimated-impact"
            className="rounded-xl border border-civic-primary/20 bg-civic-primary/5 p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Estimasi Dampak Intervensi
            </p>
            <p className="mt-3 text-sm leading-relaxed text-civic-ink">
              {region.estimatedImpact}
            </p>
          </section>
        </div>

        {/* ── Right Sidebar ─────────────────────────────────────────────── */}
        <aside className="space-y-5">

          {/* Action Buttons */}
          <div
            id="action-buttons"
            className="rounded-xl border border-civic-line bg-white p-5 shadow-sm space-y-3"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Tindak Lanjut
            </p>

            <Link
              id="btn-policy-brief"
              to={`/policy-brief?region=${region.id}`}
              className={classNames(
                buttonClasses("primary"),
                "w-full justify-center gap-2"
              )}
            >
              📋 Generate Policy Brief
            </Link>

            <Link
              id="btn-simulator"
              to={`/simulator?region=${region.id}`}
              className={classNames(
                buttonClasses("secondary"),
                "w-full justify-center gap-2"
              )}
            >
              🎛️ Buka Policy Simulator
            </Link>

            <button
              id="btn-back-dashboard"
              onClick={() => navigate("/dashboard")}
              className={classNames(
                buttonClasses("secondary"),
                "w-full justify-center gap-2"
              )}
            >
              ← Kembali ke Dashboard
            </button>
          </div>

          {/* Quick Score Breakdown */}
          <div className="rounded-xl border border-civic-line bg-white p-5 shadow-sm space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Ringkasan Indikator
            </p>
            <div className="space-y-3">
              {INDICATOR_ORDER.map((key) => (
                <IndicatorBar
                  key={key}
                  label={INDICATOR_LABELS[key]}
                  value={region.indicators[key]}
                  inverted={INVERTED_KEYS.has(key)}
                  colorClass="auto"
                />
              ))}
            </div>
            <p className="text-xs text-civic-muted/70 italic pt-1">
              Bar panjang = kebutuhan intervensi tinggi
            </p>
          </div>

          {/* Stakeholders */}
          <div
            id="stakeholders"
            className="rounded-xl border border-civic-line bg-white p-5 shadow-sm space-y-3"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Stakeholder Terkait
            </p>
            <p className="text-xs text-civic-muted">
              Dinas/lembaga yang perlu dilibatkan dalam intervensi wilayah ini
            </p>
            <div className="flex flex-wrap gap-2">
              {region.relatedStakeholders.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-civic-line bg-civic-soft px-3 py-1.5 text-xs font-medium text-civic-ink"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* All Regions Quick Nav */}
          <div className="rounded-xl border border-civic-line bg-white p-5 shadow-sm space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Wilayah Lainnya
            </p>
            <p className="text-xs text-civic-muted">Navigasi cepat ke detail wilayah lain</p>
            <div className="space-y-1.5">
              {(["genuk", "semarang-utara", "tugu", "pedurungan", "banyumanik", "semarang-tengah"] as const)
                .filter((id) => id !== region.id)
                .map((id) => {
                  const r = getRegionById(id);
                  if (!r) return null;
                  const scored = scoreRegion(r);
                  const lv = categoryLevel(scored.computedCategory);
                  const dotColor = lv === "high" ? "bg-priority-high" : lv === "medium" ? "bg-priority-medium" : "bg-priority-low";
                  return (
                    <Link
                      key={id}
                      to={`/regions/${id}`}
                      className="flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm text-civic-ink transition hover:border-civic-line hover:bg-civic-soft"
                    >
                      <span className="flex items-center gap-2">
                        <span className={classNames("h-2 w-2 rounded-full shrink-0", dotColor)} />
                        {r.name}
                      </span>
                      <span className="font-bold tabular-nums text-civic-muted text-xs">
                        {scored.computedScore}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Data Note */}
          <aside
            id="data-note"
            className="rounded-xl border border-civic-line bg-civic-soft p-4 text-xs leading-relaxed text-civic-muted"
          >
            <p className="font-semibold text-civic-ink mb-1">ℹ️ Catatan Data</p>
            <p>{region.dataSourceNote}</p>
          </aside>
        </aside>
      </div>
    </div>
  );
}
