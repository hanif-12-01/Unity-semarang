// =============================================================================
// CIVICTWIN — Priority Score Engine
// Logic untuk menghitung, mengkategorikan, dan membandingkan wilayah
// =============================================================================

import type { Region, RegionIndicator, PriorityCategory } from "../data/mockData/regions";

// ---------------------------------------------------------------------------
// TYPE DEFINITIONS
// ---------------------------------------------------------------------------

/** Bobot masing-masing indikator — total harus = 1.0 */
export type ScoringWeights = Record<keyof RegionIndicator, number>;

/** Identifikasi mode kebijakan yang tersedia di Policy Simulator */
export type PolicyMode =
  | "general"
  | "flood"
  | "publicService"
  | "socialVulnerability"
  | "economy"
  | "citizenReports";

/** Metadata tentang setiap mode kebijakan */
export type PolicyModeConfig = {
  id: PolicyMode;
  label: string;
  description: string;
  weights: ScoringWeights;
};

/** Hasil scoring sebuah wilayah */
export type ScoredRegion = Region & {
  computedScore: number;
  computedCategory: PriorityCategory;
  dominantIndicators: DominantIndicator[];
};

/** Indikator dominan hasil analisis */
export type DominantIndicator = {
  key: keyof RegionIndicator;
  label: string;
  value: number;
  severity: "Kritis" | "Tinggi" | "Sedang" | "Rendah";
};

// ---------------------------------------------------------------------------
// LABEL MAP — Tampilan ramah pengguna untuk setiap indikator
// ---------------------------------------------------------------------------

export const INDICATOR_LABELS: Record<keyof RegionIndicator, string> = {
  floodRisk: "Risiko Banjir/Rob",
  populationDensity: "Kepadatan Penduduk",
  socialVulnerability: "Kerentanan Sosial",
  publicServiceAccess: "Akses Layanan Publik",
  citizenReports: "Laporan Warga",
  smeActivity: "Aktivitas UMKM",
};

// ---------------------------------------------------------------------------
// INVERTED INDICATORS
// Indikator yang logikanya dibalik: nilai tinggi = kondisi BAIK (bukan masalah)
// Dibalik saat scoring sehingga nilai rendah menghasilkan skor prioritas tinggi
// ---------------------------------------------------------------------------

/**
 * `publicServiceAccess`: semakin tinggi akses layanan → semakin baik → perlu dibalik
 * `smeActivity`: UMKM aktif = kondisi baik, tapi dalam scoring ini tetap positif
 *   karena UMKM rendah = kerentanan ekonomi tinggi (TIDAK dibalik)
 *
 * Untuk scoring, hanya `publicServiceAccess` yang diinversi:
 *   effectiveValue = 100 - rawValue
 */
const INVERTED_INDICATORS = new Set<keyof RegionIndicator>(["publicServiceAccess"]);

// ---------------------------------------------------------------------------
// SCORING WEIGHTS — 6 MODE KEBIJAKAN
// Setiap set bobot harus berjumlah tepat 1.0
// ---------------------------------------------------------------------------

/**
 * MODE 1 — General Priority (default)
 * Bobot proporsional mencerminkan kebutuhan kota secara menyeluruh
 */
const WEIGHTS_GENERAL: ScoringWeights = {
  floodRisk: 0.25,
  populationDensity: 0.15,
  socialVulnerability: 0.20,
  publicServiceAccess: 0.15, // akan diinversi
  citizenReports: 0.15,
  smeActivity: 0.10,
};

/**
 * MODE 2 — Fokus Banjir/Rob
 * Bobot besar pada risiko banjir, penurunan lain secara proporsional
 */
const WEIGHTS_FLOOD: ScoringWeights = {
  floodRisk: 0.45,
  populationDensity: 0.15,
  socialVulnerability: 0.15,
  publicServiceAccess: 0.10,
  citizenReports: 0.10,
  smeActivity: 0.05,
};

/**
 * MODE 3 — Fokus Layanan Publik
 * Bobot besar pada akses layanan (yang diinversi)
 */
const WEIGHTS_PUBLIC_SERVICE: ScoringWeights = {
  floodRisk: 0.10,
  populationDensity: 0.10,
  socialVulnerability: 0.15,
  publicServiceAccess: 0.45, // akan diinversi
  citizenReports: 0.10,
  smeActivity: 0.10,
};

/**
 * MODE 4 — Fokus Kerentanan Sosial
 * Bobot besar pada kerentanan sosial dan laporan warga
 */
const WEIGHTS_SOCIAL: ScoringWeights = {
  floodRisk: 0.10,
  populationDensity: 0.10,
  socialVulnerability: 0.45,
  publicServiceAccess: 0.10,
  citizenReports: 0.20,
  smeActivity: 0.05,
};

/**
 * MODE 5 — Fokus Ekonomi UMKM
 * Bobot besar pada UMKM — rendahnya UMKM menjadi prioritas intervensi
 * Catatan: smeActivity TIDAK diinversi; nilai rendah = perlu intervensi ekonomi
 * Dalam mode ini kita menambahkan inversi manual (lihat getEffectiveValue)
 */
const WEIGHTS_ECONOMY: ScoringWeights = {
  floodRisk: 0.05,
  populationDensity: 0.10,
  socialVulnerability: 0.15,
  publicServiceAccess: 0.15,
  citizenReports: 0.10,
  smeActivity: 0.45, // diinversi khusus di mode ini
};

/**
 * MODE 6 — Fokus Laporan Warga
 * Bobot besar pada volume laporan warga aktif
 */
const WEIGHTS_CITIZEN: ScoringWeights = {
  floodRisk: 0.10,
  populationDensity: 0.10,
  socialVulnerability: 0.15,
  publicServiceAccess: 0.10,
  citizenReports: 0.50,
  smeActivity: 0.05,
};

// ---------------------------------------------------------------------------
// POLICY MODE REGISTRY
// ---------------------------------------------------------------------------

export const POLICY_MODES: PolicyModeConfig[] = [
  {
    id: "general",
    label: "General Priority",
    description:
      "Penilaian menyeluruh menggunakan bobot seimbang untuk semua indikator. Cocok untuk perencanaan anggaran tahunan.",
    weights: WEIGHTS_GENERAL,
  },
  {
    id: "flood",
    label: "Fokus Banjir / Rob",
    description:
      "Mengutamakan wilayah dengan risiko banjir dan rob tertinggi. Cocok untuk perencanaan infrastruktur drainase dan tanggul.",
    weights: WEIGHTS_FLOOD,
  },
  {
    id: "publicService",
    label: "Fokus Layanan Publik",
    description:
      "Mengutamakan wilayah dengan akses layanan publik terendah. Cocok untuk pemerataan fasilitas kesehatan, pendidikan, dan transportasi.",
    weights: WEIGHTS_PUBLIC_SERVICE,
  },
  {
    id: "socialVulnerability",
    label: "Fokus Kerentanan Sosial",
    description:
      "Mengutamakan wilayah paling rentan secara sosial-ekonomi. Cocok untuk program perlindungan sosial dan pemberdayaan masyarakat.",
    weights: WEIGHTS_SOCIAL,
  },
  {
    id: "economy",
    label: "Fokus Ekonomi UMKM",
    description:
      "Mengutamakan wilayah dengan aktivitas UMKM rendah. Cocok untuk program stimulus ekonomi dan inkubasi bisnis mikro.",
    weights: WEIGHTS_ECONOMY,
  },
  {
    id: "citizenReports",
    label: "Fokus Laporan Warga",
    description:
      "Mengutamakan wilayah dengan volume laporan warga tertinggi. Cocok untuk respons cepat dan program participatory governance.",
    weights: WEIGHTS_CITIZEN,
  },
];

// ---------------------------------------------------------------------------
// CORE SCORING FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Menentukan apakah sebuah indikator perlu diinversi dalam mode kebijakan tertentu.
 * - `publicServiceAccess` selalu diinversi (akses tinggi = kondisi baik = prioritas rendah)
 * - `smeActivity` diinversi HANYA di mode "economy" (UMKM rendah = perlu intervensi)
 */
export function isIndicatorInvertedForMode(
  key: keyof RegionIndicator,
  mode: PolicyMode
): boolean {
  if (INVERTED_INDICATORS.has(key)) return true;
  if (key === "smeActivity" && mode === "economy") return true;
  return false;
}

/**
 * Menghitung nilai efektif indikator setelah mempertimbangkan inversi.
 * Nilai efektif berkisar 0–100.
 */
function getEffectiveValue(
  key: keyof RegionIndicator,
  rawValue: number,
  mode: PolicyMode
): number {
  return isIndicatorInvertedForMode(key, mode) ? 100 - rawValue : rawValue;
}

/**
 * `calculatePriorityScore` — Fungsi utama scoring
 *
 * Rumus: Σ(effectiveValue_i × weight_i) dibulatkan ke integer
 *
 * @param indicators - Objek indikator wilayah (nilai 0–100)
 * @param mode - Mode kebijakan yang aktif (default: "general")
 * @returns Priority Score 0–100
 */
export function calculatePriorityScore(
  indicators: RegionIndicator,
  mode: PolicyMode = "general"
): number {
  const weights = getWeightsForMode(mode);

  const rawScore = (Object.keys(weights) as (keyof RegionIndicator)[]).reduce(
    (total, key) => {
      const effective = getEffectiveValue(key, indicators[key], mode);
      return total + effective * weights[key];
    },
    0
  );

  return Math.min(100, Math.max(0, Math.round(rawScore)));
}

/**
 * `getPriorityCategory` — Konversi skor numerik ke kategori teks
 *
 * 75–100 → Tinggi | 50–74 → Sedang | 0–49 → Rendah
 */
export function getPriorityCategory(score: number): PriorityCategory {
  if (score >= 75) return "Tinggi";
  if (score >= 50) return "Sedang";
  return "Rendah";
}

/**
 * `getWeightsForMode` — Ambil konfigurasi bobot berdasarkan mode kebijakan
 */
export function getWeightsForMode(mode: PolicyMode): ScoringWeights {
  const config = POLICY_MODES.find((m) => m.id === mode);
  return config?.weights ?? WEIGHTS_GENERAL;
}

/**
 * `getPolicyModeConfig` — Ambil metadata lengkap sebuah mode kebijakan
 */
export function getPolicyModeConfig(mode: PolicyMode): PolicyModeConfig {
  return POLICY_MODES.find((m) => m.id === mode) ?? POLICY_MODES[0];
}

// ---------------------------------------------------------------------------
// DOMINANT INDICATORS ANALYSIS
// ---------------------------------------------------------------------------

/**
 * `getSeverityLabel` — Konversi nilai indikator ke label keparahan
 */
function getSeverityLabel(
  value: number,
  inverted: boolean
): DominantIndicator["severity"] {
  // Untuk indikator yang diinversi, nilai rendah = kondisi buruk
  const effectiveValue = inverted ? 100 - value : value;
  if (effectiveValue >= 80) return "Kritis";
  if (effectiveValue >= 60) return "Tinggi";
  if (effectiveValue >= 40) return "Sedang";
  return "Rendah";
}

/**
 * `getDominantIndicators` — Analisis indikator mana yang paling bermasalah
 *
 * Mengembalikan daftar indikator diurutkan dari yang paling kritis,
 * dengan mempertimbangkan inversi akses layanan publik.
 *
 * @param indicators - Objek indikator wilayah
 * @param mode - Mode kebijakan aktif
 * @param topN - Berapa indikator teratas yang dikembalikan (default: 3)
 */
export function getDominantIndicators(
  indicators: RegionIndicator,
  mode: PolicyMode = "general",
  topN = 3
): DominantIndicator[] {
  const weights = getWeightsForMode(mode);

  const result: DominantIndicator[] = (
    Object.keys(indicators) as (keyof RegionIndicator)[]
  ).map((key) => {
    const inverted = isIndicatorInvertedForMode(key, mode);
    const effective = getEffectiveValue(key, indicators[key], mode);
    return {
      key,
      label: INDICATOR_LABELS[key],
      value: indicators[key],
      effectiveValue: effective,
      weightedScore: effective * weights[key],
      severity: getSeverityLabel(indicators[key], inverted),
    };
  });

  // Urutkan berdasarkan effective weighted contribution (terbesar = paling dominan)
  return result
    .sort((a, b) => {
      const aScore =
        getEffectiveValue(a.key, a.value, mode) * weights[a.key];
      const bScore =
        getEffectiveValue(b.key, b.value, mode) * weights[b.key];
      return bScore - aScore;
    })
    .slice(0, topN)
    .map(({ key, label, value, severity }) => ({
      key,
      label,
      value,
      severity,
    }));
}

// ---------------------------------------------------------------------------
// REGION SCORING & SORTING
// ---------------------------------------------------------------------------

/**
 * `scoreRegion` — Hitung scoring lengkap untuk satu wilayah
 *
 * Menggabungkan data asli dengan skor yang dihitung secara dinamis.
 * Aman dipakai di semua halaman tanpa mengubah data asli.
 */
export function scoreRegion(region: Region, mode: PolicyMode = "general"): ScoredRegion {
  const computedScore = calculatePriorityScore(region.indicators, mode);
  const computedCategory = getPriorityCategory(computedScore);
  const dominantIndicators = getDominantIndicators(region.indicators, mode);

  return {
    ...region,
    computedScore,
    computedCategory,
    dominantIndicators,
  };
}

/**
 * `scoreAllRegions` — Hitung scoring untuk semua wilayah sekaligus
 *
 * @param regions - Array wilayah dari mock data
 * @param mode - Mode kebijakan aktif
 * @returns Array ScoredRegion, BELUM diurutkan
 */
export function scoreAllRegions(
  regions: Region[],
  mode: PolicyMode = "general"
): ScoredRegion[] {
  return regions.map((r) => scoreRegion(r, mode));
}

/**
 * `sortRegionsByScore` — Urutkan wilayah berdasarkan computedScore
 *
 * @param regions - Array ScoredRegion
 * @param order - "desc" (skor tertinggi duluan, default) | "asc"
 */
export function sortRegionsByScore(
  regions: ScoredRegion[],
  order: "asc" | "desc" = "desc"
): ScoredRegion[] {
  return [...regions].sort((a, b) =>
    order === "desc"
      ? b.computedScore - a.computedScore
      : a.computedScore - b.computedScore
  );
}

/**
 * `getRankedRegions` — One-shot: score + sort untuk semua wilayah
 *
 * Fungsi utama yang paling sering dipakai di dashboard dan simulator.
 *
 * @param regions - Array Region dari mock data
 * @param mode - Mode kebijakan aktif
 * @param order - "desc" = prioritas tertinggi duluan
 */
export function getRankedRegions(
  regions: Region[],
  mode: PolicyMode = "general",
  order: "asc" | "desc" = "desc"
): ScoredRegion[] {
  return sortRegionsByScore(scoreAllRegions(regions, mode), order);
}

// ---------------------------------------------------------------------------
// SUMMARY STATS
// ---------------------------------------------------------------------------

/**
 * `getCityScoringStats` — Hitung statistik agregat kota dari hasil scoring
 */
export function getCityScoringStats(scoredRegions: ScoredRegion[]) {
  const total = scoredRegions.length;
  const highPriority = scoredRegions.filter(
    (r) => r.computedCategory === "Tinggi"
  ).length;
  const mediumPriority = scoredRegions.filter(
    (r) => r.computedCategory === "Sedang"
  ).length;
  const lowPriority = scoredRegions.filter(
    (r) => r.computedCategory === "Rendah"
  ).length;
  const avgScore =
    Math.round(
      (scoredRegions.reduce((s, r) => s + r.computedScore, 0) / total) * 10
    ) / 10;
  const topRegion = scoredRegions.reduce((top, r) =>
    r.computedScore > top.computedScore ? r : top
  );

  return {
    total,
    highPriority,
    mediumPriority,
    lowPriority,
    averageScore: avgScore,
    topRegion: topRegion.name,
    topScore: topRegion.computedScore,
  };
}

/**
 * `compareScores` — Bandingkan skor dua mode kebijakan untuk satu wilayah
 * Berguna untuk menampilkan delta di Policy Simulator
 */
export function compareScores(
  indicators: RegionIndicator,
  modeA: PolicyMode,
  modeB: PolicyMode
): { scoreA: number; scoreB: number; delta: number } {
  const scoreA = calculatePriorityScore(indicators, modeA);
  const scoreB = calculatePriorityScore(indicators, modeB);
  return { scoreA, scoreB, delta: scoreB - scoreA };
}
