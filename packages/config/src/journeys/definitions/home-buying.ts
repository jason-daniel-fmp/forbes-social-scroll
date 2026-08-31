import type { JourneyDefinition, JourneyPhase } from '@forbes/types';

export const HOME_BUYING_URLS = {
  affordability:
    'https://www.forbes.com/advisor/widgets/embed/how-much-house-can-i-afford-calculator/?tid=FA0EOtRtwrlOg5IVIubYpw_37l2FCYm4DjM&userId=FA0EOtRtwrlOg5IVIubYpw&referer=https%3A%2F%2Fwww.forbes.com%2Fadvisor%2Fmortgages%2Fhow-much-house-can-i-afford%2F',
  mortgage:
    'https://www.forbes.com/advisor/widgets/embed/mortgage-calculator/?loanTerm=15&tid=FA0EOtRtwrlOg5IVIubYpw_4ycG9YHRAmLV&userId=FA0EOtRtwrlOg5IVIubYpw&referer=https%3A%2F%2Fwww.forbes.com%2Fadvisor%2Fmortgages%2F15-year-fixed-mortgage-calculator%2F',
  homeLoan:
    'https://www.forbes.com/advisor/widgets/embed/home-improvement-loan-calculator/?tid=FA0EOtRtwrlOg5IVIubYpw_9vBbZu1SG4Nw&userId=FA0EOtRtwrlOg5IVIubYpw&referer=https%3A%2F%2Fwww.forbes.com%2Fadvisor%2Fpersonal-loans%2Fhome-improvement-loan-calculator%2F',
  packersMovers:
    'https://www.forbes.com/home-improvement/journey/moving/forbeshome/v1?tid=FA0EOtRtwrlOg5IVIubYpw_Bdp53p2AMYpz&lp_s3=%2Fhome-improvement%2Fmoving-services%2Fmoving-out-of-state-checklist%2F',
  homeDecor:
    'https://www.forbes.com/sites/terriwilliams/2026/05/06/2026-summer-design-and-decor-trends-from-midimalism-to-grandmillennial/',
} as const;

export const homeBuyingPhases = [
  { id: 'plan', title: 'Plan', stepIds: ['affordability'] },
  { id: 'finance', title: 'Finance', stepIds: ['mortgage', 'home-loan'] },
  { id: 'move', title: 'Move', stepIds: ['packers-movers'] },
  { id: 'settle', title: 'Settle In', stepIds: ['home-decor'] },
] as const;

export const homeJourney: JourneyDefinition = {
  id: 'home',
  title: 'Home Buying Journey',
  description: 'From affordability through move-in — tools and guides for every phase.',
  enabled: true,
  discovery: {
    title: 'Planning to buy a home?',
    description: 'Start with affordability, then explore financing, moving, and settling in.',
    ctaLabel: 'See what I can afford',
  },
  phases: homeBuyingPhases as unknown as JourneyPhase[],
  steps: [
    {
      id: 'affordability',
      title: 'How much house can I afford?',
      description: 'Estimate a comfortable price range based on your finances.',
      url: HOME_BUYING_URLS.affordability,
      type: 'calculator',
      phaseId: 'plan',
    },
    {
      id: 'mortgage',
      title: 'Mortgage calculator',
      description: 'See what a monthly mortgage payment could look like.',
      url: HOME_BUYING_URLS.mortgage,
      type: 'calculator',
      phaseId: 'finance',
    },
    {
      id: 'home-loan',
      title: 'Home improvement loan',
      description: 'Explore loan options for upgrades and move-in projects.',
      url: HOME_BUYING_URLS.homeLoan,
      type: 'calculator',
      phaseId: 'finance',
    },
    {
      id: 'packers-movers',
      title: 'Packers & movers',
      description: 'Plan your move with a guided moving experience.',
      url: HOME_BUYING_URLS.packersMovers,
      type: 'journey',
      phaseId: 'move',
    },
    {
      id: 'home-decor',
      title: 'Home decor inspiration',
      description: 'Discover trends and ideas for your new space.',
      url: HOME_BUYING_URLS.homeDecor,
      type: 'content',
      phaseId: 'settle',
    },
  ],
};
