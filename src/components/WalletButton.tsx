import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const WalletButton = () => {
  const { wallet, connect, disconnect } = useWallet();
  const [showMenu, setShowMenu] = useState(false);

  if (!wallet.connected) {
    return (
      <Button onClick={connect} className="gap-2 glow">
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-3 glass glass-hover rounded-lg px-4 py-2.5 cursor-pointer"
      >
        <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
        <span className="font-mono-data text-foreground">{wallet.address}</span>
        <span className="font-mono-data text-primary font-semibold">{wallet.balance} GEN</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 top-full mt-2 glass rounded-lg p-2 min-w-[200px] z-50"
          >
            <div className="px-3 py-2 border-b border-border/50 mb-1">
              <p className="text-xs text-muted-foreground">Staked</p>
              <p className="font-mono-data text-warning">{wallet.stakedAmount} GEN</p>
            </div>
            <button
              onClick={() => { disconnect(); setShowMenu(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Disconnect
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletButton;
