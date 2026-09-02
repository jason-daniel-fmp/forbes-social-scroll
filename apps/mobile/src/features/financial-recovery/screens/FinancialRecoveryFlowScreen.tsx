import { useState } from 'react';

import { CategoryIndexScreen } from '../../editorial';
import { financialRecoveryEditorialIndex } from '../data/financialRecoveryEditorialIndex';
import { FinancialRecoveryScreen } from './FinancialRecoveryScreen';

interface FinancialRecoveryFlowScreenProps {
  onBack: () => void;
}

export function FinancialRecoveryFlowScreen({ onBack }: FinancialRecoveryFlowScreenProps) {
  const [step, setStep] = useState<'index' | 'feed'>('index');

  if (step === 'index') {
    return (
      <CategoryIndexScreen
        document={financialRecoveryEditorialIndex}
        onBack={onBack}
        onCommit={() => setStep('feed')}
      />
    );
  }

  return <FinancialRecoveryScreen onBack={() => setStep('index')} />;
}
