
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-8 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-200 transition-transform hover:rotate-12 cursor-default">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
          Digesti<span className="text-emerald-600">Flow</span>
        </h1>
      </div>
      <p className="text-slate-400 text-sm md:text-base max-w-sm mx-auto font-medium leading-snug">
        AI-powered insights into your food's journey.
      </p>
    </header>
  );
};

export default Header;
