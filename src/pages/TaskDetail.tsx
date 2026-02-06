import { useParams, Link } from 'react-router-dom';
import { MOCK_TASKS, MOCK_SUBMISSIONS } from '@/lib/types';
import { ArrowLeft, Clock, Users, Zap, Eye, ExternalLink, Shield, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TaskDetail = () => {
  const { id } = useParams();
  const task = MOCK_TASKS.find(t => t.id === id);
  const submissions = MOCK_SUBMISSIONS.filter(s => s.taskId === id);
  const { wallet } = useWallet();
  const [proofLink, setProofLink] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  if (!task) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Task not found</p>
        <Link to="/tasks" className="text-primary hover:underline mt-2 inline-block">Back to bounties</Link>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!proofLink) return;
    toast.success('Submission sent! AI validators will evaluate your work.');
    setProofLink('');
    setShowSubmit(false);
  };

  const handleAppeal = (submissionId: string) => {
    toast.info('Appeal initiated. 50 GEN staked for review.');
  };

  return (
    <div className="container py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/tasks" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to bounties
        </Link>

        {/* Task header */}
        <div className="glass rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs capitalize bg-primary/10 text-primary border-primary/20">
              {task.category}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {task.status.replace('_', ' ')}
            </Badge>
          </div>

          <h1 className="text-2xl font-display font-bold mb-3">{task.title}</h1>
          <p className="text-muted-foreground mb-5">{task.description}</p>

          <div className="grid sm:grid-cols-3 gap-4 mb-5">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Reward:</span>
              <span className="font-mono-data text-primary font-semibold">{task.reward} {task.rewardToken}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Deadline:</span>
              <span>{task.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Submissions:</span>
              <span>{task.submissions}/{task.maxSubmissions}</span>
            </div>
          </div>

          {/* Success Criteria */}
          <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
            <h3 className="text-sm font-semibold text-primary flex items-center gap-1.5 mb-2">
              <Eye className="w-4 h-4" /> AI Evaluation Criteria
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{task.successCriteria}</p>
          </div>

          {/* Consensus */}
          {task.validatorConsensus !== undefined && (
            <div className="mt-5 p-4 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> GenLayer Validator Consensus
                </span>
                <span className="font-mono-data font-bold text-lg">{task.validatorConsensus}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
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

        {/* Submit Section */}
        {task.status === 'open' && wallet.connected && (
          <div className="glass rounded-xl p-6 mb-6">
            {!showSubmit ? (
              <Button onClick={() => setShowSubmit(true)} className="w-full glow">
                <Zap className="w-4 h-4 mr-2" /> Submit Proof of Work
              </Button>
            ) : (
              <div className="space-y-4">
                <h3 className="font-display font-semibold">Submit Your Work</h3>
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Proof of Work Link</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={proofLink}
                    onChange={e => setProofLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg glass border-border/50 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Your submission will be stored on IPFS and evaluated by GenLayer AI validators</p>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSubmit} disabled={!proofLink} className="glow">
                    Submit & Store on IPFS
                  </Button>
                  <Button variant="outline" onClick={() => setShowSubmit(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submissions */}
        {submissions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-display font-semibold">Submissions</h2>
            {submissions.map(sub => (
              <div key={sub.id} className="glass rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono-data text-sm">{sub.submitter}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub.submittedAt}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs capitalize ${
                    sub.status === 'approved' ? 'bg-success/10 text-success border-success/20' :
                    sub.status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                    sub.status === 'appealed' ? 'bg-warning/10 text-warning border-warning/20' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {sub.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {sub.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                    {sub.status === 'appealed' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {sub.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <a href={sub.proofLink} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> Proof Link
                  </a>
                  <span className="font-mono-data text-muted-foreground text-xs">IPFS: {sub.ipfsHash}</span>
                </div>

                {/* AI Score */}
                {sub.aiScore !== undefined && (
                  <div className="p-3 rounded-lg bg-muted/30 mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">AI Quality Score</span>
                      <span className={`font-mono-data font-bold ${sub.aiScore >= 70 ? 'text-success' : sub.aiScore >= 50 ? 'text-warning' : 'text-destructive'}`}>
                        {sub.aiScore}/100
                      </span>
                    </div>
                    {sub.validatorVotes && (
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="text-success">✓ {sub.validatorVotes.approve} approve</span>
                        <span className="text-destructive">✗ {sub.validatorVotes.reject} reject</span>
                        <span>/ {sub.validatorVotes.total} validators</span>
                      </div>
                    )}
                  </div>
                )}

                {sub.feedback && (
                  <p className="text-sm text-muted-foreground italic">"{sub.feedback}"</p>
                )}

                {/* Appeal button */}
                {sub.status === 'rejected' && (
                  <button
                    onClick={() => handleAppeal(sub.id)}
                    className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-warning/10 text-warning border border-warning/20 hover:bg-warning/20 transition-colors"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Appeal (Stake 50 GEN)
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TaskDetail;
