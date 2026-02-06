import { LEADERBOARD } from '@/lib/types';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star } from 'lucide-react';

const LeaderboardPage = () => {
  return (
    <div className="container py-8 max-w-3xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">Top contributors ranked by completed bounties and reputation</p>

        {/* Top 3 podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 0, 2].map(idx => {
            const entry = LEADERBOARD[idx];
            if (!entry) return null;
            const isFirst = entry.rank === 1;
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`glass rounded-xl p-5 text-center ${isFirst ? 'border-glow -mt-4' : ''}`}
              >
                <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  entry.rank === 1 ? 'bg-warning/20 text-warning' :
                  entry.rank === 2 ? 'bg-muted-foreground/20 text-muted-foreground' :
                  'bg-warning/10 text-warning/60'
                }`}>
                  {entry.rank === 1 ? <Trophy className="w-5 h-5" /> :
                   entry.rank === 2 ? <Medal className="w-5 h-5" /> :
                   <Star className="w-5 h-5" />}
                </div>
                <p className="font-mono-data text-sm mb-1">{entry.address}</p>
                <p className="text-xl font-bold text-primary">{entry.earned} GEN</p>
                <p className="text-xs text-muted-foreground mt-1">{entry.completedTasks} tasks · {entry.reputation} rep</p>
              </motion.div>
            );
          })}
        </div>

        {/* Full table */}
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">#</th>
                <th className="text-left px-5 py-3 font-medium">Address</th>
                <th className="text-left px-5 py-3 font-medium">Completed</th>
                <th className="text-left px-5 py-3 font-medium">Earned</th>
                <th className="text-left px-5 py-3 font-medium">Reputation</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map(entry => (
                <motion.tr
                  key={entry.rank}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-4 font-mono-data font-bold">{entry.rank}</td>
                  <td className="px-5 py-4 font-mono-data">{entry.address}</td>
                  <td className="px-5 py-4">{entry.completedTasks}</td>
                  <td className="px-5 py-4 font-mono-data text-primary font-semibold">{entry.earned} GEN</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${entry.reputation}%` }} />
                      </div>
                      <span className="text-sm">{entry.reputation}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;
