import { mockHistoricalMetrics, HistoricalMetric } from "../data/mockHistoricalMetrics";

// Tipe indikator yang valid
export type TrendIndicator = keyof Omit<HistoricalMetric, "regionId" | "regionName" | "year">;

// Cek apakah indikator berkategori "positif" (naik = membaik)
export function isPositiveIndicator(indicator: TrendIndicator): boolean {
  return [
    "smeActivity",
    "publicServiceAccess",
    "citizenAppreciation",
    "citizenSuggestion",
    "completionRate",
    "validatedResolutionRate"
  ].includes(indicator);
}

// Cek apakah indikator berkategori "risiko" (naik = perlu perhatian/memburuk)
export function isRiskIndicator(indicator: TrendIndicator): boolean {
  return [
    "floodRisk",
    "socialVulnerability",
    "citizenComplaint",
    "citizenCriticism",
    "priorityScore"
  ].includes(indicator);
}

// 1. Ambil data historis terurut berdasarkan tahun untuk wilayah tertentu
export function getRegionTrend(regionId: string): HistoricalMetric[] {
  return mockHistoricalMetrics
    .filter((m) => m.regionId === regionId)
    .sort((a, b) => a.year - b.year);
}

// 2. Hitung delta Year-over-Year
export function getYearOverYearDelta(currentValue: number, previousValue: number): number {
  return currentValue - previousValue;
}

// 3. Klasifikasikan arah perubahan berdasarkan threshold (default 1)
export function classifyTrend(delta: number, threshold = 1): "meningkat" | "menurun" | "stabil" {
  if (delta > threshold) return "meningkat";
  if (delta < -threshold) return "menurun";
  return "stabil";
}

// Helper untuk mengambil nilai indikator wilayah pada tahun tertentu
function getMetricValue(regionId: string, year: number, indicator: TrendIndicator): number {
  const record = mockHistoricalMetrics.find((m) => m.regionId === regionId && m.year === year);
  return record ? record[indicator] : 0;
}

// Helper untuk mengambil perubahan nilai indikator dari tahun 2024 ke 2026
function getPeriodDelta(regionId: string, indicator: TrendIndicator, fromYear = 2024, toYear = 2026): number {
  const valStart = getMetricValue(regionId, fromYear, indicator);
  const valEnd = getMetricValue(regionId, toYear, indicator);
  return valEnd - valStart;
}

// 4. Wilayah yang kondisinya paling membaik (Aktivitas ekonomi naik, layanan publik naik, atau tingkat kerawanan/risiko turun)
export function getTopImprovingRegions(indicator: TrendIndicator, fromYear = 2024, toYear = 2026) {
  const regions = Array.from(new Set(mockHistoricalMetrics.map((m) => m.regionId)));
  const results = regions.map((regionId) => {
    const name = mockHistoricalMetrics.find((m) => m.regionId === regionId)?.regionName || regionId;
    const delta = getPeriodDelta(regionId, indicator, fromYear, toYear);
    
    // Nilai kegunaan perbaikan
    // Jika indikator positif: peningkatan adalah perbaikan (+delta)
    // Jika indikator risiko: penurunan adalah perbaikan (-delta)
    const improvementScore = isPositiveIndicator(indicator) ? delta : -delta;

    return { regionId, regionName: name, delta, improvementScore };
  });

  // Urutkan dari perbaikan paling tinggi
  return results.sort((a, b) => b.improvementScore - a.improvementScore);
}

// 5. Wilayah yang kondisinya paling memburuk / menurun (Aktivitas ekonomi turun, atau tingkat kerawanan/risiko naik)
export function getTopDecliningRegions(indicator: TrendIndicator, fromYear = 2024, toYear = 2026) {
  const regions = Array.from(new Set(mockHistoricalMetrics.map((m) => m.regionId)));
  const results = regions.map((regionId) => {
    const name = mockHistoricalMetrics.find((m) => m.regionId === regionId)?.regionName || regionId;
    const delta = getPeriodDelta(regionId, indicator, fromYear, toYear);
    
    // Nilai kemunduran
    // Jika indikator positif: penurunan adalah pemburukan (-delta)
    // Jika indikator risiko: peningkatan adalah pemburukan (+delta)
    const declineScore = isPositiveIndicator(indicator) ? -delta : delta;

    return { regionId, regionName: name, delta, declineScore };
  });

  // Urutkan dari kemunduran paling parah
  return results.sort((a, b) => b.declineScore - a.declineScore);
}

// 6. Highlight ringkas untuk agenda rapat pemerintahan (bahan rapat kebijakan, perlu validasi OPD)
export interface MeetingHighlight {
  type: "positive" | "warning" | "info";
  message: string;
}

export function getMeetingHighlights(fromYear = 2024, toYear = 2026): MeetingHighlight[] {
  const highlights: MeetingHighlight[] = [];

  // Peningkatan ekonomi lokal (smeActivity) terbaik
  const topSme = getTopImprovingRegions("smeActivity", fromYear, toYear)[0];
  if (topSme && topSme.delta > 0) {
    highlights.push({
      type: "positive",
      message: `Aktivitas ekonomi/UMKM di ${topSme.regionName} meningkat paling signifikan sebesar +${topSme.delta} poin (tren indikatif, perlu konfirmasi lapangan Bappeda/Dinas Koperasi UMKM).`,
    });
  }

  // Penurunan ekonomi lokal terburuk
  const worstSme = getTopDecliningRegions("smeActivity", fromYear, toYear)[0];
  if (worstSme && worstSme.delta < 0) {
    highlights.push({
      type: "warning",
      message: `Aktivitas UMKM di ${worstSme.regionName} mengalami penurunan sebesar ${worstSme.delta} poin, menunjukkan perlunya evaluasi stimulus ekonomi wilayah oleh dinas terkait.`,
    });
  }

  // Kenaikan kritik/keluhan warga
  const topComplaints = getTopDecliningRegions("citizenComplaint", fromYear, toYear)[0];
  if (topComplaints && topComplaints.delta > 0) {
    highlights.push({
      type: "warning",
      message: `Tekanan pengaduan masyarakat di ${topComplaints.regionName} meningkat +${topComplaints.delta} poin. Agenda prioritas koordinasi lapangan OPD diperlukan untuk penanganan segera.`,
    });
  }

  // Peningkatan akuntabilitas penyelesaian laporan warga (validatedResolutionRate)
  const topAccountability = getTopImprovingRegions("validatedResolutionRate", fromYear, toYear)[0];
  if (topAccountability && topAccountability.delta > 0) {
    highlights.push({
      type: "positive",
      message: `Tingkat tindak lanjut tervalidasi di ${topAccountability.regionName} membaik sebesar +${topAccountability.delta}%, mencerminkan peningkatan efektivitas penanganan laporan oleh dinas pelaksana.`,
    });
  }

  return highlights;
}

// 7. Ambal ringkasan akuntabilitas wilayah (untuk progress tracking tindak lanjut)
export function getAccountabilityTrend(regionId: string) {
  const trend = getRegionTrend(regionId);
  if (trend.length === 0) return null;
  
  const latest = trend[trend.length - 1];
  const previous = trend.length > 1 ? trend[trend.length - 2] : latest;

  const deltaCompletion = latest.completionRate - previous.completionRate;
  const deltaResolution = latest.validatedResolutionRate - previous.validatedResolutionRate;

  return {
    completionRate: latest.completionRate,
    validatedResolutionRate: latest.validatedResolutionRate,
    deltaCompletion,
    deltaResolution,
    latestYear: latest.year,
  };
}
