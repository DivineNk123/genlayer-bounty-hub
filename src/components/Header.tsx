import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListTodo, Trophy, Plus } from 'lucide-react';
import WalletButton from './WalletButton';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tasks', label: 'Bounties', icon: ListTodo },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow">
              <span className="text-primary font-bold text-sm">GL</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Gen<span className="text-primary">Bounty</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/create"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
          >
            <Plus className="w-4 h-4" />
            Create Bounty
          </Link>
          <WalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
