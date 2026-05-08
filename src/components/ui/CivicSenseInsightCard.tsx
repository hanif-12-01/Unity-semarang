import { useState, useEffect } from "react";
import { classNames } from "../../utils/classNames";
import { AI_DISCLAIMER } from "../../utils";
import type { AIInsight } from "../../utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type CivicSenseInsightCardProps = {
  /** Fungsi yang mengembalikan insight (dijalankan saat tombol diklik) */
  getInsight: () => AIInsight;
  /** Judul tombol trigger */
  triggerLabel?: string;
  /** Apakah langsung tampil tanpa klik (auto-show) */
  autoShow?: boolean;
  /** Compact mode: hanya tampilkan headline + body tanpa bullets */
  compact?: boolean;
  /** Class tambahan untuk wrapper */
  className?: string;
};

// ─── Urgency config ───────────────────────────────────────────────────────────

const URGENCY_CONFIG = {
  critical: {
    border: "border-red-200",
    header: "bg-gradient-to-r from-red-900 to-red-800",
    badge: "bg-red-700/60 text-red-100",
    bullet: "text-red-400",
    cta: "bg-red-50 border-red-200 text-red-700",
    label: "Kritis",
  },
  high: {
    border: "border-amber-200",
    header: "bg-gradient-to-r from-amber-900 to-amber-800",
    badge: "bg-amber-700/60 text-amber-100",
    bullet: "text-amber-500",
    cta: "bg-amber-50 border-amber-200 text-amber-800",
    label: "Tinggi",
  },
  medium: {
    border: "border-civic-primary/30",
    header: "bg-gradient-to-r from-civic-ink to-slate-800",
    badge: "bg-civic-primary/30 text-teal-100",
    bullet: "text-civic-primary",
    cta: "bg-civic-soft border-civic-line text-civic-ink",
    label: "Sedang",
  },
  low: {
    border: "border-emerald-200",
    header: "bg-gradient-to-r from-emerald-900 to-teal-900",
    badge: "bg-emerald-700/60 text-emerald-100",
    bullet: "text-emerald-500",
    cta: "bg-emerald-50 border-emerald-200 text-emerald-800",
    label: "Rendah",
  },
};

// ─── Loading shimmer ──────────────────────────────────────────────────────────

function AILoadingShimmer() {
  return (
    <div className="space-y-3 animate-pulse px-5 py-4">
      <div className="h-3 w-3/4 rounded bg-white/20" />
      <div className="h-3 w-full rounded bg-white/20" />
      <div className="h-3 w-5/6 rounded bg-white/20" />
      <div className="h-3 w-2/3 rounded bg-white/20" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CivicSenseInsightCard({
  getInsight,
  triggerLabel = "✨ Explain Priority with CivicSense AI",
  autoShow = false,
  compact = false,
  className,
}: CivicSenseInsightCardProps) {
  const [shown, setShown] = useState(autoShow);
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<AIInsight | null>(autoShow ? getInsight() : null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // If autoShow changes (e.g. key prop changes), recompute
  useEffect(() => {
    if (autoShow) {
      setInsight(getInsight());
      setShown(true);
    }
  }, [autoShow]);

  function handleTrigger() {
    if (shown) {
      setShown(false);
      return;
    }
    setLoading(true);
    // Simulate brief processing delay (300ms) for UX effect
    setTimeout(() => {
      setInsight(getInsight());
      setLoading(false);
      setShown(true);
    }, 380);
  }

  const cfg = insight ? URGENCY_CONFIG[insight.urgencyLevel] : URGENCY_CONFIG["medium"];

  return (
    <div className={classNames("space-y-2", className ?? "")}>
      {/* ── Trigger Button (hidden when autoShow) ── */}
      {!autoShow && (
        <button
          id="civicsense-trigger-btn"
          onClick={handleTrigger}
          className={classNames(
            "group inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition",
            shown
              ? "border-civic-primary/40 bg-civic-primary/5 text-civic-primary"
              : "border-civic-line bg-white text-civic-ink shadow-sm hover:border-civic-primary/40 hover:bg-civic-soft"
          )}
        >
          <span className="text-base">✨</span>
          {loading
            ? "Menganalisis data wilayah..."
            : shown
            ? "Sembunyikan AI Insight"
            : triggerLabel.replace("✨ ", "")}
          {!loading && (
            <span className={classNames(
              "ml-1 transition-transform",
              shown ? "rotate-180" : ""
            )}>
              ▾
            </span>
          )}
        </button>
      )}

      {/* ── Loading state ── */}
      {loading && (
        <div className="overflow-hidden rounded-xl border border-civic-primary/30 bg-gradient-to-r from-civic-ink to-slate-800 shadow-sm">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="text-sm font-semibold text-white/80">CivicSense AI</span>
            <span className="text-xs text-white/40">Memproses data...</span>
          </div>
          <AILoadingShimmer />
        </div>
      )}

      {/* ── Insight Panel ── */}
      {shown && insight && !loading && (
        <div
          className={classNames(
            "overflow-hidden rounded-xl border shadow-sm",
            cfg.border
          )}
        >
          {/* Header */}
          <div
            className={classNames(
              "flex items-start justify-between gap-3 px-5 py-4",
              cfg.header
            )}
          >
            <div className="flex items-start gap-2.5">
              <span className="shrink-0 text-lg">✨</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    CivicSense AI Insight
                  </span>
                  <span
                    className={classNames(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      cfg.badge
                    )}
                  >
                    Urgensi {cfg.label}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-white leading-snug">
                  {insight.headline}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white px-5 py-4 space-y-3">
            <p className="text-sm leading-relaxed text-civic-ink">{insight.body}</p>

            {/* Bullets (hidden in compact mode) */}
            {!compact && insight.bullets.length > 0 && (
              <ul className="space-y-1.5">
                {insight.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-civic-muted">
                    <span className={classNames("mt-0.5 font-bold shrink-0", cfg.bullet)}>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Call to Action */}
            <div
              className={classNames(
                "rounded-lg border px-4 py-3 text-xs font-medium leading-relaxed",
                cfg.cta
              )}
            >
              <span className="font-bold">💡 Saran Tindakan Awal: </span>
              {insight.callToAction}
            </div>

            {/* Disclaimer toggle */}
            <div className="border-t border-civic-line pt-2">
              <button
                onClick={() => setShowDisclaimer((p) => !p)}
                className="text-xs text-civic-muted hover:text-civic-primary transition-colors"
              >
                🤖 {showDisclaimer ? "Sembunyikan" : "Lihat"} keterangan CivicSense AI
              </button>
              {showDisclaimer && (
                <p className="mt-1.5 text-xs leading-relaxed text-civic-muted/70 italic">
                  {AI_DISCLAIMER}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
