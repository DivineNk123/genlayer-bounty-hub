import { useState } from 'react';
import { MOCK_TASKS, Task } from '@/lib/types';
import TaskCard from '@/components/TaskCard';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['all', 'content', 'development', 'community', 'design', 'research'] as const;
const STATUSES = ['all', 'open', 'in_review', 'completed', 'disputed'] as const;

const TasksPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');

  const filtered = MOCK_TASKS.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== 'all' && t.category !== category) return false;
    if (status !== 'all' && t.status !== status) return false;
    return true;
  });

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-display font-bold mb-2">Bounties</h1>
        <p className="text-muted-foreground mb-8">Browse and claim bounties evaluated by GenLayer AI validators</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search bounties..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg glass border-border/50 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                  category === c ? 'bg-primary/15 text-primary border border-primary/30' : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Status filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                status === s ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((task, i) => (
            <TaskCard key={task.id} task={task} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No bounties found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TasksPage;
