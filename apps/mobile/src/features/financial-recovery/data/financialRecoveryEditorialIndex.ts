import type { EditorialIndexDocument } from '@forbes/types';

import { financialRecoveryArticles } from './index';

export const financialRecoveryEditorialIndex: EditorialIndexDocument = {
  id: 'financial-recovery',
  title: 'Financial Recovery',
  displayTitle: ['FINANCIAL', 'RECOVERY'],
  items: [
    {
      id: 'understand',
      index: 1,
      title: 'Understand',
      description: 'Debt · Credit · Options',
      articleCount: financialRecoveryArticles.length,
    },
    {
      id: 'assess',
      index: 2,
      title: 'Assess',
      description: 'Balances · Cash flow · Risk',
      toolCount: 1,
    },
    {
      id: 'explore',
      index: 3,
      title: 'Explore',
      description: 'Relief · Consolidation · Counsel',
    },
    {
      id: 'act',
      index: 4,
      title: 'Act',
      description: 'Plan · Partner · Follow through',
    },
  ],
};
