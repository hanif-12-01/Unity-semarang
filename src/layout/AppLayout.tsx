import { useState, useEffect, useRef } from "react";
import { 
  Home, 
  LayoutDashboard, 
  MapPinned, 
  MessageSquareWarning, 
  SlidersHorizontal, 
  FileText, 
  Globe2, 
  BookOpenCheck, 
  PlayCircle, 
  TriangleAlert, 
  Sparkles, 
  ChevronDown,
  UserCircle
} from "lucide-react";
import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import { classNames } from "../utils/classNames";
import { mockRegions } from "../data/mockData";
import civictwinLogo from "../assets/brand/civictwin-logo.png";

// ─── Default Regions ──────────────────────────────────────────────────────────
const fallbackRegionId = mockRegions[0]?.id || "semarang-utara";
const detailRegionId = mockRegions.find(r => r.id === "semarang-utara") ? "semarang-utara" : fallbackRegionId;
const demoRegionId = mockRegions.find(r => r.id === "genuk") ? "genuk" : fallbackRegionId;

const DEFAULT_DETAIL_REGION_ID = detailRegionId;
const DEMO_REGION_ID = demoRegionId;

const NAV_ITEMS = [
  { label: "Command Center",     to: "/dashboard",     icon: <LayoutDashboard size={16} />, end: false },
  { label: "Reports",            to: "/reports",       icon: <MessageSquareWarning size={16} />, end: false },
  { label: "Simulator",          to: "/simulator",     icon: <SlidersHorizontal size={16} />, end: false },
  { label: "Policy Brief",       to: "/policy-brief",  icon: <FileText size={16} />, end: false },
  { label: "Public",             to: "/public",        icon: <Globe2 size={16} />, end: false },
  { label: "Methodology",        to: "/methodology",   icon: <BookOpenCheck size={16} />, end: false },
];

// Demo flow steps for jury presentation
const DEMO_FLOW = [
  { step: 1, label: "Landing Page",      to: "/",              hint: "Mulai di sini" },
  { step: 2, label: "Dashboard Kota",    to: "/dashboard",     hint: "Lihat ranking wilayah" },
  { step: 3, label: "Detail Wilayah",    to: `/regions/${DEMO_REGION_ID}`, hint: `Eksplorasi ${demoRegionId}` },
  { step: 4, label: "Policy Simulator",  to: "/simulator",     hint: "Simulasi banjir/rob" },
  { step: 5, label: "AI Policy Brief",   to: "/policy-brief",  hint: `Generate brief ${demoRegionId}` },
  { step: 6, label: "Transparansi Publik", to: "/public",      hint: "Lihat portal warga" },
  { step: 7, label: "Metodologi",        to: "/methodology",   hint: "Jawab pertanyaan juri" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AppLayout() {
  const [showDemo, setShowDemo] = useState(false);
  const [demoRole, setDemoRole] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setDemoRole(localStorage.getItem("civictwin_demo_role"));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDemo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setShowDemo(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-civic-panel text-civic-ink font-sans flex flex-col">
      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 border-b border-civic-line bg-civic-surface/95 backdrop-blur-sm shadow-sm">
        {/* Top Brand Row */}
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between lg:px-8">
          <Link to="/" className="group flex items-center gap-3">
            <img 
              src={civictwinLogo} 
              alt="CIVICTWIN Semarang Logo" 
              className="h-9 object-contain md:h-10 transition group-hover:opacity-90"
            />
            <div>
              <h1 className="text-xl font-bold text-civic-ink tracking-tight flex items-baseline gap-2 group-hover:text-civic-primary transition">
                CIVICTWIN <span className="text-civic-primary text-sm">Semarang</span>
              </h1>
              <p className="text-xs font-semibold text-civic-muted tracking-wide uppercase mt-0.5">
                Central Java Civic Intelligence
              </p>
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded border border-civic-brick/25 bg-civic-brick/5 px-2.5 py-1 text-[11px] font-semibold text-civic-brick">
              <TriangleAlert size={14} /> Data Prototype POC
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-civic-primary/20 bg-civic-primary/5 px-2.5 py-1 text-[11px] font-semibold text-civic-primary">
              <Sparkles size={14} /> CivicSense Policy Assistant
            </span>
            {demoRole && (
              <div className="flex items-center gap-2 ml-2 border-l border-civic-line pl-4">
                <span className="inline-flex items-center gap-1.5 rounded border border-civic-gold/30 bg-civic-gold/10 px-2.5 py-1 text-[11px] font-semibold text-civic-ink">
                  <UserCircle size={14} className="text-civic-gold" /> Demo Access: <span className="font-bold">{demoRole}</span>
                </span>
                <Link to="/login" className="text-[10px] font-medium text-civic-muted hover:text-civic-primary transition-colors hover:underline">
                  Ganti Role
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Row */}
        {location.pathname !== "/" && (
          <div className="border-t border-civic-line/40 bg-civic-surface">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 lg:px-8">
              <nav
                className="flex gap-1 overflow-x-auto py-2 pr-4 scrollbar-hide -mb-px"
                aria-label="Navigasi utama"
              >
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      classNames(
                        "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-civic-primary/10 text-civic-primary font-semibold"
                          : "text-civic-muted hover:bg-civic-soft hover:text-civic-ink font-medium"
                      )
                    }
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Demo Flow Dropdown */}
              <div className="relative shrink-0 ml-2" ref={dropdownRef}>
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="flex items-center gap-1.5 rounded-md border border-civic-line bg-civic-panel px-3 py-2 text-sm font-medium text-civic-ink shadow-sm transition hover:bg-civic-soft hover:border-civic-primary/30"
                >
                  <PlayCircle size={16} className="text-civic-primary" />
                  <span className="hidden sm:inline">Presentation Flow</span>
                  <span className="sm:hidden">Demo</span>
                  <ChevronDown size={14} className={classNames("text-civic-muted transition-transform", showDemo ? "rotate-180" : "")} />
                </button>
                
                {showDemo && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-civic-line bg-civic-surface p-3 shadow-lg">
                    <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-wider text-civic-gold">Urutan Demo Juri</p>
                    <div className="space-y-1">
                      {DEMO_FLOW.map((d) => (
                        <Link
                          key={d.step}
                          to={d.to}
                          className="flex items-start gap-2.5 rounded-lg p-2 transition hover:bg-civic-soft"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-civic-primary/10 text-[10px] font-bold text-civic-primary mt-0.5">
                            {d.step}
                          </span>
                          <div>
                            <p className="text-xs font-semibold text-civic-ink">{d.label}</p>
                            <p className="text-[10px] text-civic-muted mt-0.5">{d.hint}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="mx-auto flex-1 w-full max-w-[1500px] px-5 py-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-civic-line bg-civic-panel">
        <div className="mx-auto max-w-[1500px] flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-[11px] font-medium text-civic-muted">
            CIVICTWIN Semarang Prototype Smart City · Lomba UNY 2026
          </p>
          <p className="text-[10px] text-civic-muted/70">
            Data publik/olahan/simulasi terbatas · CivicSense rule-based · Bukan dokumen resmi
          </p>
        </div>
      </footer>
    </div>
  );
}
