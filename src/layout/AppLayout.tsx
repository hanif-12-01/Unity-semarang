import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { classNames } from "../utils/classNames";

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Overview",           to: "/",              icon: "🏠", end: true  },
  { label: "Dashboard Kota",     to: "/dashboard",     icon: "📊", end: false },
  { label: "Detail Wilayah",     to: "/regions/semarang-utara", icon: "🔍", end: false },
  { label: "Policy Simulator",   to: "/simulator",     icon: "⚖️", end: false },
  { label: "Policy Brief",       to: "/policy-brief",  icon: "✨", end: false },
  { label: "Transparansi Publik",to: "/public",        icon: "🌐", end: false },
  { label: "Metodologi Data",    to: "/methodology",   icon: "📋", end: false },
];

// Demo flow steps for jury presentation
const DEMO_FLOW = [
  { step: 1, label: "Landing Page",      to: "/",              hint: "Mulai di sini" },
  { step: 2, label: "Dashboard Kota",    to: "/dashboard",     hint: "Lihat ranking wilayah" },
  { step: 3, label: "Detail Wilayah",    to: "/regions/genuk", hint: "Eksplorasi Genuk" },
  { step: 4, label: "Policy Simulator",  to: "/simulator",     hint: "Simulasi banjir/rob" },
  { step: 5, label: "AI Policy Brief",   to: "/policy-brief",  hint: "Generate brief Genuk" },
  { step: 6, label: "Transparansi Publik", to: "/public",      hint: "Lihat portal warga" },
  { step: 7, label: "Metodologi",        to: "/methodology",   hint: "Jawab pertanyaan juri" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AppLayout() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-civic-panel text-civic-ink">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside className="border-b border-civic-line bg-white px-5 py-5 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:flex-none lg:border-b-0 lg:border-r lg:overflow-y-auto">
          <div className="flex flex-col gap-5">

            {/* Brand */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-civic-primary">
                Prototype Smart City
              </p>
              <h1 className="mt-1.5 text-xl font-bold text-civic-ink">CIVICTWIN Semarang</h1>
              <p className="mt-1 text-xs leading-5 text-civic-muted">
                Digital twin wilayah untuk prioritas kebijakan kota yang transparan dan berbasis data.
              </p>
            </div>

            {/* Navigation */}
            <nav
              className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
              aria-label="Navigasi utama"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium transition lg:whitespace-normal",
                      isActive
                        ? "border-civic-primary bg-civic-primary text-white shadow-sm"
                        : "border-transparent text-civic-muted hover:border-civic-line hover:bg-civic-soft hover:text-civic-ink"
                    )
                  }
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Demo Flow Panel */}
            <div className="hidden lg:block">
              <button
                onClick={() => setShowDemo((p) => !p)}
                className="flex w-full items-center justify-between rounded-lg border border-civic-line bg-civic-soft px-3 py-2.5 text-xs font-semibold text-civic-ink transition hover:border-civic-primary/30 hover:bg-white"
              >
                <span className="flex items-center gap-1.5">
                  🎬 <span>Demo Flow</span>
                </span>
                <span className={classNames("transition-transform text-civic-muted", showDemo ? "rotate-180" : "")}>▾</span>
              </button>

              {showDemo && (
                <div className="mt-2 rounded-lg border border-civic-primary/20 bg-white p-3 space-y-1.5">
                  <p className="text-xs font-bold text-civic-primary uppercase tracking-wider mb-2">Urutan Demo Juri</p>
                  {DEMO_FLOW.map((d) => (
                    <Link
                      key={d.step}
                      to={d.to}
                      onClick={() => setShowDemo(false)}
                      className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs transition hover:bg-civic-soft"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-civic-ink text-xs font-bold text-white leading-none mt-0.5">
                        {d.step}
                      </span>
                      <div>
                        <p className="font-semibold text-civic-ink">{d.label}</p>
                        <p className="text-civic-muted">{d.hint}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Prototype badge */}
            <div className="hidden lg:block rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <p className="text-xs font-bold text-amber-800">⚠️ Data Prototype</p>
              <p className="mt-0.5 text-xs leading-relaxed text-amber-700">
                Menggunakan kombinasi data publik, data olahan, dan simulasi terbatas. Beberapa indikator masih perlu validasi resmi.
              </p>
            </div>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-civic-line bg-white/95 backdrop-blur-sm px-5 py-3">
            <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold text-civic-ink">CIVICTWIN Semarang</p>
                <p className="text-xs text-civic-muted">
                  Data-driven policy prioritization for smarter city governance.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  ⚠️ Data prototype POC
                </span>
                {/* Mobile demo trigger */}
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1 rounded-md border border-civic-primary/30 bg-civic-primary/5 px-2.5 py-1 text-xs font-semibold text-civic-primary hover:bg-civic-primary hover:text-white transition lg:hidden"
                >
                  🎬 Demo
                </Link>
              </div>
            </div>
          </header>

          <main className="px-5 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="border-t border-civic-line bg-white px-8 py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-civic-muted">
                CIVICTWIN Semarang Prototype Smart City · Lomba UNY 2026
              </p>
              <p className="text-xs text-civic-muted">
                Data publik/olahan/simulasi terbatas · CivicSense AI (rule-based) · Bukan dokumen resmi
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
