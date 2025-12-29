
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FoodCard from './components/FoodCard';
import FoodLoader from './components/FoodLoader';
import { fetchFullFoodData } from './services/geminiService';

// Initialize the Query Client for global caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // Cache food data for 1 hour
      gcTime: 1000 * 60 * 60 * 24, // Keep in garbage collection for 24 hours
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Individual Result Item component.
 * Each item manages its own query, allowing for parallel fetching and independent loading states.
 */
const ResultItem: React.FC<{ query: string; isLatest: boolean }> = ({ query, isLatest }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['food', query.toLowerCase()],
    queryFn: () => fetchFullFoodData(query),
  });

  if (isLoading) {
    return (
      <div className={`w-full transition-all duration-500 ${isLatest ? 'scale-105 z-10 mb-8' : 'scale-100'}`}>
        <FoodLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-8 bg-red-50 border border-red-100 rounded-[2rem] text-red-600 flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-red-100 p-3 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-lg">Unable to analyze "{query}"</h4>
          <p className="text-sm text-red-400">Please check your spelling or try another item.</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={`transition-all duration-700 ${isLatest ? 'scale-100 mb-4' : 'opacity-80 scale-95 hover:opacity-100 hover:scale-[0.98]'}`}>
      <FoodCard data={data} />
    </div>
  );
};

const DigestiFlowContent: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Green Apple']);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    const normalized = query.trim();
    if (!normalized) return;

    setIsSearching(true);
    setHistory(prev => {
      // Remove if already exists to move it to the top
      const filtered = prev.filter(q => q.toLowerCase() !== normalized.toLowerCase());
      return [normalized, ...filtered].slice(0, 5); // Keep last 5 searches
    });
    
    // Tiny delay to show the "Analyze" button feedback
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24 relative selection:bg-emerald-100">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-emerald-100/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-amber-100/30 blur-[100px] rounded-full" />
      </div>

      <Header />
      
      <main className="container mx-auto max-w-5xl px-4">
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        <div className="flex flex-col gap-10">
          {history.length > 0 ? (
            history.map((query, index) => (
              <ResultItem 
                key={`${query}-${index}`} 
                query={query} 
                isLatest={index === 0} 
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-lg">Search for a food item to begin your journey.</p>
            </div>
          )}
        </div>
      </main>

      {/* Sticky footer warning/info */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 flex items-center gap-3 z-50">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-[10px] sm:text-xs text-slate-600 font-semibold tracking-wide uppercase">
          AI generated estimates • Not medical advice
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DigestiFlowContent />
    </QueryClientProvider>
  );
};

export default App;
