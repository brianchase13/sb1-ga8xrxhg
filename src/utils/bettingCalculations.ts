// Betting calculation utilities

/**
 * Convert American odds to decimal odds
 */
export function americanToDecimal(odds: number): number {
  if (odds > 0) {
    return (odds / 100) + 1;
  }
  return (100 / Math.abs(odds)) + 1;
}

/**
 * Convert decimal odds to American odds
 */
export function decimalToAmerican(decimal: number): number {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100);
  }
  return Math.round(-100 / (decimal - 1));
}

/**
 * Calculate potential win from stake and American odds
 */
export function calculatePotentialWin(stake: number, odds: number): number {
  const decimal = americanToDecimal(odds);
  return Number((stake * decimal).toFixed(2));
}

/**
 * Calculate profit from stake and odds
 */
export function calculateProfit(stake: number, odds: number): number {
  return calculatePotentialWin(stake, odds) - stake;
}

/**
 * Calculate implied probability from American odds
 */
export function calculateImpliedProbability(odds: number): number {
  if (odds > 0) {
    return (100 / (odds + 100)) * 100;
  }
  return (Math.abs(odds) / (Math.abs(odds) + 100)) * 100;
}

/**
 * Calculate Closing Line Value (CLV) percentage
 */
export function calculateCLV(openingOdds: number, closingOdds: number): number {
  const openingProb = calculateImpliedProbability(openingOdds);
  const closingProb = calculateImpliedProbability(closingOdds);

  return Number((((closingProb - openingProb) / openingProb) * 100).toFixed(2));
}

/**
 * Calculate ROI (Return on Investment) percentage
 */
export function calculateROI(totalWagered: number, netProfit: number): number {
  if (totalWagered === 0) return 0;
  return Number(((netProfit / totalWagered) * 100).toFixed(2));
}

/**
 * Calculate win rate percentage
 */
export function calculateWinRate(wins: number, totalBets: number): number {
  if (totalBets === 0) return 0;
  return Number(((wins / totalBets) * 100).toFixed(2));
}

/**
 * Calculate expected value (EV)
 */
export function calculateExpectedValue(
  odds: number,
  trueWinProbability: number
): number {
  const decimalOdds = americanToDecimal(odds);
  const ev = (trueWinProbability * decimalOdds) - 1;
  return Number((ev * 100).toFixed(2));
}

/**
 * Calculate optimal Kelly Criterion stake
 */
export function calculateKellyCriterion(
  odds: number,
  winProbability: number,
  bankroll: number,
  fraction: number = 0.25 // Quarter Kelly for safety
): number {
  const decimalOdds = americanToDecimal(odds);
  const q = 1 - winProbability;
  const b = decimalOdds - 1;

  const kelly = (winProbability * b - q) / b;
  const fractionalKelly = kelly * fraction;

  return Number((Math.max(0, fractionalKelly) * bankroll).toFixed(2));
}

/**
 * Calculate required vig-free odds for arbitrage
 */
export function calculateArbitrageStakes(
  odds1: number,
  odds2: number,
  totalStake: number
): { stake1: number; stake2: number; profit: number } | null {
  const decimal1 = americanToDecimal(odds1);
  const decimal2 = americanToDecimal(odds2);

  const arbPercentage = (1 / decimal1) + (1 / decimal2);

  if (arbPercentage >= 1) {
    return null; // No arbitrage opportunity
  }

  const stake1 = totalStake / (1 + (decimal1 / decimal2));
  const stake2 = totalStake - stake1;

  const payout = Math.min(stake1 * decimal1, stake2 * decimal2);
  const profit = payout - totalStake;

  return {
    stake1: Number(stake1.toFixed(2)),
    stake2: Number(stake2.toFixed(2)),
    profit: Number(profit.toFixed(2)),
  };
}

/**
 * Calculate Sharpe Ratio for betting performance
 */
export function calculateSharpeRatio(
  returns: number[],
  riskFreeRate: number = 0
): number {
  if (returns.length === 0) return 0;

  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return 0;

  return Number(((mean - riskFreeRate) / stdDev).toFixed(2));
}

/**
 * Format American odds with + or - prefix
 */
export function formatOdds(odds: number): string {
  return odds > 0 ? `+${odds}` : `${odds}`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Calculate parlay odds
 */
export function calculateParlayOdds(legs: number[]): number {
  const decimalOdds = legs.map(americanToDecimal);
  const combinedDecimal = decimalOdds.reduce((acc, odds) => acc * odds, 1);
  return decimalToAmerican(combinedDecimal);
}

/**
 * Generate realistic odds movement
 */
export function simulateOddsMovement(baseOdds: number, volatility: number = 5): number {
  const change = Math.floor(Math.random() * volatility * 2) - volatility;
  return baseOdds + (change * 5); // Odds move in increments of 5
}
