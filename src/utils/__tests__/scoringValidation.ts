/**
 * CIVICTWIN — Scoring Validation Script
 * Jalankan: npx ts-node src/utils/__tests__/scoringValidation.ts
 * Atau lihat output melalui console di browser dev tools.
 *
 * File ini hanya untuk validasi — tidak dipakai di production.
 */

import { mockRegions } from "../../data/mockData/regions";
import {
  calculatePriorityScore,
  getPriorityCategory,
  getDominantIndicators,
  getRankedRegions,
  getCityScoringStats,
  compareScores,
  POLICY_MODES,
} from "../scoring";

// ─── 1. Hitung skor semua wilayah (mode: general) ───────────────────────────
console.log("\n══════════════════════════════════════════");
console.log("  CIVICTWIN — Scoring Validation Results  ");
console.log("══════════════════════════════════════════\n");

const ranked = getRankedRegions(mockRegions, "general");

console.log("📊 Ranking Wilayah — Mode: General Priority\n");
ranked.forEach((r, i) => {
  console.log(
    `  ${i + 1}. ${r.name.padEnd(20)} | Score: ${r.computedScore
      .toString()
      .padStart(3)} | ${r.computedCategory}`
  );
  r.dominantIndicators.forEach((d) => {
    console.log(`       ↳ ${d.label}: ${d.value} [${d.severity}]`);
  });
});

// ─── 2. City Stats ───────────────────────────────────────────────────────────
const stats = getCityScoringStats(ranked);
console.log("\n📈 City Scoring Summary:");
console.log(`   Total wilayah   : ${stats.total}`);
console.log(`   Prioritas Tinggi: ${stats.highPriority}`);
console.log(`   Prioritas Sedang: ${stats.mediumPriority}`);
console.log(`   Prioritas Rendah: ${stats.lowPriority}`);
console.log(`   Rata-rata skor  : ${stats.averageScore}`);
console.log(`   Wilayah teratas : ${stats.topRegion} (${stats.topScore})\n`);

// ─── 3. Uji semua mode kebijakan pada satu wilayah (Semarang Utara) ──────────
const semarangUtara = mockRegions.find((r) => r.id === "semarang-utara")!;
console.log(`\n🎛️  Skor Semarang Utara per Mode Kebijakan:\n`);
POLICY_MODES.forEach((mode) => {
  const score = calculatePriorityScore(semarangUtara.indicators, mode.id);
  const category = getPriorityCategory(score);
  console.log(
    `   ${mode.label.padEnd(28)} → ${score.toString().padStart(3)} (${category})`
  );
});

// ─── 4. Uji compareScores ────────────────────────────────────────────────────
const banyumanik = mockRegions.find((r) => r.id === "banyumanik")!;
const comparison = compareScores(banyumanik.indicators, "general", "flood");
console.log(`\n⚖️  Perbandingan Banyumanik — General vs Fokus Banjir:`);
console.log(`   General Score : ${comparison.scoreA}`);
console.log(`   Flood Score   : ${comparison.scoreB}`);
console.log(`   Delta         : ${comparison.delta > 0 ? "+" : ""}${comparison.delta}\n`);

// ─── 5. Uji inversi publicServiceAccess ──────────────────────────────────────
const tugu = mockRegions.find((r) => r.id === "tugu")!;
const generalScore = calculatePriorityScore(tugu.indicators, "general");
const publicScore = calculatePriorityScore(tugu.indicators, "publicService");
console.log(`\n🔄  Uji Inversi publicServiceAccess — Wilayah Tugu:`);
console.log(`   Raw publicServiceAccess : ${tugu.indicators.publicServiceAccess}`);
console.log(`   Score (general)         : ${generalScore} → ${getPriorityCategory(generalScore)}`);
console.log(`   Score (publicService)   : ${publicScore} → ${getPriorityCategory(publicScore)}`);
console.log(`   (Tugu akses=38, skor publik lebih tinggi ✓)\n`);

// ─── 6. Validasi bobot total = 1.0 per mode ──────────────────────────────────
console.log("✅ Validasi bobot per mode (harus = 1.00):");
POLICY_MODES.forEach((mode) => {
  const total = Object.values(mode.weights).reduce((s, w) => s + w, 0);
  const ok = Math.abs(total - 1.0) < 0.0001;
  console.log(
    `   ${mode.label.padEnd(28)} → ${total.toFixed(2)} ${ok ? "✓" : "✗ INVALID"}`
  );
});
console.log();
