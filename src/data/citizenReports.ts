// =============================================================================
// CIVICTWIN - Mock Data Citizen Reports & Issue Hotspots
// STATUS: Data Prototype POC - BUKAN data asli
// =============================================================================

export type ReportCategory = "Banjir/Rob" | "Kemacetan" | "Jalan Rusak" | "Sampah" | "Lampu Jalan" | "Layanan Publik" | "Keamanan/Ketertiban";
export type ReportUrgency = "Rendah" | "Sedang" | "Tinggi" | "Kritis";
export type ReportStatus = "Baru Masuk" | "Perlu Validasi" | "Tervalidasi" | "Diteruskan ke OPD" | "Dalam Tindak Lanjut" | "Selesai" | "Tidak Dapat Ditindaklanjuti";
export type RelatedAgency = "Dinas PU" | "Dishub" | "DLH" | "Disperkim" | "Satpol PP" | "BPBD" | "Dinkes" | "Lainnya";
export type FeedbackType = "Keluhan" | "Kritik" | "Saran" | "Apresiasi";

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
  feedbackType: FeedbackType;
  citizenStatement?: string;
  classificationParameters?: string[];
  publicInterpretation?: string;
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
    feedbackType: "Keluhan",
    citizenStatement: "Sampah di saluran ini sudah menumpuk berminggu-minggu, bau tidak tertahankan dan air meluap ke jalan.",
    classificationParameters: ["Sanitasi Buruk", "Dampak Lingkungan", "Berpotensi Banjir"],
    publicInterpretation: "Warga mengeluhkan penumpukan sampah yang memperburuk risiko banjir di kawasan pesisir.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Setiap pasang naik, jalan ke pelabuhan tergenang parah. Kendaraan kecil tidak bisa lewat sama sekali.",
    classificationParameters: ["Bencana Alam", "Infrastruktur Strategis", "Dampak Ekonomi"],
    publicInterpretation: "Warga mendesak penanganan genangan rob yang mengganggu akses transportasi vital.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Sudah 3 titik lampu mati berturut-turut, jalan gelap gulita dan rawan kejahatan malam hari.",
    classificationParameters: ["Fasilitas Umum Rusak", "Keamanan Malam"],
    publicInterpretation: "Warga melaporkan kerusakan penerangan jalan yang menimbulkan rasa tidak aman.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Macet total dari jam 7 pagi, sisa genangan banjir bikin jalan Kaligawe lumpuh. Sudah telat kerja berkali-kali.",
    classificationParameters: ["Kemacetan Parah", "Dampak Banjir", "Gangguan Ekonomi"],
    publicInterpretation: "Warga frustrasi dengan kelumpuhan lalu lintas akibat genangan yang tidak segera ditangani.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Lubang jalan di area pabrik ini sudah sangat dalam, beberapa motor pekerja sudah jatuh.",
    classificationParameters: ["Kerusakan Jalan Berat", "Risiko Kecelakaan", "Zona Industri"],
    publicInterpretation: "Warga melaporkan kerusakan jalan berbahaya yang mengancam keselamatan pengguna jalan.",
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
    feedbackType: "Kritik",
    citizenStatement: "Sudah 2 hari sampah pasar tidak diangkut, padahal seharusnya ada jadwal rutin. Kenapa selalu terlambat?",
    classificationParameters: ["Keluhan Layanan", "Jadwal Tidak Konsisten", "Sanitasi"],
    publicInterpretation: "Warga mengkritik ketidakkonsistenan jadwal pengangkutan sampah oleh petugas.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Truk-truk besar parkir di bahu jalan sepanjang hari, anak-anak sekolah harus jalan di tengah jalan raya.",
    classificationParameters: ["Ketertiban Umum", "Keselamatan Anak", "Pelanggaran Lalu Lintas"],
    publicInterpretation: "Warga mengeluhkan parkir liar truk yang membahayakan pejalan kaki dan pengendara.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Setiap malam bau asap pabrik masuk ke rumah, anak-anak sering batuk. Tolong diinspeksi.",
    classificationParameters: ["Polusi Udara", "Kesehatan Warga", "Zona Industri"],
    publicInterpretation: "Warga mengeluhkan dampak polusi udara pabrik terhadap kesehatan keluarga.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Traffic light mati sudah 2 hari, simpang ini jadi sangat berbahaya terutama jam sibuk.",
    classificationParameters: ["Infrastruktur Vital", "Risiko Kecelakaan", "Lalu Lintas Kritis"],
    publicInterpretation: "Warga melaporkan kerusakan infrastruktur lalu lintas yang menimbulkan risiko kecelakaan.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Jalan amblas tiba-tiba setelah hujan deras semalam, lubangnya sangat besar dan dalam.",
    classificationParameters: ["Kerusakan Infrastruktur Berat", "Darurat", "Jalur Utama"],
    publicInterpretation: "Warga melaporkan kerusakan jalan kritis yang membutuhkan penanganan darurat.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Setiap sore jam 5 macet parah di simpang Supriyadi, butuh petugas lapangan untuk mengatur.",
    classificationParameters: ["Kemacetan Rutin", "Volume Kendaraan Tinggi"],
    publicInterpretation: "Warga mengeluhkan kemacetan rutin di jam sibuk yang mengganggu mobilitas.",
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
    feedbackType: "Kritik",
    citizenStatement: "Server antrean sering error, petugas tidak bisa menjelaskan kapan bisa normal. Pelayanan mengecewakan.",
    classificationParameters: ["Keluhan Layanan", "Sistem Digital Bermasalah", "Ketidakjelasan Informasi"],
    publicInterpretation: "Warga mengkritik ketidakstabilan sistem digital dan kurangnya transparansi informasi layanan.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Pohon besar patah menutupi jalan, sangat berbahaya untuk kendaraan yang melintas di tanjakan.",
    classificationParameters: ["Bahaya Fisik", "Darurat", "Jalur Cepat"],
    publicInterpretation: "Warga melaporkan rintangan fisik berbahaya yang perlu penanganan segera.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Setiap akhir pekan antrean keluar tol sangat panjang, bisa 1 jam lebih.",
    classificationParameters: ["Kemacetan Musiman", "Kapasitas Terbatas"],
    publicInterpretation: "Warga mengeluhkan kemacetan rutin di gerbang tol yang menghambat mobilitas.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Perumahan baru kami belum ada lampu jalan sama sekali, gelap total setiap malam.",
    classificationParameters: ["Infrastruktur Baru Belum Lengkap", "Keamanan Malam"],
    publicInterpretation: "Warga mengeluhkan ketiadaan penerangan jalan di area pengembangan baru.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Parkir berlapis depan mal bikin jalan menyempit, macet parah setiap sore dan malam.",
    classificationParameters: ["Pelanggaran Parkir", "Dampak Kemacetan Massal"],
    publicInterpretation: "Warga mengeluhkan parkir liar yang memperparah kemacetan pusat kota.",
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
    feedbackType: "Kritik",
    citizenStatement: "Halte bocor dan bangku patah sudah berbulan-bulan, tidak ada perbaikan. Kecewa dengan pengelola.",
    classificationParameters: ["Keluhan Layanan", "Pemeliharaan Aset Buruk", "Ketidakpuasan"],
    publicInterpretation: "Warga mengkritik buruknya pemeliharaan fasilitas transportasi publik.",
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
    feedbackType: "Keluhan",
    citizenStatement: "Setelah CFD selesai, sampah berserakan di mana-mana. Seharusnya ada petugas kebersihan siaga.",
    classificationParameters: ["Kebersihan Pasca Event", "Koordinasi Kurang"],
    publicInterpretation: "Warga mengeluhkan minimnya antisipasi kebersihan setelah acara massal.",
  },

  // ── FEEDBACK BARU: Saran ──────────────────────────────────────────────
  {
    id: "rep-019",
    title: "Saran: Tambahkan Jalur Sepeda di Koridor Pemuda",
    category: "Layanan Publik",
    urgency: "Rendah",
    status: "Baru Masuk",
    regionId: "semarang-tengah",
    regionName: "Semarang Tengah",
    locationName: "Kawasan Pemuda",
    locationDetail: "Jalan Pemuda sepanjang koridor utama",
    reportedAt: "2023-11-25T09:00:00Z",
    summary: "Warga mengusulkan penambahan jalur sepeda khusus di koridor Jalan Pemuda untuk mendorong mobilitas ramah lingkungan.",
    aiClassificationReason: "Aspirasi pembangunan infrastruktur baru, bukan keluhan kerusakan.",
    recommendedAgency: "Dishub",
    recommendedAction: "Kajian feasibility jalur sepeda di koridor utama.",
    isPersonalDataMasked: true,
    validationNote: "Aspirasi diteruskan ke Dishub untuk kajian.",
    feedbackType: "Saran",
    citizenStatement: "Akan sangat bagus jika di Jalan Pemuda ada jalur sepeda khusus seperti di kota-kota besar lain.",
    classificationParameters: ["Aspirasi Infrastruktur", "Mobilitas Berkelanjutan"],
    publicInterpretation: "Warga memberikan ide pembangunan infrastruktur ramah lingkungan.",
  },
  {
    id: "rep-020",
    title: "Saran: Digitalisasi Antrean Puskesmas",
    category: "Layanan Publik",
    urgency: "Sedang",
    status: "Perlu Validasi",
    regionId: "pedurungan",
    regionName: "Pedurungan",
    locationName: "Area Tlogosari",
    locationDetail: "Puskesmas Tlogosari Kulon",
    reportedAt: "2023-11-25T10:30:00Z",
    summary: "Warga menyarankan sistem antrean digital agar tidak perlu antre fisik berjam-jam di puskesmas.",
    aiClassificationReason: "Aspirasi peningkatan kualitas layanan kesehatan dasar.",
    recommendedAgency: "Dinkes",
    recommendedAction: "Evaluasi kebutuhan sistem antrean digital di puskesmas wilayah.",
    isPersonalDataMasked: true,
    validationNote: "Perlu konfirmasi dari Dinkes terkait anggaran teknologi.",
    feedbackType: "Saran",
    citizenStatement: "Antrean di puskesmas sangat panjang, kalau ada sistem antrean online pasti lebih efisien.",
    classificationParameters: ["Aspirasi Digitalisasi", "Efisiensi Layanan Kesehatan"],
    publicInterpretation: "Warga mengusulkan modernisasi sistem layanan kesehatan dasar.",
  },

  // ── FEEDBACK BARU: Apresiasi ──────────────────────────────────────────
  {
    id: "rep-021",
    title: "Apresiasi: Respons Cepat Perbaikan Jalan Gombel",
    category: "Jalan Rusak",
    urgency: "Rendah",
    status: "Selesai",
    regionId: "banyumanik",
    regionName: "Banyumanik",
    locationName: "Area Setiabudi–Banyumanik",
    locationDetail: "Tanjakan Gombel",
    reportedAt: "2023-11-26T08:00:00Z",
    summary: "Warga mengapresiasi tim Dinas PU yang cepat menambal jalan berlubang di tanjakan Gombel dalam waktu 2 hari setelah dilaporkan.",
    aiClassificationReason: "Feedback positif terhadap kinerja respons infrastruktur.",
    recommendedAgency: "Dinas PU",
    recommendedAction: "Dokumentasikan sebagai best practice respons cepat.",
    isPersonalDataMasked: true,
    validationNote: "Apresiasi dicatat sebagai indikator kinerja positif OPD.",
    feedbackType: "Apresiasi",
    citizenStatement: "Terima kasih Dinas PU, jalan berlubang di Gombel sudah ditambal cepat dalam 2 hari!",
    classificationParameters: ["Respons Cepat", "Kinerja Positif OPD"],
    publicInterpretation: "Warga mengapresiasi kecepatan respons pemerintah dalam perbaikan infrastruktur.",
  },
  {
    id: "rep-022",
    title: "Apresiasi: Trans Semarang Rute Baru Genuk",
    category: "Layanan Publik",
    urgency: "Rendah",
    status: "Tervalidasi",
    regionId: "genuk",
    regionName: "Genuk",
    locationName: "Kawasan Industri Terboyo",
    locationDetail: "Halte baru rute Trans Semarang",
    reportedAt: "2023-11-26T11:00:00Z",
    summary: "Pekerja pabrik di kawasan Terboyo mengapresiasi pembukaan rute baru Trans Semarang yang mempersingkat waktu tempuh mereka.",
    aiClassificationReason: "Feedback positif terhadap perluasan layanan transportasi publik.",
    recommendedAgency: "Dishub",
    recommendedAction: "Pantau okupansi rute baru untuk evaluasi keberhasilan.",
    isPersonalDataMasked: true,
    validationNote: "Tervalidasi sebagai indikasi kebutuhan perluasan rute terpenuhi.",
    feedbackType: "Apresiasi",
    citizenStatement: "Sangat membantu ada rute Trans Semarang baru ke Terboyo, sekarang tidak perlu naik ojek mahal.",
    classificationParameters: ["Perluasan Layanan", "Dampak Positif Ekonomi"],
    publicInterpretation: "Warga mengapresiasi penambahan rute transportasi publik yang meringankan biaya commute.",
  },

  // ── FEEDBACK BARU: Keluhan tambahan ───────────────────────────────────
  {
    id: "rep-023",
    title: "Drainase Tersumbat di Perumahan Tugu Baru",
    category: "Banjir/Rob",
    urgency: "Tinggi",
    status: "Baru Masuk",
    regionId: "tugu",
    regionName: "Tugu",
    locationName: "Perumahan Tugu Baru",
    locationDetail: "Saluran drainase blok C perumahan",
    reportedAt: "2023-11-27T07:15:00Z",
    summary: "Saluran drainase tersumbat material bangunan proyek perumahan baru, mengakibatkan genangan saat hujan.",
    aiClassificationReason: "Dampak pembangunan baru terhadap infrastruktur drainase eksisting.",
    recommendedAgency: "Dinas PU",
    recommendedAction: "Inspeksi saluran dan koordinasi dengan pengembang perumahan.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu inspeksi lapangan.",
    feedbackType: "Keluhan",
    citizenStatement: "Drainase tersumbat material proyek perumahan, setiap hujan air menggenang ke rumah warga.",
    classificationParameters: ["Dampak Pembangunan", "Drainase Tersumbat", "Genangan"],
    publicInterpretation: "Warga mengeluhkan dampak proyek pembangunan terhadap infrastruktur drainase.",
  },
  {
    id: "rep-024",
    title: "Trotoar Rusak Dipakai PKL di Simpang Lima",
    category: "Keamanan/Ketertiban",
    urgency: "Sedang",
    status: "Perlu Validasi",
    regionId: "semarang-tengah",
    regionName: "Semarang Tengah",
    locationName: "Simpang Lima",
    locationDetail: "Trotoar sisi barat Simpang Lima",
    reportedAt: "2023-11-27T14:00:00Z",
    summary: "Trotoar yang sudah rusak diperparah oleh PKL yang meletakkan gerobak di atasnya, pejalan kaki terpaksa turun ke jalan raya.",
    aiClassificationReason: "Kombinasi kerusakan infrastruktur dan pelanggaran ketertiban.",
    recommendedAgency: "Satpol PP",
    recommendedAction: "Penertiban PKL dan perbaikan trotoar secara simultan.",
    isPersonalDataMasked: true,
    validationNote: "Perlu koordinasi Satpol PP dan Dinas PU.",
    feedbackType: "Kritik",
    citizenStatement: "Trotoar sudah rusak parah ditambah PKL yang menghalangi, pejalan kaki dipaksa turun ke jalan raya. Pemerintah ke mana?",
    classificationParameters: ["Keluhan Layanan", "Infrastruktur Rusak", "Kurangnya Penertiban"],
    publicInterpretation: "Warga mengkritik kombinasi kerusakan infrastruktur dan lemahnya penertiban.",
  },

  // ── FEEDBACK TAMBAHAN: 8 Laporan Baru ──────────────────────────────────
  // 2 Keluhan baru
  {
    id: "rep-025",
    title: "Genangan Air di Underpass Jatingaleh",
    category: "Banjir/Rob" as ReportCategory,
    urgency: "Tinggi" as ReportUrgency,
    status: "Baru Masuk" as ReportStatus,
    regionId: "banyumanik",
    regionName: "Banyumanik",
    locationName: "Underpass Jatingaleh",
    locationDetail: "Underpass arah Tembalang",
    reportedAt: "2023-11-28T06:30:00Z",
    summary: "Genangan air setinggi 30cm di underpass Jatingaleh setiap hujan deras, kendaraan kecil tidak bisa melintas.",
    aiClassificationReason: "Kata kunci 'genangan' dan 'underpass' mengindikasikan masalah drainase struktural berulang.",
    recommendedAgency: "Dinas PU" as RelatedAgency,
    recommendedAction: "Inspeksi pompa underpass dan pengerukan saluran inlet.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu inspeksi lapangan.",
    feedbackType: "Keluhan" as FeedbackType,
    citizenStatement: "Setiap hujan deras underpass ini pasti banjir, pompa airnya seperti tidak berfungsi.",
    classificationParameters: ["Drainase Bermasalah", "Infrastruktur Publik", "Berulang"],
    publicInterpretation: "Warga mengeluhkan masalah drainase struktural yang tidak kunjung diperbaiki.",
  },
  {
    id: "rep-026",
    title: "Sampah Menumpuk di Bantaran Sungai Banjir Kanal",
    category: "Sampah" as ReportCategory,
    urgency: "Tinggi" as ReportUrgency,
    status: "Perlu Validasi" as ReportStatus,
    regionId: "semarang-utara",
    regionName: "Semarang Utara",
    locationName: "Bantaran Banjir Kanal Timur",
    locationDetail: "Sisi utara bantaran sungai dekat muara",
    reportedAt: "2023-11-28T08:00:00Z",
    summary: "Tumpukan sampah plastik dan limbah rumah tangga menggunung di bantaran sungai, menghambat aliran air.",
    aiClassificationReason: "Potensi penyumbatan aliran sungai dan peningkatan risiko banjir di hilir.",
    recommendedAgency: "DLH" as RelatedAgency,
    recommendedAction: "Operasi pembersihan bantaran dan pemasangan jaring penangkap sampah.",
    isPersonalDataMasked: true,
    validationNote: "Menunggu koordinasi DLH dan BPBD.",
    feedbackType: "Keluhan" as FeedbackType,
    citizenStatement: "Sampah di bantaran sungai sudah menggunung, kalau musim hujan pasti banjir lagi.",
    classificationParameters: ["Sanitasi Lingkungan", "Risiko Banjir", "Dampak Hulu-Hilir"],
    publicInterpretation: "Warga mendesak pembersihan bantaran sungai untuk mencegah banjir.",
  },

  // 2 Kritik baru
  {
    id: "rep-027",
    title: "Kritik: Status Laporan Tidak Pernah Diupdate",
    category: "Layanan Publik" as ReportCategory,
    urgency: "Sedang" as ReportUrgency,
    status: "Baru Masuk" as ReportStatus,
    regionId: "genuk",
    regionName: "Genuk",
    locationName: "Kawasan Industri Terboyo",
    locationDetail: "Online (sistem pelaporan warga)",
    reportedAt: "2023-11-28T10:00:00Z",
    summary: "Warga mengkritik sistem pelaporan yang tidak memberikan update status setelah laporan dikirim berminggu-minggu lalu.",
    aiClassificationReason: "Ketidakpuasan terhadap transparansi proses tindak lanjut laporan warga.",
    recommendedAgency: "Lainnya" as RelatedAgency,
    recommendedAction: "Implementasi notifikasi otomatis untuk update status laporan warga.",
    isPersonalDataMasked: true,
    validationNote: "Perlu evaluasi sistem pelaporan.",
    feedbackType: "Kritik" as FeedbackType,
    citizenStatement: "Saya sudah lapor 3 minggu lalu soal jalan rusak tapi tidak ada kabar sama sekali. Sistem ini tidak transparan.",
    classificationParameters: ["Ketidakpuasan Layanan", "Transparansi Rendah", "Respons Lambat"],
    publicInterpretation: "Warga mengkritik kurangnya transparansi dan akuntabilitas dalam sistem tindak lanjut laporan.",
  },
  {
    id: "rep-028",
    title: "Kritik: Koordinasi Antar OPD Lambat Tangani Banjir",
    category: "Banjir/Rob" as ReportCategory,
    urgency: "Tinggi" as ReportUrgency,
    status: "Perlu Validasi" as ReportStatus,
    regionId: "tugu",
    regionName: "Tugu",
    locationName: "Kawasan Mangkang–Tugu",
    locationDetail: "Area perumahan dekat perbatasan Kendal",
    reportedAt: "2023-11-28T14:00:00Z",
    summary: "Warga mengkritik lambatnya koordinasi antara BPBD, Dinas PU, dan Kelurahan dalam menangani banjir rutin.",
    aiClassificationReason: "Evaluasi negatif terhadap koordinasi lintas OPD dalam penanganan bencana berulang.",
    recommendedAgency: "BPBD" as RelatedAgency,
    recommendedAction: "Evaluasi SOP koordinasi antar OPD untuk penanganan banjir.",
    isPersonalDataMasked: true,
    validationNote: "Perlu review mekanisme koordinasi.",
    feedbackType: "Kritik" as FeedbackType,
    citizenStatement: "Setiap banjir, BPBD lempar ke PU, PU lempar ke kelurahan. Tidak ada yang tanggung jawab jelas.",
    classificationParameters: ["Koordinasi Buruk", "Birokrasi Lambat", "Bencana Berulang"],
    publicInterpretation: "Warga mengkritik lemahnya koordinasi antar lembaga dalam penanganan bencana.",
  },

  // 2 Saran baru
  {
    id: "rep-029",
    title: "Saran: Dashboard Publik Status Laporan Warga",
    category: "Layanan Publik" as ReportCategory,
    urgency: "Rendah" as ReportUrgency,
    status: "Baru Masuk" as ReportStatus,
    regionId: "semarang-utara",
    regionName: "Semarang Utara",
    locationName: "Kawasan Tambak Lorok",
    locationDetail: "Online (aspirasi digital)",
    reportedAt: "2023-11-29T09:00:00Z",
    summary: "Warga menyarankan pembuatan dashboard publik agar masyarakat bisa memantau status tindak lanjut setiap laporan secara real-time.",
    aiClassificationReason: "Aspirasi peningkatan transparansi dan akuntabilitas pemerintah melalui teknologi.",
    recommendedAgency: "Lainnya" as RelatedAgency,
    recommendedAction: "Kajian pembuatan portal tracking laporan warga berbasis web.",
    isPersonalDataMasked: true,
    validationNote: "Aspirasi diteruskan ke Diskominfo.",
    feedbackType: "Saran" as FeedbackType,
    citizenStatement: "Bagus kalau ada website yang bisa kami cek status laporan kami, seperti tracking paket online.",
    classificationParameters: ["Aspirasi Digitalisasi", "Transparansi Publik", "Inovasi Layanan"],
    publicInterpretation: "Warga mengusulkan inovasi digital untuk meningkatkan akuntabilitas tindak lanjut laporan.",
  },
  {
    id: "rep-030",
    title: "Saran: Pompa Mobile Siaga di Titik Rawan Rob",
    category: "Banjir/Rob" as ReportCategory,
    urgency: "Sedang" as ReportUrgency,
    status: "Perlu Validasi" as ReportStatus,
    regionId: "genuk",
    regionName: "Genuk",
    locationName: "Koridor Kaligawe–Terboyo",
    locationDetail: "Titik-titik rawan rob",
    reportedAt: "2023-11-29T11:00:00Z",
    summary: "Warga menyarankan penempatan pompa mobile permanen di beberapa titik rawan rob agar bisa langsung dioperasikan saat air naik.",
    aiClassificationReason: "Aspirasi mitigasi bencana proaktif berdasarkan pengalaman warga.",
    recommendedAgency: "BPBD" as RelatedAgency,
    recommendedAction: "Evaluasi kelayakan penempatan pompa mobile di titik-titik strategis.",
    isPersonalDataMasked: true,
    validationNote: "Perlu kajian anggaran dan lokasi.",
    feedbackType: "Saran" as FeedbackType,
    citizenStatement: "Daripada tunggu banjir baru kirim pompa, lebih baik pompanya disiagakan di titik-titik rawan.",
    classificationParameters: ["Mitigasi Bencana", "Aspirasi Proaktif", "Infrastruktur Siaga"],
    publicInterpretation: "Warga mengusulkan strategi mitigasi banjir yang lebih proaktif.",
  },

  // 2 Apresiasi baru
  {
    id: "rep-031",
    title: "Apresiasi: Penanganan Pohon Tumbang Sangat Cepat",
    category: "Keamanan/Ketertiban" as ReportCategory,
    urgency: "Rendah" as ReportUrgency,
    status: "Selesai" as ReportStatus,
    regionId: "pedurungan",
    regionName: "Pedurungan",
    locationName: "Koridor Majapahit–Pedurungan",
    locationDetail: "Jalan Majapahit depan perumahan",
    reportedAt: "2023-11-29T15:00:00Z",
    summary: "Warga mengapresiasi Disperkim yang merespons laporan pohon tumbang di Jalan Majapahit dalam waktu 3 jam.",
    aiClassificationReason: "Feedback positif terhadap kecepatan respons penanganan darurat.",
    recommendedAgency: "Disperkim" as RelatedAgency,
    recommendedAction: "Dokumentasikan sebagai best practice respons cepat.",
    isPersonalDataMasked: true,
    validationNote: "Apresiasi tercatat sebagai indikator kinerja positif.",
    feedbackType: "Apresiasi" as FeedbackType,
    citizenStatement: "Luar biasa cepat, pohon tumbang jam 12 siang sudah dibersihkan jam 3 sore. Terima kasih Disperkim!",
    classificationParameters: ["Respons Cepat", "Kinerja OPD Baik", "Penanganan Darurat"],
    publicInterpretation: "Warga puas dengan kecepatan respons penanganan darurat oleh OPD terkait.",
  },
  {
    id: "rep-032",
    title: "Apresiasi: Perbaikan Lampu Jalan Tugu Cepat Tanggap",
    category: "Lampu Jalan" as ReportCategory,
    urgency: "Rendah" as ReportUrgency,
    status: "Selesai" as ReportStatus,
    regionId: "tugu",
    regionName: "Tugu",
    locationName: "Simpang Mangkang",
    locationDetail: "Jalan raya Mangkang",
    reportedAt: "2023-11-29T17:00:00Z",
    summary: "Warga mengapresiasi perbaikan lampu jalan yang sebelumnya padam di sepanjang Jalan Mangkang, kini sudah menyala semua.",
    aiClassificationReason: "Feedback positif terhadap pemeliharaan infrastruktur penerangan.",
    recommendedAgency: "Disperkim" as RelatedAgency,
    recommendedAction: "Catat sebagai tindak lanjut berhasil dari laporan rep-009.",
    isPersonalDataMasked: true,
    validationNote: "Konfirmasi warga bahwa semua lampu sudah menyala.",
    feedbackType: "Apresiasi" as FeedbackType,
    citizenStatement: "Alhamdulillah lampu jalan di Mangkang sudah diperbaiki semua, sekarang malam sudah terang dan aman.",
    classificationParameters: ["Tindak Lanjut Berhasil", "Respons Positif", "Infrastruktur Pulih"],
    publicInterpretation: "Warga mengapresiasi keberhasilan perbaikan infrastruktur penerangan jalan.",
  },
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
// FEEDBACK TYPE HELPERS
// ---------------------------------------------------------------------------

export function getReportsByFeedbackType(): Record<FeedbackType, number> {
  const stats = { Keluhan: 0, Kritik: 0, Saran: 0, Apresiasi: 0 } as Record<FeedbackType, number>;
  mockCitizenReports.forEach(r => {
    stats[r.feedbackType] = (stats[r.feedbackType] || 0) + 1;
  });
  return stats;
}

export function getTopFeedbackTopics(): { topComplaint: string; topSuggestion: string; topAppreciation: string } {
  const countBy = (type: FeedbackType) => {
    const cats: Record<string, number> = {};
    mockCitizenReports.filter(r => r.feedbackType === type).forEach(r => {
      cats[r.category] = (cats[r.category] || 0) + 1;
    });
    const keys = Object.keys(cats);
    return keys.length > 0 ? keys.reduce((a, b) => cats[a] > cats[b] ? a : b) : "Tidak ada data";
  };
  return {
    topComplaint: countBy("Keluhan"),
    topSuggestion: countBy("Saran"),
    topAppreciation: countBy("Apresiasi"),
  };
}

export type PublicSentimentSignal = "Positif" | "Perlu Perhatian" | "Konstruktif" | "Campuran";

export function getPublicFeedbackStats(): {
  total: number;
  complaints: number;
  suggestions: number;
  appreciations: number;
  complaintRate: number;
  suggestionRate: number;
  appreciationRate: number;
  publicSentimentSignal: PublicSentimentSignal;
} {
  const ft = getReportsByFeedbackType();
  const total = mockCitizenReports.length;
  const complaints = ft["Keluhan"] || 0;
  const suggestions = ft["Saran"] || 0;
  const appreciations = ft["Apresiasi"] || 0;
  const safe = total > 0 ? total : 1;
  const complaintRate = Math.round((complaints / safe) * 100);
  const suggestionRate = Math.round((suggestions / safe) * 100);
  const appreciationRate = Math.round((appreciations / safe) * 100);

  let publicSentimentSignal: PublicSentimentSignal = "Campuran";
  if (appreciations > complaints && appreciations >= suggestions) {
    publicSentimentSignal = "Positif";
  } else if (complaints > appreciations + suggestions) {
    publicSentimentSignal = "Perlu Perhatian";
  } else if (suggestions >= complaints && suggestions > appreciations) {
    publicSentimentSignal = "Konstruktif";
  }

  return { total, complaints, suggestions, appreciations, complaintRate, suggestionRate, appreciationRate, publicSentimentSignal };
}

export function getFeedbackTypeStatsByRegion(regionId: string): Record<FeedbackType, number> {
  const stats = { Keluhan: 0, Kritik: 0, Saran: 0, Apresiasi: 0 } as Record<FeedbackType, number>;
  mockCitizenReports.filter(r => r.regionId === regionId).forEach(r => {
    stats[r.feedbackType] = (stats[r.feedbackType] || 0) + 1;
  });
  return stats;
}

export function getFeedbackToneSummaryByRegion(regionId: string): {
  total: number;
  complaints: number;
  criticisms: number;
  suggestions: number;
  appreciations: number;
  publicSignal: "Perlu Perhatian" | "Konstruktif" | "Positif" | "Campuran" | "Belum Ada Data";
} {
  const ft = getFeedbackTypeStatsByRegion(regionId);
  const total = Object.values(ft).reduce((a, b) => a + b, 0);
  const complaints = ft["Keluhan"] || 0;
  const criticisms = ft["Kritik"] || 0;
  const suggestions = ft["Saran"] || 0;
  const appreciations = ft["Apresiasi"] || 0;

  const neg = complaints + criticisms;

  let publicSignal: "Perlu Perhatian" | "Konstruktif" | "Positif" | "Campuran" | "Belum Ada Data" = "Campuran";

  if (total === 0) {
    publicSignal = "Belum Ada Data";
    return { total, complaints, criticisms, suggestions, appreciations, publicSignal };
  }

  if (neg > suggestions + appreciations) {
    publicSignal = "Perlu Perhatian";
  } else if (suggestions > neg && suggestions >= appreciations) {
    publicSignal = "Konstruktif";
  } else if (appreciations > neg && appreciations >= suggestions) {
    publicSignal = "Positif";
  }

  return { total, complaints, criticisms, suggestions, appreciations, publicSignal };
}

// ---------------------------------------------------------------------------
// DATA DISCLAIMER
// ---------------------------------------------------------------------------
export const CITIZEN_REPORT_DISCLAIMER = "Output CivicSense AI merupakan draft analisis awal dan perlu divalidasi oleh OPD/petugas terkait sebelum digunakan sebagai dasar keputusan resmi. Data laporan masyarakat dan hotspot pada prototype ini adalah simulasi untuk proof of concept. Pada implementasi nyata, data perlu divalidasi oleh OPD/petugas terkait.";

// ---------------------------------------------------------------------------
// BADGE HELPER
// ---------------------------------------------------------------------------

export function getFeedbackBadge(type: string): string {
  switch (type) {
    case "Keluhan":
      return "bg-rose-100 text-rose-700 border-rose-200";
    case "Kritik":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Saran":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Apresiasi":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}
