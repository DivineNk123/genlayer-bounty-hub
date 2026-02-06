import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CATEGORIES = ['content', 'development', 'community', 'design', 'research'] as const;

const CreateTask = () => {
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    successCriteria: '',
    reward: '',
    category: 'content' as typeof CATEGORIES[number],
    deadline: '',
    maxSubmissions: '10',
  });

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleCreate = () => {
    if (!form.title || !form.successCriteria || !form.reward) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Bounty created! GenLayer intelligent contract deployed.');
    navigate('/tasks');
  };

  if (!wallet.connected) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground mb-2">Connect your wallet to create bounties</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg glass border-border/50 bg-card/60 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm";

  return (
    <div className="container py-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/tasks" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <h1 className="text-3xl font-display font-bold mb-2">Create Bounty</h1>
        <p className="text-muted-foreground mb-8">Define your task with natural language criteria for AI evaluation</p>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium block mb-1.5">Title *</label>
            <input type="text" placeholder="e.g., Write a tutorial on GenLayer" value={form.title} onChange={e => update('title', e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Description</label>
            <textarea placeholder="Describe the task in detail..." value={form.description} onChange={e => update('description', e.target.value)} rows={3} className={inputClass} />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">
              Success Criteria (Natural Language) *
            </label>
            <textarea
              placeholder="Describe what constitutes a successful submission. GenLayer AI validators will use this to evaluate submissions..."
              value={form.successCriteria}
              onChange={e => update('successCriteria', e.target.value)}
              rows={4}
              className={inputClass}
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              ✨ Write clear, measurable criteria. AI validators will use this to judge submission quality.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Reward (GEN) *</label>
              <input type="number" placeholder="250" value={form.reward} onChange={e => update('reward', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Max Submissions</label>
              <input type="number" placeholder="10" value={form.maxSubmissions} onChange={e => update('maxSubmissions', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Category</label>
              <select value={form.category} onChange={e => update('category', e.target.value)} className={inputClass}>
                {CATEGORIES.map(c => (
                  <option key={c} value={c} className="bg-card capitalize">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Deadline</label>
              <input type="date" value={form.deadline} onChange={e => update('deadline', e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="border-t border-border/50 pt-6">
            <Button onClick={handleCreate} className="w-full glow" size="lg">
              <Zap className="w-4 h-4 mr-2" />
              Deploy Intelligent Contract & Create Bounty
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3">
              This will deploy a GenLayer intelligent contract that automatically evaluates submissions using AI consensus
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateTask;
