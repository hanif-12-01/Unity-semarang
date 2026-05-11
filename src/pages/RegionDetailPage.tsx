import { Link, useParams, useNavigate } from "react-router-dom";
import { Waves, UsersRound, Users, Hospital, MessageSquareWarning, Store, MapPinned, TriangleAlert, ClipboardList, CheckCircle2, Tag, FileText, SlidersHorizontal, Info, Map } from "lucide-react";
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
import { getHotspotsByRegion, getReportsByRegion, getFeedbackToneSummaryByRegion, getFeedbackBadge } from "../data/citizenReports";
import { getCompletionReportsByRegion, getResolutionStatsByRegion, getValidationBadge, COMPLETION_REPORT_DISCLAIMER } from "../data/completionReports";

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

// Both publicServiceAccess and smeActivity use inverted logic:
// high raw value = good condition → low intervention need
const INVERTED_KEYS = new Set<keyof RegionIndicator>(["publicServiceAccess", "smeActivity"]);

const INDICATOR_ORDER: (keyof RegionIndicator)[] = [
  "floodRisk",
  "populationDensity",
  "socialVulnerability",
  "publicServiceAccess",
  "citizenReports",
  "smeActivity",
];

const INDICATOR_ICONS: Record<keyof RegionIndicator, React.ReactNode> = {
  floodRisk: <Waves size={18} />,
  populationDensity: <UsersRound size={18} />,
  socialVulnerability: <Users size={18} />,
  publicServiceAccess: <Hospital size={18} />,
  citizenReports: <MessageSquareWarning size={18} />,
  smeActivity: <Store size={18} />,
};

const INDICATOR_NOTE: Partial<Record<keyof RegionIndicator, string>> = {
  publicServiceAccess: "Nilai tinggi = akses baik; nilai rendah = prioritas intervensi tinggi",
  smeActivity: "Nilai tinggi = ekonomi aktif; nilai rendah = prioritas intervensi ekonomi tinggi",
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 rounded-2xl border border-civic-line bg-civic-surface p-12 text-center shadow-sm">
      <Map size={48} className="text-civic-muted" />
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
  
  const hotspots = getHotspotsByRegion(region.id);
  const recentReports = getReportsByRegion(region.id).slice(0, 5);
  const toneSummary = getFeedbackToneSummaryByRegion(region.id);
  const completionReports = getCompletionReportsByRegion(region.id);
  const resolutionStats = getResolutionStatsByRegion(region.id);

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
                ? "Prioritas Tinggi, Butuh intervensi segera"
                : region.computedCategory === "Sedang"
                ? "Prioritas Sedang, Perlu perhatian"
                : "Prioritas Rendah, Kondisi relatif baik"}
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
            <p className="mt-2 text-xs font-semibold text-white/80 flex items-center justify-center gap-1.5">
              {region.computedCategory === "Tinggi"
                ? <><TriangleAlert size={14} /> Prioritas Tinggi</>
                : region.computedCategory === "Sedang"
                ? <><ClipboardList size={14} /> Prioritas Sedang</>
                : <><CheckCircle2 size={14} /> Prioritas Rendah</>}
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
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
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
                const effectiveVal = inverted ? 100 - val : val;
                const sev = severityOf(val, inverted);
                const barColor =
                  effectiveVal >= 75
                    ? "bg-priority-high"
                    : effectiveVal >= 50
                    ? "bg-priority-medium"
                    : "bg-priority-low";

                return (
                  <div
                    key={key}
                    className={classNames(
                      "rounded-lg border p-4 space-y-3",
                      inverted
                        ? "border-indigo-200 bg-indigo-50/30"
                        : "border-civic-line bg-civic-soft/50"
                    )}
                  >
                    {/* Icon + label row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-civic-ink flex items-center">{INDICATOR_ICONS[key]}</span>
                        <span className="text-sm font-semibold text-civic-ink">
                          {INDICATOR_LABELS[key]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {inverted && (
                          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700">
                            Inversi
                          </span>
                        )}
                        <span className={classNames("text-xs", sev.cls)}>
                          {sev.label}
                        </span>
                      </div>
                    </div>

                    {/* Numeric display — always shows raw value */}
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold tabular-nums text-civic-ink">
                        {val}
                      </span>
                      <span className="mb-1 text-xs text-civic-muted">/ 100</span>
                      {inverted && (
                        <span className="mb-1 text-xs text-indigo-600 font-medium">
                          (efektif: {effectiveVal})
                        </span>
                      )}
                    </div>

                    {/* Bar — based on effectiveVal */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-civic-line">
                      <div
                        className={classNames(
                          "h-full rounded-full transition-all duration-700",
                          barColor
                        )}
                        style={{ width: `${effectiveVal}%` }}
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

            {/* Panel footer — inversion explanation */}
            <div className="mt-2 rounded-lg border border-indigo-200 bg-indigo-50/50 px-4 py-3">
              <p className="text-xs text-indigo-700 leading-relaxed">
                <span className="font-semibold">Catatan:</span> Untuk{" "}
                <span className="font-semibold">Akses Layanan Publik</span> dan{" "}
                <span className="font-semibold">Aktivitas UMKM</span>, nilai tinggi menunjukkan kondisi lebih baik sehingga prioritas intervensi lebih rendah.
                Bar dan label status mencerminkan nilai efektif setelah inversi.
              </p>
            </div>
          </section>

          {/* ── Emergency Review Signal ────────────────────────────────────────── */}
          <section id="emergency-review" className="rounded-xl border border-red-200 bg-red-50/20 p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Disaster & Emergency
                </p>
                <h2 className="mt-1 mb-1 text-base font-semibold text-civic-ink">
                  Emergency Review Signal
                </h2>
                <p className="mb-5 text-sm text-civic-muted">
                  Simulasi peringatan dini bencana. Tidak terintegrasi API riil.
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-civic-muted">Score / Status</p>
                <p className="text-2xl font-bold text-red-600 tabular-nums">
                  {region.emergencySignals.emergencyReviewScore} <span className="text-sm font-normal text-civic-muted">/100</span>
                </p>
                <p className="text-xs font-semibold text-red-700 bg-red-100 rounded px-2 py-0.5 mt-1 inline-block">
                  {region.emergencySignals.emergencyStatus}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              <div className="rounded-lg bg-civic-surface p-3 border border-red-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-civic-muted">Water Level</p>
                <p className="text-sm font-semibold text-civic-ink mt-0.5">{region.emergencySignals.waterLevelStatus}</p>
              </div>
              <div className="rounded-lg bg-civic-surface p-3 border border-red-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-civic-muted">Verified Reports</p>
                <p className="text-sm font-semibold text-civic-ink mt-0.5">{region.emergencySignals.verifiedReports}</p>
              </div>
              <div className="rounded-lg bg-civic-surface p-3 border border-red-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-civic-muted">Hist. Risk</p>
                <p className="text-sm font-semibold text-civic-ink mt-0.5">{region.emergencySignals.historicalDisasterRisk}</p>
              </div>
              <div className="rounded-lg bg-civic-surface p-3 border border-red-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-civic-muted">Pop. Exposure</p>
                <p className="text-sm font-semibold text-civic-ink mt-0.5">{region.emergencySignals.populationExposure}</p>
              </div>
              <div className="rounded-lg bg-civic-surface p-3 border border-red-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-civic-muted">Critical Fac.</p>
                <p className="text-sm font-semibold text-civic-ink mt-0.5">{region.emergencySignals.criticalFacilitiesExposure}</p>
              </div>
              <div className="rounded-lg bg-civic-surface p-3 border border-red-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-civic-muted">Social Vuln.</p>
                <p className="text-sm font-semibold text-civic-ink mt-0.5">{region.emergencySignals.socialVulnerability}</p>
              </div>
            </div>

            <div className="rounded-lg bg-red-50 border border-red-100 p-4">
              <p className="text-xs font-bold text-red-800">Rekomendasi Aksi Cepat</p>
              <p className="mt-1 text-sm text-red-900">{region.emergencySignals.recommendedAction}</p>
            </div>
          </section>

          {/* ── CivicSense AI Insight ─────────────────────────────────────── */}
          <section id="civicsense-insight">
            <CivicSenseInsightCard
              getInsight={() => generateRegionInsight(raw, "general")}
              triggerLabel="Draft Priority Explanation with CivicSense AI"
            />
          </section>

          {/* ── Issue Hotspots ───────────────────────────────────────────── */}
          <section
            id="issue-hotspots"
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Issue Hotspots
            </p>
            <h2 className="mt-1 mb-2 text-base font-semibold text-civic-ink">
              Titik isu prioritas di dalam kecamatan
            </h2>
            <p className="text-xs text-civic-muted mb-5">
              Titik isu prioritas di dalam kecamatan berdasarkan laporan simulasi, data olahan, dan kebutuhan validasi OPD.
            </p>

            <div className="space-y-4">
              {hotspots.length > 0 ? hotspots.map(h => (
                <div key={h.id} className="rounded-lg border border-civic-line p-4 flex flex-col sm:flex-row gap-4 bg-civic-soft/30 hover:bg-civic-soft/60 transition">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-bold text-civic-ink">{h.name}</h3>
                      <span className={classNames(
                        "text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border",
                        h.urgency === "Kritis" ? "bg-rose-100 text-rose-700 border-rose-200" :
                        h.urgency === "Tinggi" ? "bg-orange-100 text-orange-700 border-orange-200" :
                        h.urgency === "Sedang" ? "bg-amber-100 text-amber-700 border-amber-200" :
                        "bg-green-100 text-green-700 border-green-200"
                      )}>{h.urgency}</span>
                    </div>
                    <p className="text-xs text-civic-muted mb-2 flex items-center gap-1.5"><MapPinned size={12} /> {h.locationDetail} | <Tag size={12} /> {h.issueType}</p>
                    <p className="text-sm text-civic-ink leading-relaxed">{h.description}</p>
                  </div>
                  <div className="sm:w-48 shrink-0 flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-civic-line pt-3 sm:pt-0 sm:pl-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-civic-muted">OPD Terkait</p>
                      <p className="text-xs font-semibold text-civic-ink">{h.relatedAgency}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-civic-muted">Status</p>
                      <p className="text-xs font-medium text-civic-ink">{h.status}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-civic-muted">Catatan Validasi</p>
                      <p className="text-xs text-civic-muted italic">{h.validationNote}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-civic-muted italic">Tidak ada hotspot tercatat untuk wilayah ini.</p>
              )}
            </div>
            
            <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-3 text-center">
              <p className="text-[10px] font-medium text-amber-700 flex items-start justify-center gap-1.5">
                <TriangleAlert size={14} className="shrink-0" /> Hotspot ini merupakan simulasi prototype dan perlu validasi OPD sebelum digunakan sebagai dasar tindakan resmi.
              </p>
            </div>
          </section>

          {/* ── Laporan & Masukan Warga Terkait ───────────────────────────────── */}
          <section
            id="related-reports"
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
          >
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
                  Citizen Intelligence
                </p>
                <h2 className="mt-1 text-base font-semibold text-civic-ink">
                  Laporan & Masukan Warga Terkait
                </h2>
                <p className="text-xs text-civic-muted mt-0.5">Keluhan, kritik, saran, dan apresiasi warga di wilayah ini</p>
              </div>
              <Link to={`/reports?region=${region.id}`} className="text-xs font-semibold text-civic-primary hover:underline">
                Lihat Semua &rarr;
              </Link>
            </div>

            {/* Feedback Composition */}
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-wider text-civic-primary mb-3">Komposisi Feedback Wilayah</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 border-b border-civic-line pb-5">
              <div className="rounded border border-civic-line bg-civic-soft/50 p-2 text-center">
                <p className="text-xl font-bold text-rose-600">{toneSummary.complaints}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Keluhan</p>
              </div>
              <div className="rounded border border-civic-line bg-civic-soft/50 p-2 text-center">
                <p className="text-xl font-bold text-amber-600">{toneSummary.criticisms}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Kritik</p>
              </div>
              <div className="rounded border border-civic-line bg-civic-soft/50 p-2 text-center">
                <p className="text-xl font-bold text-blue-600">{toneSummary.suggestions}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Saran</p>
              </div>
              <div className="rounded border border-civic-line bg-civic-soft/50 p-2 text-center">
                <p className="text-xl font-bold text-green-600">{toneSummary.appreciations}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Apresiasi</p>
              </div>
              <div className="rounded border border-civic-primary/20 bg-civic-primary/5 p-2 text-center md:col-span-1 col-span-2">
                <p className="text-sm mt-1 font-bold text-civic-primary">{toneSummary.publicSignal}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Sinyal Persepsi</p>
              </div>
            </div>
            </div>

            <div className="grid gap-4">
              {recentReports.length > 0 ? recentReports.map(r => (
                <div key={r.id} className="rounded-lg border border-civic-line p-4 hover:shadow-sm transition bg-civic-soft/20 flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={classNames("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", getFeedbackBadge(r.feedbackType))}>
                          {r.feedbackType}
                        </span>
                        {["Keluhan", "Kritik"].includes(r.feedbackType) && (
                          <span className={classNames(
                            "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border",
                            r.urgency === "Kritis" ? "bg-rose-100 text-rose-700 border-rose-200" :
                            r.urgency === "Tinggi" ? "bg-orange-100 text-orange-700 border-orange-200" :
                            "bg-amber-100 text-amber-700 border-amber-200"
                          )}>{r.urgency}</span>
                        )}
                        <span className="text-[10px] font-medium bg-civic-soft border border-civic-line px-1.5 py-0.5 rounded text-civic-muted">
                          {r.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-civic-ink line-clamp-1">{r.title}</h3>
                      <p className="text-xs text-civic-muted mt-1 flex items-center gap-1.5"><MapPinned size={12} /> {r.locationDetail}</p>
                    </div>
                    <span className="text-[10px] font-medium text-civic-ink bg-civic-soft px-2 py-1 rounded-full whitespace-nowrap self-start md:self-auto border border-civic-line">
                      {r.status}
                    </span>
                  </div>

                  {r.citizenStatement && (
                    <div className="bg-white/60 p-2.5 rounded border border-civic-line/50">
                      <p className="text-xs italic text-civic-muted">"{r.citizenStatement}"</p>
                    </div>
                  )}

                  {r.classificationParameters && r.classificationParameters.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {r.classificationParameters.map((p: string, i: number) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-civic-soft border border-civic-line text-civic-muted">{p}</span>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-civic-ink">Alasan Klasifikasi CivicSense:</p>
                      <p className="text-civic-muted line-clamp-2 mt-0.5">{r.aiClassificationReason}</p>
                      {r.publicInterpretation && (
                        <p className="text-civic-muted/70 mt-0.5 text-[10px]">{r.publicInterpretation}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-civic-ink">OPD Terkait:</p>
                      <p className="text-civic-muted mt-0.5">{r.recommendedAgency}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-civic-muted/80 pt-2 border-t border-civic-line/40">
                    Klasifikasi ini adalah draf awal CivicSense dan perlu validasi petugas/OPD.
                  </p>
                </div>
              )) : (
                <p className="text-sm text-civic-muted italic">Belum ada laporan dari masyarakat di wilayah ini.</p>
              )}
            </div>

            <div className="mt-4 rounded border border-civic-line bg-civic-soft/30 p-3 text-[10px] text-civic-muted">
              <span className="font-semibold text-civic-ink">Catatan Scoring:</span> Indikator Laporan Warga pada Priority Score terutama membaca keluhan dan kritik yang membutuhkan tindak lanjut. Saran dan apresiasi digunakan sebagai konteks persepsi publik, bukan otomatis menaikkan prioritas intervensi.
            </div>
          </section>

          {/* ── Akuntabilitas Tindak Lanjut ──────────────────────────────── */}
          <section
            id="resolution-accountability"
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
          >
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">
                Resolution Accountability
              </p>
              <h2 className="mt-1 text-base font-semibold text-civic-ink">
                Akuntabilitas Tindak Lanjut
              </h2>
              <p className="text-xs text-civic-muted mt-0.5">Laporan penyelesaian dari OPD terkait wilayah ini</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5 border-b border-civic-line pb-5">
              <div className="rounded border border-green-200 bg-green-50 p-2 text-center">
                <p className="text-xl font-bold text-green-700">{resolutionStats.validated}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Tervalidasi</p>
              </div>
              <div className="rounded border border-blue-200 bg-blue-50 p-2 text-center">
                <p className="text-xl font-bold text-blue-700">{resolutionStats.pendingValidation}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Menunggu Validasi</p>
              </div>
              <div className="rounded border border-amber-200 bg-amber-50 p-2 text-center">
                <p className="text-xl font-bold text-amber-700">{resolutionStats.needsRevision}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Perlu Revisi</p>
              </div>
              <div className="rounded border border-civic-line bg-civic-soft/50 p-2 text-center">
                <p className="text-xl font-bold text-civic-ink">{resolutionStats.draft}</p>
                <p className="text-[10px] uppercase font-semibold text-civic-muted">Draft OPD</p>
              </div>
            </div>

            {/* Completion Report Cards */}
            <div className="grid gap-4">
              {completionReports.length > 0 ? completionReports.map(cr => (
                <div key={cr.id} className="rounded-lg border border-civic-line p-4 bg-civic-soft/20 flex flex-col gap-3 hover:shadow-sm transition">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={classNames("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border", getValidationBadge(cr.validationStatus))}>
                          {cr.validationStatus}
                        </span>
                        <span className="text-[10px] font-medium bg-civic-soft border border-civic-line px-1.5 py-0.5 rounded text-civic-muted">
                          {cr.agency}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-civic-ink">{cr.actionTaken}</p>
                      <p className="text-xs text-civic-muted mt-1">Laporan warga terkait: {cr.reportId}</p>
                    </div>
                    <span className="text-[10px] font-medium text-civic-muted whitespace-nowrap">
                      Selesai: {new Date(cr.completedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-civic-ink">Sebelum:</p>
                      <p className="text-civic-muted mt-0.5">{cr.beforeEvidenceLabel}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-civic-ink">Sesudah:</p>
                      <p className="text-civic-muted mt-0.5">{cr.afterEvidenceLabel}</p>
                    </div>
                  </div>

                  {cr.fieldObstacle && (
                    <div className="text-xs">
                      <p className="font-semibold text-civic-ink">Kendala Lapangan:</p>
                      <p className="text-civic-muted mt-0.5">{cr.fieldObstacle}</p>
                    </div>
                  )}

                  {cr.publicSummary && (
                    <div className="bg-white/60 p-2.5 rounded border border-civic-line/50">
                      <p className="text-xs text-civic-ink"><span className="font-semibold">Ringkasan Publik:</span> {cr.publicSummary}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-civic-muted/80 pt-2 border-t border-civic-line/40">
                    <span>Validator: {cr.validatorRole}</span>
                    <span>Data simulasi prototype</span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-civic-muted italic">Belum ada laporan penyelesaian dari OPD untuk wilayah ini.</p>
              )}
            </div>

            <div className="mt-4 rounded border border-civic-line bg-civic-soft/30 p-3 text-[10px] text-civic-muted">
              {COMPLETION_REPORT_DISCLAIMER}
            </div>
          </section>

          {/* Dominant Issues */}
          <section
            id="dominant-issues"
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
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
            className="rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm"
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
            className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3"
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
              <FileText size={16} /> Generate Policy Brief
            </Link>

            <Link
              id="btn-simulator"
              to={`/simulator?region=${region.id}`}
              className={classNames(
                buttonClasses("secondary"),
                "w-full justify-center gap-2"
              )}
            >
              <SlidersHorizontal size={16} /> Buka Policy Simulator
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
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-4">
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
              Bar panjang = kebutuhan intervensi tinggi.{" "}
              <span className="text-indigo-600 not-italic font-medium">Inversi</span>{" "}
              = Akses Layanan Publik &amp; Aktivitas UMKM (nilai tinggi = kondisi baik).
            </p>
          </div>

          {/* Stakeholders */}
          <div
            id="stakeholders"
            className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3"
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
          <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm space-y-3">
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
            <p className="font-semibold text-civic-ink mb-1 flex items-center gap-1.5"><Info size={16} /> Catatan Data</p>
            <p>{region.dataSourceNote}</p>
          </aside>
        </aside>
      </div>
    </div>
  );
}



