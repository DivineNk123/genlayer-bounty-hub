import { Task } from '@/lib/types';
import { Clock, Users, Zap, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const STATUS_CONFIG = {
  open: { label: 'Open', className: 'bg-success/10 text-success border-success/20' },
  in_review: { label: 'In Review', className: 'bg-info/10 text-info border-info/20' },
  completed: { label: 'Completed', className: 'bg-primary/10 text-primary border-primary/20' },
  disputed: { label: 'Disputed', className: 'bg-warning/10 text-warning border-warning/20' },
};

const CATEGORY_CONFIG = {
  content: { label: 'Content', icon: '✍️' },
  development: { label: 'Dev', icon: '⚡' },
  community: { label: 'Community', icon: '🤝' },
  design: { label: 'Design', icon: '🎨' },
  research: { label: 'Research', icon: '🔬' },
};

const TaskCard = ({ task, index = 0 }: { task: Task; index?: number }) => {
  const status = STATUS_CONFIG[task.status];
  const category = CATEGORY_CONFIG[task.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/task/${task.id}`} className="block">
        <div className="glass glass-hover rounded-xl p-5 group cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">{category.icon}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {category.label}
              </span>
            </div>
            <Badge variant="outline" className={`text-xs ${status.className}`}>
              {status.label}
            </Badge>
          </div>

          <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {task.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {task.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {task.submissions}/{task.maxSubmissions}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {task.deadline}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono-data text-primary font-semibold">
                {task.reward} {task.rewardToken}
              </span>
            </div>
          </div>

          {task.validatorConsensus !== undefined && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Eye className="w-3 h-3" /> AI Consensus
                </span>
                <span className={`font-mono-data font-semibold ${
                  task.validatorConsensus >= 70 ? 'text-success' :
                  task.validatorConsensus >= 50 ? 'text-warning' : 'text-destructive'
                }`}>
                  {task.validatorConsensus}%
                </span>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    task.validatorConsensus >= 70 ? 'bg-success' :
                    task.validatorConsensus >= 50 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${task.validatorConsensus}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default TaskCard;
