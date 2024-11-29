'use client';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from 'react';
// import { BlinkComponent } from '@/components/BlinkComponent';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { BlinkComponent } from '@/dom/BlinkComponent';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function BlinkPage() {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <BlinkComponent />
      </WalletModalProvider>
    </WalletProvider>
  );
}