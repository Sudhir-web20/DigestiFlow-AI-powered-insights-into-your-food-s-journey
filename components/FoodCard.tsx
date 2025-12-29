
import React, { memo } from 'react';
import { DigestionInfo } from '../types';

interface FoodCardProps {
  data: DigestionInfo;
}

const FoodCard: React.FC<FoodCardProps> = ({ data }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://picsum.photos/seed/${encodeURIComponent(data.name)}/600/600`;
  };

  return (
    <div className="group relative bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row gap-4 transition-all hover:shadow-2xl hover:shadow-emerald-100/30">
      
      {/* Refined Responsive Image Container */}
      <div className="w-full md:w-[280px] h-[220px] md:h-[280px] shrink-0 overflow-hidden relative rounded-[2rem] bg-slate-50 border border-slate-50">
        <img 
          src={data.imageUrl} 
          alt={`${data.name} - ${data.category} information`}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-800 shadow-sm uppercase tracking-tighter">
            {data.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
             <span className="text-[8px] font-bold text-white uppercase tracking-widest">AI Vision</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-2 md:p-4 md:pr-6 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex flex-col mb-4">
            <h2 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight">{data.name}</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg mt-1 line-clamp-2">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Phase 1: Stomach */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 relative group/info hover:bg-emerald-50/50 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">In Stomach</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-black text-slate-900 mb-1">{data.stomachTime}</p>
              <p className="text-[9px] leading-tight text-slate-500 font-medium">
                Acid breakdown phase: food becomes liquid.
              </p>
            </div>

            {/* Phase 2: Total Journey */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 relative group/info hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider block">Total Journey</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl font-black text-slate-900 mb-1">{data.totalTime}</p>
              <p className="text-[9px] leading-tight text-slate-500 font-medium">
                Complete 30-foot path from start to exit.
              </p>
            </div>
          </div>

          {/* Horizontally Scrollable Nutrients */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar -mx-1 px-1">
              {data.nutrients.map((n, i) => (
                <span key={`${n}-${i}`} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-xl text-[11px] font-bold tracking-tight whitespace-nowrap border border-emerald-100/50">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl relative overflow-hidden group/fact">
          <div className="flex items-start gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-xl shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block mb-0.5">Quick Fact</span>
              <p className="text-[11px] leading-relaxed text-slate-300 pr-4">{data.funFact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FoodCard);
