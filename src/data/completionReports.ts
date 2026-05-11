// =============================================================================
// CIVICTWIN — Completion Reports (Laporan Penyelesaian OPD)
// STATUS: Data Prototype POC — BUKAN data resmi
// =============================================================================

import type { RelatedAgency } from "./citizenReports";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CompletionStatus = "Selesai" | "Sebagian Selesai" | "Belum Selesai";

export type ValidationStatus =
  | "Draft OPD"
  | "Diajukan untuk Validasi"
  | "Selesai Tervalidasi"
  | "Perlu Revisi Tindak Lanjut";

export interface CompletionReport {
  id: string;
  reportId: string;             // referensi ke CitizenReport.id
  regionId: string;
  agency: RelatedAgency;
  actionTaken: string;
  startedAt: string;            // ISO date
  completedAt: string;          // ISO date
  evidenceNote: string;
  beforeEvidenceLabel: string;
  afterEvidenceLabel: string;
  fieldObstacle: string;
  completionStatus: CompletionStatus;
  validationStatus: ValidationStatus;
  validatorRole: string;
  publicSummary: string;
  isPublicVisible: boolean;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const mockCompletionReports: CompletionReport[] = [
  // ── 2 × Selesai Tervalidasi ─────────────────────────────────────────
  {
    id: "comp-001",
    reportId: "rep-003",
    regionId: "semarang-utara",
    agency: "Disperkim",
    actionTaken: "Penggantian 3 unit lampu PJU LED dan perbaikan kabel instalasi di Jl. Tembus Stasiun Tawang.",
    startedAt: "2023-11-20T08:00:00Z",
    completedAt: "2023-11-20T16:00:00Z",
    evidenceNote: "Dokumentasi foto sebelum-sesudah oleh petugas lapangan Disperkim.",
    beforeEvidenceLabel: "3 titik PJU padam total di sepanjang jalan",
    afterEvidenceLabel: "3 unit LED baru terpasang dan menyala normal",
    fieldObstacle: "Akses tiang cukup sulit karena parkir kendaraan di bahu jalan.",
    completionStatus: "Selesai",
    validationStatus: "Selesai Tervalidasi",
    validatorRole: "Petugas Kelurahan Tanjung Mas",
    publicSummary: "Perbaikan lampu jalan di 3 titik di Jl. Tembus Stasiun Tawang telah selesai. Penerangan sudah normal kembali.",
    isPublicVisible: true,
  },
  {
    id: "comp-002",
    reportId: "rep-013",
    regionId: "banyumanik",
    agency: "Disperkim",
    actionTaken: "Evakuasi dahan pohon tumbang dan pembersihan area jalan di Tanjakan Gombel.",
    startedAt: "2023-11-23T16:00:00Z",
    completedAt: "2023-11-23T19:30:00Z",
    evidenceNote: "Foto dokumentasi tim Disperkim dibantu warga sekitar.",
    beforeEvidenceLabel: "Dahan besar menutupi 1 lajur jalan tanjakan",
    afterEvidenceLabel: "Jalan bersih, lalu lintas normal kembali",
    fieldObstacle: "Hujan deras saat evakuasi, butuh alat berat tambahan.",
    completionStatus: "Selesai",
    validationStatus: "Selesai Tervalidasi",
    validatorRole: "Camat Banyumanik",
    publicSummary: "Pohon tumbang di Tanjakan Gombel berhasil dievakuasi dalam waktu 3,5 jam. Jalan sudah dapat dilalui normal.",
    isPublicVisible: true,
  },

  // ── 2 × Diajukan untuk Validasi ────────────────────────────────────
  {
    id: "comp-003",
    reportId: "rep-001",
    regionId: "semarang-utara",
    agency: "DLH",
    actionTaken: "Pengerukan saluran utama Tambak Lorok sepanjang 200m dan pengangkutan 3 truk sampah.",
    startedAt: "2023-11-22T07:00:00Z",
    completedAt: "2023-11-23T15:00:00Z",
    evidenceNote: "Dokumentasi foto proses pengerukan oleh tim DLH.",
    beforeEvidenceLabel: "Saluran tersumbat sampah, air meluap ke jalan",
    afterEvidenceLabel: "Saluran bersih, aliran air lancar",
    fieldObstacle: "Volume sampah jauh lebih banyak dari estimasi awal.",
    completionStatus: "Selesai",
    validationStatus: "Diajukan untuk Validasi",
    validatorRole: "Menunggu validasi Lurah Tanjung Mas",
    publicSummary: "Pengerukan saluran di Tambak Lorok telah dilaksanakan. Menunggu validasi kelurahan.",
    isPublicVisible: false,
  },
  {
    id: "comp-004",
    reportId: "rep-010",
    regionId: "pedurungan",
    agency: "Dinas PU",
    actionTaken: "Pemasangan water barrier, patching aspal darurat, dan perbaikan fondasi jalan di Koridor Majapahit.",
    startedAt: "2023-11-25T06:00:00Z",
    completedAt: "2023-11-27T17:00:00Z",
    evidenceNote: "Foto sebelum-sesudah oleh pengawas proyek Dinas PU.",
    beforeEvidenceLabel: "Lubang amblas diameter 2m di tengah jalan",
    afterEvidenceLabel: "Aspal baru rata, rambu bahaya dicabut",
    fieldObstacle: "Hujan menghambat pengeringan material patching.",
    completionStatus: "Selesai",
    validationStatus: "Diajukan untuk Validasi",
    validatorRole: "Menunggu validasi Camat Pedurungan",
    publicSummary: "Perbaikan jalan amblas di Koridor Majapahit telah dilaksanakan. Menunggu validasi kecamatan.",
    isPublicVisible: false,
  },

  // ── 1 × Perlu Revisi Tindak Lanjut ────────────────────────────────
  {
    id: "comp-005",
    reportId: "rep-016",
    regionId: "semarang-tengah",
    agency: "Dishub",
    actionTaken: "Operasi penertiban parkir liar di depan mal Simpang Lima selama 2 hari.",
    startedAt: "2023-11-25T14:00:00Z",
    completedAt: "2023-11-26T20:00:00Z",
    evidenceNote: "Laporan operasi gabungan Dishub dan Satpol PP.",
    beforeEvidenceLabel: "Parkir berlapis memakan 2 lajur jalan",
    afterEvidenceLabel: "Area tertib selama operasi, kembali semrawut H+2",
    fieldObstacle: "Tidak ada solusi permanen kantong parkir alternatif.",
    completionStatus: "Sebagian Selesai",
    validationStatus: "Perlu Revisi Tindak Lanjut",
    validatorRole: "Command Center Kota Semarang",
    publicSummary: "Operasi penertiban parkir liar telah dilakukan namun belum efektif jangka panjang. Perlu solusi parkir alternatif.",
    isPublicVisible: true,
  },

  // ── 1 × Draft OPD ──────────────────────────────────────────────────
  {
    id: "comp-006",
    reportId: "rep-004",
    regionId: "genuk",
    agency: "Dishub",
    actionTaken: "Penyusunan rencana rekayasa lalu lintas di Koridor Kaligawe–Terboyo.",
    startedAt: "2023-11-28T09:00:00Z",
    completedAt: "2023-11-28T17:00:00Z",
    evidenceNote: "Draft laporan internal Dishub, belum final.",
    beforeEvidenceLabel: "Kemacetan total saat genangan banjir",
    afterEvidenceLabel: "Rencana jalur alternatif sudah disusun",
    fieldObstacle: "Perlu koordinasi dengan Dinas PU untuk perbaikan drainase.",
    completionStatus: "Belum Selesai",
    validationStatus: "Draft OPD",
    validatorRole: "Belum diajukan",
    publicSummary: "Dishub sedang menyusun rencana rekayasa lalu lintas. Laporan masih dalam tahap draft.",
    isPublicVisible: false,
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getCompletionReports(): CompletionReport[] {
  return mockCompletionReports;
}

export function getCompletionReportsByRegion(regionId: string): CompletionReport[] {
  return mockCompletionReports.filter(r => r.regionId === regionId);
}

export function getCompletionReportByReportId(reportId: string): CompletionReport | undefined {
  return mockCompletionReports.find(r => r.reportId === reportId);
}

export interface ResolutionStats {
  total: number;
  validated: number;
  pendingValidation: number;
  needsRevision: number;
  draft: number;
  averageResolutionDays: number;
  resolutionRate: number; // percentage of validated vs total
}

function calcDays(start: string, end: string): number {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24) * 10) / 10);
}

export function getResolutionStats(): ResolutionStats {
  const reports = mockCompletionReports;
  const total = reports.length;
  const validated = reports.filter(r => r.validationStatus === "Selesai Tervalidasi").length;
  const pendingValidation = reports.filter(r => r.validationStatus === "Diajukan untuk Validasi").length;
  const needsRevision = reports.filter(r => r.validationStatus === "Perlu Revisi Tindak Lanjut").length;
  const draft = reports.filter(r => r.validationStatus === "Draft OPD").length;

  const days = reports.map(r => calcDays(r.startedAt, r.completedAt));
  const averageResolutionDays = days.length > 0
    ? Math.round((days.reduce((a, b) => a + b, 0) / days.length) * 10) / 10
    : 0;

  const resolutionRate = total > 0 ? Math.round((validated / total) * 100) : 0;

  return { total, validated, pendingValidation, needsRevision, draft, averageResolutionDays, resolutionRate };
}

export function getResolutionStatsByRegion(regionId: string): ResolutionStats {
  const reports = mockCompletionReports.filter(r => r.regionId === regionId);
  const total = reports.length;
  const validated = reports.filter(r => r.validationStatus === "Selesai Tervalidasi").length;
  const pendingValidation = reports.filter(r => r.validationStatus === "Diajukan untuk Validasi").length;
  const needsRevision = reports.filter(r => r.validationStatus === "Perlu Revisi Tindak Lanjut").length;
  const draft = reports.filter(r => r.validationStatus === "Draft OPD").length;

  const days = reports.map(r => calcDays(r.startedAt, r.completedAt));
  const averageResolutionDays = days.length > 0
    ? Math.round((days.reduce((a, b) => a + b, 0) / days.length) * 10) / 10
    : 0;

  const resolutionRate = total > 0 ? Math.round((validated / total) * 100) : 0;

  return { total, validated, pendingValidation, needsRevision, draft, averageResolutionDays, resolutionRate };
}

// ─── Badge Helper ────────────────────────────────────────────────────────────

export function getValidationBadge(status: ValidationStatus): string {
  switch (status) {
    case "Selesai Tervalidasi":
      return "bg-green-100 text-green-700 border-green-200";
    case "Diajukan untuk Validasi":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Perlu Revisi Tindak Lanjut":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Draft OPD":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
}

// ─── Disclaimer ──────────────────────────────────────────────────────────────

export const COMPLETION_REPORT_DISCLAIMER =
  "Laporan penyelesaian pada prototype ini adalah simulasi untuk proof of concept. " +
  "Pada implementasi nyata, validasi dilakukan oleh petugas kelurahan, kecamatan, atau command center. " +
  "Data bukti penyelesaian tidak menggunakan foto/dokumen asli.";
