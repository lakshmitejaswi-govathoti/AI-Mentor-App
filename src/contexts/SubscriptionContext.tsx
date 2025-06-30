import React, { createContext, useContext, useState } from 'react';

interface SubscriptionContextType {
  isPremium: boolean;
  subscription: any;
  subscribe: (plan: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const subscribe = async (plan: string) => {
    // Simulate subscription - replace with actual RevenueCat integration
    setIsPremium(true);
    setSubscription({ plan, status: 'active' });
  };

  const cancelSubscription = async () => {
    setIsPremium(false);
    setSubscription(null);
  };

  const value = {
    isPremium,
    subscription,
    subscribe,
    cancelSubscription,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};