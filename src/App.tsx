import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/hooks/useWallet";
import Header from "@/components/Header";
import Index from "./pages/Index";
import TasksPage from "./pages/TasksPage";
import TaskDetail from "./pages/TaskDetail";
import CreateTask from "./pages/CreateTask";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/task/:id" element={<TaskDetail />} />
              <Route path="/create" element={<CreateTask />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
