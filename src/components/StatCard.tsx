import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  accentColor?: 'primary' | 'accent' | 'success' | 'warning';
}

const COLOR_MAP = {
  primary: 'text-primary bg-primary/10 border-primary/20',
  accent: 'text-accent bg-accent/10 border-accent/20',
  success: 'text-success bg-success/10 border-success/20',
  warning: 'text-warning bg-warning/10 border-warning/20',
};

const StatCard = ({ icon: Icon, label, value, subtitle, accentColor = 'primary' }: StatCardProps) => {
  const colors = COLOR_MAP[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-xl p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${colors}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
      <p className="text-2xl font-display font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      {subtitle && <p className="text-xs text-muted-foreground/70 mt-1">{subtitle}</p>}
    </motion.div>
  );
};

export default StatCard;
