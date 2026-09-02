import type { EditorialIndexDocument } from '@forbes/types';

export const businessEditorialIndex: EditorialIndexDocument = {
  id: 'business',
  title: 'Business',
  displayTitle: ['BUSINESS'],
  items: [
    {
      id: 'starting',
      index: 1,
      title: 'Starting a business',
      displayTitle: ['STARTING', 'A BUSINESS'],
      description: 'Ideas · Structure · First steps',
    },
    {
      id: 'llc',
      index: 2,
      title: 'LLC',
      description: 'Formation · Compliance · Tax',
    },
    {
      id: 'funding',
      index: 3,
      title: 'Funding',
      description: 'Capital · Credit · Investors',
    },
    {
      id: 'growth',
      index: 4,
      title: 'Growth',
      description: 'Hiring · Operations · Scale',
    },
    {
      id: 'insurance',
      index: 5,
      title: 'Insurance',
      description: 'Liability · Benefits · Coverage',
    },
  ],
};
