import { useState, useEffect } from 'react';
import { WalletService } from '@goluckybd/api-client';
import { useAuth } from '../contexts/AuthContext';

export function useWallet(currency: 'BDT' | 'USDT' = 'BDT') {
  const { isAuthenticated } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    const { wallet: w, error: e } = await WalletService.getWallet(currency);
    setWallet(w); setError(e as string | null); setLoading(false);
  };

  useEffect(() => { fetchWallet(); }, [isAuthenticated, currency]);

  return { wallet, loading, error, refetch: fetchWallet };
}

export function useWallets() {
  const { isAuthenticated } = useAuth();
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    WalletService.getWallets().then(({ wallets: w }) => { setWallets(w || []); setLoading(false); });
  }, [isAuthenticated]);

  return { wallets, loading };
}
