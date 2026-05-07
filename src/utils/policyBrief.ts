// =============================================================================
// CIVICTWIN — Auto Policy Brief Generator
// Template-based policy brief generator (tidak menggunakan AI API)
// =============================================================================

import type { Region, RegionIndicator } from "../data/mockData/regions";
import {
  scoreRegion,
  getDominantIndicators,
  INDICATOR_LABELS,
  isIndicatorInvertedForMode,
} from "./scoring";
import type { PolicyMode } from "./scoring";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export type PolicyBrief = {
  /** ID dokumen unik untuk referensi */
  docId: string;
  /** Timestamp generasi */
  generatedAt: string;
  /** Wilayah yang dianalisis */
  regionId: string;
  regionName: string;
  /** Skor dan kategori */
  computedScore: number;
  computedCategory: string;
  /** Konten utama */
  executiveSummary: string;
  problemStatement: string;
  dataInsights: DataInsight[];
  policyRecommendations: RecommendationItem[];
  stakeholders: string[];
  implementationNotes: ImplementationNote[];
  expectedImpacts: ExpectedImpact[];
  /** Metadata */
  disclaimer: string;
  dataMode: string;
};

export type DataInsight = {
  indicator: string;
  value: number;
  interpretation: string;
  urgency: "Kritis" | "Tinggi" | "Sedang" | "Rendah";
};

export type RecommendationItem = {
  priority: number;
  action: string;
  rationale: string;
  lead: string;
  timeline: string;
};

export type ImplementationNote = {
  step: number;
  title: string;
  detail: string;
};

export type ExpectedImpact = {
  dimension: string;
  description: string;
  icon: string;
};

// ---------------------------------------------------------------------------
// IMPLEMENTATION NOTES (universal)
// ---------------------------------------------------------------------------

const UNIVERSAL_IMPLEMENTATION_NOTES: ImplementationNote[] = [
  {
    step: 1,
    title: "Validasi Data Wilayah",
    detail:
      "Verifikasi data prototype dengan data operasional dari dinas terkait sebelum dijadikan basis keputusan resmi.",
  },
  {
    step: 2,
    title: "Koordinasi Lintas OPD",
    detail:
      "Selenggarakan rapat koordinasi awal dengan seluruh OPD yang masuk dalam daftar stakeholder untuk menyamakan pemahaman kondisi wilayah.",
  },
  {
    step: 3,
    title: "Penentuan Program Prioritas",
    detail:
      "Berdasarkan hasil koordinasi, tetapkan program unggulan per semester yang sesuai kapasitas anggaran dan kapasitas kelembagaan.",
  },
  {
    step: 4,
    title: "Publikasi Ringkasan Transparansi",
    detail:
      "Publikasikan ringkasan kondisi dan rencana intervensi wilayah melalui kanal Transparansi Publik agar masyarakat dapat memantau.",
  },
];

// ---------------------------------------------------------------------------
// EXPECTED IMPACTS (universal)
// ---------------------------------------------------------------------------

const UNIVERSAL_EXPECTED_IMPACTS: ExpectedImpact[] = [
  {
    dimension: "Kecepatan Keputusan",
    description:
      "Pemerintah dapat mengidentifikasi wilayah prioritas dalam hitungan menit, bukan minggu.",
    icon: "⚡",
  },
  {
    dimension: "Transparansi Prioritas",
    description:
      "Dasar numerik yang terbuka memungkinkan publik memahami mengapa suatu wilayah mendapat perhatian lebih.",
    icon: "🔍",
  },
  {
    dimension: "Koordinasi Lintas Dinas",
    description:
      "Satu platform bersama mengurangi silo data antar OPD dan mempercepat sinkronisasi program.",
    icon: "🔗",
  },
  {
    dimension: "Pemahaman Masyarakat",
    description:
      "Warga dapat memahami alasan di balik program intervensi yang dijalankan pemerintah di wilayah mereka.",
    icon: "🤝",
  },
];

// ---------------------------------------------------------------------------
// URGENCY HELPER
// ---------------------------------------------------------------------------

function urgencyOf(val: number, inverted: boolean): DataInsight["urgency"] {
  const eff = inverted ? 100 - val : val;
  if (eff >= 80) return "Kritis";
  if (eff >= 60) return "Tinggi";
  if (eff >= 40) return "Sedang";
  return "Rendah";
}

// ---------------------------------------------------------------------------
// INTERPRETATION TEMPLATES per indicator
// ---------------------------------------------------------------------------

function interpretIndicator(
  key: keyof RegionIndicator,
  value: number,
  urgency: DataInsight["urgency"],
  inverted = false
): string {
  const urg = urgency === "Kritis" || urgency === "Tinggi" ? "tinggi" : "rendah";

  switch (key) {
    case "floodRisk":
      return `Indeks risiko banjir/rob sebesar ${value}/100 menunjukkan ancaman ${urg} terhadap permukiman dan infrastruktur wilayah.`;
    case "populationDensity":
      return `Kepadatan penduduk ${value}/100 mencerminkan tekanan ${urg} pada layanan dasar dan ruang hidup warga.`;
    case "socialVulnerability":
      return `Kerentanan sosial ${value}/100 mengindikasikan proporsi warga yang membutuhkan perlindungan sosial ${urg}.`;
    case "publicServiceAccess":
      return `Akses layanan publik ${value}/100 — semakin rendah skor ini, semakin besar kesenjangan layanan yang perlu diatasi. Nilai ${value} menunjukkan urgensi ${urg}.`;
    case "citizenReports":
      return `Volume laporan warga ${value}/100 mencerminkan tingkat kepedulian dan keaktifan masyarakat dalam melaporkan masalah ke pemerintah.`;
    case "smeActivity": {
      const interpretation = inverted
        ? urg === "tinggi"
          ? "menandakan kebutuhan stimulus dan pendampingan ekonomi yang lebih kuat"
          : "menunjukkan aktivitas ekonomi lokal relatif terjaga"
        : urg === "tinggi"
        ? "baik namun perlu dijaga"
        : "membutuhkan stimulus agar ekonomi warga menguat";
      return `Aktivitas UMKM ${value}/100 menggambarkan daya tahan ekonomi lokal — nilai ini ${interpretation}.`;
    }
    default:
      return `Nilai ${value}/100 pada indikator ini perlu mendapat perhatian dalam perencanaan wilayah.`;
  }
}

// ---------------------------------------------------------------------------
// EXECUTIVE SUMMARY GENERATOR
// ---------------------------------------------------------------------------

function generateExecutiveSummary(region: Region, score: number, category: string): string {
  const catDesc =
    category === "Tinggi"
      ? "memerlukan intervensi segera dari pemerintah kota"
      : category === "Sedang"
      ? "memerlukan perhatian berkelanjutan dari lintas dinas terkait"
      : "berada dalam kondisi relatif terkendali namun perlu pemantauan rutin";

  const topIssue = region.dominantIssues[0];

  return (
    `Wilayah ${region.name} memperoleh Priority Score sebesar ${score}/100 ` +
    `dan termasuk dalam kategori Prioritas ${category}, yang ${catDesc}. ` +
    `Isu utama yang mendominasi wilayah ini adalah: ${topIssue.toLowerCase()}. ` +
    `Dokumen ini merangkum analisis indikator, rekomendasi kebijakan, dan langkah implementasi ` +
    `yang diperlukan untuk meningkatkan kualitas tata kelola wilayah ${region.name} ` +
    `secara terukur dan transparan.`
  );
}

// ---------------------------------------------------------------------------
// PROBLEM STATEMENT GENERATOR
// ---------------------------------------------------------------------------

function generateProblemStatement(region: Region): string {
  const issues = region.dominantIssues.slice(0, 3).join("; ");
  return (
    `Wilayah ${region.name} menghadapi tantangan struktural yang mencakup: ${issues}. ` +
    `Kompleksitas permasalahan ini membutuhkan pendekatan lintas sektor yang terkoordinasi, ` +
    `didukung data yang akurat, dan dilaksanakan secara bertahap sesuai kapasitas fiskal daerah.`
  );
}

// ---------------------------------------------------------------------------
// RECOMMENDATION ITEMS GENERATOR
// ---------------------------------------------------------------------------

function generateRecommendationItems(region: Region): RecommendationItem[] {
  return region.policyRecommendations.map((rec, i) => {
    const lead = region.relatedStakeholders[i] ?? region.relatedStakeholders[0];
    const timeline =
      i === 0
        ? "0–3 bulan (mendesak)"
        : i === 1
        ? "3–6 bulan (jangka pendek)"
        : i === 2
        ? "6–12 bulan (jangka menengah)"
        : "12–24 bulan (jangka panjang)";

    return {
      priority: i + 1,
      action: rec,
      rationale: `Berdasarkan analisis indikator wilayah ${region.name}, langkah ini dinilai paling berdampak terhadap peningkatan kondisi ${region.name}.`,
      lead,
      timeline,
    };
  });
}

// ---------------------------------------------------------------------------
// DATA INSIGHTS GENERATOR
// ---------------------------------------------------------------------------

function generateDataInsights(region: Region, mode: PolicyMode): DataInsight[] {
  const dominant = getDominantIndicators(region.indicators, mode, 4);

  return dominant.map((d) => {
    const inv = isIndicatorInvertedForMode(d.key, mode);
    const urgency = urgencyOf(d.value, inv);
    return {
      indicator: INDICATOR_LABELS[d.key],
      value: d.value,
      interpretation: interpretIndicator(d.key, d.value, urgency, inv),
      urgency,
    };
  });
}

// ---------------------------------------------------------------------------
// MAIN GENERATOR FUNCTION
// ---------------------------------------------------------------------------

/**
 * `generatePolicyBrief` — Hasilkan policy brief lengkap dari data wilayah
 *
 * @param region - Data Region dari mockData
 * @param mode - Mode kebijakan yang digunakan (default: general)
 */
export function generatePolicyBrief(
  region: Region,
  mode: PolicyMode = "general"
): PolicyBrief {
  const scored = scoreRegion(region, mode);
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    docId: `PB-${region.id.toUpperCase()}-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`,
    generatedAt: dateStr,
    regionId: region.id,
    regionName: region.name,
    computedScore: scored.computedScore,
    computedCategory: scored.computedCategory,
    executiveSummary: generateExecutiveSummary(region, scored.computedScore, scored.computedCategory),
    problemStatement: generateProblemStatement(region),
    dataInsights: generateDataInsights(region, mode),
    policyRecommendations: generateRecommendationItems(region),
    stakeholders: region.relatedStakeholders,
    implementationNotes: UNIVERSAL_IMPLEMENTATION_NOTES,
    expectedImpacts: UNIVERSAL_EXPECTED_IMPACTS,
    disclaimer:
      "Dokumen ini dihasilkan oleh sistem CIVICTWIN Prototype menggunakan kombinasi data publik, data olahan, dan simulasi terbatas untuk keperluan proof of concept. Bukan dokumen resmi pemerintah. Pada implementasi nyata, data harus divalidasi dengan sumber resmi sebelum dijadikan dasar kebijakan.",
    dataMode: mode,
  };
}
