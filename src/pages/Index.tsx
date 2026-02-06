import { motion } from 'framer-motion';
import { Zap, ListTodo, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_TASKS, LEADERBOARD } from '@/lib/types';
import { useWallet } from '@/hooks/useWallet';
import TaskCard from '@/components/TaskCard';
import StatCard from '@/components/StatCard';

const Index = () => {
  const { wallet, connect } = useWallet();
  const openTasks = MOCK_TASKS.filter(t => t.status === 'open');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        
        <div className="container relative pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-xs font-medium text-muted-foreground">Powered by GenLayer AI Validators</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-4">
              AI-Evaluated Bounties
              <br />
              <span className="text-gradient">for Web3 Builders</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Submit proof-of-work. GenLayer intelligent contracts judge quality through AI consensus. Earn rewards automatically.
            </p>

            <div className="flex items-center justify-center gap-3">
              {!wallet.connected ? (
                <button
                  onClick={connect}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow"
                >
                  <Zap className="w-4 h-4" />
                  Connect & Start Earning
                </button>
              ) : (
                <Link
                  to="/tasks"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow"
                >
                  Browse Bounties
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass glass-hover font-semibold"
              >
                Create a Bounty
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={ListTodo} label="Active Bounties" value={MOCK_TASKS.length} accentColor="primary" />
          <StatCard icon={Zap} label="Total Rewards" value="1,450 GEN" accentColor="accent" />
          <StatCard icon={Users} label="Contributors" value={LEADERBOARD.length} accentColor="success" />
          <StatCard icon={TrendingUp} label="Avg Consensus" value="79%" accentColor="warning" />
        </div>
      </section>

      {/* Open bounties */}
      <section className="container pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">Open Bounties</h2>
          <Link to="/tasks" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_TASKS.map((task, i) => (
            <TaskCard key={task.id} task={task} index={i} />
          ))}
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="container pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">Top Ambassadors</h2>
          <Link to="/leaderboard" className="text-sm text-primary hover:underline flex items-center gap-1">
            Full leaderboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Rank</th>
                <th className="text-left px-5 py-3 font-medium">Address</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Tasks</th>
                <th className="text-left px-5 py-3 font-medium">Earned</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Rep</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.slice(0, 5).map((entry) => (
                <tr key={entry.rank} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className={`font-mono-data font-bold ${
                      entry.rank === 1 ? 'text-warning' : entry.rank === 2 ? 'text-muted-foreground' : entry.rank === 3 ? 'text-warning/60' : 'text-muted-foreground'
                    }`}>#{entry.rank}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono-data">{entry.address}</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">{entry.completedTasks}</td>
                  <td className="px-5 py-3.5 font-mono-data text-primary font-semibold">{entry.earned} GEN</td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${entry.reputation}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{entry.reputation}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Index;
