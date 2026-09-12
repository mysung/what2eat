import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { MenuItem } from '../types';

interface RecentRecommendationsProps {
  history: MenuItem[];
  onSelect: (item: MenuItem) => void;
  currentItemId?: string;
}

export const RecentRecommendations: React.FC<RecentRecommendationsProps> = ({
  history,
  onSelect,
  currentItemId,
}) => {
  // Only show up to 4 recent unique items excluding current item
  const recentItems = history
    .filter((item, index, self) => index === self.findIndex((t) => t.id === item.id))
    .filter((item) => item.id !== currentItemId)
    .slice(0, 3);

  if (recentItems.length === 0) return null;

  return (
    <div className="pt-4 border-t border-slate-100">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-2.5">
        <History className="w-3.5 h-3.5" />
        <span>방금 전에 본 추천 메뉴</span>
      </div>
      <div className="flex flex-col gap-2">
        {recentItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/60 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <span className="text-sm font-bold text-slate-800 group-hover:text-amber-800">
                  {item.name}
                </span>
                <span className="text-xs text-slate-600 ml-2">
                  {item.category}
                </span>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-700 transition-transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
