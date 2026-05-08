import { useState, useMemo } from "react";
import {
  mockCitizenReports,
  getReportStats,
  getReportsByCategory,
  getReportsByUrgency,
  CITIZEN_REPORT_DISCLAIMER,
  ReportCategory,
  ReportStatus,
} from "../data/citizenReports";
import { mockRegions } from "../data/mockData";
import { classNames } from "../utils/classNames";

export default function CitizenReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<ReportCategory | "All">("All");
  const [filterStatus, setFilterStatus] = useState<ReportStatus | "All">("All");
  const [filterRegion, setFilterRegion] = useState<string>("All");

  const stats = getReportStats();
  const categoryStats = getReportsByCategory();
  const urgencyStats = getReportsByUrgency();

  // Find dominant category
  const dominantCategory = Object.keys(categoryStats).reduce((a, b) =>
    categoryStats[a as ReportCategory] > categoryStats[b as ReportCategory] ? a : b
  );

  const filteredReports = useMemo(() => {
    return mockCitizenReports.filter((report) => {
      const matchSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.locationName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = filterCategory === "All" || report.category === filterCategory;
      const matchStatus = filterStatus === "All" || report.status === filterStatus;
      const matchRegion = filterRegion === "All" || report.regionId === filterRegion;

      return matchSearch && matchCategory && matchStatus && matchRegion;
    });
  }, [searchTerm, filterCategory, filterStatus, filterRegion]);

  // Color mapping for urgency
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "Kritis":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "Tinggi":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Sedang":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Rendah":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Color mapping for status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Baru Masuk":
        return "bg-blue-100 text-blue-700";
      case "Perlu Validasi":
        return "bg-amber-100 text-amber-700";
      case "Tervalidasi":
      case "Diteruskan ke OPD":
      case "Dalam Tindak Lanjut":
        return "bg-indigo-100 text-indigo-700";
      case "Selesai":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-civic-ink">
          Citizen Report Intelligence
        </h1>
        <p className="mt-3 text-base leading-relaxed text-civic-muted">
          Dashboard analisis laporan masyarakat untuk membantu pemerintah mengelompokkan isu kota, 
          menentukan urgensi awal, dan mengarahkan laporan ke OPD terkait.
        </p>
      </header>

      {/* ── AI Triage Panel ────────────────────────────────────────── */}
      <section className="rounded-xl border border-civic-primary/30 bg-civic-primary/5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-civic-primary text-white text-xl">
            🤖
          </div>
          <div>
            <h2 className="text-sm font-bold text-civic-primary uppercase tracking-wider">
              CivicSense AI Triage Assistant
            </h2>
            <p className="mt-1 text-sm text-civic-ink">
              Membantu klasifikasi kategori, ringkasan laporan, penentuan prioritas awal, 
              serta memberikan rekomendasi OPD dan deteksi kebutuhan validasi.
            </p>
            <p className="mt-2 text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-md inline-block">
              ⚠️ AI tidak mengambil keputusan final. CivicSense AI hanya memberikan klasifikasi dan rekomendasi awal. 
              Validasi akhir dan tindakan resmi tetap dilakukan oleh petugas/OPD terkait.
            </p>
          </div>
        </div>
      </section>

      {/* ── Summary Cards ──────────────────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-civic-line bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-civic-muted">Total Laporan (Simulasi)</p>
          <p className="mt-2 text-3xl font-bold text-civic-ink">{stats.total}</p>
        </article>
        <article className="rounded-xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-rose-700">Urgensi Tinggi/Kritis</p>
          <p className="mt-2 text-3xl font-bold text-rose-900">
            {stats.critical + (urgencyStats["Tinggi"] || 0)}
          </p>
        </article>
        <article className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-amber-700">Perlu Validasi OPD</p>
          <p className="mt-2 text-3xl font-bold text-amber-900">
            {mockCitizenReports.filter(r => r.status === "Perlu Validasi" || r.status === "Baru Masuk").length}
          </p>
        </article>
        <article className="rounded-xl border border-civic-line bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-civic-muted">Isu Paling Dominan</p>
          <p className="mt-2 text-xl font-bold text-civic-ink break-words leading-tight h-9 flex items-center">
            {dominantCategory}
          </p>
        </article>
      </section>

      {/* ── Distributions (2 Columns) ──────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Category Breakdown */}
        <div className="rounded-xl border border-civic-line bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-civic-primary mb-4">
            Kategori Laporan
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).map(([category, count]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-civic-ink">{category}</span>
                  <span className="text-civic-muted">{count} laporan</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-civic-soft">
                  <div 
                    className="h-full bg-civic-primary" 
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Breakdown */}
        <div className="rounded-xl border border-civic-line bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-civic-primary mb-4">
            Distribusi Urgensi
          </h3>
          <div className="space-y-4">
            {Object.entries(urgencyStats).map(([urgency, count]) => {
              const bgClass = urgency === "Kritis" ? "bg-rose-500" :
                              urgency === "Tinggi" ? "bg-orange-500" :
                              urgency === "Sedang" ? "bg-amber-500" : "bg-green-500";
              return (
                <div key={urgency} className="flex items-center gap-3">
                  <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-white font-bold ${bgClass}`}>
                    {count}
                  </div>
                  <div>
                    <p className="font-semibold text-civic-ink">{urgency}</p>
                    <p className="text-xs text-civic-muted">
                      {((count / stats.total) * 100).toFixed(0)}% dari total laporan
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Filters & Search ───────────────────────────────────────── */}
      <section className="rounded-xl border border-civic-line bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:flex-1">
            <label className="block text-xs font-semibold text-civic-muted mb-1.5">Pencarian</label>
            <input
              type="text"
              placeholder="Cari kata kunci, lokasi..."
              className="w-full rounded-lg border border-civic-line bg-civic-soft px-3 py-2 text-sm focus:border-civic-primary focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48 shrink-0">
            <label className="block text-xs font-semibold text-civic-muted mb-1.5">Kategori</label>
            <select
              className="w-full rounded-lg border border-civic-line bg-civic-soft px-3 py-2 text-sm focus:border-civic-primary focus:outline-none"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
            >
              <option value="All">Semua Kategori</option>
              {Object.keys(categoryStats).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-48 shrink-0">
            <label className="block text-xs font-semibold text-civic-muted mb-1.5">Status</label>
            <select
              className="w-full rounded-lg border border-civic-line bg-civic-soft px-3 py-2 text-sm focus:border-civic-primary focus:outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="All">Semua Status</option>
              <option value="Baru Masuk">Baru Masuk</option>
              <option value="Perlu Validasi">Perlu Validasi</option>
              <option value="Tervalidasi">Tervalidasi</option>
              <option value="Diteruskan ke OPD">Diteruskan ke OPD</option>
              <option value="Dalam Tindak Lanjut">Dalam Tindak Lanjut</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          <div className="w-full sm:w-48 shrink-0">
            <label className="block text-xs font-semibold text-civic-muted mb-1.5">Kecamatan</label>
            <select
              className="w-full rounded-lg border border-civic-line bg-civic-soft px-3 py-2 text-sm focus:border-civic-primary focus:outline-none"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="All">Semua Wilayah</option>
              {mockRegions.map(reg => (
                <option key={reg.id} value={reg.id}>{reg.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* ── Reports List ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-civic-primary mb-2">
          Daftar Laporan ({filteredReports.length})
        </h3>
        {filteredReports.length === 0 ? (
          <div className="rounded-xl border border-dashed border-civic-line p-10 text-center">
            <p className="text-civic-muted">Tidak ada laporan yang sesuai dengan filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <div key={report.id} className="rounded-xl border border-civic-line bg-white flex flex-col overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="p-4 border-b border-civic-line flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className={classNames("inline-flex px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide", getUrgencyBadge(report.urgency))}>
                      {report.urgency}
                    </span>
                    <span className={classNames("inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold", getStatusBadge(report.status))}>
                      {report.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-civic-ink line-clamp-2" title={report.title}>{report.title}</h4>
                    <p className="text-xs text-civic-muted mt-1 flex items-center gap-1">
                      <span>📍</span> {report.locationName} ({report.regionName})
                    </p>
                  </div>
                </div>
                
                <div className="p-4 flex-1 bg-civic-soft/30 flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-semibold text-civic-primary uppercase mb-1">Draft AI Summary</p>
                    <p className="text-sm text-civic-ink line-clamp-3" title={report.summary}>{report.summary}</p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs font-semibold text-civic-primary uppercase mb-1">Saran Tindakan Lanjut</p>
                    <p className="text-xs text-civic-muted line-clamp-2" title={report.recommendedAction}>{report.recommendedAction}</p>
                    <p className="text-xs font-medium text-civic-ink mt-2">
                      <span className="text-civic-muted">OPD Tujuan: </span>
                      {report.recommendedAgency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Footer Disclaimer ──────────────────────────────────────── */}
      <div className="rounded-lg border border-civic-line bg-civic-soft p-4 text-center">
        <p className="text-xs text-civic-muted">
          {CITIZEN_REPORT_DISCLAIMER}
        </p>
      </div>
    </div>
  );
}
