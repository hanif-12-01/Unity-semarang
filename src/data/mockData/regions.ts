// =============================================================================
// CIVICTWIN — Mock Data Wilayah Kota Semarang
// STATUS: Data Prototype POC — BUKAN data resmi pemerintah
// Dibuat untuk kebutuhan demo awal sistem CIVICTWIN
// Sumber: estimasi berbasis literatur & laporan publik (disederhanakan)
// =============================================================================

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

export type PriorityCategory = "Tinggi" | "Sedang" | "Rendah";

export type RegionIndicator = {
  /** Risiko banjir/rob — skala 0–100 (semakin tinggi = semakin berisiko) */
  floodRisk: number;
  /** Kepadatan penduduk — skala 0–100 (semakin tinggi = semakin padat) */
  populationDensity: number;
  /** Kerentanan sosial — skala 0–100 (semakin tinggi = semakin rentan) */
  socialVulnerability: number;
  /** Akses layanan publik — skala 0–100 (semakin tinggi = semakin baik aksesnya) */
  publicServiceAccess: number;
  /** Laporan warga aktif — skala 0–100 (semakin tinggi = semakin banyak laporan) */
  citizenReports: number;
  /** Aktivitas UMKM — skala 0–100 (semakin tinggi = semakin aktif) */
  smeActivity: number;
};

export type EmergencySignals = {
  waterLevelStatus: "Aman" | "Waspada" | "Siaga" | "Awas";
  verifiedReports: number;
  historicalDisasterRisk: number;
  populationExposure: number;
  criticalFacilitiesExposure: number;
  socialVulnerability: number;
  emergencyReviewScore: number;
  emergencyStatus: "Monitor" | "Waspada" | "Perlu Tinjauan" | "Prioritas Tanggap" | "Darurat";
  recommendedAction: string;
};

export type Region = {
  id: string;
  name: string;
  description: string;
  indicators: RegionIndicator;
  dominantIssues: string[];
  policyRecommendations: string[];
  relatedStakeholders: string[];
  estimatedImpact: string;
  dataSourceNote: string;
  emergencySignals: EmergencySignals;
};

export type CitySummary = {
  totalRegionsInPrototype: number;
  dominantCityIssues: string[];
  generalRecommendations: string[];
  dataLabel: string;
};

// ---------------------------------------------------------------------------
// MOCK DATA — 6 WILAYAH / KECAMATAN KOTA SEMARANG
// ---------------------------------------------------------------------------

export const mockRegions: Region[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. GENUK — Prioritas Tinggi
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "genuk",
    name: "Genuk",
    description:
      "Kecamatan di pesisir timur Semarang yang rentan terhadap banjir rob dan penurunan muka tanah. Kawasan industri bercampur permukiman padat.",

    indicators: {
      floodRisk: 91,
      populationDensity: 80,
      socialVulnerability: 75,
      publicServiceAccess: 48,
      citizenReports: 88,
      smeActivity: 55,
    },
    dominantIssues: [
      "Banjir rob musiman yang menggenangi permukiman",
      "Penurunan muka tanah (land subsidence) akibat penggunaan air tanah berlebihan",
      "Akses layanan kesehatan dan sanitasi yang terbatas",
      "Kawasan industri menimbulkan polusi bagi warga sekitar",
    ],
    policyRecommendations: [
      "Percepatan pembangunan tanggul dan sistem drainase pesisir",
      "Program relokasi bertahap untuk hunian di zona rawan rob",
      "Penyediaan akses air bersih PDAM untuk mengurangi ketergantungan air tanah",
      "Penguatan Posyandu dan Puskesmas keliling di zona terdampak",
    ],
    relatedStakeholders: [
      "Dinas Pekerjaan Umum Kota Semarang",
      "BPBD Kota Semarang",
      "Dinas Kesehatan",
      "PDAM Tirta Moedal",
      "Komunitas Warga Pesisir Genuk",
    ],
    estimatedImpact:
      "Intervensi tanggul dan drainase berpotensi mengurangi frekuensi genangan secara signifikan dan melindungi warga permukiman pesisir dari dampak rob musiman.",
    dataSourceNote:
      "Prototype CIVICTWIN — indikator disusun dari kombinasi data publik (laporan BPBD 2022–2023), data olahan literatur akademik, dan estimasi simulasi. Lihat halaman Metodologi untuk detail status setiap data.",
    emergencySignals: {
      waterLevelStatus: "Awas",
      verifiedReports: 45,
      historicalDisasterRisk: 85,
      populationExposure: 70,
      criticalFacilitiesExposure: 60,
      socialVulnerability: 75,
      emergencyReviewScore: 75,
      emergencyStatus: "Prioritas Tanggap",
      recommendedAction: "Evakuasi darurat pesisir dan pengerahan pompa air mobile aktif.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. SEMARANG UTARA — Prioritas Tinggi
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "semarang-utara",
    name: "Semarang Utara",
    description:
      "Kawasan pesisir historis dengan kepadatan tinggi. Titik nol paling terdampak rob di Kota Semarang, mencakup area Pelabuhan Tanjung Emas dan permukiman padat Tambak Lorok.",

    indicators: {
      floodRisk: 95,
      populationDensity: 88,
      socialVulnerability: 82,
      publicServiceAccess: 44,
      citizenReports: 91,
      smeActivity: 60,
    },
    dominantIssues: [
      "Rob kronis — permukiman terendam hingga 50–80 cm saat musim hujan",
      "Penurunan muka tanah tercepat di Semarang (±5–8 cm/tahun di beberapa titik)",
      "Kemiskinan pesisir dan keterbatasan ekonomi nelayan",
      "Sanitasi buruk dan kepadatan hunian tidak layak",
    ],
    policyRecommendations: [
      "Implementasi National Capital Integrated Coastal Development (NCICD) skala lokal",
      "Pemasangan sensor rob real-time & sistem peringatan dini terintegrasi",
      "Program bedah rumah dan pemberdayaan ekonomi nelayan pesisir",
      "Revitalisasi Tambak Lorok sebagai kampung bahari berkelanjutan",
    ],
    relatedStakeholders: [
      "Kementerian PUPR",
      "Pemerintah Kota Semarang",
      "BPBD Jawa Tengah",
      "Otoritas Pelabuhan Tanjung Emas",
      "LSM Pesisir Lestari",
      "Kelurahan Tambak Lorok",
    ],
    estimatedImpact:
      "Sistem peringatan dini dan penguatan infrastruktur pesisir berpotensi menekan kerugian ekonomi akibat rob dan meningkatkan keselamatan warga di kawasan terdampak.",
    dataSourceNote:
      "Prototype CIVICTWIN — indikator disusun dari kombinasi data publik (laporan Walhi Jateng, riset UNDIP, BPS 2023), data olahan, dan estimasi simulasi. Lihat halaman Metodologi untuk detail.",
    emergencySignals: {
      waterLevelStatus: "Siaga",
      verifiedReports: 30,
      historicalDisasterRisk: 90,
      populationExposure: 80,
      criticalFacilitiesExposure: 75,
      socialVulnerability: 82,
      emergencyReviewScore: 68,
      emergencyStatus: "Prioritas Tanggap",
      recommendedAction: "Penyiapan posko pengungsian di titik aman dan pemantauan tanggul Tambak Lorok.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. TUGU — Prioritas Tinggi
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tugu",
    name: "Tugu",
    description:
      "Kecamatan paling barat Semarang, kawasan industri berat dan tambak. Menghadapi ancaman banjir rob, penurunan kualitas lingkungan, dan kepadatan rendah dengan layanan publik yang belum merata.",

    indicators: {
      floodRisk: 84,
      populationDensity: 45,
      socialVulnerability: 70,
      publicServiceAccess: 38,
      citizenReports: 72,
      smeActivity: 40,
    },
    dominantIssues: [
      "Banjir rob dan intrusi air laut ke lahan pertanian & tambak",
      "Pencemaran industri (limbah pabrik & kawasan industri Tugu Wijayakusuma)",
      "Akses layanan publik sangat terbatas — minimnya sekolah, klinik, dan transportasi umum",
      "Degradasi lahan mangrove sebagai buffer pesisir",
    ],
    policyRecommendations: [
      "Rehabilitasi ekosistem mangrove sepanjang pantai Tugu sebagai solusi berbasis alam",
      "Peningkatan pengawasan limbah industri dan penerapan sanksi tegas",
      "Pembangunan Pusat Layanan Terpadu (PLT) di Tugu Barat dan Tugu Timur",
      "Integrasi Tugu dalam rute bus Trans Semarang untuk konektivitas layanan publik",
    ],
    relatedStakeholders: [
      "Dinas Lingkungan Hidup Kota Semarang",
      "Kawasan Industri Wijayakusuma",
      "Dinas Perhubungan",
      "Komunitas Nelayan Tugu",
      "KLHK (Kementerian LHK)",
    ],
    estimatedImpact:
      "Rehabilitasi ekosistem mangrove berpotensi mereduksi dampak rob secara bertahap dan memulihkan produktivitas tambak warga di kawasan pesisir.",
    dataSourceNote:
      "Prototype CIVICTWIN — indikator disusun dari kombinasi data publik (DLH Semarang 2022), studi rehabilitasi mangrove, dan estimasi simulasi. Lihat halaman Metodologi untuk detail.",
    emergencySignals: {
      waterLevelStatus: "Waspada",
      verifiedReports: 15,
      historicalDisasterRisk: 75,
      populationExposure: 40,
      criticalFacilitiesExposure: 50,
      socialVulnerability: 70,
      emergencyReviewScore: 44,
      emergencyStatus: "Perlu Tinjauan",
      recommendedAction: "Pengecekan saluran pembuangan limbah industri dan sosialisasi pesisir.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. PEDURUNGAN — Prioritas Sedang
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pedurungan",
    name: "Pedurungan",
    description:
      "Kecamatan terpadat di Semarang dengan pertumbuhan permukiman pesat. Pusat perdagangan dan hunian yang menghadapi tantangan kemacetan, sampah, dan tekanan infrastruktur.",

    indicators: {
      floodRisk: 52,
      populationDensity: 92,
      socialVulnerability: 55,
      publicServiceAccess: 68,
      citizenReports: 74,
      smeActivity: 82,
    },
    dominantIssues: [
      "Kepadatan penduduk tertinggi menciptakan tekanan besar pada infrastruktur",
      "Kemacetan lalu lintas di jalur utama Pedurungan–Genuk",
      "Pengelolaan sampah yang belum optimal di permukiman padat",
      "Genangan lokal saat hujan deras akibat drainase yang tidak memadai",
    ],
    policyRecommendations: [
      "Optimalisasi jaringan drainase dan normalisasi saluran tersier",
      "Pengembangan Tempat Pengolahan Sampah Terpadu (TPST) skala kecamatan",
      "Penataan kawasan perdagangan dan parkir untuk mengurangi kemacetan",
      "Digitalisasi layanan RT/RW untuk mempercepat respons keluhan warga",
    ],
    relatedStakeholders: [
      "Dinas Pekerjaan Umum Kota Semarang",
      "Dinas Kebersihan & Pertamanan",
      "Dinas Perhubungan",
      "Asosiasi Pedagang Pedurungan",
      "Pokdarwis Wilayah Pedurungan",
    ],
    estimatedImpact:
      "Optimalisasi drainase dan pengelolaan sampah terpadu berpotensi mengurangi genangan lokal dan meningkatkan kualitas lingkungan permukiman secara bertahap.",
    dataSourceNote:
      "Prototype CIVICTWIN — indikator disusun dari kombinasi data publik (BPS 2023, Musrenbang), data olahan, dan estimasi simulasi. Lihat halaman Metodologi untuk detail.",
    emergencySignals: {
      waterLevelStatus: "Waspada",
      verifiedReports: 25,
      historicalDisasterRisk: 40,
      populationExposure: 90,
      criticalFacilitiesExposure: 30,
      socialVulnerability: 55,
      emergencyReviewScore: 45,
      emergencyStatus: "Perlu Tinjauan",
      recommendedAction: "Pembersihan gorong-gorong penyumbat di jalur utama dan patroli wilayah.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. BANYUMANIK — Prioritas Rendah
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "banyumanik",
    name: "Banyumanik",
    description:
      "Kecamatan dataran tinggi selatan Semarang dengan kualitas hidup relatif baik. Kawasan perumahan modern, perguruan tinggi, dan pusat komersial. Risiko bencana rendah namun menghadapi tantangan urban sprawl.",

    indicators: {
      floodRisk: 22,
      populationDensity: 65,
      socialVulnerability: 30,
      publicServiceAccess: 85,
      citizenReports: 42,
      smeActivity: 78,
    },
    dominantIssues: [
      "Urban sprawl dan alih fungsi lahan hijau menjadi perumahan",
      "Kemacetan di simpul jalan Setiabudi dan sekitar UNDIP",
      "Ketersediaan ruang terbuka hijau (RTH) yang mulai berkurang",
      "Ketimpangan akses layanan antara perumahan mewah dan kampung dalam",
    ],
    policyRecommendations: [
      "Penguatan regulasi tata ruang dan pembatasan alih fungsi lahan hijau",
      "Pengembangan jalur sepeda dan pedestrian ramah pejalan kaki",
      "Revitalisasi RTH dan taman kota di area perumahan padat",
      "Program inklusi sosial untuk menjembatani kesenjangan layanan antar kawasan",
    ],
    relatedStakeholders: [
      "Dinas Tata Ruang Kota Semarang",
      "Universitas Diponegoro (UNDIP)",
      "Pengembang Perumahan (REI Semarang)",
      "Komunitas Pesepeda Semarang",
      "Dinas Lingkungan Hidup",
    ],
    estimatedImpact:
      "Penguatan ruang terbuka hijau dan jalur hijau berpotensi meningkatkan kenyamanan lingkungan dan menjaga kualitas hidup warga di kawasan dataran tinggi.",
    dataSourceNote:
      "Prototype CIVICTWIN — indikator disusun dari kombinasi data publik (RTRW 2011–2031), laporan komunitas, dan estimasi simulasi. Lihat halaman Metodologi untuk detail.",
    emergencySignals: {
      waterLevelStatus: "Aman",
      verifiedReports: 2,
      historicalDisasterRisk: 15,
      populationExposure: 30,
      criticalFacilitiesExposure: 10,
      socialVulnerability: 30,
      emergencyReviewScore: 14,
      emergencyStatus: "Monitor",
      recommendedAction: "Pantau situasi cuaca normal. Rutin mengecek drainase perumahan.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SEMARANG TENGAH — Prioritas Sedang
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "semarang-tengah",
    name: "Semarang Tengah",
    description:
      "Jantung Kota Semarang — pusat pemerintahan, bisnis, dan warisan budaya (Kota Lama). Memiliki akses layanan terbaik namun menghadapi tekanan kemacetan, turis, dan konservasi heritage.",

    indicators: {
      floodRisk: 60,
      populationDensity: 78,
      socialVulnerability: 42,
      publicServiceAccess: 90,
      citizenReports: 65,
      smeActivity: 88,
    },
    dominantIssues: [
      "Genangan di kawasan Kota Lama dan sekitar Simpang Lima saat hujan deras",
      "Kemacetan tinggi karena peran sebagai pusat ekonomi dan administrasi",
      "Tekanan pariwisata terhadap kawasan heritage Kota Lama Semarang",
      "Ketimpangan sosial antara CBD dan kantong kemiskinan perkotaan",
    ],
    policyRecommendations: [
      "Revitalisasi sistem drainase bawah tanah kawasan Kota Lama",
      "Penerapan manajemen lalu lintas cerdas (smart traffic) di simpul utama",
      "Regulasi pariwisata berkelanjutan untuk pelestarian Kota Lama UNESCO",
      "Program kampung kota inklusif untuk mengangkat warga miskin perkotaan",
    ],
    relatedStakeholders: [
      "Pemerintah Kota Semarang (Setda)",
      "Badan Pengelola Kota Lama Semarang",
      "Dinas Pariwisata",
      "Asosiasi Pengusaha Kota Lama (APKL)",
      "Komunitas Pecinta Kota Lama Semarang",
      "UNESCO Jakarta Office",
    ],
    estimatedImpact:
      "Revitalisasi drainase dan manajemen lalu lintas cerdas berpotensi mengurangi kerugian akibat kemacetan dan meningkatkan daya tarik kawasan heritage bagi wisatawan.",
    dataSourceNote:
      "Prototype CIVICTWIN — indikator disusun dari kombinasi data publik (BP Kota Lama 2023, Dishub), data olahan, dan estimasi simulasi. Lihat halaman Metodologi untuk detail.",
    emergencySignals: {
      waterLevelStatus: "Waspada",
      verifiedReports: 20,
      historicalDisasterRisk: 50,
      populationExposure: 85,
      criticalFacilitiesExposure: 90,
      socialVulnerability: 42,
      emergencyReviewScore: 49,
      emergencyStatus: "Perlu Tinjauan",
      recommendedAction: "Pengaktifan pompa polder Kota Lama untuk antisipasi genangan dari rob masuk kota.",
    },
  },
];

// ---------------------------------------------------------------------------
// CITY SUMMARY — Ringkasan Kota Semarang (Prototype)
// ---------------------------------------------------------------------------

export const citySummary: CitySummary = {
  totalRegionsInPrototype: mockRegions.length,
  dominantCityIssues: [
    "Banjir rob & penurunan muka tanah di kawasan pesisir utara",
    "Kepadatan penduduk tinggi dengan tekanan infrastruktur",
    "Ketimpangan akses layanan publik antar kecamatan",
    "Pencemaran lingkungan di zona industri pesisir",
    "Kemacetan struktural di pusat kota dan koridor utama",
  ],
  generalRecommendations: [
    "Integrasikan sistem peringatan dini rob berbasis IoT di seluruh kecamatan pesisir",
    "Percepat pembangunan drainase dan tanggul terintegrasi kawasan utara",
    "Pemerataan layanan publik melalui unit layanan bergerak (mobile service) ke kecamatan terpencil",
    "Dorong ekonomi sirkular dan UMKM digital untuk meningkatkan ketahanan ekonomi warga",
    "Kembangkan sistem pelaporan warga digital yang terhubung langsung ke OPD terkait",
  ],
  dataLabel: "Prototype CIVICTWIN — menggunakan kombinasi data publik, data olahan, dan simulasi terbatas untuk proof of concept",
};

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

/** Ambil satu wilayah berdasarkan ID */
export function getRegionById(id: string): Region | undefined {
  return mockRegions.find((r) => r.id === id);
}

/** @deprecated — Gunakan getRankedRegions() dari scoring.ts untuk hasil yang konsisten */
export function getRegionsByPriority(
  _category: PriorityCategory
): Region[] {
  // Deprecated: kategori manual sudah dihapus dari Region.
  // Gunakan scoring engine untuk filtering berdasarkan computedCategory.
  return [];
}

/** @deprecated — Gunakan getRankedRegions() dari scoring.ts untuk hasil yang konsisten */
export function getRegionsSortedByScore(): Region[] {
  // Deprecated: skor manual sudah dihapus dari Region.
  // Gunakan scoring engine (getRankedRegions) untuk sorting.
  return [...mockRegions];
}

/** Hitung rata-rata satu indikator dari semua wilayah */
export function getAverageIndicator(
  key: keyof RegionIndicator
): number {
  const total = mockRegions.reduce((sum, r) => sum + r.indicators[key], 0);
  return Math.round((total / mockRegions.length) * 10) / 10;
}
