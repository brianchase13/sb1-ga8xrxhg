import type {
  Bet,
  BankrollStats,
  OddsComparison,
  ArbitrageOpportunity,
  User,
  SocialBet,
  BettingInsight,
  PerformanceByType,
  PerformanceBySport,
  AIRecommendation,
} from '../types';
import { calculatePotentialWin } from './bettingCalculations';

// Mock current user
export const mockCurrentUser: User = {
  id: 'user-1',
  username: 'sharptake',
  displayName: 'Sharp Take',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sharptake',
  isVerified: true,
  isExpert: false,
  followersCount: 247,
  followingCount: 89,
  stats: {
    totalBankroll: 5000,
    startingBankroll: 3000,
    currentBalance: 5342.50,
    totalWagered: 12500,
    totalWon: 6890,
    totalLost: 4047.50,
    netProfit: 2342.50,
    roi: 18.74,
    winRate: 58.3,
    averageOdds: -108,
    longestWinStreak: 8,
    longestLossStreak: 4,
    currentStreak: { type: 'win', count: 3 },
  },
  bio: 'NFL and NBA specialist. Value betting enthusiast. +18.7% ROI over 500+ tracked bets.',
  specialties: ['nfl', 'nba'],
};

// Mock bets
export const mockBets: Bet[] = [
  {
    id: 'bet-1',
    userId: 'user-1',
    sportType: 'nfl',
    betType: 'spread',
    event: 'Chiefs @ Bills',
    pick: 'Chiefs +2.5',
    odds: -110,
    stake: 110,
    potentialWin: calculatePotentialWin(110, -110),
    status: 'pending',
    sportsbook: 'FanDuel',
    placedAt: new Date('2025-10-30T10:00:00'),
    openingOdds: -108,
    closingOdds: -110,
    clv: -1.85,
    notes: 'Chiefs offense looking strong, line value here',
    tags: ['nfl', 'playoffs'],
  },
  {
    id: 'bet-2',
    userId: 'user-1',
    sportType: 'nba',
    betType: 'moneyline',
    event: 'Lakers @ Celtics',
    pick: 'Lakers ML',
    odds: +165,
    stake: 100,
    potentialWin: calculatePotentialWin(100, +165),
    status: 'won',
    sportsbook: 'DraftKings',
    placedAt: new Date('2025-10-29T15:30:00'),
    settledAt: new Date('2025-10-29T22:45:00'),
    openingOdds: +155,
    closingOdds: +165,
    clv: 6.45,
    notes: 'Lakers playing great on the road, value at this price',
  },
  {
    id: 'bet-3',
    userId: 'user-1',
    sportType: 'nba',
    betType: 'totals',
    event: 'Warriors @ Nuggets',
    pick: 'Over 228.5',
    odds: -115,
    stake: 115,
    potentialWin: calculatePotentialWin(115, -115),
    status: 'lost',
    sportsbook: 'BetMGM',
    placedAt: new Date('2025-10-28T18:00:00'),
    settledAt: new Date('2025-10-28T23:30:00'),
  },
  {
    id: 'bet-4',
    userId: 'user-1',
    sportType: 'nfl',
    betType: 'parlay',
    event: 'NFL Week 9 Parlay',
    pick: '3-Leg Parlay',
    odds: +595,
    stake: 50,
    potentialWin: calculatePotentialWin(50, +595),
    status: 'pending',
    sportsbook: 'Caesars',
    placedAt: new Date('2025-10-30T09:00:00'),
    parlayLegs: [
      { id: 'leg-1', event: 'Ravens @ Steelers', pick: 'Ravens -3', odds: -110, status: 'pending' },
      { id: 'leg-2', event: '49ers @ Cowboys', pick: '49ers ML', odds: -140, status: 'pending' },
      { id: 'leg-3', event: 'Dolphins @ Eagles', pick: 'Over 45.5', odds: -110, status: 'pending' },
    ],
  },
];

// Mock odds comparisons
export const mockOddsComparisons: OddsComparison[] = [
  {
    event: 'Chiefs @ Bills',
    sportType: 'nfl',
    startTime: new Date('2025-10-30T20:15:00'),
    odds: [
      {
        sportsbook: 'FanDuel',
        moneyline: { home: -155, away: +130 },
        spread: { home: { line: -2.5, odds: +100 }, away: { line: +2.5, odds: -120 } },
        total: { over: { line: 51.5, odds: -110 }, under: { line: 51.5, odds: -110 } },
      },
      {
        sportsbook: 'DraftKings',
        moneyline: { home: -160, away: +135 },
        spread: { home: { line: -2.5, odds: -105 }, away: { line: +2.5, odds: -115 } },
        total: { over: { line: 52, odds: -108 }, under: { line: 52, odds: -112 } },
      },
      {
        sportsbook: 'BetMGM',
        moneyline: { home: -150, away: +125 },
        spread: { home: { line: -3, odds: -110 }, away: { line: +3, odds: -110 } },
        total: { over: { line: 51.5, odds: -115 }, under: { line: 51.5, odds: -105 } },
      },
      {
        sportsbook: 'Caesars',
        moneyline: { home: -158, away: +132 },
        spread: { home: { line: -2.5, odds: -102 }, away: { line: +2.5, odds: -118 } },
        total: { over: { line: 51, odds: -110 }, under: { line: 51, odds: -110 } },
      },
    ],
    bestOdds: [
      { type: 'moneyline', pick: 'Bills ML', sportsbook: 'BetMGM', odds: -150 },
      { type: 'moneyline', pick: 'Chiefs ML', sportsbook: 'DraftKings', odds: +135 },
      { type: 'spread', pick: 'Bills -2.5', sportsbook: 'FanDuel', odds: +100 },
    ],
  },
  {
    event: 'Lakers @ Celtics',
    sportType: 'nba',
    startTime: new Date('2025-10-30T19:30:00'),
    odds: [
      {
        sportsbook: 'FanDuel',
        moneyline: { home: -200, away: +165 },
        spread: { home: { line: -4.5, odds: -110 }, away: { line: +4.5, odds: -110 } },
        total: { over: { line: 221.5, odds: -110 }, under: { line: 221.5, odds: -110 } },
      },
      {
        sportsbook: 'DraftKings',
        moneyline: { home: -205, away: +170 },
        spread: { home: { line: -5, odds: -105 }, away: { line: +5, odds: -115 } },
        total: { over: { line: 221, odds: -112 }, under: { line: 221, odds: -108 } },
      },
    ],
    bestOdds: [
      { type: 'moneyline', pick: 'Celtics ML', sportsbook: 'FanDuel', odds: -200 },
      { type: 'moneyline', pick: 'Lakers ML', sportsbook: 'DraftKings', odds: +170 },
    ],
  },
];

// Mock arbitrage opportunities
export const mockArbitrageOpportunities: ArbitrageOpportunity[] = [
  {
    id: 'arb-1',
    event: 'Warriors @ Nuggets',
    sportType: 'nba',
    profit: 2.34,
    bets: [
      { sportsbook: 'FanDuel', pick: 'Warriors +5.5', odds: -105, stake: 525.63 },
      { sportsbook: 'DraftKings', pick: 'Nuggets -5.5', odds: +100, stake: 474.37 },
    ],
    expiresAt: new Date(Date.now() + 1000 * 60 * 8), // 8 minutes
  },
  {
    id: 'arb-2',
    event: 'Maple Leafs @ Bruins',
    sportType: 'nhl',
    profit: 1.87,
    bets: [
      { sportsbook: 'BetMGM', pick: 'Maple Leafs ML', odds: +142, stake: 412.35 },
      { sportsbook: 'Caesars', pick: 'Bruins ML', odds: -130, stake: 587.65 },
    ],
    expiresAt: new Date(Date.now() + 1000 * 60 * 12), // 12 minutes
  },
];

// Mock expert users
export const mockExperts: User[] = [
  {
    id: 'expert-1',
    username: 'TheEdgeFinder',
    displayName: 'The Edge Finder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=edgefinder',
    isVerified: true,
    isExpert: true,
    followersCount: 12453,
    followingCount: 234,
    stats: {
      totalBankroll: 50000,
      startingBankroll: 25000,
      currentBalance: 68500,
      totalWagered: 145000,
      totalWon: 82300,
      totalLost: 56200,
      netProfit: 43500,
      roi: 30.0,
      winRate: 61.2,
      averageOdds: -105,
      longestWinStreak: 15,
      longestLossStreak: 3,
      currentStreak: { type: 'win', count: 7 },
    },
    bio: 'Professional sports bettor. Specializing in NFL and college football. Verified track record.',
    specialties: ['nfl', 'ncaaf'],
  },
  {
    id: 'expert-2',
    username: 'HoopsAnalytics',
    displayName: 'Hoops Analytics',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hoops',
    isVerified: true,
    isExpert: true,
    followersCount: 8967,
    followingCount: 156,
    stats: {
      totalBankroll: 30000,
      startingBankroll: 15000,
      currentBalance: 42800,
      totalWagered: 95000,
      totalWon: 54200,
      totalLost: 39200,
      netProfit: 27800,
      roi: 29.3,
      winRate: 58.4,
      averageOdds: -110,
      longestWinStreak: 12,
      longestLossStreak: 5,
      currentStreak: { type: 'win', count: 4 },
    },
    bio: 'NBA betting expert using advanced analytics and player prop modeling.',
    specialties: ['nba'],
  },
];

// Mock social bets
export const mockSocialBets: SocialBet[] = [
  {
    id: 'social-1',
    user: mockExperts[0],
    bet: {
      id: 'bet-social-1',
      userId: 'expert-1',
      sportType: 'nfl',
      betType: 'spread',
      event: 'Ravens @ Steelers',
      pick: 'Ravens -3',
      odds: -110,
      stake: 550,
      potentialWin: calculatePotentialWin(550, -110),
      status: 'pending',
      sportsbook: 'FanDuel',
      placedAt: new Date('2025-10-30T08:30:00'),
      openingOdds: -105,
      closingOdds: -110,
      clv: -4.76,
    },
    caption: 'Ravens defense is elite. Steelers offense struggles against top defenses. Take the points.',
    likes: 342,
    comments: 28,
    shares: 14,
    isLiked: false,
    postedAt: new Date('2025-10-30T08:35:00'),
    confidence: 5,
    reasoning: 'Ravens have covered 7 of last 8 against winning teams. Steelers averaging only 17 PPG vs top 10 defenses.',
  },
  {
    id: 'social-2',
    user: mockExperts[1],
    bet: {
      id: 'bet-social-2',
      userId: 'expert-2',
      sportType: 'nba',
      betType: 'prop',
      event: 'Lakers @ Celtics',
      pick: 'LeBron James Over 26.5 Points',
      odds: -115,
      stake: 345,
      potentialWin: calculatePotentialWin(345, -115),
      status: 'pending',
      sportsbook: 'DraftKings',
      placedAt: new Date('2025-10-30T11:00:00'),
    },
    caption: 'LeBron always shows up in Boston. Over hits 8 of last 10.',
    likes: 189,
    comments: 15,
    shares: 7,
    isLiked: true,
    postedAt: new Date('2025-10-30T11:05:00'),
    confidence: 4,
  },
];

// Mock insights
export const mockInsights: BettingInsight[] = [
  {
    id: 'insight-1',
    type: 'trend',
    title: 'Strong Home Underdog Trend',
    description: 'You\'ve won 73% of home underdog bets in the NBA this season (8-3 record).',
    relatedBets: ['bet-2'],
    actionable: true,
    createdAt: new Date('2025-10-30T07:00:00'),
  },
  {
    id: 'insight-2',
    type: 'warning',
    title: 'Parlay Performance Below Average',
    description: 'Your parlay bets have a -12.4% ROI. Consider focusing on single bets for better results.',
    relatedBets: ['bet-4'],
    actionable: true,
    createdAt: new Date('2025-10-29T18:00:00'),
  },
  {
    id: 'insight-3',
    type: 'opportunity',
    title: 'Positive CLV on Recent Bets',
    description: 'Your last 5 bets have averaged +4.2% CLV, indicating you\'re finding value.',
    actionable: false,
    createdAt: new Date('2025-10-30T06:00:00'),
  },
];

// Mock performance by type
export const mockPerformanceByType: PerformanceByType[] = [
  { betType: 'spread', count: 89, wins: 52, losses: 37, winRate: 58.4, roi: 15.2, totalWagered: 8900, netProfit: 1352.8 },
  { betType: 'moneyline', count: 45, wins: 28, losses: 17, winRate: 62.2, roi: 22.8, totalWagered: 4500, netProfit: 1026 },
  { betType: 'totals', count: 34, wins: 19, losses: 15, winRate: 55.9, roi: 8.4, totalWagered: 3400, netProfit: 285.6 },
  { betType: 'parlay', count: 12, wins: 3, losses: 9, winRate: 25.0, roi: -12.4, totalWagered: 600, netProfit: -74.4 },
  { betType: 'prop', count: 28, wins: 17, losses: 11, winRate: 60.7, roi: 18.6, totalWagered: 2800, netProfit: 520.8 },
];

// Mock performance by sport
export const mockPerformanceBySport: PerformanceBySport[] = [
  { sportType: 'nfl', count: 78, wins: 47, losses: 31, winRate: 60.3, roi: 21.5, totalWagered: 8580, netProfit: 1844.7 },
  { sportType: 'nba', count: 65, wins: 37, losses: 28, winRate: 56.9, roi: 14.2, totalWagered: 6500, netProfit: 923 },
  { sportType: 'mlb', count: 42, wins: 24, losses: 18, winRate: 57.1, roi: 12.8, totalWagered: 4200, netProfit: 537.6 },
  { sportType: 'nhl', count: 23, wins: 11, losses: 12, winRate: 47.8, roi: -5.6, totalWagered: 2300, netProfit: -128.8 },
];

// Mock AI recommendations
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'ai-1',
    event: '49ers @ Cowboys',
    sportType: 'nfl',
    pick: '49ers -3',
    recommendedOdds: -110,
    confidence: 78,
    reasoning: 'The 49ers have strong historical performance against the Cowboys, with superior offensive metrics and a favorable matchup for their defense.',
    factors: [
      { name: 'Team Strength', weight: 0.35, value: '49ers favored' },
      { name: 'Head-to-Head', weight: 0.25, value: '49ers 7-2 L9' },
      { name: 'Recent Form', weight: 0.20, value: '49ers 4-1 L5' },
      { name: 'Home/Away', weight: 0.20, value: 'Neutral' },
    ],
    expectedValue: 5.3,
  },
  {
    id: 'ai-2',
    event: 'Bucks @ Heat',
    sportType: 'nba',
    pick: 'Under 225.5',
    recommendedOdds: -108,
    confidence: 72,
    reasoning: 'Both teams playing on back-to-back games with strong defensive matchup. Pace expected to slow down significantly.',
    factors: [
      { name: 'Pace Factor', weight: 0.30, value: 'Below average' },
      { name: 'Back-to-Back', weight: 0.25, value: 'Both teams' },
      { name: 'Defensive Rating', weight: 0.25, value: 'Top 10 matchup' },
      { name: 'Recent Totals', weight: 0.20, value: 'Under 6 of L8' },
    ],
    expectedValue: 3.8,
  },
];
