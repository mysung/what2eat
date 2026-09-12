import React from 'react';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="text-center pt-2 pb-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>스마트 메뉴 추천 가이드</span>
      </div>

      <div 
        onClick={onReset}
        className="cursor-pointer inline-flex items-center justify-center gap-2 group"
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
          <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          오늘 뭐 먹지? <span className="text-orange-600">2.0</span>
        </h1>
      </div>

      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-sm mx-auto">
        취향대로 딱 두 가지만 고르면, 지금 가장 알맞은 메뉴와 추천 이유를 콕 집어드려요!
      </p>
    </header>
  );
};
