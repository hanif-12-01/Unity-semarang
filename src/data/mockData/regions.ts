// =============================================================================
// CIVICTWIN — Mock Data Wilayah Kota Semarang
// STATUS: Data Simulasi Prototype — BUKAN data resmi pemerintah
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

export type Region = {
  id: string;
  name: string;
  description: string;
  priorityScore: number;
  priorityCategory: PriorityCategory;
  indicators: RegionIndicator;
  dominantIssues: string[];
  policyRecommendations: string[];
  relatedStakeholders: string[];
  estimatedImpact: string;
  dataSourceNote: string;
};

export type CitySummary = {
  totalRegionsInPrototype: number;
  highPriorityCount: number;
  averagePriorityScore: number;
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
    priorityScore: 87,
    priorityCategory: "Tinggi",
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
      "Intervensi tanggul & drainase diperkirakan mengurangi luas genangan hingga 60% dan melindungi ±12.000 jiwa dari dampak rob tahunan.",
    dataSourceNote:
      "Data simulasi prototype CIVICTWIN — estimasi berbasis laporan BPBD Semarang 2022–2023 dan studi akademik penurunan muka tanah pesisir Jawa Tengah. Bukan data resmi.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. SEMARANG UTARA — Prioritas Tinggi
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "semarang-utara",
    name: "Semarang Utara",
    description:
      "Kawasan pesisir historis dengan kepadatan tinggi. Titik nol paling terdampak rob di Kota Semarang, mencakup area Pelabuhan Tanjung Emas dan permukiman padat Tambak Lorok.",
    priorityScore: 92,
    priorityCategory: "Tinggi",
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
      "Sistem peringatan dini & penguatan tanggul dapat mengurangi kerugian ekonomi rob hingga Rp 45 miliar/tahun dan menjangkau ±28.000 jiwa terdampak.",
    dataSourceNote:
      "Data simulasi prototype CIVICTWIN — estimasi berbasis laporan Walhi Jateng, riset UNDIP tentang rob Semarang, dan data BPS Kecamatan 2023. Bukan data resmi.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. TUGU — Prioritas Tinggi
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "tugu",
    name: "Tugu",
    description:
      "Kecamatan paling barat Semarang, kawasan industri berat dan tambak. Menghadapi ancaman banjir rob, penurunan kualitas lingkungan, dan kepadatan rendah dengan layanan publik yang belum merata.",
    priorityScore: 78,
    priorityCategory: "Tinggi",
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
      "Rehabilitasi mangrove 200 ha diperkirakan mereduksi dampak rob 30–40% dan memulihkan produktivitas tambak senilai ±Rp 8 miliar/tahun.",
    dataSourceNote:
      "Data simulasi prototype CIVICTWIN — estimasi berbasis laporan DLH Semarang 2022 dan studi rehabilitasi mangrove pesisir Jawa Tengah. Bukan data resmi.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. PEDURUNGAN — Prioritas Sedang
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pedurungan",
    name: "Pedurungan",
    description:
      "Kecamatan terpadat di Semarang dengan pertumbuhan permukiman pesat. Pusat perdagangan dan hunian yang menghadapi tantangan kemacetan, sampah, dan tekanan infrastruktur.",
    priorityScore: 63,
    priorityCategory: "Sedang",
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
      "Optimalisasi drainase dan TPST diperkirakan mengurangi genangan lokal 50% dan meningkatkan indeks kebersihan lingkungan dari 62 menjadi 78 poin.",
    dataSourceNote:
      "Data simulasi prototype CIVICTWIN — estimasi berbasis data BPS Kecamatan Pedurungan 2023 dan laporan Musrenbang kelurahan. Bukan data resmi.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. BANYUMANIK — Prioritas Rendah
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "banyumanik",
    name: "Banyumanik",
    description:
      "Kecamatan dataran tinggi selatan Semarang dengan kualitas hidup relatif baik. Kawasan perumahan modern, perguruan tinggi, dan pusat komersial. Risiko bencana rendah namun menghadapi tantangan urban sprawl.",
    priorityScore: 38,
    priorityCategory: "Rendah",
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
      "Penguatan RTH dan jalur hijau diperkirakan menurunkan suhu mikro 1–2°C dan meningkatkan indeks kenyamanan kota untuk ±65.000 jiwa.",
    dataSourceNote:
      "Data simulasi prototype CIVICTWIN — estimasi berbasis RTRW Kota Semarang 2011–2031 dan laporan komunitas lingkungan Banyumanik. Bukan data resmi.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. SEMARANG TENGAH — Prioritas Sedang
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "semarang-tengah",
    name: "Semarang Tengah",
    description:
      "Jantung Kota Semarang — pusat pemerintahan, bisnis, dan warisan budaya (Kota Lama). Memiliki akses layanan terbaik namun menghadapi tekanan kemacetan, turis, dan konservasi heritage.",
    priorityScore: 55,
    priorityCategory: "Sedang",
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
      "Revitalisasi drainase Kota Lama dan manajemen lalu lintas cerdas diperkirakan mengurangi kerugian kemacetan ±Rp 12 miliar/tahun dan meningkatkan kunjungan wisata 25%.",
    dataSourceNote:
      "Data simulasi prototype CIVICTWIN — estimasi berbasis laporan Badan Pengelola Kota Lama 2023 dan kajian kemacetan Dinas Perhubungan Semarang. Bukan data resmi.",
  },
];

// ---------------------------------------------------------------------------
// CITY SUMMARY — Ringkasan Kota Semarang (Prototype)
// ---------------------------------------------------------------------------

export const citySummary: CitySummary = {
  totalRegionsInPrototype: mockRegions.length,
  highPriorityCount: mockRegions.filter((r) => r.priorityCategory === "Tinggi")
    .length,
  averagePriorityScore:
    Math.round(
      (mockRegions.reduce((sum, r) => sum + r.priorityScore, 0) /
        mockRegions.length) *
        10
    ) / 10,
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
  dataLabel: "Data Simulasi Prototype CIVICTWIN — Bukan Data Resmi Pemerintah",
};

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

/** Ambil satu wilayah berdasarkan ID */
export function getRegionById(id: string): Region | undefined {
  return mockRegions.find((r) => r.id === id);
}

/** Ambil semua wilayah berdasarkan kategori prioritas */
export function getRegionsByPriority(
  category: PriorityCategory
): Region[] {
  return mockRegions.filter((r) => r.priorityCategory === category);
}

/** Urutkan wilayah berdasarkan priority score (descending) */
export function getRegionsSortedByScore(): Region[] {
  return [...mockRegions].sort((a, b) => b.priorityScore - a.priorityScore);
}

/** Hitung rata-rata satu indikator dari semua wilayah */
export function getAverageIndicator(
  key: keyof RegionIndicator
): number {
  const total = mockRegions.reduce((sum, r) => sum + r.indicators[key], 0);
  return Math.round((total / mockRegions.length) * 10) / 10;
}
