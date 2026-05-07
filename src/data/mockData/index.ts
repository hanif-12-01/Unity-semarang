// =============================================================================
// CIVICTWIN — Mock Data Barrel Export
// Import semua mock data dari sini untuk konsistensi lintas halaman
// =============================================================================

export {
  mockRegions,
  citySummary,
  getRegionById,
  getRegionsByPriority,
  getRegionsSortedByScore,
  getAverageIndicator,
} from "./regions";

export type {
  Region,
  RegionIndicator,
  CitySummary,
  PriorityCategory,
} from "./regions";
