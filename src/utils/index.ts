// =============================================================================
// CIVICTWIN — Utils Barrel Export
// =============================================================================

export { classNames } from "./classNames";

export {
  calculatePriorityScore,
  getPriorityCategory,
  getWeightsForMode,
  getPolicyModeConfig,
  getDominantIndicators,
  scoreRegion,
  scoreAllRegions,
  sortRegionsByScore,
  getRankedRegions,
  getCityScoringStats,
  compareScores,
  POLICY_MODES,
  INDICATOR_LABELS,
} from "./scoring";

export type {
  ScoringWeights,
  PolicyMode,
  PolicyModeConfig,
  ScoredRegion,
  DominantIndicator,
} from "./scoring";

export { generatePolicyBrief } from "./policyBrief";

export {
  generateRegionInsight,
  explainPriority,
  generateSimulatorNarration,
  generateCitizenSummary,
  AI_DISCLAIMER,
} from "./civicSenseAI";

export type {
  AIInsight,
  SimulatorNarration,
  CitizenSummary,
} from "./civicSenseAI";

export type {
  PolicyBrief,
  DataInsight,
  RecommendationItem,
  ImplementationNote,
  ExpectedImpact,
} from "./policyBrief";
