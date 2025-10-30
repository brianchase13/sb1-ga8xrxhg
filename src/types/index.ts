// Core Sports Betting Types

export type BetStatus = 'pending' | 'won' | 'lost' | 'push' | 'cancelled';
export type BetType = 'moneyline' | 'spread' | 'totals' | 'parlay' | 'prop' | 'futures';
export type SportType = 'nfl' | 'nba' | 'mlb' | 'nhl' | 'soccer' | 'mma' | 'boxing' | 'ncaaf' | 'ncaab' | 'other';

export interface Bet {
  id: string;
  userId: string;
  sportType: SportType;
  betType: BetType;
  event: string;
  pick: string;
  odds: number; // American odds (e.g., -110, +150)
  stake: number;
  potentialWin: number;
  status: BetStatus;
  sportsbook: string;
  placedAt: Date;
  settledAt?: Date;
  notes?: string;
  tags?: string[];
  // Advanced tracking
  openingOdds?: number;
  closingOdds?: number;
  clv?: number; // Closing Line Value percentage
  parlayLegs?: ParlayLeg[];
}

export interface ParlayLeg {
  id: string;
  event: string;
  pick: string;
  odds: number;
  status: BetStatus;
}

export interface Sportsbook {
  id: string;
  name: string;
  logo: string;
  isConnected: boolean;
  lastSyncedAt?: Date;
  balance?: number;
  requiresMFA: boolean;
}

export interface OddsComparison {
  event: string;
  sportType: SportType;
  startTime: Date;
  odds: {
    sportsbook: string;
    moneyline?: {
      home: number;
      away: number;
    };
    spread?: {
      home: { line: number; odds: number };
      away: { line: number; odds: number };
    };
    total?: {
      over: { line: number; odds: number };
      under: { line: number; odds: number };
    };
  }[];
  bestOdds: {
    type: 'moneyline' | 'spread' | 'total';
    pick: string;
    sportsbook: string;
    odds: number;
  }[];
}

export interface ArbitrageOpportunity {
  id: string;
  event: string;
  sportType: SportType;
  profit: number; // Percentage profit
  bets: {
    sportsbook: string;
    pick: string;
    odds: number;
    stake: number; // Recommended stake
  }[];
  expiresAt: Date;
}

export interface BankrollStats {
  totalBankroll: number;
  startingBankroll: number;
  currentBalance: number;
  totalWagered: number;
  totalWon: number;
  totalLost: number;
  netProfit: number;
  roi: number; // Return on Investment percentage
  winRate: number; // Percentage
  averageOdds: number;
  sharpeRatio?: number;
  longestWinStreak: number;
  longestLossStreak: number;
  currentStreak: { type: 'win' | 'loss'; count: number };
}

export interface PerformanceByType {
  betType: BetType;
  count: number;
  wins: number;
  losses: number;
  winRate: number;
  roi: number;
  totalWagered: number;
  netProfit: number;
}

export interface PerformanceBySport {
  sportType: SportType;
  count: number;
  wins: number;
  losses: number;
  winRate: number;
  roi: number;
  totalWagered: number;
  netProfit: number;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  isVerified: boolean;
  isExpert: boolean;
  followersCount: number;
  followingCount: number;
  stats: BankrollStats;
  bio?: string;
  specialties?: SportType[];
}

export interface SocialBet {
  id: string;
  user: User;
  bet: Bet;
  caption?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  postedAt: Date;
  confidence?: 1 | 2 | 3 | 4 | 5; // 1-5 star confidence
  reasoning?: string;
}

export interface BettingInsight {
  id: string;
  type: 'trend' | 'value' | 'warning' | 'opportunity';
  title: string;
  description: string;
  relatedBets?: string[];
  actionable: boolean;
  createdAt: Date;
}

export interface PriceAlert {
  id: string;
  event: string;
  betType: BetType;
  pick: string;
  targetOdds: number;
  currentOdds: number;
  sportsbook?: string;
  isActive: boolean;
  triggeredAt?: Date;
}

export interface TaxReport {
  year: number;
  totalWagered: number;
  totalWon: number;
  netProfit: number;
  sessionsCount: number;
  transactions: {
    date: Date;
    type: 'win' | 'loss';
    amount: number;
    description: string;
  }[];
}

export interface AIRecommendation {
  id: string;
  event: string;
  sportType: SportType;
  pick: string;
  recommendedOdds: number;
  confidence: number; // 0-100
  reasoning: string;
  factors: {
    name: string;
    weight: number;
    value: string;
  }[];
  expectedValue: number;
}
