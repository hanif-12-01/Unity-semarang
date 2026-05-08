// =============================================================================
// CIVICTWIN - Mock Data Citizen Reports & Issue Hotspots
// STATUS: Data Prototype POC - BUKAN data asli
// =============================================================================

export type ReportCategory = "Banjir/Rob" | "Kemacetan" | "Jalan Rusak" | "Sampah" | "Lampu Jalan" | "Layanan Publik" | "Keamanan/Ketertiban";
export type ReportUrgency = "Rendah" | "Sedang" | "Tinggi" | "Kritis";
export type ReportStatus = "Baru Masuk" | "Perlu Validasi" | "Tervalidasi" | "Diteruskan ke OPD" | "Dalam Tindak Lanjut" | "Selesai" | "Tidak Dapat Ditindaklanjuti";
export type RelatedAgency = "Dinas PU" | "Dishub" | "DLH" | "Disperkim" | "Satpol PP" | "BPBD" | "Dinkes" | "Lainnya";

export interface CitizenReport {
  id: string;
  title: string;
  category: ReportCategory;
  urgency: ReportUrgency;
  status: ReportStatus;
  regionId: string;
  regionName: string;
  locationName: string;
  locationDetail: string;
  reportedAt: string;
  summary: string;
  aiClassificationReason: string;
  recommendedAgency: RelatedAgency;
  recommendedAction: string;
  isPersonalDataMasked: boolean;
  validationNote: string;
}

export interface IssueHotspot {
  id: string;
  regionId: string;
  name: string;
  issueType: ReportCategory;
  locationDetail: string;
  urgency: ReportUrgency;
  relatedAgency: RelatedAgency;
  status: ReportStatus;
  description: string;
  dataStatus: string;
  validationNote: string;
}

// ---------------------------------------------------------------------------
// MOCK DATA: Laporan Masyarakat (18 Laporan - 3 per Kecamatan)
// ---------------------------------------------------------------------------

export const mockCitizenReports: CitizenReport[] = [
  // SEMARANG UTARA
  {
    id: "rep-001",
    title: "Tumpukan Sampah di Saluran Tambak Lorok",
    category: "Sampah",
    urgency: "Tinggi",
    status: "Dalam Tindak Lanjut",
    regionId: "semarang-utara",
    regionName: "Semarang Utara",
    locationName: "Kawasan Tambak Lorok",
    locationDetail: "Saluran utama pembuangan air warga Tambak Lorok",
    reportedAt: "2023-11-20T08:30:00Z",
    summary: "Sampah rumah tangga menyumbat saluran air, berpotensi memperparah banjir rob.",
    aiClassificationReason: "Kata kunci 'sampah' dan 'menyumbat saluran' mengindikasikan masalah sanitasi tinggi menjelang musim hujan.",
    recommendedAgency: "DLH",
    recommendedAction: "Kirim tim kebersihan untuk pengerukan saluran segera.",
    isPersonalDataMasked: true,
    validationNote: "Telah divalidasi oleh petugas DLH, sedang dijadwalkan pengerukan.",
  },
  {
    id: "rep-002",
    title: "Genangan Rob di Akses Tanjung Mas",
    category: "Banjir/Rob",
    urgency: "Kritis",
    status: "Diteruskan ke OPD",
    regionId: "semarang-utara",
    regionName: "Semarang Utara",
    locationName: "Kawasan Tanjung Mas",
    locationDetail: "Akses jalan menuju pelabuhan penumpang",
    reportedAt: "2023-11-21T09:15:00Z",
    summary: "Air pasang setinggi 50cm menggenangi akses jalan pelabuhan, kendaraan kecil mogok.",
    aiClassificationReason: "Tingkat air 50cm dan lokasi strategis (akses pelabuhan) memicu urgensi Kritis.",
    recommendedAgency: "BPBD",
    recommendedAction: "Pengerahan pompa mobile dan bantuan evakuasi kendaraan mogok.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu alokasi pompa dari BPBD.",
  },
  {
    id: "rep-003",
    title: "Lampu Jalan Padam di Kota Lama Utara",
    category: "Lampu Jalan",
    urgency: "Sedang",
    status: "Selesai",
    regionId: "semarang-utara",
    regionName: "Semarang Utara",
    locationName: "Perbatasan Kota Lama",
    locationDetail: "Jalan tembus menuju stasiun Tawang",
    reportedAt: "2023-11-19T18:45:00Z",
    summary: "Lampu penerangan jalan mati berturut-turut di 3 titik.",
    aiClassificationReason: "Keluhan fasilitas umum standar, tidak mengancam jiwa secara langsung.",
    recommendedAgency: "Disperkim",
    recommendedAction: "Perbaikan instalasi jaringan listrik LPJU.",
    isPersonalDataMasked: true,
    validationNote: "Sudah diperbaiki pada 20 Nov 2023.",
  },

  // GENUK
  {
    id: "rep-004",
    title: "Macet Parah karena Genangan Kaligawe",
    category: "Kemacetan",
    urgency: "Tinggi",
    status: "Perlu Validasi",
    regionId: "genuk",
    regionName: "Genuk",
    locationName: "Koridor Kaligawe–Terboyo",
    locationDetail: "Di bawah jembatan tol Kaligawe",
    reportedAt: "2023-11-22T07:10:00Z",
    summary: "Arus lalu lintas lumpuh total akibat adanya sisa genangan banjir.",
    aiClassificationReason: "Dampak ganda: genangan dan kelumpuhan arteri utama lintas kota.",
    recommendedAgency: "Dishub",
    recommendedAction: "Rekayasa lalu lintas pengalihan arus ke jalur alternatif dan pengaturan simpang.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu konfirmasi visual CCTV Dishub.",
  },
  {
    id: "rep-005",
    title: "Jalan Berlubang di Area Industri Terboyo",
    category: "Jalan Rusak",
    urgency: "Sedang",
    status: "Tervalidasi",
    regionId: "genuk",
    regionName: "Genuk",
    locationName: "Kawasan Industri Terboyo",
    locationDetail: "Jalan masuk utama blok A",
    reportedAt: "2023-11-20T14:20:00Z",
    summary: "Aspal mengelupas lebar dan dalam, membahayakan pengendara motor pekerja pabrik.",
    aiClassificationReason: "Potensi kecelakaan tinggi bagi pekerja bermotor di jam sibuk.",
    recommendedAgency: "Dinas PU",
    recommendedAction: "Patching aspal sementara di area lubang terdalam.",
    isPersonalDataMasked: true,
    validationNote: "Petugas PU telah mensurvei lokasi.",
  },
  {
    id: "rep-006",
    title: "Keterlambatan Pengangkutan Sampah Pasar",
    category: "Sampah",
    urgency: "Rendah",
    status: "Selesai",
    regionId: "genuk",
    regionName: "Genuk",
    locationName: "Pasar Genuk",
    locationDetail: "TPS sementara belakang pasar",
    reportedAt: "2023-11-18T06:00:00Z",
    summary: "Sampah pasar belum diangkut selama 2 hari sehingga bau menyengat.",
    aiClassificationReason: "Isu sanitasi lokal pasar, rutin terjadi.",
    recommendedAgency: "DLH",
    recommendedAction: "Penambahan ritase truk pengangkut ke TPA.",
    isPersonalDataMasked: true,
    validationNote: "Diangkut penuh pagi ini.",
  },

  // TUGU
  {
    id: "rep-007",
    title: "Parkir Truk Liar di Bahu Jalan Raya",
    category: "Keamanan/Ketertiban",
    urgency: "Tinggi",
    status: "Dalam Tindak Lanjut",
    regionId: "tugu",
    regionName: "Tugu",
    locationName: "Kawasan Mangkang–Tugu",
    locationDetail: "Sepanjang jalan raya Mangkang sebelum terminal",
    reportedAt: "2023-11-23T11:00:00Z",
    summary: "Banyak truk logistik parkir liar memakan bahu jalan, rawan kecelakaan.",
    aiClassificationReason: "Pelanggaran ketertiban yang membahayakan lalu lintas arteri padat kendaraan.",
    recommendedAgency: "Satpol PP",
    recommendedAction: "Operasi gabungan penertiban parkir bersama Dishub dan Kepolisian.",
    isPersonalDataMasked: true,
    validationNote: "Sedang dikoordinasikan jadwal operasi penertiban.",
  },
  {
    id: "rep-008",
    title: "Polusi Asap Pabrik di Malam Hari",
    category: "Layanan Publik",
    urgency: "Sedang",
    status: "Perlu Validasi",
    regionId: "tugu",
    regionName: "Tugu",
    locationName: "Kawasan Industri Wijayakusuma",
    locationDetail: "Area pemukiman berbatasan dengan zona pabrik",
    reportedAt: "2023-11-21T22:30:00Z",
    summary: "Keluhan bau menyengat dari pembuangan asap pabrik saat larut malam.",
    aiClassificationReason: "Isu lingkungan (polusi udara) berulang di zona perbatasan industri.",
    recommendedAgency: "DLH",
    recommendedAction: "Inspeksi mendadak uji emisi udara pada operasional pabrik malam hari.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu laporan spesifik nama pabrik terduga.",
  },
  {
    id: "rep-009",
    title: "Lampu Merah Pertigaan Rusak",
    category: "Lampu Jalan",
    urgency: "Tinggi",
    status: "Selesai",
    regionId: "tugu",
    regionName: "Tugu",
    locationName: "Simpang Mangkang",
    locationDetail: "Traffic light simpang tiga arah masuk kota",
    reportedAt: "2023-11-22T08:15:00Z",
    summary: "Traffic light padam menyebabkan arus lalu lintas kacau di simpang Mangkang.",
    aiClassificationReason: "Infrastruktur vital lalu lintas mati, memicu kemacetan dan risiko tabrakan.",
    recommendedAgency: "Dishub",
    recommendedAction: "Perbaikan modul kontrol traffic light segera.",
    isPersonalDataMasked: true,
    validationNote: "Telah diganti dengan modul cadangan siang tadi.",
  },

  // PEDURUNGAN
  {
    id: "rep-010",
    title: "Jalan Amblas Pasca Hujan Deras",
    category: "Jalan Rusak",
    urgency: "Kritis",
    status: "Diteruskan ke OPD",
    regionId: "pedurungan",
    regionName: "Pedurungan",
    locationName: "Koridor Majapahit–Pedurungan",
    locationDetail: "Sebelum traffic light Pedurungan arah timur",
    reportedAt: "2023-11-24T06:45:00Z",
    summary: "Bagian tengah aspal amblas membentuk lubang besar dan dalam.",
    aiClassificationReason: "Kerusakan infrastruktur jalan kategori berat di jalur utama lintas timur.",
    recommendedAgency: "Dinas PU",
    recommendedAction: "Pemasangan rambu bahaya dan rencana rekonstruksi lapisan jalan darurat.",
    isPersonalDataMasked: true,
    validationNote: "Dishub sudah pasang *water barrier*, PU sedang menyusun material.",
  },
  {
    id: "rep-011",
    title: "Penumpukan Kendaraan Jam Pulang Kerja",
    category: "Kemacetan",
    urgency: "Sedang",
    status: "Baru Masuk",
    regionId: "pedurungan",
    regionName: "Pedurungan",
    locationName: "Pertigaan Supriyadi",
    locationDetail: "Arah masuk pemukiman Tlogosari",
    reportedAt: "2023-11-24T17:20:00Z",
    summary: "Volume kendaraan over-kapasitas saat jam pulang kerja sore hari.",
    aiClassificationReason: "Pola kemacetan rutin harian di simpang padat pemukiman.",
    recommendedAgency: "Dishub",
    recommendedAction: "Penempatan petugas lapangan pada jam 16:30 - 18:30.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu review.",
  },
  {
    id: "rep-012",
    title: "Antrean Pendaftaran Layanan Kelurahan",
    category: "Layanan Publik",
    urgency: "Rendah",
    status: "Tidak Dapat Ditindaklanjuti",
    regionId: "pedurungan",
    regionName: "Pedurungan",
    locationName: "Area Tlogosari",
    locationDetail: "Kantor Kelurahan Tlogosari Kulon",
    reportedAt: "2023-11-19T10:00:00Z",
    summary: "Warga mengeluhkan server antrean dukcapil sering gangguan di kelurahan.",
    aiClassificationReason: "Kendala server pusat/jaringan yang dilaporkan via level kelurahan.",
    recommendedAgency: "Lainnya",
    recommendedAction: "Koordinasi dengan Disdukcapil untuk stabilisasi sistem lokal.",
    isPersonalDataMasked: true,
    validationNote: "Masalah ada pada server pusat nasional, bukan kewenangan lokal kelurahan.",
  },

  // BANYUMANIK
  {
    id: "rep-013",
    title: "Pohon Tumbang Menutup Sebagian Jalan",
    category: "Keamanan/Ketertiban",
    urgency: "Tinggi",
    status: "Selesai",
    regionId: "banyumanik",
    regionName: "Banyumanik",
    locationName: "Area Setiabudi–Banyumanik",
    locationDetail: "Tanjakan Gombel",
    reportedAt: "2023-11-23T15:30:00Z",
    summary: "Dahan pohon besar patah menutupi satu lajur jalan tanjakan, membahayakan pengendara.",
    aiClassificationReason: "Rintangan fisik berbahaya di jalur cepat / tanjakan curam.",
    recommendedAgency: "Disperkim",
    recommendedAction: "Pemotongan dahan dan pembersihan area jalan oleh tim pertamanan.",
    isPersonalDataMasked: true,
    validationNote: "Sudah dievakuasi tim Disperkim dibantu warga.",
  },
  {
    id: "rep-014",
    title: "Kemacetan Panjang Akhir Pekan",
    category: "Kemacetan",
    urgency: "Sedang",
    status: "Tervalidasi",
    regionId: "banyumanik",
    regionName: "Banyumanik",
    locationName: "Kawasan Tembalang Bawah",
    locationDetail: "Pintu Keluar Tol Banyumanik",
    reportedAt: "2023-11-18T16:00:00Z",
    summary: "Antrean panjang keluar tol imbas volume kendaraan wisata.",
    aiClassificationReason: "Kemacetan musiman/akhir pekan di titik gerbang tol.",
    recommendedAgency: "Dishub",
    recommendedAction: "Pengaturan ritme lampu merah di simpang keluar tol.",
    isPersonalDataMasked: true,
    validationNote: "Telah tercatat sebagai pola kemacetan rutin akhir pekan.",
  },
  {
    id: "rep-015",
    title: "Minim Penerangan di Jalan Lingkungan Baru",
    category: "Lampu Jalan",
    urgency: "Sedang",
    status: "Dalam Tindak Lanjut",
    regionId: "banyumanik",
    regionName: "Banyumanik",
    locationName: "Perumahan Banyumanik Atas",
    locationDetail: "Jalan akses perumahan baru",
    reportedAt: "2023-11-21T19:00:00Z",
    summary: "Area pengembangan perumahan belum memiliki lampu jalan memadai, gelap total di malam hari.",
    aiClassificationReason: "Kebutuhan infrastruktur baru di wilayah pengembangan selatan.",
    recommendedAgency: "Disperkim",
    recommendedAction: "Survei kebutuhan titik tiang LPJU baru.",
    isPersonalDataMasked: true,
    validationNote: "Sedang tahap penyusunan RAB untuk penambahan tiang.",
  },

  // SEMARANG TENGAH
  {
    id: "rep-016",
    title: "Parkir Liar Kendaraan Seputar Mal",
    category: "Kemacetan",
    urgency: "Tinggi",
    status: "Diteruskan ke OPD",
    regionId: "semarang-tengah",
    regionName: "Semarang Tengah",
    locationName: "Simpang Lima",
    locationDetail: "Bahu jalan depan pusat perbelanjaan utama",
    reportedAt: "2023-11-24T18:30:00Z",
    summary: "Ojek online dan mobil pengunjung parkir berlapis memakan dua lajur jalan.",
    aiClassificationReason: "Pelanggaran ketertiban yang berdampak masif pada kemacetan pusat kota.",
    recommendedAgency: "Dishub",
    recommendedAction: "Operasi gembok roda dan derek paksa, serta sosialisasi kantong parkir ojol.",
    isPersonalDataMasked: true,
    validationNote: "Telah dilaporkan ke tim patroli Dishub wilayah tengah.",
  },
  {
    id: "rep-017",
    title: "Fasilitas Halte Trans Semarang Rusak",
    category: "Layanan Publik",
    urgency: "Sedang",
    status: "Perlu Validasi",
    regionId: "semarang-tengah",
    regionName: "Semarang Tengah",
    locationName: "Kawasan Pemuda",
    locationDetail: "Halte Balai Kota",
    reportedAt: "2023-11-23T09:40:00Z",
    summary: "Atap halte bocor dan tempat duduk pengunjung patah.",
    aiClassificationReason: "Kerusakan aset fasilitas umum layanan transportasi masal.",
    recommendedAgency: "Dishub",
    recommendedAction: "Perbaikan kanopi atap dan penggantian bangku tunggu halte.",
    isPersonalDataMasked: true,
    validationNote: "Perlu konfirmasi pihak pengelola BLU Trans Semarang.",
  },
  {
    id: "rep-018",
    title: "Tumpukan Sampah Usai Acara Car Free Day",
    category: "Sampah",
    urgency: "Sedang",
    status: "Selesai",
    regionId: "semarang-tengah",
    regionName: "Semarang Tengah",
    locationName: "Simpang Lima",
    locationDetail: "Selatan lapangan Simpang Lima",
    reportedAt: "2023-11-19T10:30:00Z",
    summary: "Banyak sampah plastik dan sisa makanan tertinggal dari PKL setelah jam CFD selesai.",
    aiClassificationReason: "Masalah kebersihan paska event massal.",
    recommendedAgency: "DLH",
    recommendedAction: "Pengerahan tim penyapu jalan susulan.",
    isPersonalDataMasked: true,
    validationNote: "Tim kebersihan telah menyisir lokasi jam 11:00 WIB.",
  }
];

// ---------------------------------------------------------------------------
// MOCK DATA: Issue Hotspots (Pemetaan Masalah per Wilayah)
// ---------------------------------------------------------------------------

export const mockIssueHotspots: IssueHotspot[] = [
  {
    id: "hot-gen-1",
    regionId: "genuk",
    name: "Titik Rawan Rob Kaligawe",
    issueType: "Banjir/Rob",
    locationDetail: "Koridor Kaligawe–Terboyo di bawah jembatan Tol",
    urgency: "Kritis",
    relatedAgency: "Dinas PU",
    status: "Dalam Tindak Lanjut",
    description: "Cekungan jalan arteri yang menjadi titik kumpul genangan saat rob naik dan curah hujan tinggi.",
    dataStatus: "Simulasi Prototype",
    validationNote: "Sudah masuk masterplan pemompaan permanen."
  },
  {
    id: "hot-smgu-1",
    regionId: "semarang-utara",
    name: "Titik Kumuh & Sanitasi Tambak Lorok",
    issueType: "Sampah",
    locationDetail: "Saluran utama permukiman pesisir Tambak Lorok",
    urgency: "Tinggi",
    relatedAgency: "DLH",
    status: "Perlu Validasi",
    description: "Area muara saluran air yang sering tersumbat sampah rumah tangga dari hulu kota.",
    dataStatus: "Simulasi Prototype",
    validationNote: "Butuh koordinasi lintas sektoral untuk normalisasi."
  },
  {
    id: "hot-tug-1",
    regionId: "tugu",
    name: "Titik Parkir Liar Industri",
    issueType: "Keamanan/Ketertiban",
    locationDetail: "Kawasan Mangkang arah Kendal",
    urgency: "Sedang",
    relatedAgency: "Dishub",
    status: "Tervalidasi",
    description: "Bahu jalan utama sering dijadikan lokasi tunggu bongkar muat truk industri besar.",
    dataStatus: "Simulasi Prototype",
    validationNote: "Operasi patroli rutin dijadwalkan."
  },
  {
    id: "hot-ped-1",
    regionId: "pedurungan",
    name: "Simpang Macet Supriyadi",
    issueType: "Kemacetan",
    locationDetail: "Koridor Majapahit–Pedurungan di simpang Supriyadi",
    urgency: "Tinggi",
    relatedAgency: "Dishub",
    status: "Dalam Tindak Lanjut",
    description: "Bottleneck lalu lintas dari arah kota menuju area permukiman timur.",
    dataStatus: "Simulasi Prototype",
    validationNote: "Sedang ada rekayasa APILL (lampu lalu lintas)."
  },
  {
    id: "hot-ban-1",
    regionId: "banyumanik",
    name: "Blank Spot Penerangan Gombel",
    issueType: "Lampu Jalan",
    locationDetail: "Area Setiabudi–Banyumanik tanjakan Gombel lama",
    urgency: "Tinggi",
    relatedAgency: "Disperkim",
    status: "Diteruskan ke OPD",
    description: "Kawasan rawan kecelakaan yang memiliki jarak antar lampu penerangan terlalu jauh.",
    dataStatus: "Simulasi Prototype",
    validationNote: "Telah diajukan anggaran penambahan PJU."
  },
  {
    id: "hot-smt-1",
    regionId: "semarang-tengah",
    name: "Zona Parkir Liar Pusat Kota",
    issueType: "Kemacetan",
    locationDetail: "Area sirip-sirip Simpang Lima",
    urgency: "Tinggi",
    relatedAgency: "Satpol PP",
    status: "Dalam Tindak Lanjut",
    description: "Penyempitan jalan akibat parkir roda dua di trotoar dan bahu jalan raya.",
    dataStatus: "Simulasi Prototype",
    validationNote: "Telah dipasang rambu larangan parkir tambahan."
  }
];

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

export function getReportsByRegion(regionId: string): CitizenReport[] {
  return mockCitizenReports.filter(r => r.regionId === regionId);
}

export function getHotspotsByRegion(regionId: string): IssueHotspot[] {
  return mockIssueHotspots.filter(h => h.regionId === regionId);
}

export function getReportsByCategory(): Record<ReportCategory, number> {
  const stats = {} as Record<ReportCategory, number>;
  mockCitizenReports.forEach(r => {
    stats[r.category] = (stats[r.category] || 0) + 1;
  });
  return stats;
}

export function getReportsByUrgency(): Record<ReportUrgency, number> {
  const stats = {} as Record<ReportUrgency, number>;
  mockCitizenReports.forEach(r => {
    stats[r.urgency] = (stats[r.urgency] || 0) + 1;
  });
  return stats;
}

export function getReportStats() {
  return {
    total: mockCitizenReports.length,
    resolved: mockCitizenReports.filter(r => r.status === "Selesai").length,
    critical: mockCitizenReports.filter(r => r.urgency === "Kritis").length,
    inProgress: mockCitizenReports.filter(r => ["Diteruskan ke OPD", "Dalam Tindak Lanjut"].includes(r.status)).length,
  };
}

// ---------------------------------------------------------------------------
// DATA DISCLAIMER
// ---------------------------------------------------------------------------
export const CITIZEN_REPORT_DISCLAIMER = "Output CivicSense AI merupakan draft analisis awal dan perlu divalidasi oleh OPD/petugas terkait sebelum digunakan sebagai dasar keputusan resmi. Data laporan masyarakat dan hotspot pada prototype ini adalah simulasi untuk proof of concept. Pada implementasi nyata, data perlu divalidasi oleh OPD/petugas terkait.";
