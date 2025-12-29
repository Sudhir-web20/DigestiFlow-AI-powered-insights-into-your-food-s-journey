
import React, { useState, useEffect } from 'react';

const FOOD_ICONS = [
  { icon: '🍔', label: 'Burger' },
  { icon: '🥗', label: 'Salad' },
  { icon: '🍕', label: 'Pizza' },
  { icon: '🍎', label: 'Apple' },
  { icon: '🍹', label: 'Drink' },
  { icon: '🥦', label: 'Broccoli' },
  { icon: '🍣', label: 'Sushi' },
  { icon: '☕', label: 'Coffee' },
];

const FoodLoader: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % FOOD_ICONS.length);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 flex flex-col items-center justify-center min-h-[380px] overflow-hidden relative"
      role="status"
      aria-live="polite"
      aria-label={`Analyzing ${FOOD_ICONS[index].label} digestion`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 to-transparent pointer-events-none" />
      
      <div className="relative mb-8">
        {/* Outer Ring - Using standard spin with specific duration */}
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-dashed border-emerald-100 animate-[spin_8s_linear_infinite]" />
        
        {/* Icon Carousel Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl md:text-6xl animate-bounce select-none">
            {FOOD_ICONS[index].icon}
          </div>
        </div>
      </div>

      <div className="text-center relative z-10 px-4">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 tracking-tight">
          Analyzing <span className="text-emerald-600 transition-colors duration-150">{FOOD_ICONS[index].label}</span>...
        </h3>
        <p className="text-slate-400 text-[13px] md:text-sm max-w-xs mx-auto leading-relaxed">
          Tracing the journey from stomach to intestine using AI vision.
        </p>
      </div>

      {/* Sleek Progress Indicator */}
      <div className="w-40 md:w-48 h-1.5 bg-slate-100 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full w-full animate-pulse opacity-75" />
      </div>
    </div>
  );
};

export default FoodLoader;
