// =============================================================================
// AI Policy Brief Page — Powered by CivicSense AI
// Generates structured policy brief using rule-based engine (no external API)
// =============================================================================

import { useEffect, useState, useMemo } from "react";
import { MapPinned, Users, Target, BarChart3, Megaphone, Sparkles, ClipboardList, Printer, SlidersHorizontal, Globe2, Building, Calendar, TriangleAlert, BrainCircuit, CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { buttonClasses } from "../components/ui/Button";
import IndicatorBar from "../components/ui/IndicatorBar";
import { mockRegions, getRegionById } from "../data/mockData";
import {
  scoreRegion,
  getDominantIndicators,
  INDICATOR_LABELS,
  generateRegionInsight,
  generateCitizenSummary,
  explainPriority,
  generatePolicyBrief,
  AI_DISCLAIMER,
  getPolicyModeConfig,
  POLICY_MODES,
  isIndicatorInvertedForMode,
} from "../utils";
import { classNames } from "../utils/classNames";
import type { PolicyMode } from "../utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITY_HERO: Record<string, { from: string; scoreColor: string; badgeRing: string }> = {
  Tinggi: { from: "from-red-950 via-red-900 to-rose-900",          scoreColor: "text-red-300",     badgeRing: "ring-red-400/40"     },
  Sedang: { from: "from-amber-950 via-amber-900 to-orange-900",    scoreColor: "text-amber-300",   badgeRing: "ring-amber-400/40"   },
  Rendah: { from: "from-emerald-950 via-teal-900 to-emerald-900",  scoreColor: "text-emerald-300", badgeRing: "ring-emerald-400/40" },
};

const URGENCY_BADGE: Record<string, string> = {
  Kritis: "border-red-200 bg-red-50 text-red-700",
  Tinggi: "border-amber-200 bg-amber-50 text-amber-700",
  Sedang: "border-blue-200 bg-blue-50 text-blue-700",
  Rendah: "border-gray-200 bg-gray-50 text-gray-600",
};

const TIMELINE_STYLE: Record<string, string> = {
  "0–3 bulan (mendesak)":         "text-red-600 font-semibold",
  "3–6 bulan (jangka pendek)":    "text-amber-600 font-semibold",
  "6–12 bulan (jangka menengah)": "text-civic-primary",
  "12–24 bulan (jangka panjang)": "text-civic-muted",
};

const IMPL_STEPS = [
  { icon: <MapPinned size={16} />, title: "Validasi Data Wilayah",
    desc: "Verifikasi data prototype dengan data operasional dari dinas terkait sebelum dijadikan basis keputusan resmi." },
  { icon: <Users size={16} />, title: "Koordinasi Lintas OPD",
    desc: "Selenggarakan rapat koordinasi dengan seluruh OPD dalam daftar stakeholder untuk menyamakan pemahaman kondisi wilayah." },
  { icon: <Target size={16} />, title: "Penentuan Program Prioritas",
    desc: "Tetapkan program unggulan per semester yang sesuai kapasitas anggaran berdasarkan hasil koordinasi." },
  { icon: <BarChart3 size={16} />, title: "Monitoring Indikator",
    desc: "Pantau perubahan indikator secara berkala dan perbarui Priority Score setiap kuartal." },
  { icon: <Megaphone size={16} />, title: "Publikasi Ringkasan Transparansi",
    desc: "Publikasikan ringkasan kondisi dan rencana intervensi melalui kanal Transparansi Publik." },
];

const PRINT_CSS = `
@media print {
  body { font-size: 11px !important; }
  #pb-toolbar, #pb-region-bar, aside, nav { display: none !important; }
}
`;

function isPolicyMode(value: string | null): value is PolicyMode {
  return POLICY_MODES.some((mode) => mode.id === value);
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id, num, title, aiTagged = false, children,
}: {
  id?: string; num: string; title: string; aiTagged?: boolean; children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-xl border border-civic-line bg-civic-surface shadow-sm print:shadow-none"
    >
      <div className="flex items-center gap-3 border-b border-civic-line px-6 py-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-civic-ink text-xs font-bold text-white">
          {num}
        </span>
        <h2 className="flex-1 text-sm font-bold text-civic-ink">{title}</h2>
        {aiTagged && (
          <span className="inline-flex items-center gap-1 rounded-full border border-civic-primary/30 bg-civic-primary/5 px-2.5 py-0.5 text-xs font-semibold text-civic-primary">
            <Sparkles size={12} /> CivicSense AI
          </span>
        )}
      </div>
      <div className="px-6 py-5 space-y-3">{children}</div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PolicyBriefPage() {
  const [searchParams] = useSearchParams();
  const requestedRegion = searchParams.get("region") ?? mockRegions[0].id;
  const regionParam = getRegionById(requestedRegion)?.id ?? mockRegions[0].id;
  const modeParam = searchParams.get("mode");
  const activeMode: PolicyMode = isPolicyMode(modeParam) ? modeParam : "general";
  const [selectedId, setSelectedId] = useState(regionParam);
  const [copied, setCopied] = useState(false);

  const raw = getRegionById(selectedId) ?? mockRegions[0];
  const modeConfig = getPolicyModeConfig(activeMode);

  useEffect(() => {
    setSelectedId(regionParam);
  }, [regionParam]);

  // ── All data computed from raw region + active mode ──────────────────────────
  const scored   = useMemo(() => scoreRegion(raw, activeMode), [raw, activeMode]);
  const brief    = useMemo(() => generatePolicyBrief(raw, activeMode), [raw, activeMode]);
  const insight  = useMemo(() => generateRegionInsight(raw, activeMode), [raw, activeMode]);
  const citizen  = useMemo(() => generateCitizenSummary(raw), [raw]);
  const explain  = useMemo(() => explainPriority(raw, activeMode), [raw, activeMode]);
  const top4     = useMemo(() => getDominantIndicators(raw.indicators, activeMode, 4), [raw, activeMode]);

  const hero = PRIORITY_HERO[scored.computedCategory] ?? PRIORITY_HERO["Sedang"];

  // ── Now  ───────────────────────────────────────────────────────────────────
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const docId = `AI-PB-${raw.id.toUpperCase()}-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;

  // ── Copy to clipboard ─────────────────────────────────────────────────────
  async function handleCopy() {
    const text = [
      `AI POLICY BRIEF — ${raw.name}`,
      `Dokumen: ${docId}  |  Dibuat: ${dateStr}  |  Drafted by CivicSense Policy Assistant`,
      `Mode Analisis: ${modeConfig.label}`,
      `Priority Score: ${scored.computedScore}/100 (${scored.computedCategory})`,
      "",
      "EXECUTIVE SUMMARY",
      brief.executiveSummary,
      "",
      "DRAFT ANALISIS PRIORITAS (CivicSense AI)",
      insight.body,
      "",
      "SINYAL DATA UTAMA",
      ...top4.map((d) => `- ${INDICATOR_LABELS[d.key]}: ${d.value}/100 (${d.severity})`),
      "",
      "REKOMENDASI KEBIJAKAN",
      ...brief.policyRecommendations.map(
        (r) => `${r.priority}. ${r.action} [${r.timeline}] — ${r.lead}`
      ),
      "",
      "RINGKASAN WARGA",
      citizen.layman,
      citizen.whatItMeans,
      citizen.whatWillHappen,
      "",
      `DISCLAIMER: ${AI_DISCLAIMER}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <style>{PRINT_CSS}</style>
      <div className="space-y-5 pb-12">

        {/* ── Toolbar ───────────────────────────────────────────────── */}
        <div
          id="pb-toolbar"
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-civic-primary flex items-center gap-1.5">
              <Sparkles size={14} /> CivicSense AI
            </p>
            <h1 className="text-2xl font-bold text-civic-ink">AI Policy Brief Generator</h1>
            <p className="text-sm text-civic-muted">
              Dokumen draft ringkasan kebijakan berbasis data wilayah — disusun sebagai draf awal oleh CivicSense Policy Assistant.
            </p>
            <span className="mt-2 inline-flex rounded-md border border-civic-primary/20 bg-civic-primary/5 px-2.5 py-1 text-xs font-semibold text-civic-primary">
              Mode analisis: {modeConfig.label}
            </span>
          </div>
          <Link
            to="/dashboard"
            className={classNames(buttonClasses("secondary"), "shrink-0 text-sm")}
          >
            ← Dashboard
          </Link>
        </div>

        {/* ── Region Selector ───────────────────────────────────────── */}
        <div
          id="pb-region-bar"
          className="flex flex-wrap items-end gap-4 rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm print:hidden"
        >
          <div className="flex-1 min-w-[200px] space-y-1">
            <label htmlFor="sel-region" className="text-xs font-bold uppercase tracking-wider text-civic-primary">
              Pilih Wilayah
            </label>
            <select
              id="sel-region"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-lg border border-civic-line bg-civic-surface px-3 py-2 text-sm font-medium text-civic-ink shadow-sm focus:outline-none focus:ring-2 focus:ring-civic-primary"
            >
              {mockRegions.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              id="btn-copy-ai-brief"
              onClick={handleCopy}
              className={classNames(buttonClasses("secondary"), "text-sm gap-1.5")}
            >
              {copied ? <><CheckCircle2 size={16} /> Tersalin!</> : <><ClipboardList size={16} /> Salin Brief</>}
            </button>
            <button
              id="btn-print-ai-brief"
              onClick={() => window.print()}
              className={classNames(buttonClasses("secondary"), "text-sm gap-1.5")}
            >
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            DOCUMENT
            ════════════════════════════════════════════════════════ */}

        {/* ── Hero Header ───────────────────────────────────────────── */}
        <header
          className={classNames(
            "relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white shadow-xl",
            hero.from
          )}
        >
          {/* Decorative blobs */}
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-civic-primary/20 blur-2xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left info */}
            <div className="space-y-3">
              {/* AI badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                <Sparkles size={14} /> Drafted by CivicSense Policy Assistant
              </div>
              <p className="text-xs text-white/50 font-mono">{docId} · {dateStr}</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                {raw.name}
              </h2>
              <p className="text-sm text-white/60 max-w-lg leading-relaxed">
                {raw.description}
              </p>
              <span className={classNames(
                "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold ring-1",
                hero.badgeRing
              )}>
                <span className={classNames(
                  "h-1.5 w-1.5 rounded-full",
                  scored.computedCategory === "Tinggi" ? "bg-red-400" :
                  scored.computedCategory === "Sedang" ? "bg-amber-400" : "bg-emerald-400"
                )} />
                Prioritas {scored.computedCategory}
              </span>
            </div>

            {/* Score box */}
            <div className="shrink-0 rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm min-w-[160px]">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50">Priority Score</p>
              <p className={classNames("mt-1 text-6xl font-bold leading-none tabular-nums", hero.scoreColor)}>
                {scored.computedScore}
              </p>
              <p className="mt-1 text-xs text-white/30">/ 100</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className={classNames(
                    "h-full rounded-full transition-all duration-700",
                    scored.computedCategory === "Tinggi" ? "bg-red-400" :
                    scored.computedCategory === "Sedang" ? "bg-amber-400" : "bg-emerald-400"
                  )}
                  style={{ width: `${scored.computedScore}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-white/40">Mode: {modeConfig.label}</p>
            </div>
          </div>
        </header>

        {/* ── 01 Executive Summary ─────────────────────────────────── */}
        <Section id="sec-executive" num="01" title="Executive Summary">
          <p className="text-sm leading-relaxed text-civic-ink">{brief.executiveSummary}</p>
        </Section>

        {/* ── 02 Priority Analysis (AI) ─────────────────────────────── */}
        <Section id="sec-priority" num="02" title="Priority Analysis" aiTagged>
          {/* AI insight banner */}
          <div className="rounded-lg border border-civic-primary/25 bg-gradient-to-r from-civic-ink/5 to-transparent p-4">
            <p className="text-xs font-bold text-civic-primary mb-1 flex items-center gap-1.5"><Sparkles size={14} /> CivicSense AI — {insight.headline}</p>
            <p className="text-sm leading-relaxed text-civic-ink">{insight.body}</p>
          </div>

          {/* Explain priority paragraph */}
          <p className="text-sm leading-relaxed text-civic-muted">{explain}</p>

          {/* Dominant issues list */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-civic-muted mb-2">Masalah Dominan</p>
            <ul className="space-y-2">
              {raw.dominantIssues.map((issue, i) => (
                <li key={issue} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-civic-ink text-xs font-bold text-white mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-civic-ink">{issue}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* AI CTA note */}
          <div className={classNames(
            "rounded-lg border px-4 py-3 text-xs font-medium leading-relaxed",
            insight.urgencyLevel === "critical" ? "border-red-200 bg-red-50 text-red-700" :
            insight.urgencyLevel === "high" ? "border-amber-200 bg-amber-50 text-amber-800" :
            "border-civic-line bg-civic-soft text-civic-ink"
          )}>
            <span className="font-bold flex items-center gap-1.5"><BrainCircuit size={14} /> Rekomendasi Awal AI: </span>
            {insight.callToAction}
          </div>
        </Section>

        {/* ── 03 Key Data Signals ───────────────────────────────────── */}
        <Section id="sec-data" num="03" title="Key Data Signals" aiTagged>
          <p className="text-xs text-civic-muted">
            Empat indikator dengan pengaruh terbesar terhadap Priority Score wilayah ini.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {top4.map((d) => {
              const inv = isIndicatorInvertedForMode(d.key, activeMode);
              return (
                <div key={d.key} className="rounded-lg border border-civic-line bg-civic-soft/50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-civic-ink">{INDICATOR_LABELS[d.key]}</span>
                    <span className={classNames("rounded-md border px-2 py-0.5 text-xs font-semibold", URGENCY_BADGE[d.severity] ?? URGENCY_BADGE["Sedang"])}>
                      {d.severity}
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold tabular-nums text-civic-ink">{d.value}</span>
                    <span className="text-xs text-civic-muted mb-0.5">/ 100</span>
                  </div>
                  <IndicatorBar label="" value={d.value} inverted={inv} colorClass="auto" />
                  {inv && (
                    <p className="text-xs text-civic-muted italic">* Nilai rendah = kebutuhan intervensi tinggi</p>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── 04 Policy Recommendations ────────────────────────────── */}
        <Section id="sec-rec" num="04" title="Rekomendasi Kebijakan" aiTagged>
          <div className="space-y-3">
            {brief.policyRecommendations.map((rec) => (
              <div key={rec.priority} className="rounded-xl border border-civic-line bg-civic-surface p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-civic-primary text-sm font-bold text-white">
                    {rec.priority}
                  </span>
                  <div className="flex-1 space-y-1.5">
                    <p className="text-sm font-semibold text-civic-ink">{rec.action}</p>
                    <div className="flex flex-wrap gap-4 text-xs pt-0.5">
                      <span className="flex items-center gap-1 text-civic-muted">
                        <Building size={14} /> <span className="font-medium text-civic-ink">{rec.lead}</span>
                      </span>
                      <span className={classNames("flex items-center gap-1", TIMELINE_STYLE[rec.timeline] ?? "text-civic-muted")}>
                        <Calendar size={14} /> {rec.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 05 Stakeholder Mapping ───────────────────────────────── */}
        <Section id="sec-stakeholder" num="05" title="Stakeholder Mapping">
          <p className="text-xs text-civic-muted">
            Dinas dan lembaga yang perlu dilibatkan dalam pelaksanaan kebijakan wilayah ini.
          </p>
          <div className="flex flex-wrap gap-2">
            {raw.relatedStakeholders.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-civic-line bg-civic-soft px-3 py-1.5 text-xs font-medium text-civic-ink"
              >
                <Building size={12} /> {s}
              </span>
            ))}
          </div>
        </Section>

        {/* ── 06 Implementation Notes ──────────────────────────────── */}
        <Section id="sec-impl" num="06" title="Langkah Implementasi">
          <div className="space-y-0">
            {IMPL_STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-civic-primary text-sm z-10">
                    {step.icon}
                  </span>
                  {i < IMPL_STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-civic-line mt-1 mb-1 min-h-[16px]" />
                  )}
                </div>
                <div className={classNames("pb-4 flex-1 pt-1", i === IMPL_STEPS.length - 1 ? "pb-0" : "")}>
                  <p className="text-sm font-semibold text-civic-ink">{step.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-civic-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 07 Expected Impact ───────────────────────────────────── */}
        <Section id="sec-impact" num="07" title="Dampak yang Diharapkan">
          <div className="grid gap-3 sm:grid-cols-2">
            {brief.expectedImpacts.map((impact) => (
              <div key={impact.dimension} className="flex items-start gap-3 rounded-lg border border-civic-line bg-civic-soft/60 p-4">
                <Target size={20} className="text-civic-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-civic-ink">{impact.dimension}</p>
                  <p className="mt-1 text-xs leading-relaxed text-civic-muted">{impact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 08 Citizen Communication Summary (AI) ────────────────── */}
        <Section id="sec-citizen" num="08" title="Citizen Communication Summary" aiTagged>
          <div className="rounded-xl border border-civic-primary/20 bg-civic-primary/5 p-5 space-y-3">
            <p className="text-sm font-bold text-civic-ink flex items-center gap-1.5">
              {scored.computedCategory === "Tinggi" ? <TriangleAlert size={16} className="text-red-600 shrink-0" /> :
               scored.computedCategory === "Sedang" ? <ClipboardList size={16} className="text-amber-600 shrink-0" /> :
               <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
              {citizen.headline}
            </p>
            <p className="text-sm leading-relaxed text-civic-ink">{citizen.layman}</p>
            <p className="text-sm leading-relaxed text-civic-ink">{citizen.whatItMeans}</p>
            <p className="text-sm leading-relaxed text-civic-muted italic">{citizen.whatWillHappen}</p>
          </div>
          <p className="text-xs text-civic-muted">
            Ringkasan ini dapat digunakan sebagai dasar komunikasi publik kepada warga {raw.name}.
          </p>
        </Section>

        {/* ── AI Disclaimer ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <TriangleAlert size={20} className="text-amber-600 shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                AI Disclaimer — CivicSense AI · Prototype
              </p>
              <p className="text-xs leading-relaxed text-amber-700">
                Output CivicSense AI merupakan draft analisis awal dan perlu divalidasi oleh OPD/petugas terkait sebelum digunakan sebagai dasar keputusan resmi.
                Policy brief ini disusun menggunakan kombinasi data publik, data olahan, dan simulasi terbatas.{" "}
                {AI_DISCLAIMER}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Action Bar ─────────────────────────────────────── */}
        <div
          id="pb-action-bar"
          className="flex flex-wrap items-center gap-3 rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm print:hidden"
        >
          <button
            onClick={handleCopy}
            className={classNames(buttonClasses("primary"), "gap-2")}
          >
            {copied ? <><CheckCircle2 size={16} /> Tersalin!</> : <><ClipboardList size={16} /> Salin Brief</>}
          </button>
          <button
            onClick={() => window.print()}
            className={classNames(buttonClasses("secondary"), "gap-2")}
          >
            <Printer size={16} /> Cetak / Export PDF
          </button>
          <Link
            to="/simulator"
            id="btn-open-simulator"
            className={classNames(buttonClasses("secondary"), "gap-2")}
          >
            <SlidersHorizontal size={16} /> Buka Policy Simulator
          </Link>
          <Link
            to="/public"
            id="btn-open-public"
            className={classNames(buttonClasses("secondary"), "gap-2")}
          >
            <Globe2 size={16} /> Transparansi Publik
          </Link>
          <Link
            to="/dashboard"
            className={classNames(buttonClasses("secondary"), "gap-2")}
          >
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}



