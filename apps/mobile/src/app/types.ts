export type AppMode = 'landing' | 'trends' | 'home' | 'financial-recovery';

export type ActiveAppMode = Exclude<AppMode, 'landing'>;
