export interface Task {
  id: string;
  title: string;
  description: string;
  successCriteria: string;
  reward: number;
  rewardToken: string;
  status: 'open' | 'in_review' | 'completed' | 'disputed';
  category: 'content' | 'development' | 'community' | 'design' | 'research';
  createdBy: string;
  createdAt: string;
  deadline: string;
  submissions: number;
  maxSubmissions: number;
  validatorConsensus?: number;
}

export interface Submission {
  id: string;
  taskId: string;
  submitter: string;
  proofLink: string;
  ipfsHash: string;
  status: 'pending' | 'approved' | 'rejected' | 'appealed';
  aiScore?: number;
  consensusResult?: 'pass' | 'fail' | 'pending';
  validatorVotes?: { approve: number; reject: number; total: number };
  submittedAt: string;
  feedback?: string;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  stakedAmount: number;
}

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Write a Thread on GenLayer AI Consensus',
    description: 'Create an engaging Twitter/X thread explaining how GenLayer uses AI validators to reach consensus on subjective tasks.',
    successCriteria: 'Thread must have at least 5 tweets, include accurate technical details about GenLayer consensus mechanism, use clear analogies, and demonstrate understanding of intelligent contracts.',
    reward: 250,
    rewardToken: 'GEN',
    status: 'open',
    category: 'content',
    createdBy: '0x1a2b...3c4d',
    createdAt: '2026-02-04',
    deadline: '2026-02-20',
    submissions: 3,
    maxSubmissions: 10,
  },
  {
    id: '2',
    title: 'Build a GenLayer dApp Tutorial',
    description: 'Create a step-by-step tutorial showing how to build a simple decentralized application on GenLayer.',
    successCriteria: 'Tutorial must include working code examples, cover contract deployment, include screenshots, and be beginner-friendly with clear explanations.',
    reward: 500,
    rewardToken: 'GEN',
    status: 'in_review',
    category: 'development',
    createdBy: '0x5e6f...7g8h',
    createdAt: '2026-02-01',
    deadline: '2026-02-15',
    submissions: 5,
    maxSubmissions: 5,
    validatorConsensus: 78,
  },
  {
    id: '3',
    title: 'Organize a Local GenLayer Meetup',
    description: 'Host a community meetup introducing GenLayer to local blockchain enthusiasts.',
    successCriteria: 'Minimum 15 attendees, share event photos, provide summary of topics discussed, and collect at least 10 feedback responses.',
    reward: 300,
    rewardToken: 'GEN',
    status: 'completed',
    category: 'community',
    createdBy: '0x9i0j...1k2l',
    createdAt: '2026-01-20',
    deadline: '2026-02-10',
    submissions: 2,
    maxSubmissions: 3,
    validatorConsensus: 92,
  },
  {
    id: '4',
    title: 'Design GenLayer Infographic Series',
    description: 'Create a series of infographics explaining GenLayer core concepts.',
    successCriteria: 'At least 3 infographics, professional quality, accurate information, visually appealing with consistent branding, and optimized for social media sharing.',
    reward: 400,
    rewardToken: 'GEN',
    status: 'disputed',
    category: 'design',
    createdBy: '0x3m4n...5o6p',
    createdAt: '2026-01-28',
    deadline: '2026-02-18',
    submissions: 4,
    maxSubmissions: 8,
    validatorConsensus: 51,
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 's1',
    taskId: '2',
    submitter: '0xabcd...ef01',
    proofLink: 'https://medium.com/@user/genlayer-tutorial',
    ipfsHash: 'QmX7b2...kL9m',
    status: 'approved',
    aiScore: 88,
    consensusResult: 'pass',
    validatorVotes: { approve: 4, reject: 1, total: 5 },
    submittedAt: '2026-02-08',
    feedback: 'Excellent tutorial with clear code examples and good structure.',
  },
  {
    id: 's2',
    taskId: '2',
    submitter: '0x2345...6789',
    proofLink: 'https://dev.to/user/genlayer-guide',
    ipfsHash: 'QmY8c3...nM0p',
    status: 'rejected',
    aiScore: 42,
    consensusResult: 'fail',
    validatorVotes: { approve: 1, reject: 4, total: 5 },
    submittedAt: '2026-02-07',
    feedback: 'Missing code examples and contains inaccurate information about consensus.',
  },
  {
    id: 's3',
    taskId: '4',
    submitter: '0x8901...2345',
    proofLink: 'https://figma.com/file/genlayer-infographics',
    ipfsHash: 'QmZ9d4...oN1q',
    status: 'appealed',
    aiScore: 55,
    consensusResult: 'fail',
    validatorVotes: { approve: 2, reject: 3, total: 5 },
    submittedAt: '2026-02-12',
    feedback: 'Design quality is good but information accuracy needs improvement.',
  },
];

export const LEADERBOARD = [
  { rank: 1, address: '0xabcd...ef01', completedTasks: 12, earned: 3200, reputation: 95 },
  { rank: 2, address: '0x5e6f...7g8h', completedTasks: 9, earned: 2800, reputation: 88 },
  { rank: 3, address: '0x2345...6789', completedTasks: 8, earned: 2100, reputation: 82 },
  { rank: 4, address: '0x9i0j...1k2l', completedTasks: 6, earned: 1600, reputation: 76 },
  { rank: 5, address: '0x3m4n...5o6p', completedTasks: 5, earned: 1200, reputation: 71 },
];
