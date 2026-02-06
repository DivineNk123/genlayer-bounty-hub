import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WalletState } from '@/lib/types';

interface WalletContextType {
  wallet: WalletState;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: 0,
    stakedAmount: 0,
  });

  const connect = () => {
    setWallet({
      connected: true,
      address: '0x7F3a...9B2c',
      balance: 1250,
      stakedAmount: 200,
    });
  };

  const disconnect = () => {
    setWallet({ connected: false, address: null, balance: 0, stakedAmount: 0 });
  };

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
};
