import { useState, useMemo } from "react";
import {
  mockCitizenReports,
  getReportStats,
  getReportsByCategory,
  getReportsByUrgency,
  getReportsByFeedbackType,
  getPublicFeedbackStats,
  getTopFeedbackTopics,
  CITIZEN_REPORT_DISCLAIMER,
  ReportCategory,
  ReportStatus,
  FeedbackType,
  getFeedbackBadge,
} from "../data/citizenReports";
import { mockRegions } from "../data/mockData";
import { classNames } from "../utils/classNames";
import { BrainCircuit, TriangleAlert, MapPinned, MessageCircle, ThumbsUp, Lightbulb, AlertTriangle } from "lucide-react";

// ── Feedback-type contextual label ──────────────────────────────────────
function feedbackLabel(type: FeedbackType): string {
  switch (type) {
    case "Keluhan": return "Keluhan Warga";
    case "Kritik": return "Evaluasi/Kritik Warga";
    case "Saran": return "Aspirasi Perbaikan";
    case "Apresiasi": return "Respons Positif Warga";
  }
}

export default function CitizenReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<ReportCategory | "All">("All");
  const [filterStatus, setFilterStatus] = useState<ReportStatus | "All">("All");
  const [filterRegion, setFilterRegion] = useState<string>("All");
  const [filterFeedbackType, setFilterFeedbackType] = useState<FeedbackType | "All">("All");

  const stats = getReportStats();
  const categoryStats = getReportsByCategory();
  const urgencyStats = getReportsByUrgency();
  const feedbackStats = getReportsByFeedbackType();
  const publicFeedback = getPublicFeedbackStats();
  const topTopics = getTopFeedbackTopics();

  // Find dominant category — guard against empty categoryStats
  const dominantCategory = Object.keys(categoryStats).length === 0
    ? "Tidak ada data"
    : Object.keys(categoryStats).reduce((a, b) =>
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
      const matchFeedback = filterFeedbackType === "All" || report.feedbackType === filterFeedbackType;

      return matchSearch && matchCategory && matchStatus && matchRegion && matchFeedback;
    });
  }, [searchTerm, filterCategory, filterStatus, filterRegion, filterFeedbackType]);

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

  const signalColor = (s: string) => {
    switch (s) {
      case "Perlu Perhatian": return "text-rose-700 bg-rose-50 border-rose-200";
      case "Konstruktif": return "text-blue-700 bg-blue-50 border-blue-200";
      case "Positif": return "text-green-700 bg-green-50 border-green-200";
      default: return "text-amber-700 bg-amber-50 border-amber-200";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-civic-ink">
          Citizen Feedback Intelligence
        </h1>
        <p className="mt-3 text-base leading-relaxed text-civic-muted">
          Dashboard analisis masukan masyarakat: keluhan, kritik, saran, dan apresiasi.
          CivicSense membantu klasifikasi awal dan mengarahkan masukan ke OPD terkait.
        </p>
      </header>

      {/* ── AI Triage Panel ────────────────────────────────────────── */}
      <section className="rounded-xl border border-civic-primary/30 bg-civic-primary/5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-civic-primary text-white">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-civic-primary uppercase tracking-wider">
              CivicSense AI Triage Assistant
            </h2>
            <p className="mt-1 text-sm text-civic-ink">
              Membantu klasifikasi jenis masukan warga (keluhan, kritik, saran, apresiasi),
              penentuan prioritas awal, serta memberikan rekomendasi OPD dan deteksi kebutuhan validasi.
            </p>
            <p className="mt-2 text-[10px] sm:text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-md inline-flex items-start gap-1.5">
              <TriangleAlert size={14} className="shrink-0 mt-0.5" />
              <span>AI tidak mengambil keputusan final. CivicSense AI hanya memberikan klasifikasi dan rekomendasi awal. Validasi akhir dan tindakan resmi tetap dilakukan oleh petugas/OPD terkait.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Feedback Composition Summary ──────────────────────────── */}
      <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <article className="rounded-xl border border-civic-line bg-civic-surface p-4 shadow-sm text-center">
          <p className="text-sm font-medium text-civic-muted">Total Masukan</p>
          <p className="mt-1 text-3xl font-bold text-civic-ink">{publicFeedback.total}</p>
        </article>
        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <AlertTriangle size={14} className="text-rose-600" />
            <p className="text-sm font-medium text-rose-700">Keluhan</p>
          </div>
          <p className="text-2xl font-bold text-rose-900">{feedbackStats.Keluhan}</p>
          <p className="text-[10px] text-rose-600">{publicFeedback.complaintRate}%</p>
        </article>
        <article className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <MessageCircle size={14} className="text-amber-600" />
            <p className="text-sm font-medium text-amber-700">Kritik</p>
          </div>
          <p className="text-2xl font-bold text-amber-900">{feedbackStats.Kritik}</p>
        </article>
        <article className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Lightbulb size={14} className="text-blue-600" />
            <p className="text-sm font-medium text-blue-700">Saran</p>
          </div>
          <p className="text-2xl font-bold text-blue-900">{feedbackStats.Saran}</p>
          <p className="text-[10px] text-blue-600">{publicFeedback.suggestionRate}%</p>
        </article>
        <article className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <ThumbsUp size={14} className="text-green-600" />
            <p className="text-sm font-medium text-green-700">Apresiasi</p>
          </div>
          <p className="text-2xl font-bold text-green-900">{feedbackStats.Apresiasi}</p>
          <p className="text-[10px] text-green-600">{publicFeedback.appreciationRate}%</p>
        </article>
        <article className={classNames("rounded-xl border p-4 shadow-sm text-center flex flex-col justify-center", signalColor(publicFeedback.publicSentimentSignal))}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1">Sinyal Persepsi</p>
          <p className="text-base font-bold">{publicFeedback.publicSentimentSignal}</p>
        </article>
      </section>

      {/* ── Distributions (2 Columns) ──────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Category Breakdown */}
        <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm">
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
                    style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Breakdown */}
        <div className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm">
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
                    {count as number}
                  </div>
                  <div>
                    <p className="font-semibold text-civic-ink">{urgency}</p>
                    <p className="text-xs text-civic-muted">
                      {(stats.total > 0 ? ((count as number) / stats.total) * 100 : 0).toFixed(0)}% dari total
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Filters & Search ───────────────────────────────────────── */}
      <section className="rounded-xl border border-civic-line bg-civic-surface p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-end flex-wrap">
          <div className="w-full sm:flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-civic-muted mb-1.5">Pencarian</label>
            <input
              type="text"
              placeholder="Cari kata kunci, lokasi..."
              className="w-full rounded-lg border border-civic-line bg-civic-soft px-3 py-2 text-sm focus:border-civic-primary focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40 shrink-0">
            <label className="block text-xs font-semibold text-civic-muted mb-1.5">Jenis Masukan</label>
            <select
              className="w-full rounded-lg border border-civic-line bg-civic-soft px-3 py-2 text-sm focus:border-civic-primary focus:outline-none"
              value={filterFeedbackType}
              onChange={(e) => setFilterFeedbackType(e.target.value as any)}
            >
              <option value="All">Semua Feedback</option>
              <option value="Keluhan">Keluhan</option>
              <option value="Kritik">Kritik</option>
              <option value="Saran">Saran</option>
              <option value="Apresiasi">Apresiasi</option>
            </select>
          </div>
          <div className="w-full sm:w-40 shrink-0">
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
          <div className="w-full sm:w-40 shrink-0">
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
          <div className="w-full sm:w-40 shrink-0">
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
          Daftar Masukan Warga ({filteredReports.length})
        </h3>
        {filteredReports.length === 0 ? (
          <div className="rounded-xl border border-dashed border-civic-line p-10 text-center">
            <p className="text-civic-muted">Tidak ada laporan yang sesuai dengan filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <div key={report.id} className="rounded-xl border border-civic-line bg-civic-surface flex flex-col overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="p-4 border-b border-civic-line flex flex-col gap-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={classNames("inline-flex px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide", getFeedbackBadge(report.feedbackType))}>
                        {feedbackLabel(report.feedbackType)}
                      </span>
                      {["Keluhan", "Kritik"].includes(report.feedbackType) && (
                        <span className={classNames("inline-flex px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide", getUrgencyBadge(report.urgency))}>
                          {report.urgency}
                        </span>
                      )}
                    </div>
                    <span className={classNames("inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0", getStatusBadge(report.status))}>
                      {report.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-civic-ink line-clamp-2" title={report.title}>{report.title}</h4>
                    {report.citizenStatement && (
                      <p className="text-xs italic text-civic-muted mt-1.5 line-clamp-2">"{report.citizenStatement}"</p>
                    )}
                    <p className="text-xs text-civic-muted mt-2 flex items-center gap-1.5">
                      <MapPinned size={12} className="shrink-0" /> {report.locationName} ({report.regionName})
                    </p>
                  </div>
                  {report.classificationParameters && report.classificationParameters.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {report.classificationParameters.map((p, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-civic-soft border border-civic-line text-civic-muted">{p}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 bg-civic-soft/30 flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-semibold text-civic-primary uppercase mb-1">Alasan Klasifikasi CivicSense</p>
                    <p className="text-sm text-civic-ink line-clamp-3" title={report.aiClassificationReason}>{report.aiClassificationReason}</p>
                    {report.publicInterpretation && (
                      <p className="text-xs text-civic-muted mt-1 line-clamp-2">{report.publicInterpretation}</p>
                    )}
                    <p className="text-[10px] text-civic-muted mt-1.5">Klasifikasi ini adalah draf awal CivicSense dan perlu validasi petugas/OPD.</p>
                  </div>
                  <div className="mt-auto pt-2 border-t border-civic-line/50">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-xs font-semibold text-civic-primary uppercase mb-0.5">Kategori Isu</p>
                        <p className="text-xs text-civic-muted">{report.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-civic-primary uppercase mb-0.5">OPD Tujuan</p>
                        <p className="text-xs text-civic-muted">{report.recommendedAgency}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Public Feedback Insight ─────────────────────────────────── */}
      <section className="rounded-xl border border-civic-primary/20 bg-civic-primary/5 p-6 shadow-sm space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-civic-primary">Public Feedback Insight</p>
          <h2 className="mt-1 text-base font-semibold text-civic-ink">
            Draf Ringkasan Persepsi Publik
          </h2>
          <p className="text-xs text-civic-muted mt-1">
            Berdasarkan data feedback simulasi. Bukan kesimpulan final.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-civic-line bg-white/80 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-2">Isu Paling Banyak Dikeluhkan</p>
            <p className="text-sm font-semibold text-civic-ink">{topTopics.topComplaint}</p>
            <p className="text-xs text-civic-muted mt-1">{feedbackStats.Keluhan} keluhan dari {publicFeedback.total} masukan</p>
          </div>
          <div className="rounded-lg border border-civic-line bg-white/80 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-2">Kritik yang Sering Muncul</p>
            <p className="text-sm font-semibold text-civic-ink">Transparansi & Respons Layanan</p>
            <p className="text-xs text-civic-muted mt-1">{feedbackStats.Kritik} kritik tercatat</p>
          </div>
          <div className="rounded-lg border border-civic-line bg-white/80 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2">Saran yang Paling Sering</p>
            <p className="text-sm font-semibold text-civic-ink">{topTopics.topSuggestion}</p>
            <p className="text-xs text-civic-muted mt-1">{feedbackStats.Saran} saran dari warga</p>
          </div>
          <div className="rounded-lg border border-civic-line bg-white/80 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-green-600 mb-2">Hal yang Paling Diapresiasi</p>
            <p className="text-sm font-semibold text-civic-ink">{topTopics.topAppreciation}</p>
            <p className="text-xs text-civic-muted mt-1">{feedbackStats.Apresiasi} apresiasi tercatat</p>
          </div>
        </div>

        <div className="rounded-lg border border-civic-line bg-white/60 p-3 text-xs text-civic-muted">
          <span className="font-semibold text-civic-ink">Disclaimer:</span> Kesimpulan ini bersifat indikatif dan perlu divalidasi melalui data resmi, survei kepuasan, serta evaluasi OPD. CivicSense hanya menyusun draf ringkasan persepsi publik berdasarkan data simulasi.
        </div>
      </section>

      {/* ── Footer Disclaimer ──────────────────────────────────────── */}
      <div className="rounded-lg border border-civic-line bg-civic-soft p-4 text-center space-y-2">
        <p className="text-xs text-civic-muted">
          {CITIZEN_REPORT_DISCLAIMER}
        </p>
        <p className="text-[10px] text-civic-muted/80">
          <span className="font-semibold text-civic-ink">Catatan Scoring:</span> Indikator Laporan Warga pada Priority Score terutama membaca keluhan dan kritik yang membutuhkan tindak lanjut. Saran dan apresiasi digunakan sebagai konteks persepsi publik, bukan otomatis menaikkan prioritas intervensi.
        </p>
      </div>
    </div>
  );
}
