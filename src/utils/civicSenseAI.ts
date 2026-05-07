// =============================================================================
// CivicSense AI — Rule-Based Policy Assistant Engine
// Prototype: simulasi narasi berbasis template dari data wilayah
// TIDAK menggunakan API eksternal. TIDAK mengklaim data resmi.
// =============================================================================

import type { Region, RegionIndicator } from "../data/mockData/regions";
import {
  scoreRegion,
  getDominantIndicators,
  INDICATOR_LABELS,
  POLICY_MODES,
} from "./scoring";
import type { PolicyMode, ScoredRegion } from "./scoring";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export type AIInsight = {
  /** Judul singkat narasi */
  headline: string;
  /** Paragraf utama narasi */
  body: string;
  /** Poin-poin penjelas (opsional) */
  bullets: string[];
  /** Rekomendasi tindak lanjut singkat */
  callToAction: string;
  /** Tingkat urgensi yang dideteksi AI */
  urgencyLevel: "critical" | "high" | "medium" | "low";
};

export type SimulatorNarration = {
  modeLabel: string;
  summary: string;
  whyChanged: string;
  topRegion: string;
  topRegionReason: string;
  policyImplication: string;
};

export type CitizenSummary = {
  headline: string;
  layman: string;
  whatItMeans: string;
  whatWillHappen: string;
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const INVERTED = new Set<keyof RegionIndicator>(["publicServiceAccess"]);

function effectiveValue(key: keyof RegionIndicator, val: number): number {
  return INVERTED.has(key) ? 100 - val : val;
}

function topIndicators(
  indicators: RegionIndicator,
  mode: PolicyMode,
  n: number
): ReturnType<typeof getDominantIndicators> {
  return getDominantIndicators(indicators, mode, n);
}

function severityWord(sev: string): string {
  if (sev === "Kritis") return "sangat kritis";
  if (sev === "Tinggi") return "cukup tinggi";
  if (sev === "Sedang") return "sedang";
  return "relatif rendah";
}

function categoryWord(cat: string): { adj: string; urgency: AIInsight["urgencyLevel"] } {
  if (cat === "Tinggi") return { adj: "sangat membutuhkan intervensi segera", urgency: "critical" };
  if (cat === "Sedang") return { adj: "memerlukan perhatian terencana", urgency: "high" };
  return { adj: "berada dalam kondisi relatif terkendali", urgency: "medium" };
}

// ---------------------------------------------------------------------------
// 1. AI INSIGHT — Why is this region a priority?
// ---------------------------------------------------------------------------

/**
 * generateRegionInsight
 * Hasilkan narasi AI mengapa suatu wilayah menjadi prioritas.
 */
export function generateRegionInsight(
  region: Region,
  mode: PolicyMode = "general"
): AIInsight {
  const scored = scoreRegion(region, mode);
  const top3 = topIndicators(region.indicators, mode, 3);
  const { adj, urgency } = categoryWord(scored.computedCategory);

  // Build headline
  const headline =
    scored.computedCategory === "Tinggi"
      ? `${region.name} memerlukan intervensi prioritas tinggi`
      : scored.computedCategory === "Sedang"
      ? `${region.name} berada di zona perhatian sedang`
      : `${region.name} dalam kondisi relatif baik`;

  // Build body
  const indicatorDesc = top3
    .map((d) => `${d.label.toLowerCase()} (${d.value}/100 — ${severityWord(d.severity)})`)
    .join(", ");

  const body =
    `Berdasarkan analisis ${POLICY_MODES.find((m) => m.id === mode)?.label ?? "General Priority"}, ` +
    `Kecamatan ${region.name} memperoleh Priority Score sebesar ${scored.computedScore}/100 ` +
    `dan ${adj}. ` +
    `Tiga indikator yang paling berkontribusi adalah: ${indicatorDesc}. ` +
    `${region.dominantIssues[0]}.`;

  // Build bullets
  const bullets = top3.map(
    (d) =>
      `${INDICATOR_LABELS[d.key]}: ${d.value}/100 — ${d.severity}` +
      (INVERTED.has(d.key)
        ? " (nilai rendah berarti kebutuhan intervensi tinggi)"
        : "")
  );

  // CTA
  const cta =
    scored.computedCategory === "Tinggi"
      ? "Prioritaskan koordinasi lintas OPD dan alokasi anggaran darurat untuk wilayah ini."
      : scored.computedCategory === "Sedang"
      ? "Masukkan wilayah ini dalam rencana intervensi jangka menengah (6–12 bulan)."
      : "Pantau wilayah ini secara berkala dan siapkan program pencegahan preventif.";

  return { headline, body, bullets, callToAction: cta, urgencyLevel: urgency };
}

// ---------------------------------------------------------------------------
// 2. EXPLAIN PRIORITY — Narasi singkat untuk tombol "Explain Priority"
// ---------------------------------------------------------------------------

/**
 * explainPriority
 * Narasi satu paragraf ringkas untuk tombol Explain Priority.
 */
export function explainPriority(region: Region, mode: PolicyMode = "general"): string {
  const scored = scoreRegion(region, mode);
  const top2 = topIndicators(region.indicators, mode, 2);
  const issue = region.dominantIssues[0].toLowerCase().replace(/\.$/, "");

  const indicatorText = top2
    .map((d) => `${d.label.toLowerCase()} ${severityWord(d.severity)}`)
    .join(" dan ");

  return (
    `Kecamatan ${region.name} menjadi prioritas ${scored.computedCategory.toLowerCase()} ` +
    `karena memiliki kombinasi ${indicatorText}. ` +
    `Isu dominan yang paling mendesak adalah ${issue}. ` +
    `Dengan Priority Score ${scored.computedScore}/100, wilayah ini ` +
    (scored.computedCategory === "Tinggi"
      ? "membutuhkan tindakan segera dari lintas dinas."
      : scored.computedCategory === "Sedang"
      ? "perlu masuk dalam perencanaan intervensi semester berikutnya."
      : "tetap perlu pemantauan rutin agar kondisinya terjaga.")
  );
}

// ---------------------------------------------------------------------------
// 3. SIMULATOR NARRATION — Explain why ranking changed
// ---------------------------------------------------------------------------

/**
 * generateSimulatorNarration
 * Hasilkan narasi AI yang menjelaskan perubahan ranking saat mode berubah.
 */
export function generateSimulatorNarration(
  mode: PolicyMode,
  rankedRegions: ScoredRegion[],
  generalRanked: ScoredRegion[]
): SimulatorNarration {
  const modeConfig = POLICY_MODES.find((m) => m.id === mode)!;
  const top1 = rankedRegions[0];
  const top1General = generalRanked.findIndex((r) => r.id === top1.id) + 1;

  // Regions that moved up
  const movedUp = rankedRegions
    .map((r, i) => ({
      name: r.name,
      delta: generalRanked.findIndex((g) => g.id === r.id) - i,
    }))
    .filter((x) => x.delta > 0)
    .sort((a, b) => b.delta - a.delta);

  const movedUpText =
    movedUp.length > 0
      ? `${movedUp
          .slice(0, 2)
          .map((r) => r.name)
          .join(" dan ")} naik signifikan dalam simulasi ini`
      : "tidak ada perubahan peringkat yang signifikan";

  // Mode-specific explanations
  const modeExplanations: Record<PolicyMode, string> = {
    general:
      "Semua indikator mendapat bobot berimbang. Ranking mencerminkan kondisi multi-dimensi tiap wilayah secara menyeluruh.",
    flood:
      "Bobot risiko banjir/rob dinaikkan ke 45%. Wilayah dengan ancaman genangan tinggi — terutama di zona pesisir utara — otomatis naik prioritas.",
    publicService:
      "Akses layanan publik diberi bobot dominan 45%. Kecamatan dengan fasilitas paling terbatas menjadi prioritas utama intervensi.",
    socialVulnerability:
      "Kerentanan sosial mendapat bobot terbesar. Wilayah dengan warga paling rentan — perlu perlindungan sosial, kesehatan, atau pemberdayaan — naik ke atas.",
    economy:
      "Aktivitas UMKM menjadi indikator utama. Wilayah dengan ekonomi warga paling lemah diprioritaskan untuk stimulus dan pemberdayaan usaha mikro.",
    citizenReports:
      "Laporan warga diberi bobot 50%. Kecamatan paling aktif melaporkan masalah — yang berarti kebutuhan responsnya paling tinggi — naik peringkat.",
  };

  const policyImplications: Record<PolicyMode, string> = {
    general:
      "Cocok digunakan sebagai dasar perencanaan anggaran tahunan dan Musrenbang multi-sektor.",
    flood:
      "Gunakan hasil ini untuk mengalokasikan anggaran BPBD, PU, dan infrastruktur pesisir secara tepat sasaran.",
    publicService:
      "Prioritaskan program mobile service, pembangunan puskesmas, dan perluasan rute transportasi.",
    socialVulnerability:
      "Fokuskan bansos, PKH, dan program pemberdayaan di wilayah teratas ranking ini.",
    economy:
      "Arahkan kredit mikro, pelatihan UMKM, dan pasar desa ke wilayah dengan ekonomi paling lemah.",
    citizenReports:
      "Perkuat kanal pengaduan, respons OPD, dan pelibatan warga sebagai mitra pemantau.",
  };

  const summary =
    `Ketika fokus kebijakan diarahkan ke ${modeConfig.label}, sistem merekonstruksi ` +
    `ranking berdasarkan bobot indikator yang berbeda. ${modeExplanations[mode]}`;

  const whyChanged =
    `Dalam simulasi ini, ${movedUpText}. ` +
    (top1General === 1
      ? `${top1.name} tetap berada di posisi teratas dengan skor ${top1.computedScore}/100.`
      : `${top1.name} naik ke posisi pertama dengan skor ${top1.computedScore}/100.`);

  const topRegionReason = explainPriority(
    { ...top1 } as Region,
    mode
  );

  return {
    modeLabel: modeConfig.label,
    summary,
    whyChanged,
    topRegion: top1.name,
    topRegionReason,
    policyImplication: policyImplications[mode],
  };
}

// ---------------------------------------------------------------------------
// 4. CITIZEN SUMMARY — Plain language for public page
// ---------------------------------------------------------------------------

/**
 * generateCitizenSummary
 * Hasilkan ringkasan publik per wilayah dalam bahasa yang mudah dipahami warga.
 */
export function generateCitizenSummary(region: Region): CitizenSummary {
  const scored = scoreRegion(region);
  const issue = region.dominantIssues[0].toLowerCase().replace(/\.$/, "");
  const rec = region.policyRecommendations[0];

  const headlines: Record<string, string> = {
    Tinggi: `⚠️ ${region.name} butuh perhatian segera`,
    Sedang: `📋 ${region.name} sedang dalam pemantauan`,
    Rendah: `✅ ${region.name} dalam kondisi terjaga`,
  };

  const layman =
    `Warga ${region.name} menghadapi tantangan karena ${issue}. ` +
    `Berdasarkan data yang dikumpulkan dari berbagai indikator, ` +
    `wilayah ini mendapat nilai prioritas ${scored.computedScore} dari skala 100.`;

  const whatItMeans =
    scored.computedCategory === "Tinggi"
      ? `Nilai ini berarti ${region.name} termasuk wilayah yang paling membutuhkan bantuan dan perhatian dari pemerintah kota saat ini.`
      : scored.computedCategory === "Sedang"
      ? `Nilai ini berarti ${region.name} perlu diperhatikan dan sedang masuk dalam rencana kajian pemerintah.`
      : `Nilai ini berarti ${region.name} berada dalam kondisi yang relatif lebih baik dibandingkan wilayah lain dalam analisis ini.`;

  const whatWillHappen =
    `Langkah yang sedang direkomendasikan untuk wilayah ini adalah: ${rec.toLowerCase().replace(/\.$/, "")}. ` +
    `Program ini melibatkan ${region.relatedStakeholders.slice(0, 2).join(" dan ")}.`;

  return {
    headline: headlines[scored.computedCategory] ?? headlines["Sedang"],
    layman,
    whatItMeans,
    whatWillHappen,
  };
}

// ---------------------------------------------------------------------------
// AI DISCLAIMER (static)
// ---------------------------------------------------------------------------

export const AI_DISCLAIMER =
  "CivicSense AI pada prototype ini menggunakan simulasi rule-based dari data dummy. " +
  "Pada implementasi nyata, fitur ini dapat dikembangkan dengan integrasi model AI dan data resmi pemerintah. " +
  "Seluruh narasi dihasilkan secara otomatis dari template berdasarkan indikator wilayah — bukan opini manusia atau rekomendasi resmi.";
